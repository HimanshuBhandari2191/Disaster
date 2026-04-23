import React from 'react';

const EarthquakePage = ({ data, onChange }) => {
  const fields = ["latitude", "longitude", "depth", "magnitude"];
  
  // Mapping display labels for better readability
  const labels = {
    latitude: "Latitude",
    longitude: "Longitude",
    depth: "Depth (km)",
    magnitude: "Magnitude (Mw)"
  };

  return (
    <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {fields.map((f) => (
        <div key={f} className="group">
          <label className="text-[8px] font-black uppercase text-white/50 ml-1 block mb-1 tracking-widest group-focus-within:text-indigo-400 transition-colors">
            {labels[f]}
          </label>
          <input
            type="number"
            step="0.1"
            value={data[f]}
            onChange={(e) => onChange(f, e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:bg-black/30 focus:border-indigo-500/50 transition-all placeholder:opacity-20"
            placeholder="0.0"
          />
        </div>
      ))}
    </div>
  );
};

export default EarthquakePage;