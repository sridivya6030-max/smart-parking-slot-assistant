import { ParkingSlot, ParkingStatus, ZoneName } from '../types/parking';
import ParkingSlotCard from './ParkingSlotCard';
import EmptyState from './EmptyState';

interface ParkingLotGridProps {
  slots: ParkingSlot[];
  onStatusChange: (id: string, newStatus: ParkingStatus) => void;
  onOpenDetails: (slot: ParkingSlot) => void;
  searchQuery: string;
  statusFilter: string;
  zoneFilter: string;
  typeFilter: string;
  onResetFilters: () => void;
  groupByZone: boolean;
  setGroupByZone: (g: boolean) => void;
}

export default function ParkingLotGrid({
  slots,
  onStatusChange,
  onOpenDetails,
  searchQuery,
  statusFilter,
  zoneFilter,
  typeFilter,
  onResetFilters,
  groupByZone,
  setGroupByZone,
}: ParkingLotGridProps) {
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

  // If grouped by zone
  if (groupByZone) {
    const zones: ZoneName[] = [
      'Zone A (North Gate)',
      'Zone B (Academic Wing)',
      'Zone C (Visitor & EV)',
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Showing {slots.length} spaces organized by campus lot zones</span>
          <button
            onClick={() => setGroupByZone(false)}
            className="text-teal-400 hover:text-teal-300 underline underline-offset-2 cursor-pointer"
          >
            Show unified grid
          </button>
        </div>

        {zones.map((zone) => {
          const zoneSlots = slots.filter((s) => s.zone === zone);
          if (zoneSlots.length === 0) return null;

          const availableCount = zoneSlots.filter((s) => s.status === 'Available').length;
          const occupiedCount = zoneSlots.filter((s) => s.status === 'Occupied').length;
          const unknownCount = zoneSlots.filter((s) => s.status === 'Unknown').length;

          return (
            <section key={zone} className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-800 pb-2 gap-1">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                    {zone}
                  </h3>
                  <span className="text-xs text-slate-400">({zoneSlots.length} spaces)</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="text-teal-400">{availableCount} Available</span>
                  <span>·</span>
                  <span className="text-rose-400">{occupiedCount} Occupied</span>
                  {unknownCount > 0 && (
                    <>
                      <span>·</span>
                      <span className="text-amber-400">{unknownCount} Unknown</span>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                {zoneSlots.map((slot) => (
                  <ParkingSlotCard
                    key={slot.id}
                    slot={slot}
                    onStatusChange={onStatusChange}
                    onOpenDetails={onOpenDetails}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  // Unified grid
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Showing {slots.length} parking spaces</span>
        <button
          onClick={() => setGroupByZone(true)}
          className="text-teal-400 hover:text-teal-300 underline underline-offset-2 cursor-pointer"
        >
          Group by lot zone
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {slots.map((slot) => (
          <ParkingSlotCard
            key={slot.id}
            slot={slot}
            onStatusChange={onStatusChange}
            onOpenDetails={onOpenDetails}
          />
        ))}
      </div>
    </div>
  );
}
