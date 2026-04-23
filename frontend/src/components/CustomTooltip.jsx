import React from "react";

/**
 * Custom Tooltip for Recharts
 * Styled with a glassmorphism effect to match the Sentinel Dashboard
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/90 border border-indigo-500/50 p-4 rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header / Time Label */}
        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 border-b border-white/10 pb-1">
          Timeline: {label}
        </p>
        
        <div className="space-y-1.5">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-8">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                {entry.name === "risk" ? "Risk Probability" : entry.name}
              </span>
              <span className="text-sm font-black text-white tracking-tighter">
                {entry.value.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>

        {/* Status Indicator */}
        <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${payload[0].value > 70 ? 'bg-red-500' : 'bg-emerald-500'}`} />
          <span className="text-[8px] font-black uppercase text-slate-500 tracking-tighter">
            {payload[0].value > 70 ? 'High Variance' : 'Stable Pattern'}
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;