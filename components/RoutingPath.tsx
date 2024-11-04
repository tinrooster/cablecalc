"use client"

export type RoutePath = 'aisle' | 'middle' | 'end';

interface RoutingPathProps {
  selected: RoutePath;
  onChange: (path: RoutePath) => void;
}

export function RoutingPath({ selected, onChange }: RoutingPathProps) {
  const routes = [
    { id: 'aisle', label: 'Aisle Route (Default)', path: 'TH08-TC11' },
    { id: 'middle', label: 'Middle Cross Tray', path: 'TH08-TC11' },
    { id: 'end', label: 'End Cross Tray', path: 'TK01-TC04' },
  ] as const;

  return (
    <div className="space-y-2">
      <h2 className="font-bold">Routing Path</h2>
      <div className="space-y-1">
        {routes.map((route) => (
          <label
            key={route.id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="routing"
              value={route.id}
              checked={selected === route.id}
              onChange={() => onChange(route.id as RoutePath)}
              className="form-radio"
            />
            <span>{route.label}</span>
            <span className="text-gray-500 text-sm">({route.path})</span>
          </label>
        ))}
      </div>
    </div>
  );
} 