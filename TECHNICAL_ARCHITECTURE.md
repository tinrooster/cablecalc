# Cable Length Calculator - Technical Architecture

## Component Structure

### Main Components
- `CableLengthCalculator` (index.tsx) - Parent component
- `RackGrid` - Core grid visualization
- `RackPosition` - Individual rack position boxes
- `SettingsPanel` - (planned) Configuration interface

### Key Features
- Interactive cable path selection
- Position selection system (source/target)
- Visual path indicators

## Grid Layout System

### Cable Path Indicators 

typescript
const PATHS = {
aisle: { x: 50, label: 'Aisle Route (Default)' },
middle: { x: 250, label: 'Middle Cross Tray (TH08-TC11)' },
end: { x: 450, label: 'End Cross Tray (TK01-TC04)' }
}

### Visual Hierarchy
1. Path lines (z-0) - Background
2. Grid boxes (z-10) - Middle layer
3. Path labels (z-20) - Top layer

### Styling Constants
- Box dimensions: 38px × 30px
- Grid spacing: 2px between boxes, 10px between rows
- Colors:
  - Box background: #f3f4f6
  - Box border: #797979
  - Selected state: blue-500
  - Path lines: #94a3b8 (inactive), #2563eb (active)

## State Management
- Route type selection
- Position selection (source/target)
- Settings configuration (planned)

## Planned Features
- Path visualization between selected positions
- Cable length calculation
- Settings panel implementation
- Route optimization

## Key Implementation Details
- SVG-based path visualization
- Interactive label buttons using SVG foreignObject
- Position selection logic with toggle behavior  


typescript
export function CableLengthCalculator() {
const [showSettings, setShowSettings] = useState(false);
const [routeType, setRouteType] = useState('aisle');
// Component structure
return (
<div className="w-full max-w-6xl mx-auto p-4">
<h1>Cable Length Calculator</h1>
<RackGrid routeType={routeType} onRouteChange={setRouteType} />
</div>
);
}


### RackGrid Component
Core visualization component managing:
- Path indicator rendering
- Grid layout
- Position selection logic


typescript
interface RackGridProps {
routeType: string;
onRouteChange: (type: string) => void;
}
const PATHS = {
aisle: { x: 50, label: 'Aisle Route (Default)' },
middle: { x: 250, label: 'Middle Cross Tray (TH08-TC11)' },
end: { x: 450, label: 'End Cross Tray (TK01-TC04)' }
};
export function RackGrid({ routeType, onRouteChange }: RackGridProps) {
const [sourcePosition, setSourcePosition] = useState<string | null>(null);
const [targetPosition, setTargetPosition] = useState<string | null>(null);
// Position selection logic
const handlePositionClick = (rowId: string, position: string) => {
const positionId = ${rowId}-${position};
if (!sourcePosition) {
setSourcePosition(positionId);
} else if (positionId === sourcePosition) {
setSourcePosition(null);
} else if (!targetPosition) {
setTargetPosition(positionId);
} else if (positionId === targetPosition) {
setTargetPosition(null);
} else {
setSourcePosition(positionId);
setTargetPosition(null);
}
};
}



### RackPosition Component
Individual position box with:
- Selection state handling
- Visual feedback
- Click behavior


typescript
interface RackPositionProps {
row: string;
position: string;
isSelected: boolean;
isSource?: boolean;
onClick: () => void;
}
export function RackPosition({
row,
position,
isSelected,
isSource,
onClick
}: RackPositionProps) {
return (
<button
className={ w-[38px] h-[30px] flex items-center justify-center border border-[#797979] font-medium text-xs transition-colors ${isSelected ? 'bg-blue-500 text-white' : 'bg-[#f3f4f6] hover:border-blue-500' } }
onClick={onClick}
>
{position}
</button>
);
}



## State Management

### Position Selection System
The grid maintains three key pieces of state:
1. Route Type (`routeType`)
   - Controls which path is active
   - Affects path visualization
   - Options: 'aisle', 'middle', 'end'

2. Source Position (`sourcePosition`)
   - First selected position
   - Format: `${rowId}-${position}` (e.g., "TX-06")
   - Cleared when selecting new source

3. Target Position (`targetPosition`)
   - Second selected position
   - Only settable after source is selected
   - Cleared when selecting new source

Selection Flow:

mermaid
graph TD
A[No Selection] -->|Click| B[Source Selected]
B -->|Click Same| A
B -->|Click Different| C[Target Selected]
C -->|Click Source| B
C -->|Click Target| B
C -->|Click New| B



### Visual Hierarchy Implementation
The component uses three layers with specific z-indices:

typescript
// Layer 1: Background Lines (z-0)
<svg className="absolute top-0 z-0">
{/ Path indicator lines /}
</svg>
// Layer 2: Grid (z-10)
<div className="relative z-10">
{/ Rack position boxes /}
</div>
// Layer 3: Interactive Labels (z-20)
<div className="relative z-20">
{/ Path selection buttons /}
</div>


## Styling System

### Core Constants

typescript
const STYLE = {
box: {
width: 38,
height: 30,
spacing: 2,
rowSpacing: 10
},
colors: {
boxBg: '#f3f4f6',
boxBorder: '#797979',
selected: '#3b82f6',
pathInactive: '#94a3b8',
pathActive: '#2563eb'
}
};




### Grid Layout
- Uses CSS Grid for row organization
- Flexbox for horizontal position alignment
- SVG for path visualization
- Absolute positioning for layer management

### Interactive Elements
- Buttons for position selection
- SVG foreignObject for path labels
- Transition effects for state changes

Grid UI: Fix layout and path indicators

- Correct positioning of cable path indicators and labels
- Fix vertical line lengths and z-index layering
- Implement interactive path selection labels
- Adjust grid spacing and box styling
- Add basic position selection functionality



Tomorrow we can continue with:
Path visualization between selected positions
Cable length calculation logic
Fine-tuning any UI interactions
Implementing the settings panel if needed




