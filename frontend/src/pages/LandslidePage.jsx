import React from 'react';

const LandslidePage = ({ data, onChange }) => {
  const fields = ["latitude", "longitude", "distance", "population"];
  
  const labels = {
    latitude: "Latitude",
    longitude: "Longitude",
    distance: "Distance (km)",
    population: "Population Density",
  };

  return (
    <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {fields.map((f) => (
        <div key={f} className="group">
          <label className="text-[8px] font-black uppercase text-white/50 ml-1 block mb-1 tracking-widest group-focus-within:text-emerald-400 transition-colors">
            {labels[f]}
          </label>
          <input
            type="number"
            step="0.0001"
            value={data[f]}
            onChange={(e) => onChange(f, e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:bg-black/30 focus:border-emerald-500/50 transition-all"
            placeholder="0.0"
          />
        </div>
      ))}

      {/* Categorical Input: Landslide Size */}
      <div className="group">
        <label className="text-[8px] font-black uppercase text-white/50 ml-1 block mb-1 tracking-widest">Size</label>
        <select 
          value={data.landslide_size}
          onChange={(e) => onChange("landslide_size", e.target.value)}
          className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-emerald-500/50 appearance-none cursor-pointer"
        >
          <option value="small" className="bg-slate-900">Small</option>
          <option value="medium" className="bg-slate-900">Medium</option>
          <option value="large" className="bg-slate-900">Large</option>
          <option value="very_large" className="bg-slate-900">Very Large</option>
        </select>
      </div>

      {/* Categorical Input: Trigger */}
      <div className="group">
        <label className="text-[8px] font-black uppercase text-white/50 ml-1 block mb-1 tracking-widest">Trigger</label>
        <select 
          value={data.trigger}
          onChange={(e) => onChange("trigger", e.target.value)}
          className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-emerald-500/50 appearance-none cursor-pointer"
        >
          <option value="rain" className="bg-slate-900">Rainfall</option>
          <option value="downpour" className="bg-slate-900">Downpour</option>
          <option value="earthquake" className="bg-slate-900">Seismic</option>
          <option value="snow" className="bg-slate-900">Snowmelt</option>
          <option value="construction" className="bg-slate-900">Human Activity</option>
        </select>
      </div>
    </div>
  );
};

export default LandslidePage;