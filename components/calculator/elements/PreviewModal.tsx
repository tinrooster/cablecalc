'use client'

import { useState, useEffect } from 'react';
import { CableCalculation } from '../types';

interface PreviewModalProps {
  calculations: CableCalculation[];
  format: 'simple' | 'detailed';
  onClose: () => void;
  onConfirm: () => void;
}

interface FilterPreference {
  column: number;
  type: 'text' | 'range' | 'select';
  value: string | [number, number] | string[];
}

interface ExportPreferences {
  filters: FilterPreference[];
  sort: SortConfig | null;
  viewMode: 'table' | 'raw';
}

const LOCAL_STORAGE_KEY = 'cable-calculator-export-preferences';

export function PreviewModal({ calculations, format, onClose, onConfirm }: PreviewModalProps) {
  const [viewMode, setViewMode] = useState<'table' | 'raw'>('table');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const prefs: ExportPreferences = JSON.parse(saved);
      setFilters(prefs.filters);
      setSortConfig(prefs.sort);
      setViewMode(prefs.viewMode);
    }
  }, []);

  // Save preferences
  const savePreferences = () => {
    const prefs: ExportPreferences = {
      filters,
      sort: sortConfig,
      viewMode
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(prefs));
  };

  // Export options
  const handleExport = (filteredOnly: boolean) => {
    const dataToExport = filteredOnly ? processedRows : baseRows;
    onConfirm(dataToExport);
  };

  // Headers configuration with sortable flag
  const headers = format === 'simple' 
    ? [
        { label: 'Source', sortable: true },
        { label: 'Target', sortable: true },
        { label: 'Path', sortable: true },
        { label: 'Length (ft)', sortable: true, numeric: true }
      ]
    : [
        { label: 'Timestamp', sortable: true },
        { label: 'Source', sortable: true },
        { label: 'Target', sortable: true },
        { label: 'Route Type', sortable: true },
        { label: 'Length (ft)', sortable: true, numeric: true },
        { label: 'Path', sortable: true },
        { label: 'Settings', sortable: false }
      ];

  // Generate base rows
  const baseRows = calculations.map(calc => 
    format === 'simple'
      ? [
          calc.sourceRack,
          calc.targetRack,
          calc.routePath,
          calc.cableLength.toString()
        ]
      : [
          calc.timestamp,
          calc.sourceRack,
          calc.targetRack,
          calc.routeType,
          calc.cableLength.toString(),
          calc.routePath,
          `VR:${calc.settings.verticalRun}' DA:${calc.settings.dressingAllowance}'`
        ]
  );

  // Sort and filter rows
  const processedRows = useMemo(() => {
    let result = [...baseRows];

    // Apply filters
    filters.forEach(filter => {
      result = result.filter(row => 
        row[filter.column].toLowerCase().includes(filter.value.toLowerCase())
      );
    });

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.column];
        const bVal = b[sortConfig.column];
        
        // Handle numeric sorting
        if (headers[sortConfig.column].numeric) {
          return sortConfig.direction === 'asc'
            ? parseFloat(aVal) - parseFloat(bVal)
            : parseFloat(bVal) - parseFloat(aVal);
        }
        
        // String sorting
        return sortConfig.direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }

    return result;
  }, [baseRows, sortConfig, filters]);

  const handleSort = (columnIndex: number) => {
    if (!headers[columnIndex].sortable) return;

    setSortConfig(current => ({
      column: columnIndex,
      direction: current?.column === columnIndex && current.direction === 'asc'
        ? 'desc'
        : 'asc'
    }));
  };

  const handleFilter = (columnIndex: number, value: string) => {
    setFilters(current => {
      const existing = current.findIndex(f => f.column === columnIndex);
      if (existing >= 0) {
        if (!value) {
          return current.filter(f => f.column !== columnIndex);
        }
        return current.map(f => 
          f.column === columnIndex ? { ...f, value } : f
        );
      }
      if (value) {
        return [...current, { column: columnIndex, value }];
      }
      return current;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium">
            Preview {format === 'simple' ? 'Simple' : 'Detailed'} Export
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 text-sm font-medium border ${
                  viewMode === 'table'
                    ? 'bg-blue-50 text-blue-700 border-blue-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                } rounded-l-lg`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode('raw')}
                className={`px-4 py-2 text-sm font-medium border ${
                  viewMode === 'raw'
                    ? 'bg-blue-50 text-blue-700 border-blue-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                } rounded-r-lg`}
              >
                Raw CSV
              </button>
            </div>
            <button
              onClick={handleCopyToClipboard}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {copyStatus === 'copied' ? (
                <>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <ClipboardIcon className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto p-6">
          {viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {headers.map((header, i) => (
                      <th
                        key={i}
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                          ${header.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                        onClick={() => header.sortable && handleSort(i)}
                      >
                        <div className="flex items-center space-x-2">
                          <span>{header.label}</span>
                          {header.sortable && sortConfig?.column === i && (
                            <span>
                              {sortConfig.direction === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                        {header.sortable && (
                          <input
                            type="text"
                            placeholder="Filter..."
                            className="mt-1 block w-full text-xs border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            onChange={(e) => handleFilter(i, e.target.value)}
                            value={filters.find(f => f.column === i)?.value || ''}
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {processedRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded border border-gray-200">
              {headers.map(h => h.label).join(',')}\n
              {processedRows.map(row => row.join(',')).join('\n')}
            </pre>
          )}
        </div>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className="border-t border-gray-200 p-4">
            <h4 className="font-medium mb-2">Advanced Filters</h4>
            {headers.map((header, i) => header.sortable && (
              <div key={i} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {header.label}
                </label>
                {header.numeric ? (
                  <div className="flex space-x-2 mt-1">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-24 rounded-md border-gray-300"
                      onChange={(e) => handleRangeFilter(i, 'min', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-24 rounded-md border-gray-300"
                      onChange={(e) => handleRangeFilter(i, 'max', e.target.value)}
                    />
                  </div>
                ) : (
                  <select
                    multiple
                    className="mt-1 block w-full rounded-md border-gray-300"
                    onChange={(e) => handleMultiSelect(i, e)}
                  >
                    {getUniqueValues(i).map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          <div className="space-x-4">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="text-blue-600 hover:text-blue-700"
            >
              {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
            </button>
            <button
              onClick={savePreferences}
              className="text-green-600 hover:text-green-700"
            >
              Save Preferences
            </button>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => handleExport(true)}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded"
            >
              Export Filtered
            </button>
            <button
              onClick={() => handleExport(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Export All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icons
function ClipboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}