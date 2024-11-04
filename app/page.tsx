"use client"

import { ServerRoomCalculator } from '@/components/calculator/ServerRoomCalculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-6">KGO TE Room Cable Calculator</h1>
        <ServerRoomCalculator />
      </div>
    </main>
  );
}