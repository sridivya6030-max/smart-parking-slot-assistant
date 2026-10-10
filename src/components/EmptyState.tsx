import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  searchQuery: string;
  statusFilter: string;
  zoneFilter: string;
  typeFilter: string;
  onResetFilters: () => void;
}

export default function EmptyState({
  searchQuery,
  statusFilter,
  zoneFilter,
  typeFilter,
  onResetFilters,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-slate-700 bg-slate-800/40 p-8 sm:p-12 text-center max-w-lg mx-auto">
      <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-3 text-slate-400">
        <SearchX className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-white mb-1">
        No parking spaces match your criteria
      </h3>
      <p className="text-xs sm:text-sm text-slate-400 mb-4">
        {searchQuery && `No slot matches ID "${searchQuery}". `}
        {statusFilter !== 'All' && `Filter set to status "${statusFilter}". `}
        {zoneFilter !== 'All' && `Zone restricted to "${zoneFilter}". `}
        {typeFilter !== 'All' && `Type restricted to "${typeFilter}". `}
        Try relaxing your filters or search term to see all demonstration spaces.
      </p>
      <button
        onClick={onResetFilters}
        className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Filters & Show All</span>
      </button>
    </div>
  );
}
