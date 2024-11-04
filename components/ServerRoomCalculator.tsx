'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { RackGrid } from './RackGrid';

export function ServerRoomCalculator() {
  const [routeType, setRouteType] = useState<'aisle' | 'midcross' | 'endcross'>('aisle');
  const [sourcePosition, setSourcePosition] = useState<string | null>(null);
  const [targetPosition, setTargetPosition] = useState<string | null>(null);

  return (
    <Card className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle>Server Room Cable Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <svg width={800} height={600} className="border border-gray-200">
          <RackGrid 
            routeType={routeType}
            sourcePosition={sourcePosition}
            targetPosition={targetPosition}
          />
        </svg>
      </CardContent>
    </Card>
  );
} 