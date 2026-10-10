import { ParkingSlot, ParkingStatus } from '../types/parking';
import { CheckCircle2, Car, HelpCircle, Zap, Accessibility, Eye } from 'lucide-react';
import EmptyState from './EmptyState';

interface ParkingTableViewProps {
  slots: ParkingSlot[];
  onStatusChange: (id: string, newStatus: ParkingStatus) => void;
  onOpenDetails: (slot: ParkingSlot) => void;
  searchQuery: string;
  statusFilter: string;
  zoneFilter: string;
  typeFilter: string;
  onResetFilters: () => void;
}

export default function ParkingTableView({
  slots,
  onStatusChange,
  onOpenDetails,
  searchQuery,
  statusFilter,
  zoneFilter,
  typeFilter,
  onResetFilters,
}: ParkingTableViewProps) {
  if (slots.length === 0) {
    return (
      <EmptyState
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        zoneFilter={zoneFilter}
        typeFilter={typeFilter}
        onResetFilters={onResetFilters}
      />
    );
  }

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-900/90 text-slate-400 font-medium">
              <th scope="col" className="py-3 px-4">Slot ID</th>
              <th scope="col" className="py-3 px-4">Zone & Level</th>
              <th scope="col" className="py-3 px-4">Bay Type</th>
              <th scope="col" className="py-3 px-4">Current Status</th>
              <th scope="col" className="py-3 px-4 hidden md:table-cell">Occupant / Note</th>
              <th scope="col" className="py-3 px-4 hidden lg:table-cell text-right">Confidence (Sim)</th>
              <th scope="col" className="py-3 px-4 text-center">Change Status</th>
              <th scope="col" className="py-3 px-4 text-right">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {slots.map((slot) => {
              const isAvailable = slot.status === 'Available';
              const isOccupied = slot.status === 'Occupied';
              const isUnknown = slot.status === 'Unknown';

              return (
                <tr
                  key={slot.id}
                  className="hover:bg-slate-850/60 transition-colors"
                >
                  {/* Slot ID */}
                  <td className="py-3 px-4 font-mono font-bold text-white tabular-nums">
                    {slot.id}
                  </td>

                  {/* Zone & Floor */}
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-200">{slot.zone}</div>
                    <div className="text-[11px] text-slate-400">{slot.floor}</div>
                  </td>

                  {/* Bay Type */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      {slot.type === 'EV Charging' && (
                        <span className="flex items-center gap-1 text-teal-400 font-medium text-xs">
                          <Zap className="w-3.5 h-3.5" />
                          <span>EV Bay</span>
                        </span>
                      )}
                      {slot.type === 'Accessible' && (
                        <span className="flex items-center gap-1 text-blue-400 font-medium text-xs">
                          <Accessibility className="w-3.5 h-3.5" />
                          <span>Accessible</span>
                        </span>
                      )}
                      {slot.type === 'Compact' && (
                        <span className="text-slate-300 text-xs">Compact</span>
                      )}
                      {slot.type === 'Standard' && (
                        <span className="text-slate-300 text-xs">Standard</span>
                      )}
                    </div>
                  </td>

                  {/* Current Status */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    {isAvailable && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                        <span>Available</span>
                      </span>
                    )}
                    {isOccupied && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-300">
                        <Car className="w-3.5 h-3.5 text-rose-400" />
                        <span>Occupied</span>
                      </span>
                    )}
                    {isUnknown && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Unknown</span>
                      </span>
                    )}
                  </td>

                  {/* Occupant / Note */}
                  <td className="py-3 px-4 hidden md:table-cell max-w-xs truncate text-xs text-slate-400">
                    {slot.simulatedVehicle ? (
                      <span className="text-slate-200 font-medium">{slot.simulatedVehicle}</span>
                    ) : (
                      slot.notes
                    )}
                  </td>

                  {/* Simulated AI Confidence */}
                  <td className="py-3 px-4 hidden lg:table-cell text-right font-mono tabular-nums text-xs text-slate-400">
                    {slot.aiDetectionConfidence ? `${slot.aiDetectionConfidence}%` : 'N/A'}
                  </td>

                  {/* Interactive Status Selector */}
                  <td className="py-3 px-4 text-center">
                    <select
                      value={slot.status}
                      onChange={(e) => onStatusChange(slot.id, e.target.value as ParkingStatus)}
                      className={`text-xs py-1 px-2 rounded-lg border font-medium focus:outline-none focus:ring-1 cursor-pointer ${
                        isAvailable
                          ? 'bg-teal-950/60 text-teal-300 border-teal-700 focus:ring-teal-400'
                          : isOccupied
                          ? 'bg-rose-950/60 text-rose-300 border-rose-700 focus:ring-rose-400'
                          : 'bg-amber-950/60 text-amber-300 border-amber-700 focus:ring-amber-400'
                      }`}
                      aria-label={`Update status for space ${slot.id}`}
                    >
                      <option value="Available">Available</option>
                      <option value="Occupied">Occupied</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </td>

                  {/* Inspect Details */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onOpenDetails(slot)}
                      className="p-1.5 text-slate-400 hover:text-teal-300 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                      title="Inspect full slot specifications"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="sr-only">Inspect {slot.id}</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
