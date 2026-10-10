import { ParkingStats } from '../types/parking';
import { SquareParking, CheckCircle2, Car, HelpCircle, ArrowUpRight } from 'lucide-react';

interface MetricCardsProps {
  stats: ParkingStats;
  onFilterByStatus?: (status: 'All' | 'Available' | 'Occupied' | 'Unknown') => void;
  activeStatusFilter?: string;
}

export default function MetricCards({ stats, onFilterByStatus, activeStatusFilter }: MetricCardsProps) {
  return (
    <section aria-label="Parking Overview Statistics" className="space-y-4">
      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Spaces */}
        <div
          onClick={() => onFilterByStatus?.('All')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onFilterByStatus?.('All');
          }}
          className={`p-4 rounded-xl bg-slate-800/80 border transition-all cursor-pointer text-left ${
            activeStatusFilter === 'All'
              ? 'border-teal-500/80 ring-1 ring-teal-500/50 shadow-md shadow-teal-950/40'
              : 'border-slate-700/80 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs sm:text-sm font-medium">Total Spaces</span>
            <SquareParking className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-white">
              {stats.total}
            </span>
            <span className="text-xs text-slate-400">Capacity</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 truncate">
            Across 3 simulated zones
          </div>
        </div>

        {/* Available Spaces */}
        <div
          onClick={() => onFilterByStatus?.('Available')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onFilterByStatus?.('Available');
          }}
          className={`p-4 rounded-xl bg-slate-800/80 border transition-all cursor-pointer text-left ${
            activeStatusFilter === 'Available'
              ? 'border-teal-400 ring-1 ring-teal-400/50 shadow-md shadow-teal-950/40 bg-teal-950/20'
              : 'border-teal-800/40 hover:border-teal-600/70'
          }`}
        >
          <div className="flex items-center justify-between text-teal-300 mb-2">
            <span className="text-xs sm:text-sm font-medium">Available</span>
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-teal-300">
              {stats.available}
            </span>
            <span className="text-xs text-teal-400/80">
              {stats.total > 0 ? Math.round((stats.available / stats.total) * 100) : 0}% open
            </span>
          </div>
          <div className="mt-2 text-[11px] text-teal-400/90 truncate">
            Ready for incoming drivers
          </div>
        </div>

        {/* Occupied Spaces */}
        <div
          onClick={() => onFilterByStatus?.('Occupied')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onFilterByStatus?.('Occupied');
          }}
          className={`p-4 rounded-xl bg-slate-800/80 border transition-all cursor-pointer text-left ${
            activeStatusFilter === 'Occupied'
              ? 'border-rose-400 ring-1 ring-rose-400/50 shadow-md shadow-rose-950/40 bg-rose-950/20'
              : 'border-rose-900/40 hover:border-rose-700/60'
          }`}
        >
          <div className="flex items-center justify-between text-rose-300 mb-2">
            <span className="text-xs sm:text-sm font-medium">Occupied</span>
            <Car className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-rose-300">
              {stats.occupied}
            </span>
            <span className="text-xs text-rose-400/80">
              {stats.occupancyPercentage}% in use
            </span>
          </div>
          <div className="mt-2 text-[11px] text-rose-400/90 truncate">
            Vehicles currently parked
          </div>
        </div>

        {/* Unknown Spaces */}
        <div
          onClick={() => onFilterByStatus?.('Unknown')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onFilterByStatus?.('Unknown');
          }}
          className={`p-4 rounded-xl bg-slate-800/80 border transition-all cursor-pointer text-left ${
            activeStatusFilter === 'Unknown'
              ? 'border-amber-400 ring-1 ring-amber-400/50 shadow-md shadow-amber-950/40 bg-amber-950/20'
              : 'border-amber-800/40 hover:border-amber-600/70'
          }`}
        >
          <div className="flex items-center justify-between text-amber-300 mb-2">
            <span className="text-xs sm:text-sm font-medium">Unknown</span>
            <HelpCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-amber-300">
              {stats.unknown}
            </span>
            <span className="text-xs text-amber-400/80">
              {stats.total > 0 ? Math.round((stats.unknown / stats.total) * 100) : 0}% unverified
            </span>
          </div>
          <div className="mt-2 text-[11px] text-amber-400/90 truncate">
            Obstructed or needs verification
          </div>
        </div>
      </div>

      {/* Lot Occupancy Gauge Bar */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs sm:text-sm text-slate-300">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-200">Overall Lot Status:</span>
          <span className="text-xs text-slate-400">
            {stats.available > 0
              ? `${stats.available} bays currently accessible for drivers`
              : 'Lot is at maximum capacity'}
          </span>
        </div>

        <div className="flex items-center gap-3 w-full md:w-80">
          <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden flex border border-slate-700/80">
            <div
              style={{ width: `${(stats.available / stats.total) * 100}%` }}
              className="bg-teal-500 transition-all duration-300"
              title={`Available: ${stats.available}`}
            />
            <div
              style={{ width: `${(stats.occupied / stats.total) * 100}%` }}
              className="bg-rose-500 transition-all duration-300"
              title={`Occupied: ${stats.occupied}`}
            />
            <div
              style={{ width: `${(stats.unknown / stats.total) * 100}%` }}
              className="bg-amber-500 transition-all duration-300"
              title={`Unknown: ${stats.unknown}`}
            />
          </div>
          <span className="font-mono tabular-nums text-xs text-slate-300 shrink-0 font-medium">
            {stats.occupancyPercentage}% full
          </span>
        </div>
      </div>
    </section>
  );
}
