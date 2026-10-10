import { Search, RotateCcw, LayoutGrid, ListFilter, SlidersHorizontal, X } from 'lucide-react';
import { ParkingStats, ParkingStatus, SlotType, ZoneName } from '../types/parking';

interface ControlsBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: 'All' | ParkingStatus;
  setStatusFilter: (s: 'All' | ParkingStatus) => void;
  zoneFilter: 'All' | ZoneName;
  setZoneFilter: (z: 'All' | ZoneName) => void;
  typeFilter: 'All' | SlotType;
  setTypeFilter: (t: 'All' | SlotType) => void;
  viewMode: 'grid' | 'table';
  setViewMode: (m: 'grid' | 'table') => void;
  stats: ParkingStats;
  onResetFilters: () => void;
  onResetDemo: () => void;
}

export default function ControlsBar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  zoneFilter,
  setZoneFilter,
  typeFilter,
  setTypeFilter,
  viewMode,
  setViewMode,
  stats,
  onResetFilters,
  onResetDemo,
}: ControlsBarProps) {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'All' ||
    zoneFilter !== 'All' ||
    typeFilter !== 'All';

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3 sm:p-4 space-y-3 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Search input */}
        <div className="relative flex-1 max-w-md">
          <label htmlFor="slot-search" className="sr-only">
            Search parking space by ID or details
          </label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="slot-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search slot ID (e.g., P01, P12) or keyword..."
            className="w-full pl-9 pr-9 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-400 focus:border-teal-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right: View switcher & Reset demo */}
        <div className="flex items-center gap-2 self-end lg:self-auto">
          {/* View Toggle */}
          <div className="flex items-center p-1 bg-slate-900 rounded-lg border border-slate-700 text-xs font-medium">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-slate-700 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Visual Parking Bay Grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bay Grid</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-slate-700 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Directory Table View"
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Table View</span>
            </button>
          </div>

          {/* Reset Demo button */}
          <button
            onClick={onResetDemo}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Restore sample demo data"
          >
            <RotateCcw className="w-3.5 h-3.5 text-teal-400" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Filter Row: Status Segmented Controls & Dropdowns */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-700/60">
        {/* Status Segmented Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs">
          <span className="text-slate-400 font-medium mr-1.5 hidden md:inline">Status:</span>

          <button
            onClick={() => setStatusFilter('All')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-medium ${
              statusFilter === 'All'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'
            }`}
          >
            All ({stats.total})
          </button>

          <button
            onClick={() => setStatusFilter('Available')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-medium ${
              statusFilter === 'Available'
                ? 'bg-teal-900/60 text-teal-300 border border-teal-600/60 shadow-sm'
                : 'text-teal-400/80 hover:text-teal-300 hover:bg-teal-950/30'
            }`}
          >
            Available ({stats.available})
          </button>

          <button
            onClick={() => setStatusFilter('Occupied')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-medium ${
              statusFilter === 'Occupied'
                ? 'bg-rose-900/60 text-rose-300 border border-rose-600/60 shadow-sm'
                : 'text-rose-400/80 hover:text-rose-300 hover:bg-rose-950/30'
            }`}
          >
            Occupied ({stats.occupied})
          </button>

          <button
            onClick={() => setStatusFilter('Unknown')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-medium ${
              statusFilter === 'Unknown'
                ? 'bg-amber-900/60 text-amber-300 border border-amber-600/60 shadow-sm'
                : 'text-amber-400/80 hover:text-amber-300 hover:bg-amber-950/30'
            }`}
          >
            Unknown ({stats.unknown})
          </button>
        </div>

        {/* Secondary filters: Zone & Type */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          {/* Zone selector */}
          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value as any)}
            className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-400 cursor-pointer"
            aria-label="Filter by parking lot zone"
          >
            <option value="All">All Zones</option>
            <option value="Zone A (North Gate)">Zone A (North)</option>
            <option value="Zone B (Academic Wing)">Zone B (Academic)</option>
            <option value="Zone C (Visitor & EV)">Zone C (Visitor/EV)</option>
          </select>

          {/* Slot Type selector */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-400 cursor-pointer"
            aria-label="Filter by vehicle space type"
          >
            <option value="All">All Bay Types</option>
            <option value="Standard">Standard</option>
            <option value="Compact">Compact</option>
            <option value="EV Charging">EV Charging</option>
            <option value="Accessible">Accessible</option>
          </select>

          {/* Clear Filters button */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs text-teal-400 hover:text-teal-300 underline underline-offset-2 px-1 cursor-pointer transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
