const { Project } = require('ts-morph');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

interface PropAnalysis {
  name: string;
  type: string;
  isRequired: boolean;
}

interface ComponentDefinition {
  name: string;
  props: Map<string, PropAnalysis>;
  filePath: string;
}

interface ComponentUsage {
  name: string;
  propsUsed: Map<string, string>;
  location: string;
  componentDef?: ComponentDefinition;
}

function verifyFileStructure(dir: string): void {
  console.log('\nVerifying file structure:');
  function readDirRecursive(currentDir: string, indent: string = ''): void {
    const items: string[] = fs.readdirSync(currentDir);
    items.forEach((item: string) => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      console.log(`${indent}${item}${stat.isDirectory() ? '/' : ''}`);
      if (stat.isDirectory()) {
        readDirRecursive(fullPath, indent + '  ');
      }
    });
  }
  readDirRecursive(dir);
}

class TypeChecker {
  private project: any;
  private components: Map<string, ComponentDefinition>;
  private componentMap: Map<string, ComponentDefinition>;
  private usages: ComponentUsage[];
  private errors: string[];

  constructor() {
    this.project = new Project({
      tsConfigFilePath: "tsconfig.json",
    });
    this.components = new Map();
    this.componentMap = new Map();
    this.usages = [];
    this.errors = [];
  }

  private addSourceFiles(dir: string): void {
    // Find all TypeScript and TSX files
    const files = glob.sync(path.join(dir, '**/*.{tsx,ts}'));
    console.log(`Found ${files.length} TypeScript/TSX files to analyze`);
    
    // Add each file to the project
    files.forEach((file: string) => {
      try {
        this.project.addSourceFileAtPath(file);
        console.log(`Added source file: ${file}`);
      } catch (error) {
        console.error(`Error adding file ${file}:`, error);
      }
    });
  }

  public analyze(dir: string): void {
    console.log(`\nChecking directory: ${dir}`);
    
    if (!fs.existsSync(dir)) {
      console.error(`Directory not found: ${dir}`);
      process.exit(1);
    }
    
    verifyFileStructure(dir);
    
    console.log('\nStarting component analysis...');
    this.addSourceFiles(dir);
    this.collectComponentDefinitions(dir);
    this.analyzeComponentUsage(dir);
    this.validateProps();
    this.reportFindings();
  }

  private collectComponentDefinitions(dir: string): void {
    console.log(`\nScanning for component definitions in: ${dir}`);
    
    const sourceFiles = this.project.getSourceFiles();
    console.log(`Analyzing ${sourceFiles.length} source files`);
    
    sourceFiles.forEach((sourceFile: any) => {
      const filePath = sourceFile.getFilePath();
      if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
      
      console.log(`\nAnalyzing file: ${filePath}`);
      
      // Look for Props interfaces
      sourceFile.getInterfaces().forEach((interfaceDecl: any) => {
        const name = interfaceDecl.getName();
        if (name?.endsWith('Props')) {
          console.log(`Found Props interface: ${name}`);
          this.analyzeComponentProps(interfaceDecl, sourceFile);
        }
      });

      // Also look for Props type aliases
      sourceFile.getTypeAliases().forEach((typeAlias: any) => {
        const name = typeAlias.getName();
        if (name?.endsWith('Props')) {
          console.log(`Found Props type alias: ${name}`);
          this.analyzeComponentProps(typeAlias, sourceFile);
        }
      });
    });
  }

  private analyzeComponentProps(declaration: any, sourceFile: any): void {
    const name = declaration.getName();
    if (name.endsWith('Props')) {
      const componentName = name.replace('Props', '');
      const props = new Map<string, PropAnalysis>();
      
      // Handle both interface properties and type members
      const properties = declaration.getProperties?.() || declaration.getMembers?.();
      if (properties) {
        properties.forEach((prop: any) => {
          const propName = prop.getName();
          console.log(`Found prop: ${propName} in ${componentName}`);
          
          props.set(propName, {
            name: propName,
            type: prop.getType().getText(),
            isRequired: !prop.hasQuestionToken(),
          });
        });
        
        this.components.set(componentName, {
          name: componentName,
          props,
          filePath: sourceFile.getFilePath()
        });
      }
    }
  }

  private findComponentDefinition(tagName: string): ComponentDefinition | undefined {
    // Try exact match
    if (this.componentMap.has(tagName)) {
      return this.componentMap.get(tagName);
    }
    
    // Try with/without Component suffix
    const withComponent = tagName + 'Component';
    const withoutComponent = tagName.replace('Component', '');
    
    return this.componentMap.get(withComponent) || 
           this.componentMap.get(withoutComponent);
  }

  private analyzeComponentUsage(dir: string): void {
    console.log('\nAnalyzing component usage...');
    
    const sourceFiles = this.project.getSourceFiles();
    sourceFiles.forEach((sourceFile: any) => {
      if (!sourceFile.getFilePath().endsWith('.tsx')) return;
      
      console.log(`\nChecking usage in: ${sourceFile.getFilePath()}`);
      
      const ts = require('typescript');
      
      sourceFile.forEachDescendant((node: any) => {
        if (node.getKind() === ts.SyntaxKind.JsxOpeningElement) {
          try {
            const tagName = node.getTagNameNode().getText();
            console.log(`Found JSX element: ${tagName}`);
            
            const componentDef = this.findComponentDefinition(tagName);
            
            if (componentDef) {
              const attributes = node.getAttributes();
              const propsUsed = new Map<string, string>();
              
              attributes.forEach((attr: any) => {
                if (attr.getKind() === ts.SyntaxKind.JsxAttribute) {
                  const propName = attr.getNameNode().getText();
                  const initializer = attr.getInitializer();
                  const propValue = initializer ? initializer.getText() : '';
                  console.log(`  Prop used: ${propName} = ${propValue}`);
                  
                  if (!componentDef.props.has(propName)) {
                    const error = `Invalid prop '${propName}' used in <${tagName}> at ${sourceFile.getFilePath()}`;
                    console.error(error);
                    
                    const similarProps = Array.from(componentDef.props.keys())
                      .filter(p => this.isSimilarProp(p.toString(), propName));
                    
                    if (similarProps.length > 0) {
                      this.errors.push(`${error}\n  Did you mean: ${similarProps.join(', ')}?`);
                    } else {
                      this.errors.push(error);
                    }
                  }
                  
                  propsUsed.set(propName, propValue);
                }
              });
              
              componentDef.props.forEach((propInfo: PropAnalysis, propName: string) => {
                if (propInfo.isRequired && !propsUsed.has(propName)) {
                  const error = `Missing required prop '${propName}' in <${tagName}> at ${sourceFile.getFilePath()}`;
                  console.error(error);
                  this.errors.push(error);
                }
              });
              
              this.usages.push({
                name: tagName,
                propsUsed,
                location: sourceFile.getFilePath(),
                componentDef
              });
            }
          } catch (nodeError) {
            console.error(`Error analyzing JSX element:`, nodeError);
          }
        }
      });
    });
  }

  private isSimilarProp(prop1: string, prop2: string): boolean {
    // Check for common patterns like 'onX' vs 'setX'
    if (prop1.startsWith('on') && prop2.startsWith('set')) {
      const p1 = prop1.slice(2).toLowerCase();
      const p2 = prop2.slice(3).toLowerCase();
      return p1 === p2;
    }
    if (prop2.startsWith('on') && prop1.startsWith('set')) {
      const p1 = prop1.slice(3).toLowerCase();
      const p2 = prop2.slice(2).toLowerCase();
      return p1 === p2;
    }
    return false;
  }

  private validateProps(): void {
    console.log('\nValidating props...');
    
    this.usages.forEach(usage => {
      const componentDef = this.components.get(usage.name);
      if (!componentDef) return;
      
      console.log(`\nChecking <${usage.name}> in ${usage.location}`);
      
      // Check for invalid props
      usage.propsUsed.forEach((value, propName) => {
        if (!componentDef.props.has(propName)) {
          const error = `Invalid prop '${propName}' used in <${usage.name}> at ${usage.location}`;
          console.error(error);
          this.errors.push(error);
          
          // Suggest the correct prop name if it's similar
          const similarProp = Array.from(componentDef.props.keys())
            .find(p => p.toLowerCase() === propName.toLowerCase());
          if (similarProp) {
            this.errors.push(`  Did you mean '${similarProp}'?`);
          }
        }
      });
      
      // Check for missing required props
      componentDef.props.forEach((propInfo, propName) => {
        if (propInfo.isRequired && !usage.propsUsed.has(propName)) {
          const error = `Missing required prop '${propName}' in <${usage.name}> at ${usage.location}`;
          console.error(error);
          this.errors.push(error);
        }
      });
    });
  }

  private reportFindings(): void {
    console.log('\n=== Type Check Results ===');
    console.log(`Components analyzed: ${this.components.size}`);
    console.log(`Component usages checked: ${this.usages.length}`);
    console.log(`Errors found: ${this.errors.length}`);
    
    if (this.errors.length > 0) {
      console.log('\nErrors:');
      this.errors.forEach(error => console.log(`- ${error}`));
      process.exit(1);  // Exit with error code
    }
  }
}

// Run the checker
try {
  const checker = new TypeChecker();
  const projectRoot = path.resolve(__dirname, '..');
  const componentDir = path.join(projectRoot, 'components', 'ServerRoomCalculator');
  
  console.log('Starting type check process...');
  console.log(`Project root: ${projectRoot}`);
  console.log(`Component directory: ${componentDir}`);
  
  checker.analyze(componentDir);
} catch (error) {
  console.error('Error during type checking:', error);
  process.exit(1);
}