import { saveAs } from 'file-saver';

interface CableCalculation {
  timestamp: string;
  sourceRack: string;
  targetRack: string;
  routeType: 'default' | 'alternate';
  cableLength: number;
  routePath: string;
  settings: {
    verticalRun: number;
    dressingAllowance: number;
    slackAllowance: number;
    aisleEntryExit: number;
    crossTrayHeight?: number;
  };
}

// Generate simple CSV format
function generateSimpleCSV(calculations: CableCalculation[]): string {
  const header = 'Source,Target,Path,Length (ft)\n';
  const rows = calculations.map(calc => 
    `${calc.sourceRack},${calc.targetRack},${calc.routePath},${calc.cableLength}`
  ).join('\n');
  
  return header + rows;
}

// Generate detailed CSV format
function generateDetailedCSV(calculations: CableCalculation[]): string {
  const header = 'Timestamp,Source,Target,Route Type,Cable Length (ft),Route Path,Vertical Run,Dressing Allowance,Slack Allowance\n';
  const rows = calculations.map(calc => 
    `${calc.timestamp},${calc.sourceRack},${calc.targetRack},${calc.routeType},` +
    `${calc.cableLength},${calc.routePath},${calc.settings.verticalRun},` +
    `${calc.settings.dressingAllowance},${calc.settings.slackAllowance}`
  ).join('\n');
  
  return header + rows;
}

// Export function
export function exportCalculations(
  calculations: CableCalculation[],
  format: 'simple' | 'detailed',
  scope: 'current' | 'all'
) {
  const timestamp = new Date().toISOString().split('T')[0];
  const data = format === 'simple' ? 
    generateSimpleCSV(calculations) : 
    generateDetailedCSV(calculations);
  
  const filename = `cable-calculations-${format}-${timestamp}.csv`;
  const blob = new Blob([data], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, filename);
}

export function generatePreviewData(
  calculations: CableCalculation[],
  format: 'simple' | 'detailed'
): string {
  return format === 'simple' ? 
    generateSimpleCSV(calculations) : 
    generateDetailedCSV(calculations);
} 