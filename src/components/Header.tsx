interface HeaderProps {
  activeTab: 'dashboard' | 'table' | 'simulation' | 'about';
  setActiveTab: (tab: 'dashboard' | 'table' | 'simulation' | 'about') => void;
  onResetDemo: () => void;
}

export default function Header({ activeTab, setActiveTab, onResetDemo }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-teal-300 transition-colors cursor-pointer text-left"
          >
            Smart Parking Slot Assistant
          </button>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`hover:text-teal-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'dashboard' ? 'text-teal-400 font-semibold' : 'text-slate-400'
              }`}
            >
              Parking Bay View
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`hover:text-teal-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'table' ? 'text-teal-400 font-semibold' : 'text-slate-400'
              }`}
            >
              Slot Directory
            </button>
            <button
              onClick={() => setActiveTab('simulation')}
              className={`hover:text-teal-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'simulation' ? 'text-teal-400 font-semibold' : 'text-slate-400'
              }`}
            >
              Simulation Tools
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`hover:text-teal-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'about' ? 'text-teal-400 font-semibold' : 'text-slate-400'
              }`}
            >
              About Project
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onResetDemo}
              className="px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
              title="Reset all parking spaces to the initial demonstration state"
            >
              <span>Reset Demo</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800/80 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-2 py-1 whitespace-nowrap cursor-pointer ${
              activeTab === 'dashboard' ? 'text-teal-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Bay View
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={`px-2 py-1 whitespace-nowrap cursor-pointer ${
              activeTab === 'table' ? 'text-teal-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Directory
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-2 py-1 whitespace-nowrap cursor-pointer ${
              activeTab === 'simulation' ? 'text-teal-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Simulation
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-2 py-1 whitespace-nowrap cursor-pointer ${
              activeTab === 'about' ? 'text-teal-400 font-semibold' : 'text-slate-400'
            }`}
          >
            About
          </button>
        </div>
      </div>
    </header>
  );
}
