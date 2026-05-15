import { useState } from "react";
import Sidebar from "../components/Sidebar";
import NotesList from "../components/NotesList";
import Editor from "../components/Editor";

function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-950 text-white overflow-hidden font-sans relative">
      
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-900 border-b border-white/10 z-50 shrink-0 shadow-md">
        <div className="flex flex-col">
  <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 leading-tight">
    Memex AI
  </h1>
  <p className="text-[10px] text-slate-400/80 font-medium tracking-wide uppercase mt-0.5">
    Turn chaos into clarity.
  </p>
</div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-slate-300 hover:text-white transition-colors"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
          </svg>
        </button>
      </div>

      <div 
        className={`
          absolute md:relative z-40 h-[calc(100vh-65px)] top-[65px] md:top-0 md:h-full w-[280px] shrink-0
          transition-transform duration-300 ease-in-out bg-gray-950 md:bg-transparent
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <Sidebar />
      </div>

      {isMobileMenuOpen && (
        <div 
          className="absolute inset-0 bg-black/60 z-30 md:hidden top-[65px] backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden relative z-10">
  {/* On mobile: standard height, allows scrolling. On desktop: fixed width, full height */}
  <div className="w-full min-h-[300px] md:h-full md:w-[360px] shrink-0 border-b md:border-b-0 md:border-r border-white/10 bg-gray-950/60">
    <NotesList />
  </div>

  {/* On mobile: takes remaining space, allows scrolling. On desktop: flex-1 full height */}
  <div className="w-full md:h-full flex-1 bg-gray-950/30">
    <Editor />
  </div>
</div>
    </div>
  );
}

export default DashboardPage;