import React, { useState, useEffect } from "react";
import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from "recharts";
import { Flame, Activity, Droplets, LayoutDashboard, Send, Loader2, Zap, Cpu, Mountain } from "lucide-react";
import axios from "axios";

// Modular Component Imports
import AIAnalysisSection from "./components/AIAnalysisSection";
import CustomTooltip from "./components/CustomTooltip";

// Modular Page Imports
import WildFirePage from "./pages/WildFirePage";
import EarthquakePage from "./pages/EarthquakePage";
import FloodPage from "./pages/FloodPage";
import LandslidePage from "./pages/LandslidePage";

const App = () => {
  // Navigation & UI State
  const [activeHazard, setActiveHazard] = useState("fire");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  // Global Results State
  const [results, setResults] = useState({
    fire: null,
    flood: null,
    earthquake: null,
    landslide: null,
  });

  // Chart Data State
  const [chartData, setChartData] = useState(
    Array.from({ length: 7 }, (_, i) => ({
      name: `T-${6 - i}h`,
      risk: 10 + Math.floor(Math.random() * 15),
      confidence: 85 + Math.floor(Math.random() * 10),
    }))
  );

  // Form Data State
  const [formData, setFormData] = useState({
    fire: { 
        latitude: 33.8, 
        longitude: -5.2, 
        sea_distance: 45000, 
        NDVI: 1200, 
        SoilMoisture: 8, 
        dew_point_weekly_mean: 30, 
        average_temperature_weekly_mean: 90 
    },
    earthquake: { 
        latitude: 34.05, 
        longitude: -118.24, 
        depth: 10, 
        magnitude: 4.5 
    },
    flood: { 
        rainfall: 120, 
        temperature: 10, 
        humidity: 0, 
        river_discharge: 110, 
        water_level: 18, 
        elevation: 0, 
        historical_floods: 110 
    },
    landslide: {
        latitude: 30.3165,
        longitude: 78.0322,
        distance: 4.5,
        population: 12000,
        landslide_size: "medium",
        trigger: "rain"
    }
  });

  const hazards = {
    fire: { 
        title: "Wildfire", 
        icon: <Flame size={18} />, 
        color: "from-orange-600 to-red-700",
        metricLabel: "Fire Probability"
    },
    earthquake: { 
        title: "Seismic", 
        icon: <Activity size={18} />, 
        color: "from-indigo-600 to-purple-700",
        metricLabel: "Seismic Sig"
    },
    flood: { 
        title: "Flood", 
        icon: <Droplets size={18} />, 
        color: "from-blue-600 to-cyan-700",
        metricLabel: "Hydrostatic Risk"
    },
    landslide: { 
        title: "Landslide", 
        icon: <Mountain size={18} />, 
        color: "from-emerald-600 to-teal-800",
        metricLabel: "Geologic Instability"
    },
  };

  const handleInputChange = (hazard, field, value) => {
    // Support both numeric and string (categorical) inputs
    const parsedValue = isNaN(value) || value === "" ? value : parseFloat(value);
    
    setFormData((prev) => ({
      ...prev,
      [hazard]: { ...prev[hazard], [field]: parsedValue },
    }));
  };

  const runPrediction = async (hazard) => {
    setLoading(true);
    setAiLoading(true);
    setApiError(false);

    try {
      const response = await axios.post(`http://localhost:5000/api/disaster/${hazard}`, formData[hazard]);
      const data = response.data;

      setResults((prev) => ({ ...prev, [hazard]: data }));

      let displayProb = 0;
      if (hazard === "flood") displayProb = data.flood_probability || 0;
      else if (hazard === "fire") displayProb = data.fire_probability || 0;
      else if (hazard === "earthquake") displayProb = (data.predicted_sig / 2000) || 0;
      else if (hazard === "landslide") displayProb = data.Probability || 0;

      setChartData((prev) => {
        const newData = [...prev];
        newData.shift();
        newData.push({
          name: "NOW",
          risk: parseFloat((displayProb * 100).toFixed(2)),
          confidence: data.confidence ? data.confidence * 100 : 98.2,
        });
        return newData;
      });

      setTimeout(() => setAiLoading(false), 800);
    } catch (err) {
      console.error("API Error:", err);
      setApiError(true);
      setAiLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const currentResult = results[activeHazard];
  
  const getDisplayPercentage = () => {
    if (!currentResult) return "0.00%";
    if (activeHazard === "flood") return `${(currentResult.flood_probability * 100).toFixed(2)}%`;
    if (activeHazard === "fire") return `${(currentResult.fire_probability * 100).toFixed(2)}%`;
    if (activeHazard === "landslide") return `${(currentResult.Probability * 100).toFixed(2)}%`;
    if (activeHazard === "earthquake") return currentResult.predicted_sig?.toFixed(2) || "0.00";
    return "0.00%";
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex font-sans overflow-hidden">
      {/* SIDEBAR NAVIGATION */}
      <aside className="fixed left-0 top-0 h-full w-20 lg:w-64 bg-slate-950/80 border-r border-slate-900 flex flex-col p-4 z-50 backdrop-blur-xl">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-600/20">
            <LayoutDashboard size={20} className="text-white" />
          </div>
          <div className="hidden lg:block">
            <h2 className="font-black text-xs text-white tracking-widest uppercase">Sentinel</h2>
            <p className="text-[8px] text-indigo-400 font-bold uppercase tracking-[0.2em]">Neural AI</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {Object.entries(hazards).map(([key, info]) => (
            <button
              key={key}
              onClick={() => { setActiveHazard(key); setApiError(false); }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeHazard === key 
                  ? "bg-indigo-600/10 border border-indigo-500/30 text-white" 
                  : "text-slate-600 hover:bg-white/5"
              }`}
            >
              {info.icon}
              <span className="hidden lg:block font-bold text-[10px] uppercase tracking-wider">{info.title}</span>
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-white/5">
            <div className="bg-indigo-500/5 p-3 rounded-xl border border-indigo-500/10">
                <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Status</p>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-emerald-500 uppercase">System Online</span>
                </div>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-20 lg:ml-64 h-screen overflow-y-auto bg-[#020617] custom-scrollbar">
        <div className="p-6 lg:p-10 max-w-[1400px] mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">
                Predictive <span className="text-indigo-500">Forensics</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Telemetry Analysis Engine v2.0</p>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* INPUT PANEL */}
                <section className={`p-6 rounded-[2.5rem] bg-gradient-to-br ${hazards[activeHazard].color} shadow-xl relative overflow-hidden`}>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="p-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20">{hazards[activeHazard].icon}</span>
                      <h2 className="text-sm font-black uppercase text-white tracking-widest">Input Parameters</h2>
                    </div>

                    {/* Dynamic Page Rendering */}
                    {activeHazard === "fire" && <WildFirePage data={formData.fire} onChange={(f, v) => handleInputChange("fire", f, v)} />}
                    {activeHazard === "earthquake" && <EarthquakePage data={formData.earthquake} onChange={(f, v) => handleInputChange("earthquake", f, v)} />}
                    {activeHazard === "flood" && <FloodPage data={formData.flood} onChange={(f, v) => handleInputChange("flood", f, v)} />}
                    {activeHazard === "landslide" && <LandslidePage data={formData.landslide} onChange={(f, v) => handleInputChange("landslide", f, v)} />}

                    <button
                      onClick={() => runPrediction(activeHazard)}
                      disabled={loading}
                      className="w-full mt-6 bg-white text-slate-950 text-[10px] font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 active:scale-95 transition-all disabled:opacity-50 uppercase tracking-widest"
                    >
                      {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                      {loading ? "Processing..." : "Execute Analysis"}
                    </button>
                  </div>
                </section>

                {/* RESULTS SUMMARY CARD */}
                <div className="flex flex-col gap-4">
                  <div className="flex-1 bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />
                    
                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-2">{hazards[activeHazard].metricLabel}</p>
                    <p className="text-6xl font-black text-white tracking-tighter">
                      {getDisplayPercentage()}
                    </p>
                    
                    {(currentResult?.prediction === 1 || currentResult?.Prediction === 1) && (
                        <div className="mt-3 flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-lg w-fit">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                            <span className="text-[9px] font-black text-red-500 uppercase">Critical Alert</span>
                        </div>
                    )}

                    <div className="mt-6 pt-6 border-t border-white/5">
                        <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Model Confidence</p>
                        <p className="text-2xl font-black text-indigo-400 tracking-tight">
                          {currentResult ? `${(currentResult.confidence ? currentResult.confidence * 100 : 98.2).toFixed(2)}%` : "0.00%"}
                        </p>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-[1.5rem] flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
                      <Cpu size={20} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Neural Link</p>
                      <p className="text-xs font-bold text-indigo-400 uppercase">Synchronized</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* TELEMETRY CHART */}
              <section className="bg-slate-900/30 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <Zap size={14} className="text-indigo-500" /> Multi-Vector Telemetry
                  </h3>
                </div>
                
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData}>
                      <defs>
                        <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} stroke="#1e293b" opacity={0.2} />
                      <XAxis dataKey="name" stroke="#475569" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} dy={10} />
                      <YAxis stroke="#475569" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} dx={-10} domain={[0, 100]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="risk" stroke="#6366f1" strokeWidth={4} fill="url(#colorRisk)" animationDuration={1500} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </section>
            </div>

            {/* AI INTELLIGENCE FEED SECTION */}
            <div className="h-full">
              <AIAnalysisSection 
                visible={true} 
                isLoading={aiLoading} 
                aiAnalysis={currentResult?.ai_analysis || currentResult} 
                hazardType={hazards[activeHazard].title} 
                error={apiError} 
              />
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}} />
    </div>
  );
};

export default App;