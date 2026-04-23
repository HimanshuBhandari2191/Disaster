import React from 'react';

const WildFirePage = ({ data, onChange }) => {
  const fields = ["latitude", "longitude", "sea_distance", "NDVI", "SoilMoisture", "dew_point_weekly_mean", "average_temperature_weekly_mean"];
  const labels = { sea_distance: "Coast Dist.", NDVI: "NDVI Index", SoilMoisture: "Soil Hum.", dew_point_weekly_mean: "Dew Point", average_temperature_weekly_mean: "Avg Temp" };
  return (
    <div className="grid grid-cols-2 gap-3">
      {fields.map(f => (
        <div key={f}>
          <label className="text-[8px] font-black uppercase text-white/50 ml-1 block mb-1">{labels[f] || f}</label>
          <input type="number" value={data[f]} onChange={(e) => onChange(f, e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none" />
        </div>
      ))}
    </div>
  );
};

export default WildFirePage;