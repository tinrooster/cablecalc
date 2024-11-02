import { Project } from 'ts-morph';
import * as path from 'path';
import * as fs from 'fs';

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

function ensureTypeFile(sourceFile: string) {
  const typeFile = sourceFile.replace(/\.(tsx?|jsx?)$/, '.types.ts');
  if (!fs.existsSync(typeFile)) {
    const defaultContent = `// Auto-generated types for ${path.basename(sourceFile)}
export interface ${path.basename(sourceFile, path.extname(sourceFile))}Props {
  // Add props here
}
`;
    fs.writeFileSync(typeFile, defaultContent);
    console.log(`Created type file: ${typeFile}`);
  }
}

function scanForMissingTypes() {
  const sourceFiles = project.getSourceFiles();
  const missingTypes = [];

  for (const sourceFile of sourceFiles) {
    const filePath = sourceFile.getFilePath();
    if (!filePath.includes('node_modules') && !filePath.includes('.types.ts')) {
      try {
        ensureTypeFile(filePath);
      } catch (error) {
        missingTypes.push(filePath);
      }
    }
  }

  return missingTypes;
}

// Run the check
const missing = scanForMissingTypes();
if (missing.length > 0) {
  console.log('Missing type files created for:', missing);
} 