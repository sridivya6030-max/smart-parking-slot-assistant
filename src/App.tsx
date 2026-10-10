/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { getInitialSlots } from './data/initialSlots';
import { ParkingSlot, ParkingStats, ParkingStatus, SlotType, ZoneName } from './types/parking';
import Header from './components/Header';
import DemoNoticeBanner from './components/DemoNoticeBanner';
import MetricCards from './components/MetricCards';
import ControlsBar from './components/ControlsBar';
import ParkingLotGrid from './components/ParkingLotGrid';
import ParkingTableView from './components/ParkingTableView';
import SimulationPanel from './components/SimulationPanel';
import AboutSection from './components/AboutSection';
import SlotDetailModal from './components/SlotDetailModal';
import { CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react';

export default function App() {
  // Main state: collection of all parking slots
  const [slots, setSlots] = useState<ParkingSlot[]>(() => getInitialSlots());

  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState<'dashboard' | 'table' | 'simulation' | 'about'>('dashboard');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [groupByZone, setGroupByZone] = useState<boolean>(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'All' | ParkingStatus>('All');
  const [zoneFilter, setZoneFilter] = useState<'All' | ZoneName>('All');
  const [typeFilter, setTypeFilter] = useState<'All' | SlotType>('All');

  // Inspection Modal
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);

  // User feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 2800);
  };

  // Immediate derived parking statistics
  const stats: ParkingStats = useMemo(() => {
    const total = slots.length;
    const available = slots.filter((s) => s.status === 'Available').length;
    const occupied = slots.filter((s) => s.status === 'Occupied').length;
    const unknown = slots.filter((s) => s.status === 'Unknown').length;
    const occupancyPercentage = total > 0 ? Math.round((occupied / total) * 100) : 0;

    return {
      total,
      available,
      occupied,
      unknown,
      occupancyPercentage,
    };
  }, [slots]);

  // Filtered slots list
  const filteredSlots = useMemo(() => {
    return slots.filter((slot) => {
      // Search matching (ID, notes, simulated vehicle)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.trim().toLowerCase();
        const matchesId = slot.id.toLowerCase().includes(query);
        const matchesNotes = slot.notes.toLowerCase().includes(query);
        const matchesVehicle = slot.simulatedVehicle?.toLowerCase().includes(query);
        const matchesZone = slot.zone.toLowerCase().includes(query);
        if (!matchesId && !matchesNotes && !matchesVehicle && !matchesZone) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== 'All' && slot.status !== statusFilter) {
        return false;
      }

      // Zone filter
      if (zoneFilter !== 'All' && slot.zone !== zoneFilter) {
        return false;
      }

      // Slot type filter
      if (typeFilter !== 'All' && slot.type !== typeFilter) {
        return false;
      }

      return true;
    });
  }, [slots, searchQuery, statusFilter, zoneFilter, typeFilter]);

  // Handler: Change single slot status
  const handleStatusChange = (id: string, newStatus: ParkingStatus) => {
    setSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === id) {
          const isNowOccupied = newStatus === 'Occupied';
          return {
            ...slot,
            status: newStatus,
            lastUpdated: 'Just now',
            simulatedVehicle: isNowOccupied ? (slot.simulatedVehicle || 'Demo Vehicle') : undefined,
          };
        }
        return slot;
      })
    );
    showToast(`Slot ${id} status updated to ${newStatus}.`);
  };

  // Handler: Update slot details from modal
  const handleUpdateSlot = (updated: ParkingSlot) => {
    setSlots((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    showToast(`Slot ${updated.id} specifications updated.`);
  };

  // Handler: Batch update from simulation panel
  const handleBatchUpdate = (updatedSlots: ParkingSlot[]) => {
    setSlots(updatedSlots);
  };

  // Handler: Reset demo data
  const handleResetDemo = () => {
    setSlots(getInitialSlots());
    setSearchQuery('');
    setStatusFilter('All');
    setZoneFilter('All');
    setTypeFilter('All');
    showToast('Demo data restored to initial state.');
  };

  // Handler: Reset search and filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setZoneFilter('All');
    setTypeFilter('All');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-teal-500 selection:text-slate-950">
      {/* 1. Academic Demo Notice Banner */}
      <DemoNoticeBanner />

      {/* 2. Top Header Navigation (Top Bar Contract) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetDemo={handleResetDemo}
      />

      {/* 3. Main Application Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Metric Cards (always accessible at the top of Bay View, Directory, or Simulation) */}
        {activeTab !== 'about' && (
          <MetricCards
            stats={stats}
            onFilterByStatus={(st) => {
              setStatusFilter(st);
              if (activeTab === 'simulation') setActiveTab('dashboard');
            }}
            activeStatusFilter={statusFilter}
          />
        )}

        {/* Tab Content: Bay View / Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <ControlsBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              zoneFilter={zoneFilter}
              setZoneFilter={setZoneFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              viewMode={viewMode}
              setViewMode={setViewMode}
              stats={stats}
              onResetFilters={handleResetFilters}
              onResetDemo={handleResetDemo}
            />

            {viewMode === 'grid' ? (
              <ParkingLotGrid
                slots={filteredSlots}
                onStatusChange={handleStatusChange}
                onOpenDetails={(slot) => setSelectedSlot(slot)}
                searchQuery={searchQuery}
                statusFilter={statusFilter}
                zoneFilter={zoneFilter}
                typeFilter={typeFilter}
                onResetFilters={handleResetFilters}
                groupByZone={groupByZone}
                setGroupByZone={setGroupByZone}
              />
            ) : (
              <ParkingTableView
                slots={filteredSlots}
                onStatusChange={handleStatusChange}
                onOpenDetails={(slot) => setSelectedSlot(slot)}
                searchQuery={searchQuery}
                statusFilter={statusFilter}
                zoneFilter={zoneFilter}
                typeFilter={typeFilter}
                onResetFilters={handleResetFilters}
              />
            )}
          </div>
        )}

        {/* Tab Content: Slot Directory (Table Mode) */}
        {activeTab === 'table' && (
          <div className="space-y-6">
            <ControlsBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              zoneFilter={zoneFilter}
              setZoneFilter={setZoneFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              viewMode="table"
              setViewMode={(m) => {
                if (m === 'grid') setActiveTab('dashboard');
              }}
              stats={stats}
              onResetFilters={handleResetFilters}
              onResetDemo={handleResetDemo}
            />

            <ParkingTableView
              slots={filteredSlots}
              onStatusChange={handleStatusChange}
              onOpenDetails={(slot) => setSelectedSlot(slot)}
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              zoneFilter={zoneFilter}
              typeFilter={typeFilter}
              onResetFilters={handleResetFilters}
            />
          </div>
        )}

        {/* Tab Content: Simulation Tools */}
        {activeTab === 'simulation' && (
          <SimulationPanel
            slots={slots}
            onBatchUpdate={handleBatchUpdate}
            onSingleSlotChange={handleStatusChange}
            onResetDemo={handleResetDemo}
          />
        )}

        {/* Tab Content: About Project */}
        {activeTab === 'about' && <AboutSection />}
      </main>

      {/* 4. Slot Inspection & Edit Modal */}
      <SlotDetailModal
        slot={selectedSlot}
        onClose={() => setSelectedSlot(null)}
        onUpdateSlot={handleUpdateSlot}
      />

      {/* 5. Floating Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-teal-500/80 text-white shadow-xl text-xs sm:text-sm animate-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 6. Professional Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">
              AI-Based Smart Parking Slot Assistant
            </span>
            <span aria-hidden="true">·</span>
            <span>Academic Demonstration Prototype</span>
          </div>
          <div className="text-slate-400">
            Concept based on real personal observations · Powered by simulated sample data
          </div>
        </div>
      </footer>
    </div>
  );
}
