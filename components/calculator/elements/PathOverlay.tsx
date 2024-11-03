'use client'

import React from 'react';

interface PathPoint {
  path: [number, number][];
  segmentLengths?: number[];
}

interface PathOverlayProps {
  path: PathPoint;
  routingType: 'end' | 'middle' | 'aisle';
  settings: {
    visualization?: {
      enhanced?: boolean;
      showGlow?: boolean;
      showArrows?: boolean;
      showDistances?: boolean;
    };
  };
}

export const PathOverlay: React.FC<PathOverlayProps> = ({ path, routingType, settings }) => {
  if (!path?.path) return null;
  
  const pathString = path.path
    .map((point, i) => `${i === 0 ? 'M' : 'L'} ${point[0]},${point[1]}`)
    .join(' ');

  // Basic style (when enhanced visualization is off)
  const basicStyle = {
    stroke: "#2563eb",
    strokeWidth: 2,
    strokeDasharray: "4 4",
    className: "opacity-50"
  };

  // Enhanced styles per route type
  const enhancedStyles = {
    end: {
      stroke: "#2563eb",
      strokeWidth: 3,
      strokeDasharray: "8 4",
      className: "opacity-80",
      glowColor: "#93c5fd"
    },
    middle: {
      stroke: "#7c3aed",
      strokeWidth: 3,
      strokeDasharray: "12 4",
      className: "opacity-80",
      glowColor: "#c4b5fd"
    },
    aisle: {
      stroke: "#059669",
      strokeWidth: 3,
      strokeDasharray: "none",
      className: "opacity-80",
      glowColor: "#6ee7b7"
    }
  };

  const currentStyle = settings.visualization?.enhanced 
    ? enhancedStyles[routingType]
    : basicStyle;

  return (
    <g>
      {/* Glow effect */}
      {settings.visualization?.enhanced && settings.visualization?.showGlow && (
        <path
          d={pathString}
          stroke={currentStyle.glowColor}
          strokeWidth={currentStyle.strokeWidth + 4}
          fill="none"
          className="opacity-30 blur-sm"
        />
      )}
      
      {/* Main path */}
      <path
        d={pathString}
        stroke={currentStyle.stroke}
        strokeWidth={currentStyle.strokeWidth}
        strokeDasharray={currentStyle.strokeDasharray}
        fill="none"
        className={currentStyle.className}
      />

      {/* Direction arrows */}
      {settings.visualization?.enhanced && settings.visualization?.showArrows && 
        path.path.map((point, i) => {
          if (i === 0 || i === path.path.length - 1) return null;
          
          const prev = path.path[i - 1];
          const angle = Math.atan2(point[1] - prev[1], point[0] - prev[0]) * 180 / Math.PI;
          
          return (
            <g key={i} transform={`translate(${point[0]}, ${point[1]}) rotate(${angle})`}>
              <path
                d="M-6,-4 L0,0 L-6,4"
                fill="none"
                stroke={currentStyle.stroke}
                strokeWidth={2}
              />
            </g>
          );
        })
      }

      {/* Distance labels */}
      {settings.visualization?.enhanced && settings.visualization?.showDistances && 
        path.path.map((point, i) => {
          if (i === 0 || i === path.path.length - 1) return null;
          
          return (
            <g key={`label-${i}`} transform={`translate(${point[0]}, ${point[1]})`}>
              <rect
                x={-20}
                y={-20}
                width={40}
                height={20}
                fill="white"
                stroke={currentStyle.stroke}
                rx={4}
                className="opacity-90"
              />
              <text
                textAnchor="middle"
                y={-5}
                className="text-xs font-medium"
                fill={currentStyle.stroke}
              >
                {Math.round(path.segmentLengths?.[i] || 0)}′
              </text>
            </g>
          );
        })
      }
    </g>
  );
}; 