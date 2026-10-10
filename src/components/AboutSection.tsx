import { AlertTriangle, BookOpen, CheckCircle, Cpu, Eye, ShieldCheck, HelpCircle, Terminal } from 'lucide-react';

export default function AboutSection() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2">
      {/* Overview Card with Architectural Concept Visual */}
      <section className="bg-slate-800/80 border border-slate-700/80 rounded-xl overflow-hidden space-y-4">
        <div className="relative aspect-video w-full bg-slate-900 overflow-hidden border-b border-slate-700/80">
          <img
            src="/src/assets/images/smart_parking_aerial_1791658067014.jpg"
            alt="Conceptual 3D architectural model of an organized university parking structure with demarcated bays and EV charging"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold text-white">Conceptual University Facility Layout</span>
            <span className="text-[11px] bg-slate-900/80 border border-slate-700 px-2 py-0.5 rounded text-teal-300">
              Prototype Reference Architecture
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-3 pt-2">
          <div className="flex items-center gap-2 text-teal-400">
            <BookOpen className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              About the Project: AI-Based Smart Parking Slot Assistant
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            This project is an educational, interactive frontend prototype designed to address personal observations of vehicle parking congestion on campus and in community lots. It visualizes parking slot availability in real time, organizes spaces by zones, and provides immediate dashboard counters for drivers and administrators.
          </p>
        </div>
      </section>

      {/* 5 Core Pillars: Problem, Solution, Benefits, Limitations, Future */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. The Observed Problem */}
        <section className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 space-y-2.5">
          <h3 className="text-sm sm:text-base font-semibold text-rose-300 flex items-center gap-2">
            <span>01. Personally Observed Problem</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            During peak arrival hours on campus, drivers spend 15 to 25 minutes circling crowded parking lanes searching for vacant spots. Because there is no external visibility into slot occupancy before entering the lot:
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
            <li>Drivers burn unnecessary fuel and cause avoidable vehicle emissions.</li>
            <li>Entry and exit aisles bottleneck, creating congestion and delayed morning classes.</li>
            <li>Uncertainty leads to frustration and illegal parking along fire lanes or curbs.</li>
          </ul>
        </section>

        {/* 2. Proposed Solution */}
        <section className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 space-y-2.5">
          <h3 className="text-sm sm:text-base font-semibold text-teal-300 flex items-center gap-2">
            <span>02. Proposed Prototype Solution</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            A centralized, visual slot availability assistant that gives drivers and facility managers a bird’s-eye view of every parking bay before they enter the lanes:
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
            <li>Instant categorization into Available, Occupied, and Unknown states.</li>
            <li>Immediate automatic recalculation of total lot capacity and percentages.</li>
            <li>Zone-specific filtering (North Gate, Academic Wing, EV & Accessible bays).</li>
            <li>Searchable directory to look up specific slot IDs (e.g., P01, P12).</li>
          </ul>
        </section>

        {/* 3. Key Benefits */}
        <section className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 space-y-2.5">
          <h3 className="text-sm sm:text-base font-semibold text-emerald-300 flex items-center gap-2">
            <span>03. Measurable Benefits</span>
          </h3>
          <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
            <li>
              <strong className="text-slate-200">Reduced Search Time:</strong> Drivers navigate straight to open zones rather than aimlessly patrolling aisles.
            </li>
            <li>
              <strong className="text-slate-200">Lower Campus Carbon Footprint:</strong> Eliminates excessive idling and slow-speed cruising in parking areas.
            </li>
            <li>
              <strong className="text-slate-200">Zero Proprietary Hardware Cost (Prototype):</strong> Runs on standard web browsers with responsive mobile support, requiring no specialized hardware for the presentation demonstration.
            </li>
          </ul>
        </section>

        {/* 4. Academic Limitations */}
        <section className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 space-y-2.5">
          <h3 className="text-sm sm:text-base font-semibold text-amber-300 flex items-center gap-2">
            <span>04. Academic Honesty & Limitations</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            To maintain academic integrity during evaluation and peer review:
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
            <li>
              <strong>No Live Sensors:</strong> This prototype is NOT connected to physical ultrasonic sensors, geomagnetic ground loops, or active CCTV feeds.
            </li>
            <li>
              <strong>Sample Data:</strong> All slot numbers and occupancy states are simulated demonstration values.
            </li>
            <li>
              <strong>Not Deployed:</strong> This application has not been deployed at a commercial or campus parking facility.
            </li>
          </ul>
        </section>
      </div>

      {/* Deep-Dive: AI & Computer Vision as Future Work */}
      <section className="bg-slate-800/80 border border-teal-500/30 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 text-teal-300">
          <Cpu className="w-5 h-5 text-teal-400" />
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            How AI & Computer Vision Fit in Future Phases
          </h3>
        </div>
        <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
          <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/80 text-amber-300 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="text-xs">
              <strong>Important Technical Clarification:</strong> A visual dashboard using manually updated or scripted sample data is <em>not itself automatic AI detection</em>. True AI detection requires an end-to-end computer vision pipeline, which is outlined below as the proposed future improvement roadmap.
            </p>
          </div>

          <h4 className="font-semibold text-slate-200 text-sm">Proposed Future Computer Vision Architecture:</h4>
          <div className="grid sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="font-mono text-teal-400 font-bold text-xs block">Step 1: Calibration</span>
              <p className="text-xs text-slate-400">
                Overhead cameras are mounted on light poles. Administrators define polygon regions of interest (ROIs) for slots P01 through P16 in OpenCV.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="font-mono text-teal-400 font-bold text-xs block">Step 2: Inference</span>
              <p className="text-xs text-slate-400">
                A lightweight deep-learning model (such as YOLOv8-nano or MobileNet-SSD) runs on an edge device (e.g., Raspberry Pi 5 or NVIDIA Jetson Nano) to detect vehicles.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="font-mono text-teal-400 font-bold text-xs block">Step 3: State Sync</span>
              <p className="text-xs text-slate-400">
                The edge device calculates IoU (Intersection over Union) with bay polygons and posts JSON updates via REST API or WebSocket to this dashboard.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-700/60">
            <h4 className="font-semibold text-slate-200 text-sm mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              Privacy & Ethical Considerations for Future Camera Deployment
            </h4>
            <p className="text-xs text-slate-400">
              Deploying real cameras requires campus administrative authorization and strict privacy compliance. In Phase 2, privacy safeguards must include:
            </p>
            <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4 mt-1.5">
              <li><strong>Local On-Device Inference:</strong> Video frames are processed in RAM on the edge device and immediately discarded rather than stored in the cloud.</li>
              <li><strong>Automatic Anonymization:</strong> License plates and pedestrian faces must be blurred in edge preprocessing before any telemetry leaves the camera.</li>
              <li><strong>Physical Privacy Notices:</strong> Clear regulatory signage informing motorists that parking slot occupancy is optically monitored without personal identification.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* College Presentation Quick Explainer (Suitable for 2nd Year Student) */}
      <section className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 text-slate-200">
          <Terminal className="w-5 h-5 text-teal-400" />
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Second-Year College Technical Defense Guide
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          If an examiner or professor asks questions during your evaluation, here are clear, honest technical answers:
        </p>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
            <p className="font-semibold text-teal-300 mb-1">
              Q1: "How does the React frontend maintain counts in real time?"
            </p>
            <p className="text-slate-300 text-xs">
              <strong>Answer:</strong> The application uses single-source-of-truth React state (<code className="text-teal-300 font-mono">useState&lt;ParkingSlot[]&gt;</code>). When any slot status changes (e.g. from Available to Occupied), React triggers a re-render. A derived computation (<code className="text-teal-300 font-mono">useMemo</code>) immediately recalculates total available, occupied, and unknown slots in O(N) linear time, updating all dashboard cards and the occupancy progress bar instantly without latency.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
            <p className="font-semibold text-teal-300 mb-1">
              Q2: "Why did you include an 'Unknown' status in addition to Available and Occupied?"
            </p>
            <p className="text-slate-300 text-xs">
              <strong>Answer:</strong> Real-world sensing systems frequently experience environmental noise (sun glare on lenses, heavy rain, tall delivery vans blocking camera sightlines, or dirty sensor covers). A binary [Empty/Full] model fails when the sensor is uncertain. The 'Unknown' status demonstrates robust fault tolerance—alerting lot attendants to verify the spot without misdirecting a driver.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
            <p className="font-semibold text-teal-300 mb-1">
              Q3: "If this were connected to real cameras in the future, what changes in the code?"
            </p>
            <p className="text-slate-300 text-xs">
              <strong>Answer:</strong> The component architecture remains completely identical! Only the data ingestion layer changes: instead of reading from initial state, a <code className="text-teal-300 font-mono">useEffect</code> hook or WebSocket listener would receive messages from a backend server running the computer-vision model (e.g., <code className="text-teal-300 font-mono">{`{ slotId: "P01", status: "Occupied", confidence: 0.98 }`}</code>) and invoke the same state update handler.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
