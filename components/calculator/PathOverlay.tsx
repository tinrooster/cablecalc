import { pathStyles, PathStyleType } from '@/lib/constants/defaults';

interface PathOverlayProps {
  pathString: string;
  styleType?: keyof typeof pathStyles;
}

export function PathOverlay({ pathString, styleType = 'default' }: PathOverlayProps) {
  const currentStyle: PathStyleType = pathStyles[styleType];

  return (
    <g className="path-overlay">
      {/* Glow effect */}
      <path
        d={pathString}
        stroke={currentStyle.glowColor}
        strokeWidth={currentStyle.strokeWidth + 4}
        fill="none"
        className="opacity-30 blur-sm"
      />
      {/* Main path */}
      <path
        d={pathString}
        stroke={currentStyle.stroke}
        strokeWidth={currentStyle.strokeWidth}
        strokeDasharray={currentStyle.strokeDasharray}
        className={currentStyle.className}
        fill="none"
      />
    </g>
  );
} 