# KGO Cable Length Calculator - Project Migration Context

last working build (without all the UI working again)
 git: "v4.0 - Initial structure before reorganization"

 https://github.com/tinrooster/cablecalc/branches
https://github.com/tinrooster/cablecalc/tree/rev4


Last working build that encludes all the basic working main page UI with selection interface, and Under floor cable tray alternate routing and visualization.
https://tecablecalc.netlify.app/
this was built on rev3
https://github.com/tinrooster/cablecalc/tree/rev3


Visual style and UI is important to match the original.

The design and UI of the app dwgtrackr is what we want for the final UI style
This wasn't built on rev3, but the visual style and UI is what we want for the final UI style
https://dwgtrackr.netlify.app/
    








## Original Application
- Live at: https://tecablecalc.netlify.app/
- Purpose: Calculate cable lengths between server rack positions
- Core Feature: Interactive server room grid layout with clickable rack positions

## Migration Goals
- Port from original codebase to modern Next.js
- Maintain exact functionality while cleaning up code structure
- Improve TypeScript implementation
- Keep UI/UX identical to original

## New Project Structure
- Framework: Next.js 14
- Language: TypeScript
- Styling: Tailwind CSS
/
├── app/
│   └── page.tsx                  # Main page component
│
├── components/
│   └── calculator/
│       ├── MainRoomLayout.tsx
│       ├── CableLengthDisplay.tsx
│       ├── PathOverlay.tsx
│       ├── RoutingPathSelector.tsx
│       ├── UserInstructions.tsx
│       ├── ClamperConnectionIndicator.tsx
│       └── ErrorBoundary.tsx
│
├── hooks/
│   ├── useRackSelection.ts
│   ├── useSettings.ts
│   ├── usePathCalculation.ts
│   ├── useVisualization.ts
│   └── useRackValidation.ts
│
├── lib/
│   ├── constants/
│   │   ├── rooms.ts
│   │   ├── settings.ts
│   │   ├── defaults.ts
│   │   └── presets.ts
│   │
│   └── utils/
│       ├── calculatePath.ts
│       ├── positions.ts
│       └── validations.ts
│
├── types/
│   ├── settings.ts
│   ├── calculations.ts
│   ├── calculatePath.ts
│   ├── RoomVisualization.ts
│   └── SettingsPanel.ts
│
└── ui/
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── label.tsx
    ├── radio-group.tsx
    ├── select.tsx
    └── separator.tsx



    0


    kgo_cablelength_app/
├── .next/
├── app/
│   └── page.tsx
├── components/
│   ├── calculator/
│   │   ├── _tests_/
│   │   ├── elements/
│   │   ├── settings/
│   │   ├── Card.tsx
│   │   ├── PathOverlay.tsx
│   │   └── ServerRoomCalculator.tsx
│   ├── ServerRoomCalculator/
│   │   └── index.tsx
│   └── ui/
├── hooks/
│   ├── useRackSelection.ts
│   └── useSettings.ts
└── lib/
    └── constants/




    =














### Key Dependencies 
json
{
"dependencies": {
"next": "14.2.16",
"react": "^18",
"react-dom": "^18",
"typescript": "^5"
},
"devDependencies": {
"@types/node": "^20",
"@types/react": "^18",
"@types/react-dom": "^18",
"autoprefixer": "^10.0.1",
"postcss": "^8",
"tailwindcss": "^3.3.0"
}
}
### Core Components Structure
app/
├── page.tsx # Main calculator page
├── layout.tsx # Root layout
└── components/
├── RackGrid.tsx # Server room grid layout
└── RoutingPath.tsx # Route selection component
types/
└── index.ts # Shared TypeScript types
styles/
└── globals.css # Global styles
## Key Features to Maintain
1. Server Room Grid
   - Interactive rack position selection
   - Visual representation of racks (TD, TX, TC, etc.)
   - Numbered positions (01-17)
   - Zone indicators (dotted lines)

2. Route Types
   - Default Route
   - Alternate Route

3. Cable Parameters
   - Start Point
   - End Point
   - Cable Type selection

4. Calculations
   - Length calculation based on selected positions
   - Export functionality

## Original UI Elements
1. Title: "KGO Cable Length Calculator"
2. Export Calculations button
3. Route Type selection
4. Cable Parameters section
5. Calculated Length display
6. Status indicator ("Ready")

## Data Types

typescript
type RackPosition = {
row: string; // TD, TX, TC, etc.
number: string; // 01-17
};
type RoutePath = 'aisle' | 'middle' | 'end';


## Migration Notes
- Original codebase at: https://github.com/tinrooster/cablecalc/tree/rev3
- Current working branch: rev3.88
- Maintaining exact visual appearance while modernizing code structure
- Focus on server room grid implementation as core feature

## Implementation Priorities
1. Core grid layout and interaction
2. Route selection functionality
3. Cable parameter inputs
4. Length calculation logic
5. Export functionality

## UI/UX Requirements
- Match original styling exactly
- Maintain simple, functional interface
- Keep all original functionality
- Preserve exact grid layout and dimensions

This document serves as a complete context for continuing development or starting fresh while maintaining consistent implementation goals.



## Project Directory Structure

kgo_cablelength_app/
├── .next/ # Next.js build output
├── node_modules/ # Dependencies
├── public/ # Static assets
├── app/ # Next.js app directory
│ ├── components/ # React components
│ │ ├── RackGrid.tsx # Server room grid layout
│ │ └── RoutingPath.tsx # Route selection
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Main calculator page
│ └── globals.css # Global styles
├── types/ # TypeScript type definitions
│ └── index.ts # Shared types
├── lib/ # Utility functions
│ └── calculations.ts # Cable length calculations
├── styles/ # Additional styles
│ └── globals.css # Global styles
├── .gitignore # Git ignore file
├── package.json # Project dependencies
├── postcss.config.js # PostCSS configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation


# KGO Cable Length Calculator - Project Migration Context

## Project Overview
Original application: https://tecablecalc.netlify.app/
Repository: https://github.com/tinrooster/cablecalc/tree/rev3
Current branch: rev3.88

## Complete Project Directory Structure









detailed tree:


kgo_cablelength_app/
├── .next/ # Next.js build output (generated)
│ ├── cache/ # Build cache
│ ├── server/ # Server-side rendered content
│ └── static/ # Static optimized files
│
├── node_modules/ # Project dependencies (generated)
│
├── public/ # Static assets
│ ├── favicon.ico # Site favicon
│ └── images/ # Static images
│
├── app/ # Next.js app directory (main application code)
│ ├── components/ # React components
│ │ ├── RackGrid/ # Server room grid component
│ │ │ ├── index.tsx # Main component file
│ │ │ ├── types.ts # Component-specific types
│ │ │ └── styles.module.css # Scoped styles
│ │ │
│ │ ├── RoutingPath/ # Route selection component
│ │ │ ├── index.tsx # Main component file
│ │ │ ├── types.ts # Component-specific types
│ │ │ └── styles.module.css # Scoped styles
│ │ │
│ │ └── shared/ # Shared component utilities
│ │ ├── Button.tsx # Common button component
│ │ └── Select.tsx # Common select component
│ │
│ ├── layout.tsx # Root layout component
│ ├── page.tsx # Main calculator page
│ ├── globals.css # Global styles
│ └── providers.tsx # React context providers
│
├── types/ # TypeScript type definitions
│ ├── index.ts # Main type exports
│ ├── rack.ts # Rack-related types
│ ├── routing.ts # Routing-related types
│ └── calculation.ts # Calculation-related types
│
├── lib/ # Utility functions and business logic
│ ├── calculations/ # Cable length calculation logic
│ │ ├── index.ts # Main calculation exports
│ │ ├── distance.ts # Distance calculation functions
│ │ └── validation.ts # Input validation
│ │
│ ├── constants/ # Application constants
│ │ ├── racks.ts # Rack configuration
│ │ └── routes.ts # Route definitions
│ │
│ └── utils/ # Helper utilities
│ ├── formatting.ts # Data formatting helpers
│ └── validation.ts # General validation helpers
│
├── styles/ # Additional styles
│ ├── globals.css # Global styles
│ └── variables.css # CSS variables
│
├── config/ # Configuration files
│ ├── grid.config.ts # Grid layout configuration
│ └── routes.config.ts # Routing configuration
│
├── .gitignore # Git ignore patterns
├── .eslintrc.json # ESLint configuration
├── .prettierrc # Prettier configuration
├── next.config.js # Next.js configuration
├── package.json # Project dependencies and scripts
├── postcss.config.js # PostCSS configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation




## Key Dependencies


json
{
"dependencies": {
"next": "14.2.16",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"typescript": "^5.0.4",
"tailwindcss": "^3.3.0",
"postcss": "^8.4.31",
"autoprefixer": "^10.4.16"
},
"devDependencies": {
"@types/node": "^20.8.10",
"@types/react": "^18.2.33",
"@types/react-dom": "^18.2.14",
"@typescript-eslint/eslint-plugin": "^6.9.1",
"@typescript-eslint/parser": "^6.9.1",
"eslint": "^8.52.0",
"eslint-config-next": "14.2.16",
"prettier": "^3.0.3"
}
}


## Core Type Definitions

typescript
// types/rack.ts
export type RackRow = 'TD' | 'TX' | 'TC' | 'TE' | 'TF' | 'TG' | 'TH' | 'TJ' | 'TK';
export type RackPosition = {
row: RackRow;
number: string; // 01-17
};
// types/routing.ts
export type RoutePath = 'aisle' | 'middle' | 'end';
export interface RouteDefinition {
id: RoutePath;
label: string;
path: string;
}
// types/calculation.ts
export interface CableParameters {
startPoint: RackPosition;
endPoint: RackPosition;
routePath: RoutePath;
cableType: string;
}
export interface CalculationResult {
length: number;
unit: 'meters' | 'feet';
path: RackPosition[];
}



## Component Structure
Each component follows this structure:

typescript
// components/ComponentName/index.tsx
import { FC } from 'react';
import { ComponentProps } from './types';
import styles from './styles.module.css';
export const ComponentName: FC<ComponentProps> = ({ ...props }) => {
// Component implementation
};
// components/ComponentName/types.ts
export interface ComponentProps {
// Props definition
}

## Configuration Files


typescript
// config/grid.config.ts
export const GRID_CONFIG = {
rows: ['TD', 'TX', 'TC', 'TE', 'TF', 'TG', 'TH', 'TJ', 'TK'],
cellsPerRow: {
TD: ['15', '14'],
TX: ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17'],
// ... other rows
},
zones: {
aisle: { start: 0, end: 5 },
middle: { start: 6, end: 10 },
end: { start: 11, end: 17 }
}
};
// config/routes.config.ts
export const ROUTE_DEFINITIONS = {
aisle: {
label: 'Aisle Route (Default)',
path: 'Default'
},
middle: {
label: 'Middle Cross Tray',
path: 'TH08-TC11'
},
end: {
label: 'End Cross Tray',
path: 'TK01-TC04'
}
};



## Build and Development Scripts


json
{
"scripts": {
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint",
"type-check": "tsc --noEmit",
"format": "prettier --write .",
"test": "jest",
"prepare": "husky install"
}
}


## Key Features Implementation Notes
1. Server Room Grid
   - Uses CSS Grid for layout
   - Interactive cells with click handlers
   - Visual indicators for selected positions
   - Zone separation with dotted lines

2. Routing Logic
   - Path finding algorithm in lib/calculations
   - Distance calculation based on selected route
   - Validation of valid paths

3. State Management
   - React useState for local state
   - TypeScript for type safety
   - Proper error handling

4. Styling Approach
   - Tailwind CSS for utility classes
   - CSS Modules for component-specific styles
   - Global styles for common elements

## Migration Strategy
1. Port core functionality first
2. Maintain exact UI/UX
3. Improve code structure
4. Add TypeScript types
5. Implement proper error handling
6. Add tests (future enhancement)

## Development Guidelines
1. Use TypeScript strictly
2. Follow component structure
3. Maintain type definitions
4. Document complex logic
5. Use consistent naming conventions
6. Follow Next.js best practices

## Known Issues and Workarounds

### Build/Compilation Issues
1. Radio Button State Management
   - Issue: Multiple radio button definitions causing state conflicts
   - Fix: Consolidate radio button state into single state variable
   ```typescript
   // Instead of multiple states:
   const [defaultRoute, setDefaultRoute] = useState(false);
   const [alternateRoute, setAlternateRoute] = useState(false);
   
   // Use single state:
   const [routeType, setRouteType] = useState<'default' | 'alternate'>('default');
   ```

2. Component Definition Conflicts
   - Issue: Multiple exports of 'Home' component causing compilation errors
   - Fix: Ensure single default export in page.tsx
   ```typescript
   // Correct:
   export default function Home() {
     // component code
   }
   
   // Avoid:
   function Home() {}
   export default Home;
   ```

### Development Server Issues
1. Hanging Build Process
   - Issue: Next.js dev server hangs at "waiting for compilation..."
   - Workaround: Access via localhost:3000 instead of 127.0.0.1:3000
   - Note: May require manual refresh or server restart
   
2. Hot Reload Inconsistencies
   - Issue: Changes not reflecting immediately
   - Workaround: 
     - Clear .next cache directory
     - Restart dev server
     - Use `npm run dev -- --turbo` for faster compilation

3. Network Dependencies
   - Issue: Initial compilation requires network access for npm
   - Workaround: Ensure network connectivity or use offline-first approach
   ```bash
   # Cache dependencies locally
   npm config set offline true
   npm ci --prefer-offline
   ```

### TypeScript Integration Issues
1. Type Definition Conflicts
   - Issue: Multiple interface definitions
   - Fix: Centralize type definitions in types/ directory
   ```typescript
   // types/index.ts
   export * from './rack';
   export * from './routing';
   ```

2. Component Prop Types
   - Issue: Implicit any types in component props
   - Fix: Explicit type definitions for all props
   ```typescript
   interface ComponentProps {
     value: string;
     onChange: (value: string) => void;
   }
   ```

### CSS/Styling Issues
1. Tailwind Class Conflicts
   - Issue: Multiple class definitions overriding each other
   - Fix: Use more specific selectors or CSS modules
   ```css
   /* Use specific classes */
   .radio-button[type="radio"] {
     /* styles */
   }
   ```

2. Layout Inconsistencies
   - Issue: Grid layout not matching original
   - Fix: Use explicit grid definitions
   ```css
   .grid-container {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
     gap: 4px;
   }
   ```

### Environment Setup Notes
1. Development Environment
   ```bash
   # Required environment variables
   NODE_ENV=development
   NEXT_PUBLIC_API_URL=http://localhost:3000
   
   # Recommended VSCode extensions
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   ```

2. Build Process
   ```bash
   # Clean install
   rm -rf node_modules .next
   npm cache clean --force
   npm install
   
   # Development
   npm run dev
   
   # Production build
   npm run build
   npm run start
   ```

3. Debugging Tips
   - Use Chrome DevTools for React components
   - Enable source maps in development
   - Use React Developer Tools extension
   ```javascript
   // next.config.js
   module.exports = {
     productionBrowserSourceMaps: true,
   }
   ```

### Performance Considerations
1. Build Optimization
   - Enable Turbopack for faster builds
   - Implement code splitting
   - Optimize images and assets

2. Runtime Performance
   - Minimize state updates
   - Use React.memo for pure components
   - Implement proper error boundaries

### Testing Strategy
1. Unit Tests
   - Test individual components
   - Validate calculation logic
   - Check routing algorithms

2. Integration Tests
   - Test component interactions
   - Validate form submissions
   - Check state management

3. E2E Tests
   - Test complete user flows
   - Validate calculations
   - Check export functionality



[Previous content remains...]

## Quick Start Guide

### Initial Setup


bash
Clone and setup new project
git clone [repository-url]
cd kgo_cablelength_app
npm install
Create necessary branches
git checkout -b dev
git checkout -b feature/grid-implementation
Start development server
npm run dev
Ask
Copy
Apply



### Key Development Checkpoints

1. Basic Structure Verification

typescript
// Verify page.tsx basic structure works
export default function Home() {
return <div>Basic structure test</div>
}



2. Component Development Order
- Start with RackGrid (core functionality)
- Add RoutingPath selection
- Implement calculations
- Add export functionality

### Common Gotchas

1. State Management
- Keep state at the highest necessary level
- Use TypeScript to enforce type safety
- Remember radio buttons need single state control

2. Grid Layout
- Start with basic grid before adding interactivity
- Test layout at different screen sizes
- Ensure grid matches original pixel-perfect

3. Build Process
- Clear .next cache if builds hang
- Use localhost:3000 not 127.0.0.1:3000
- Watch for TypeScript errors in terminal

### Original App Reference
Keep these browser windows open:
1. Original app: https://tecablecalc.netlify.app/
2. Dev version: localhost:3000
3. Component documentation

### Visual References
Save screenshots of:
- Original grid layout
- Route selection UI
- Calculation display
- Export format

### Code Snippets Library
typescript
// Basic grid cell structure
interface GridCellProps {
row: string;
number: string;
isSelected: boolean;
onClick: () => void;
}
// Route type definition
type RoutePath = 'aisle' | 'middle' | 'end';
// Basic state structure
const [selectedCells, setSelectedCells] = useState<{
source?: RackPosition;
target?: RackPosition;
}>({});



### Development Workflow Tips

1. Component Development
- Build components in isolation
- Test thoroughly before integration
- Use React DevTools for debugging

2. State Management
- Start with simple state
- Add complexity gradually
- Document state changes

3. Styling Approach
- Start with functional layout
- Add precise styling later
- Keep original styling reference

### Debug Checklist
- [ ] Next.js server running
- [ ] TypeScript compiling
- [ ] Components rendering
- [ ] State updating correctly
- [ ] Grid layout matching original
- [ ] Calculations working
- [ ] Export functioning

### Useful Commands
bash
Development
npm run dev -- --turbo # Faster compilation
Debugging
npm run build -- --debug
npm run lint -- --fix
Testing
npm run test -- --watch

npm noEmit


json
{
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
"source.fixAll.eslint": true
},
"typescript.tsdk": "node_modules/typescript/lib"
}



### Recommended Extensions
1. ESLint
2. Prettier
3. Tailwind CSS IntelliSense
4. GitLens
5. Error Lens

### Documentation Structure

docs/
├── SETUP.md
├── DEVELOPMENT.md
├── COMPONENTS.md
├── CALCULATIONS.md
└── DEPLOYMENT.md

### Git Workflow
bash
Feature development
git checkout -b feature/[feature-name]
git add .
git commit -m "feat: description"
git push origin feature/[feature-name]
Fixes
git checkout -b fix/[fix-name]
git commit -m "fix: description"



### Progress Tracking
Create GitHub issues for:
- [ ] Grid implementation
- [ ] Route selection
- [ ] Calculation logic
- [ ] Export functionality
- [ ] Styling matches
- [ ] Testing coverage

### Emergency Fixes
If things break:
1. Check console errors
2. Verify TypeScript compilation
3. Clear .next cache
4. Reinstall dependencies
5. Compare with working commit

### Performance Monitoring
- Watch for unnecessary rerenders
- Monitor bundle size
- Check load times
- Verify calculation speed





# Basic no-emit type check
npm run tsc -- --noEmit

# Or if you want to watch mode
npm run tsc -- --noEmit --watch

# If you need to specify the config file
npm run tsc -- --noEmit --project tsconfig.json


add ti package.json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch"
  }
}


bash:

npm run type-check
# or
npm run type-check:watch

