import { ParkingSlot, ParkingStatus } from '../types/parking';
import { Car, CheckCircle2, HelpCircle, Zap, Accessibility, Clock, Info } from 'lucide-react';

interface ParkingSlotCardProps {
  slot: ParkingSlot;
  onStatusChange: (id: string, newStatus: ParkingStatus) => void;
  onOpenDetails: (slot: ParkingSlot) => void;
}

export default function ParkingSlotCard({
  slot,
  onStatusChange,
  onOpenDetails,
}: ParkingSlotCardProps) {
  // Visual styling based on status
  const isAvailable = slot.status === 'Available';
  const isOccupied = slot.status === 'Occupied';
  const isUnknown = slot.status === 'Unknown';

  const statusBorderClass = isAvailable
    ? 'border-teal-700/60 hover:border-teal-500'
    : isOccupied
    ? 'border-rose-800/60 hover:border-rose-600'
    : 'border-amber-700/60 hover:border-amber-500';

  const statusBgGlow = isAvailable
    ? 'bg-gradient-to-b from-teal-950/20 to-slate-900/90'
    : isOccupied
    ? 'bg-gradient-to-b from-rose-950/20 to-slate-900/90'
    : 'bg-gradient-to-b from-amber-950/20 to-slate-900/90';

  return (
    <div
      className={`rounded-xl border ${statusBorderClass} ${statusBgGlow} p-4 flex flex-col justify-between transition-all duration-200 shadow-sm relative group`}
    >
      {/* Top Header: ID & Bay Type */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-white tabular-nums">
              {slot.id}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {slot.floor}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            {slot.type === 'EV Charging' && (
              <span className="flex items-center gap-1 text-teal-400 text-[11px] font-medium" title="EV Charging Bay">
                <Zap className="w-3.5 h-3.5" />
                <span>EV</span>
              </span>
            )}
            {slot.type === 'Accessible' && (
              <span className="flex items-center gap-1 text-blue-400 text-[11px] font-medium" title="Accessible Bay">
                <Accessibility className="w-3.5 h-3.5" />
                <span>Accessible</span>
              </span>
            )}
            {slot.type === 'Compact' && (
              <span className="text-slate-400 text-[11px] font-medium">Compact</span>
            )}
            {slot.type === 'Standard' && (
              <span className="text-slate-400 text-[11px] font-medium">Standard</span>
            )}
          </div>
        </div>

        {/* Clean Unboxed Metadata: Zone & Time */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
          <span className="truncate">{slot.zone.split(' ')[0]} {slot.zone.split(' ')[1]}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" />
            <span className="font-mono text-[11px]">{slot.lastUpdated}</span>
          </span>
        </div>

        {/* Visual Parking Bay Simulation Area */}
        <div
          onClick={() => onOpenDetails(slot)}
          className={`h-24 rounded-lg border border-dashed flex flex-col items-center justify-center p-2 mb-3 cursor-pointer transition-colors relative overflow-hidden ${
            isAvailable
              ? 'border-teal-600/40 bg-teal-950/30 hover:bg-teal-950/40 text-teal-300'
              : isOccupied
              ? 'border-rose-700/40 bg-rose-950/30 hover:bg-rose-950/40 text-rose-300'
              : 'border-amber-600/40 bg-amber-950/30 hover:bg-amber-950/40 text-amber-300'
          }`}
          title="Click to view detailed slot inspection modal"
        >
          {/* Parking Bay Slot Lines Visual */}
          <div className="absolute inset-x-2 top-0 h-1 border-t-2 border-slate-600/40" />
          <div className="absolute inset-y-2 left-1 w-1 border-l-2 border-slate-600/40" />
          <div className="absolute inset-y-2 right-1 w-1 border-r-2 border-slate-600/40" />

          {isAvailable && (
            <div className="flex flex-col items-center gap-1 text-center">
              <CheckCircle2 className="w-6 h-6 text-teal-400" />
              <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
                Available Bay
              </span>
              <span className="text-[11px] text-teal-400/80">Click for details</span>
            </div>
          )}

          {isOccupied && (
            <div className="flex flex-col items-center gap-1 text-center">
              <Car className="w-6 h-6 text-rose-400" />
              <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider">
                Occupied
              </span>
              <span className="text-[11px] text-rose-300/80 truncate max-w-[170px]">
                {slot.simulatedVehicle || 'Vehicle Parked'}
              </span>
            </div>
          )}

          {isUnknown && (
            <div className="flex flex-col items-center gap-1 text-center">
              <HelpCircle className="w-6 h-6 text-amber-400" />
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                Unknown Status
              </span>
              <span className="text-[11px] text-amber-400/80">Sensor/vision verification</span>
            </div>
          )}
        </div>

        {/* Slot Note or Condition */}
        <p className="text-xs text-slate-400 line-clamp-1 mb-3.5" title={slot.notes}>
          {slot.notes}
        </p>
      </div>

      {/* Working Status Controls */}
      <div className="pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Change Status:
          </span>
          <button
            onClick={() => onOpenDetails(slot)}
            className="text-[11px] text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer"
          >
            <Info className="w-3 h-3" />
            <span>Inspect</span>
          </button>
        </div>

        {/* 3 Interactive Buttons */}
        <div className="grid grid-cols-3 gap-1.5">
          <button
            onClick={() => onStatusChange(slot.id, 'Available')}
            className={`py-1.5 px-1 rounded-md text-xs font-medium transition-colors cursor-pointer text-center ${
              isAvailable
                ? 'bg-teal-500 text-slate-950 font-semibold shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80'
            }`}
            title="Mark as Available"
          >
            Available
          </button>

          <button
            onClick={() => onStatusChange(slot.id, 'Occupied')}
            className={`py-1.5 px-1 rounded-md text-xs font-medium transition-colors cursor-pointer text-center ${
              isOccupied
                ? 'bg-rose-500 text-slate-950 font-semibold shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80'
            }`}
            title="Mark as Occupied"
          >
            Occupied
          </button>

          <button
            onClick={() => onStatusChange(slot.id, 'Unknown')}
            className={`py-1.5 px-1 rounded-md text-xs font-medium transition-colors cursor-pointer text-center ${
              isUnknown
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80'
            }`}
            title="Mark as Unknown"
          >
            Unknown
          </button>
        </div>
      </div>
    </div>
  );
}
