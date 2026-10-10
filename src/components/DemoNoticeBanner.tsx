import { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export default function DemoNoticeBanner() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-slate-950/80 border-b border-amber-500/30 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 shrink-0">
              <AlertCircle className="w-3.5 h-3.5" />
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-amber-400 uppercase tracking-wider text-[11px] px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/30">
                Academic Prototype · Demo Data
              </span>
              <span className="text-slate-300">
                All parking slot statuses are demonstration values and not connected to live physical sensors or surveillance cameras.
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 underline underline-offset-2 shrink-0 transition-colors cursor-pointer"
          >
            {isExpanded ? 'Hide project context' : 'View project context'}
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-3 pt-2.5 border-t border-slate-800 text-xs text-slate-400 grid sm:grid-cols-2 gap-4 pb-1">
            <div className="space-y-1">
              <p className="font-medium text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                Academic Honesty Disclosure
              </p>
              <p>
                This project was created to address observed vehicle congestion on college/local lots. To comply with academic ethics, no claim is made that this system is deployed at a live facility. Computer vision and sensor integration are outlined as conceptual future phases.
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-slate-300">Interactive Prototype Controls</p>
              <p>
                You can change any slot status directly on each card or use the simulation toolbar below to test how real-time dashboard counters and filters react.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
