import React from "react";
import { Sparkles, Clock, Cpu, Activity, Zap, ShieldAlert, History, Info } from "lucide-react";

const AIAnalysisSection = ({ visible, aiAnalysis, hazardType, isLoading, error }) => {
  if (!visible) return null;

  // 1. Loading & Error States
  if (isLoading || error || (!aiAnalysis && !isLoading)) {
    return (
      <div className="h-[550px] bg-slate-900/20 border border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center p-6 transition-all">
        {isLoading ? (
          <Cpu size={32} className="text-indigo-500 animate-spin mb-3" />
        ) : error ? (
          <ShieldAlert size={32} className="text-red-500 opacity-50 mb-3" />
        ) : (
          <Activity size={32} className="text-slate-700 mb-3" />
        )}
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">
          {isLoading ? "Neural Syncing..." : error ? "Telemetry Link Severed" : "Waiting for Data Uplink"}
        </p>
      </div>
    );
  }

  // 2. Data Normalization (Old Code Logic)
  // This handles if historical_matches are objects OR strings
  const historicalData = aiAnalysis.historical_matches?.map((item) => {
    if (typeof item === 'object') return item;
    
    const yearMatch = item.match(/\d{4}/);
    const contextMatch = item.match(/\((.*?)\)/);
    return {
      year: yearMatch ? yearMatch[0] : "—",
      event: item.split(":")[0].split(" (")[0], // Fallback title
      outcome: contextMatch ? contextMatch[1] : item.split(":")[1] || "Pattern Match"
    };
  }) || [];

  return (
    <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* --- MAIN INTELLIGENCE BOX (MEDIUM SIZE) --- */}
      <div className="bg-gradient-to-br from-[#0d1117] to-black border border-indigo-500/30 rounded-[2.5rem] p-8 relative shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/5 blur-[80px] -z-10" />
        
        {/* Header Tag */}
        <div className="absolute top-0 left-10 transform -translate-y-1/2 px-5 py-1.5 bg-indigo-600 rounded-xl flex items-center gap-2 shadow-lg">
          <Sparkles size={14} className="text-white" />
          <span className="text-[10px] font-black uppercase tracking-wider text-white">{hazardType} Intel</span>
        </div>

        <div className="mt-4">
          <div className="flex gap-2 mb-6">
            <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-[9px] font-black text-red-400 uppercase tracking-tighter">Severity: {aiAnalysis.severity || "Moderate"}</p>
            </div>
            <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
              <p className="text-[9px] font-black text-indigo-400 uppercase tracking-tighter">Level: {aiAnalysis.risk_level || "Elevated"}</p>
            </div>
          </div>

          {/* THE EXPLANATION (BIG/PRIMARY FOCUS) */}
          <div className="mb-8">
            <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2 opacity-70">
              <Zap size={12} className="fill-indigo-400" /> Executive Summary
            </h3>
            <p className="text-[15px] font-medium leading-relaxed text-slate-200 italic border-l-2 border-indigo-500/30 pl-5">
              {aiAnalysis.explanation}
            </p>
          </div>

          {/* PRECAUTIONS (COMPACT LIST) */}
          <div className="pt-6 border-t border-white/5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <h4 className="text-[8px] font-black text-red-500 uppercase mb-2 flex items-center gap-1">
                    <ShieldAlert size={10} /> Protocols
                  </h4>
                  <ul className="space-y-1.5">
                    {aiAnalysis.precautions_authorities?.slice(0, 3).map((p, i) => (
                      <li key={i} className="text-[10px] text-slate-400 flex gap-2"><span className="text-red-500">•</span>{p}</li>
                    ))}
                  </ul>
               </div>
               <div>
                  <h4 className="text-[8px] font-black text-indigo-400 uppercase mb-2 flex items-center gap-1">
                    <Info size={10} /> Civilian
                  </h4>
                  <ul className="space-y-1.5">
                    {aiAnalysis.precautions_civilians?.slice(0, 3).map((p, i) => (
                      <li key={i} className="text-[10px] text-slate-400 flex gap-2"><span className="text-indigo-500">•</span>{p}</li>
                    ))}
                  </ul>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- HISTORICAL MATCHES (MEDIUM COMPACT) --- */}
      <div className="bg-[#0a0d14]/50 border border-white/5 rounded-[2.5rem] p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-5 text-slate-500 opacity-60 px-2">
          <History size={16} />
          <h4 className="text-[9px] font-black uppercase tracking-[0.3em]">Historical Pattern Match</h4>
        </div>

        <div className="space-y-3">
          {historicalData.map((match, idx) => (
            <div key={idx} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center hover:bg-white/[0.04] transition-all group">
              <div className="flex items-center gap-4">
                <div className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-[8px] font-black rounded border border-indigo-500/10 uppercase group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  {match.year || match.magnitude || "MATCH"}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white tracking-tight leading-none mb-1">{match.event || match.title}</p>
                  <p className="text-[10px] text-slate-500 leading-tight italic line-clamp-1">{match.outcome || match.context}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisSection;