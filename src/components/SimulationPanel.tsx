import { useState } from 'react';
import { Play, RotateCcw, Car, CheckCircle2, HelpCircle, Activity, Sparkles, AlertTriangle } from 'lucide-react';
import { ParkingSlot, ParkingStatus } from '../types/parking';

interface SimulationPanelProps {
  slots: ParkingSlot[];
  onBatchUpdate: (updatedSlots: ParkingSlot[]) => void;
  onSingleSlotChange: (id: string, status: ParkingStatus) => void;
  onResetDemo: () => void;
}

interface ActivityLogItem {
  id: string;
  time: string;
  message: string;
  type: 'arrival' | 'departure' | 'obstruction' | 'batch' | 'reset';
}

export default function SimulationPanel({
  slots,
  onBatchUpdate,
  onSingleSlotChange,
  onResetDemo,
}: SimulationPanelProps) {
  const [logs, setLogs] = useState<ActivityLogItem[]>([
    {
      id: 'log-0',
      time: '10:43:20 AM',
      message: 'Demo dataset loaded with 16 simulated parking bays.',
      type: 'batch',
    },
  ]);
  const [isScanning, setIsScanning] = useState(false);

  const addLog = (message: string, type: ActivityLogItem['type']) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newLog: ActivityLogItem = {
      id: `log-${Date.now()}-${Math.random()}`,
      time: timeStr,
      message,
      type,
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 7)]);
  };

  // 1. Simulate vehicle arrival
  const handleSimulateArrival = () => {
    const availableSlots = slots.filter((s) => s.status === 'Available');
    if (availableSlots.length === 0) {
      addLog('Cannot simulate arrival: Parking lot is at 100% capacity!', 'obstruction');
      return;
    }
    const target = availableSlots[Math.floor(Math.random() * availableSlots.length)];
    const vehicleTypes = ['Silver Sedan', 'Blue Hatchback', 'Black SUV', 'White Hybrid', 'Electric Compact'];
    const randomVehicle = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];

    const updated = slots.map((s) => {
      if (s.id === target.id) {
        return {
          ...s,
          status: 'Occupied' as ParkingStatus,
          simulatedVehicle: `${randomVehicle} (Demo)`,
          notes: `Occupied by ${randomVehicle} (Demo)`,
          lastUpdated: 'Just now',
          aiDetectionConfidence: Math.floor(Math.random() * 6) + 94,
        };
      }
      return s;
    });

    onBatchUpdate(updated);
    addLog(`Vehicle arrived at Slot ${target.id} (${randomVehicle}). Space is now Occupied.`, 'arrival');
  };

  // 2. Simulate vehicle departure
  const handleSimulateDeparture = () => {
    const occupiedSlots = slots.filter((s) => s.status === 'Occupied');
    if (occupiedSlots.length === 0) {
      addLog('Cannot simulate departure: No vehicles are currently parked.', 'obstruction');
      return;
    }
    const target = occupiedSlots[Math.floor(Math.random() * occupiedSlots.length)];

    const updated = slots.map((s) => {
      if (s.id === target.id) {
        return {
          ...s,
          status: 'Available' as ParkingStatus,
          simulatedVehicle: undefined,
          notes: 'Bay opened for incoming vehicle',
          lastUpdated: 'Just now',
          aiDetectionConfidence: Math.floor(Math.random() * 6) + 93,
        };
      }
      return s;
    });

    onBatchUpdate(updated);
    addLog(`Vehicle departed from Slot ${target.id}. Space is now Available.`, 'departure');
  };

  // 3. Simulate camera glare or physical obstruction
  const handleSimulateObstruction = () => {
    const availableOrOccupied = slots.filter((s) => s.status !== 'Unknown');
    if (availableOrOccupied.length === 0) {
      addLog('All spaces are already marked as Unknown.', 'obstruction');
      return;
    }
    const target = availableOrOccupied[Math.floor(Math.random() * availableOrOccupied.length)];

    const updated = slots.map((s) => {
      if (s.id === target.id) {
        return {
          ...s,
          status: 'Unknown' as ParkingStatus,
          notes: 'Simulated vision ambiguity: Lens flare or temporary shadow',
          lastUpdated: 'Just now',
          aiDetectionConfidence: Math.floor(Math.random() * 15) + 40,
        };
      }
      return s;
    });

    onBatchUpdate(updated);
    addLog(`Slot ${target.id} status changed to Unknown (Simulated camera glare / optical occlusion).`, 'obstruction');
  };

  // 4. Simulate rush hour (high occupancy)
  const handleSimulateRushHour = () => {
    const updated = slots.map((s, index) => {
      // 13 of 16 occupied
      if (index === 2 || index === 7) {
        return { ...s, status: 'Available' as ParkingStatus, notes: 'One of few available bays during rush hour', lastUpdated: 'Just now' };
      }
      if (index === 5) {
        return { ...s, status: 'Unknown' as ParkingStatus, notes: 'Sensor disruption in Zone A', lastUpdated: 'Just now' };
      }
      return {
        ...s,
        status: 'Occupied' as ParkingStatus,
        simulatedVehicle: `Commuter Vehicle #${index + 1} (Demo)`,
        notes: 'Occupied during morning peak rush hour',
        lastUpdated: 'Just now',
      };
    });

    onBatchUpdate(updated);
    addLog('Simulated Morning Rush Hour: 81% occupancy applied across all 3 zones.', 'batch');
  };

  // 5. Run simulated AI frame scan
  const handleRunAiScan = () => {
    setIsScanning(true);
    addLog('Executing simulated AI Computer Vision frame scan...', 'batch');

    setTimeout(() => {
      setIsScanning(false);
      const updated = slots.map((s) => ({
        ...s,
        lastUpdated: 'Just now',
        aiDetectionConfidence:
          s.status === 'Unknown'
            ? Math.floor(Math.random() * 20) + 40
            : Math.floor(Math.random() * 7) + 93,
      }));
      onBatchUpdate(updated);
      addLog('AI Computer Vision scan completed: Refreshed confidence metrics and timestamps.', 'batch');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-800/80 border border-slate-700/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Interactive Prototype Simulation Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Designed for college viva and project presentations to demonstrate how the dashboard responds to real-time events.
            </p>
          </div>
          <button
            onClick={() => {
              onResetDemo();
              addLog('Demo state restored to original baseline distribution.', 'reset');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer self-start sm:self-auto shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5 text-teal-400" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* 1. Simulate Arrival */}
          <button
            onClick={handleSimulateArrival}
            className="p-3 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-teal-500/80 hover:bg-slate-850 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-teal-400 mb-1.5">
              <Car className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Simulate Arrival</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Park a vehicle</p>
            <p className="text-[11px] text-slate-500 mt-1">Converts a random Available space to Occupied</p>
          </button>

          {/* 2. Simulate Departure */}
          <button
            onClick={handleSimulateDeparture}
            className="p-3 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-emerald-500/80 hover:bg-slate-850 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-emerald-400 mb-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Simulate Departure</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Free up a space</p>
            <p className="text-[11px] text-slate-500 mt-1">Converts a random Occupied space to Available</p>
          </button>

          {/* 3. Simulate Camera Glare */}
          <button
            onClick={handleSimulateObstruction}
            className="p-3 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-amber-500/80 hover:bg-slate-850 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-amber-400 mb-1.5">
              <HelpCircle className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Simulate Edge Case</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Sensor/Vision Glare</p>
            <p className="text-[11px] text-slate-500 mt-1">Demonstrates how the system handles uncertainty</p>
          </button>

          {/* 4. Run Simulated Vision Scan */}
          <button
            onClick={handleRunAiScan}
            disabled={isScanning}
            className={`p-3 rounded-lg bg-slate-900 border text-left transition-all cursor-pointer ${
              isScanning
                ? 'border-teal-400 bg-teal-950/30'
                : 'border-slate-700/80 hover:border-teal-500/80 hover:bg-slate-850'
            }`}
          >
            <div className="flex items-center gap-2 text-teal-300 mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {isScanning ? 'Scanning...' : 'Simulate AI Scan'}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Vision Frame Sweep</p>
            <p className="text-[11px] text-slate-500 mt-1">Refreshes timestamps & demo confidence metrics</p>
          </button>
        </div>

        {/* Preset Lot Conditions */}
        <div className="mt-4 pt-3 border-t border-slate-700/60 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium mr-1">Batch Lot Scenarios:</span>
          <button
            onClick={handleSimulateRushHour}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
          >
            Morning Rush Hour (81% Occupied)
          </button>
          <button
            onClick={() => {
              const updated = slots.map((s) => ({
                ...s,
                status: 'Available' as ParkingStatus,
                simulatedVehicle: undefined,
                notes: 'Vacant bay',
                lastUpdated: 'Just now',
              }));
              onBatchUpdate(updated);
              addLog('Simulated Quiet Hours: All 16 spaces reset to Available.', 'batch');
            }}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
          >
            Off-Peak / Empty Lot (0% Occupied)
          </button>
        </div>
      </div>

      {/* Real-Time Event Simulation Log */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-800/80 border border-slate-700/80">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-slate-200">
            <Activity className="w-4 h-4 text-teal-400" />
            <h3 className="text-sm font-semibold text-white">
              Simulation Activity Log (State Updates)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {logs.length} events recorded
          </span>
        </div>

        <div className="space-y-2 font-mono text-xs max-h-56 overflow-y-auto">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-2.5 p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300"
            >
              <span className="text-slate-500 tabular-nums shrink-0">{log.time}</span>
              <span className="text-slate-600">·</span>
              <span className="flex-1 break-words">
                {log.type === 'arrival' && <span className="text-rose-400 font-medium mr-1.5">[ARRIVE]</span>}
                {log.type === 'departure' && <span className="text-teal-400 font-medium mr-1.5">[DEPART]</span>}
                {log.type === 'obstruction' && <span className="text-amber-400 font-medium mr-1.5">[EDGE CASE]</span>}
                {log.type === 'batch' && <span className="text-blue-400 font-medium mr-1.5">[SCENARIO]</span>}
                {log.type === 'reset' && <span className="text-purple-400 font-medium mr-1.5">[RESET]</span>}
                {log.message}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
