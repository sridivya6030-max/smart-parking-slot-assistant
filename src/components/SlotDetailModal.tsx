import { useState } from 'react';
import { X, CheckCircle2, Car, HelpCircle, Zap, Accessibility, Clock, MapPin, Cpu } from 'lucide-react';
import { ParkingSlot, ParkingStatus, SlotType } from '../types/parking';

interface SlotDetailModalProps {
  slot: ParkingSlot | null;
  onClose: () => void;
  onUpdateSlot: (updated: ParkingSlot) => void;
}

export default function SlotDetailModal({
  slot,
  onClose,
  onUpdateSlot,
}: SlotDetailModalProps) {
  if (!slot) return null;

  const [notes, setNotes] = useState(slot.notes);
  const [vehicle, setVehicle] = useState(slot.simulatedVehicle || '');
  const [selectedStatus, setSelectedStatus] = useState<ParkingStatus>(slot.status);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSlot({
      ...slot,
      status: selectedStatus,
      notes: notes.trim() || 'No additional notes provided.',
      simulatedVehicle: selectedStatus === 'Occupied' ? (vehicle.trim() || 'Vehicle (Demo)') : undefined,
      lastUpdated: 'Just now',
    });
    onClose();
  };

  const handleQuickStatus = (newStatus: ParkingStatus) => {
    setSelectedStatus(newStatus);
    onUpdateSlot({
      ...slot,
      status: newStatus,
      simulatedVehicle: newStatus === 'Occupied' ? (slot.simulatedVehicle || 'Vehicle (Demo)') : undefined,
      lastUpdated: 'Just now',
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="slot-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-slate-100">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-bold text-white tracking-tight">
              {slot.id}
            </span>
            <div>
              <h2 id="slot-modal-title" className="text-sm font-semibold text-slate-200">
                Space Details & Controls
              </h2>
              <p className="text-xs text-slate-400">
                {slot.floor} · {slot.zone}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Status Selection Buttons */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Current Space Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickStatus('Available')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  selectedStatus === 'Available'
                    ? 'bg-teal-500 text-slate-950 shadow-md ring-2 ring-teal-300'
                    : 'bg-slate-800 text-teal-400 hover:bg-slate-750 border border-slate-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Available</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickStatus('Occupied')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  selectedStatus === 'Occupied'
                    ? 'bg-rose-500 text-slate-950 shadow-md ring-2 ring-rose-300'
                    : 'bg-slate-800 text-rose-400 hover:bg-slate-750 border border-slate-700'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>Occupied</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickStatus('Unknown')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  selectedStatus === 'Unknown'
                    ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-300'
                    : 'bg-slate-800 text-amber-400 hover:bg-slate-750 border border-slate-700'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Unknown</span>
              </button>
            </div>
          </div>

          {/* Slot Specifications */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-400 block mb-0.5">Bay Type</span>
              <span className="font-medium text-slate-200">{slot.type}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Zone Location</span>
              <span className="font-medium text-slate-200">{slot.zone}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Floor Level</span>
              <span className="font-medium text-slate-200">{slot.floor}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Last Status Update</span>
              <span className="font-mono text-slate-200">{slot.lastUpdated}</span>
            </div>
          </div>

          {/* Simulated AI Vision Explanation */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-teal-300 font-semibold">
              <Cpu className="w-4 h-4 text-teal-400" />
              <span>Simulated AI Vision Analysis (Concept)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              In a full computer-vision deployment, an edge camera would map slot <span className="font-mono text-teal-300 font-bold">{slot.id}</span> to a fixed 4-corner polygon coordinate and feed frames through an object detector (e.g. YOLO/SSD).
            </p>
            <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-700/60 text-[11px]">
              <span>Simulated Classification Confidence:</span>
              <span className="font-mono text-teal-300 font-semibold">
                {slot.aiDetectionConfidence || 95}%
              </span>
            </div>
          </div>

          {/* Form to edit notes and simulated vehicle */}
          <form onSubmit={handleSave} className="space-y-4">
            {selectedStatus === 'Occupied' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Parked Vehicle Description (Demo)
                </label>
                <input
                  type="text"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  placeholder="e.g., White Sedan, Compact EV"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Space Notes / Obstruction Observations
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about camera visibility, pillar obstructions, or charger status..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-400"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors cursor-pointer font-semibold"
              >
                Save Space Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
