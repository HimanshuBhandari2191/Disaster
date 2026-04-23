import React from 'react';

const FloodPage = ({ data, onChange }) => {
  // Exact keys from your input JSON
  const fields = [
    "rainfall", 
    "temperature", 
    "humidity", 
    "river_discharge", 
    "water_level", 
    "elevation", 
    "historical_floods"
  ];

  const labels = {
    rainfall: "Rainfall (mm)",
    temperature: "Temp (°C)",
    humidity: "Humidity %",
    river_discharge: "Discharge (m³/s)",
    water_level: "Water Level (m)",
    elevation: "Elevation (m)",
    historical_floods: "Hist. Events"
  };

  return (
    <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {fields.map((f) => (
        <div key={f} className="group">
          <label className="text-[8px] font-black uppercase text-white/50 ml-1 block mb-1 tracking-widest group-focus-within:text-blue-400 transition-colors">
            {labels[f]}
          </label>
          <input
            type="number"
            value={data[f]}
            onChange={(e) => onChange(f, e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:bg-black/30 focus:border-blue-500/50 transition-all"
            placeholder="0.0"
          />
        </div>
      ))}
    </div>
  );
};

export default FloodPage;