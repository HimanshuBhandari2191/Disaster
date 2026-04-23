import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  Flame, Activity, Droplets, Mountain, 
  LayoutDashboard, Info, Send, ChevronRight 
} from 'lucide-react';

const App = () => {
  const [activeHazard, setActiveHazard] = useState('fire');
  const [formData, setFormData] = useState({
    fire: { month: 6, temp: 25, RH: 45, wind: 12, rain: 0 },
    earthquake: { latitude: 34.05, longitude: -118.24, depth: 10, magnitude: 4.5 },
    flood: { rainfall: 120, riverLevel: 5.2, elevation: 15, duration: 24 },
    landslide: { slopeAngle: 35, soilMoisture: 80, vegetation: 20, gravity: 9.8 }
  });

  // Mock data generation based on inputs for the "Relativity" graph
  const [chartData, setChartData] = useState([]);

  const hazards = {
    fire: {
      title: 'Wildfire Risk',
      icon: <Flame size={24} />,
      color: 'from-orange-500 to-red-600',
      shadow: 'shadow-orange-500/20',
      fields: ['month', 'temp', 'RH', 'wind', 'rain'],
      description: 'Analysis based on meteorological fire weather indices.'
    },
    earthquake: {
      title: 'Seismic Impact',
      icon: <Activity size={24} />,
      color: 'from-indigo-500 to-purple-600',
      shadow: 'shadow-indigo-500/20',
      fields: ['latitude', 'longitude', 'depth', 'magnitude'],
      description: 'Predicting structural impact based on seismic magnitude and depth.'
    },
    flood: {
      title: 'Flood Potential',
      icon: <Droplets size={24} />,
      color: 'from-blue-500 to-cyan-600',
      shadow: 'shadow-blue-500/20',
      fields: ['rainfall', 'riverLevel', 'elevation', 'duration'],
      description: 'Hydrological modeling for urban and riverine flood zones.'
    },
    landslide: {
      title: 'Landslide Stability',
      icon: <Mountain size={24} />,
      color: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/20',
      fields: ['slopeAngle', 'soilMoisture', 'vegetation', 'gravity'],
      description: 'Terrain stability assessment using slope and saturation metrics.'
    }
  };

  useEffect(() => {
    generateMockPrediction();
  }, [activeHazard, formData]);

  const generateMockPrediction = () => {
    const data = Array.from({ length: 7 }, (_, i) => ({
      name: `Day ${i + 1}`,
      risk: Math.floor(Math.random() * 40) + 30 + (i * 5),
      impact: Math.floor(Math.random() * 50) + 20
    }));
    setChartData(data);
  };

  const handleInputChange = (hazard, field, value) => {
    setFormData(prev => ({
      ...prev,
      [hazard]: { ...prev[hazard], [field]: parseFloat(value) || 0 }
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col items-center lg:items-stretch p-4 z-50">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/30">
            <LayoutDashboard size={24} className="text-white" />
          </div>
          <span className="hidden lg:block font-bold text-xl tracking-tight">SENTINEL AI</span>
        </div>

        <nav className="flex-1 space-y-2">
          {Object.entries(hazards).map(([key, info]) => (
            <button
              key={key}
              onClick={() => setActiveHazard(key)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                activeHazard === key 
                ? 'bg-slate-800 border border-slate-700 text-white shadow-lg' 
                : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'
              }`}
            >
              <div className={activeHazard === key ? 'text-indigo-400' : ''}>{info.icon}</div>
              <span className="hidden lg:block font-medium capitalize">{key}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 bg-slate-800/50 rounded-2xl hidden lg:block border border-slate-700/50">
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Info size={16} />
            <span className="text-xs font-bold uppercase">System Status</span>
          </div>
          <p className="text-[10px] text-slate-400">All prediction models active and grounded in real-time geological data.</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="pl-20 lg:pl-64 min-h-screen">
        <div className="max-w-6xl mx-auto p-6 lg:p-10">
          
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
              Hazard <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Forecasting</span>
            </h1>
            <p className="text-slate-400">Advanced AI prediction engine for environmental risk mitigation.</p>
          </header>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            
            {/* Input Section - Left Side */}
            <section className="space-y-6">
              <div className={`p-8 rounded-[2.5rem] bg-gradient-to-br ${hazards[activeHazard].color} ${hazards[activeHazard].shadow} transition-all duration-500 relative overflow-hidden group`}>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  {hazards[activeHazard].icon}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="p-2 bg-white/20 backdrop-blur-md rounded-lg">{hazards[activeHazard].icon}</span>
                    <h2 className="text-2xl font-bold uppercase tracking-wider">{hazards[activeHazard].title}</h2>
                  </div>
                  <p className="text-white/80 text-sm mb-8 leading-relaxed max-w-xs">{hazards[activeHazard].description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    {hazards[activeHazard].fields.map((field) => (
                      <div key={field} className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 ml-1">
                          {field}
                        </label>
                        <input
                          type="number"
                          value={formData[activeHazard][field]}
                          onChange={(e) => handleInputChange(activeHazard, field, e.target.value)}
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all font-mono"
                        />
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-8 bg-white text-slate-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/20">
                    <Send size={18} />
                    RUN PREDICTION
                  </button>
                </div>
              </div>

              {/* Stat Cards */}
<div className="grid grid-cols-2 gap-4">
  <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl">
    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
      {activeHazard === 'earthquake' ? 'Probability' : 'Risk Score'}
    </p>
    <p className="text-3xl font-bold text-white">
      {activeHazard === 'earthquake' 
        ? (earthquakeResult.earthquake_probability * 100).toFixed(1) 
        : "84.2"}
      <span className="text-sm text-slate-500 font-normal ml-1">%</span>
    </p>
  </div>

  <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl">
    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
      {activeHazard === 'earthquake' ? 'Risk Level' : 'Confidence'}
    </p>
    <p className={`text-3xl font-bold font-mono ${
      activeHazard === 'earthquake' && earthquakeResult.risk === 'High' 
      ? 'text-red-500' 
      : 'text-indigo-400'
    }`}>
      {activeHazard === 'earthquake' ? earthquakeResult.risk.toUpperCase() : 'HIGH'}
    </p>
  </div>

  {/* New Earthquake Specific Fields (Full Width) */}
  {activeHazard === 'earthquake' && (
    <div className="col-span-2 bg-slate-900/80 border border-slate-800 p-5 rounded-3xl flex justify-between items-center">
      <div>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Predicted Significance</p>
        <p className="text-xl font-bold text-white font-mono">{earthquakeResult.predicted_sig}</p>
      </div>
      <div className="text-right">
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Model Confidence</p>
        <p className="text-xl font-bold text-emerald-400 font-mono">{(earthquakeResult.confidence * 100).toFixed(1)}%</p>
      </div>
    </div>
  )}
</div>
</section>
            {/* Analysis Section - Right Side */}
            <section className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 lg:sticky lg:top-10 shadow-inner">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold">Relativity Analysis</h3>
                  <p className="text-xs text-slate-500">Predicted trend over 7-day window</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <span className="text-[10px] font-bold text-slate-300 uppercase">Probability</span>
                  </div>
                </div>
              </div>

              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#64748b', fontSize: 12}} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#64748b', fontSize: 12}}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="risk" 
                      stroke="#6366f1" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorRisk)" 
                      animationDuration={1500}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="impact" 
                      stroke="#ec4899" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fill="transparent"
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-800 space-y-4">
                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors">
                      <Send size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">Export Prediction Report</h4>
                      <p className="text-xs text-slate-500">Download high-res PDF analysis</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-600 group-hover:text-white transition-colors" />
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;