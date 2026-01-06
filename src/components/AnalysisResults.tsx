import {
  AlertTriangle,
  Wind,
  Droplets,
  Mountain,
  Waves,
  DollarSign,
  TrendingUp,
  Thermometer,
  Cloud,
  Building2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X
} from 'lucide-react';
import { AnalysisResult } from '../lib/supabase';

interface AnalysisResultsProps {
  analysis: AnalysisResult;
  urbanPlanning: {
    optimal: string[];
    dangerous: string[];
    avoid: string[];
    reasons: string[];
  };
  economicProspects: string[];
  climateForecast: {
    temperatureTrend: string;
    humidityTrend: string;
    avgTemperature: number;
    avgHumidity: number;
    disasterTrend: string;
  };
  onClose: () => void;
}

export function AnalysisResults({
  analysis,
  urbanPlanning,
  economicProspects,
  climateForecast,
  onClose
}: AnalysisResultsProps) {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return { bg: 'bg-emerald-500/15', text: 'text-emerald-700', border: 'border-emerald-500/30' };
      case 'medium': return { bg: 'bg-amber-500/15', text: 'text-amber-700', border: 'border-amber-500/30' };
      case 'high': return { bg: 'bg-red-500/15', text: 'text-red-700', border: 'border-red-500/30' };
      default: return { bg: 'bg-gray-500/15', text: 'text-gray-700', border: 'border-gray-500/30' };
    }
  };

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { label: 'Excellent', color: 'text-emerald-700 bg-emerald-500/15 border-emerald-500/30' };
    if (aqi <= 100) return { label: 'Moderate', color: 'text-amber-700 bg-amber-500/15 border-amber-500/30' };
    return { label: 'Unhealthy', color: 'text-red-700 bg-red-500/15 border-red-500/30' };
  };

  const riskColor = getRiskColor(analysis.ground_stability);
  const aqiStatus = getAQIStatus(analysis.aqi);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="relative w-full max-w-4xl my-8">
        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-600 rounded-3xl opacity-20 blur-2xl"></div>

        <div className="glass-morphism-dark rounded-3xl overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl -z-10"></div>

          <div className="relative">
            <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border-b border-white/20 px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-1">Territory Analysis Complete</h2>
                <p className="text-sm text-gray-600">Comprehensive geospatial intelligence report</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-8 max-h-[calc(100vh-240px)] overflow-y-auto space-y-8">
              <div className="bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 border border-blue-500/30 rounded-2xl p-5 backdrop-blur-sm">
                <p className="text-sm text-gray-600 font-medium">ANALYZED COORDINATES</p>
                <p className="text-lg font-mono font-bold text-blue-700 mt-2">
                  {analysis.latitude.toFixed(4)}° N × {analysis.longitude.toFixed(4)}° E
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <Wind className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-800">Environmental & Natural Factors</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className={`${aqiStatus.color} border rounded-2xl p-5 backdrop-blur-sm card-hover transition-all`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Wind className="w-5 h-5" />
                        <span className="font-semibold text-sm">Air Quality</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-xs font-bold">{analysis.aqi}</span>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{analysis.aqi}</p>
                    <p className="text-xs mt-2 opacity-75">{aqiStatus.label}</p>
                  </div>

                  <div className={`${getRiskColor(analysis.ground_stability).bg} border ${getRiskColor(analysis.ground_stability).border} rounded-2xl p-5 backdrop-blur-sm card-hover`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Mountain className="w-5 h-5" />
                      <span className="font-semibold text-sm">Ground Stability</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{analysis.ground_stability}</p>
                    <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full w-${analysis.ground_stability === 'High' ? '3/4' : analysis.ground_stability === 'Medium' ? '1/2' : '1/4'} ${riskColor.text.replace('text-', 'bg-')}`}></div>
                    </div>
                  </div>

                  <div className={`${getRiskColor(analysis.flood_risk).bg} border ${getRiskColor(analysis.flood_risk).border} rounded-2xl p-5 backdrop-blur-sm card-hover`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Droplets className="w-5 h-5" />
                      <span className="font-semibold text-sm">Flood Risk</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{analysis.flood_risk}</p>
                  </div>

                  <div className={`${getRiskColor(analysis.earthquake_risk).bg} border ${getRiskColor(analysis.earthquake_risk).border} rounded-2xl p-5 backdrop-blur-sm card-hover`}>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-semibold text-sm">Earthquake Risk</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{analysis.earthquake_risk}</p>
                  </div>

                  <div className={`${getRiskColor(analysis.tsunami_risk).bg} border ${getRiskColor(analysis.tsunami_risk).border} rounded-2xl p-5 backdrop-blur-sm card-hover`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Waves className="w-5 h-5" />
                      <span className="font-semibold text-sm">Tsunami Risk</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{analysis.tsunami_risk}</p>
                  </div>

                  <div className={`${getRiskColor(analysis.landslide_risk).bg} border ${getRiskColor(analysis.landslide_risk).border} rounded-2xl p-5 backdrop-blur-sm card-hover`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Mountain className="w-5 h-5" />
                      <span className="font-semibold text-sm">Landslide Risk</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{analysis.landslide_risk}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-800">Urban Planning Recommendations</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {urbanPlanning.optimal.length > 0 && (
                    <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-5 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span className="font-bold text-emerald-900">Optimal Locations</span>
                      </div>
                      <ul className="space-y-2">
                        {urbanPlanning.optimal.map((item, idx) => (
                          <li key={idx} className="text-sm text-emerald-800 flex items-start gap-2">
                            <span className="text-emerald-600 mt-0.5">▸</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {urbanPlanning.dangerous.length > 0 && (
                    <div className="bg-amber-500/15 border border-amber-500/30 rounded-2xl p-5 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                        <span className="font-bold text-amber-900">Dangerous Areas</span>
                      </div>
                      <ul className="space-y-2">
                        {urbanPlanning.dangerous.map((item, idx) => (
                          <li key={idx} className="text-sm text-amber-800 flex items-start gap-2">
                            <span className="text-amber-600 mt-0.5">▸</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {urbanPlanning.avoid.length > 0 && (
                    <div className="bg-red-500/15 border border-red-500/30 rounded-2xl p-5 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="font-bold text-red-900">Areas to Avoid</span>
                      </div>
                      <ul className="space-y-2">
                        {urbanPlanning.avoid.map((item, idx) => (
                          <li key={idx} className="text-sm text-red-800 flex items-start gap-2">
                            <span className="text-red-600 mt-0.5">▸</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {urbanPlanning.reasons.length > 0 && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-5 backdrop-blur-sm mt-4">
                    <h4 className="font-bold text-blue-900 mb-3 text-sm">KEY CONSIDERATIONS</h4>
                    <ul className="space-y-2">
                      {urbanPlanning.reasons.map((reason, idx) => (
                        <li key={idx} className="text-sm text-blue-800 flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">→</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-800">Economic Factors</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-500/15 to-cyan-500/15 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-gray-800">Estimated Land Cost</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        ${(analysis.land_cost / 1000).toFixed(0)}K
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-blue-700">
                      ${analysis.land_cost.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600 mt-2">per acre</p>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-500/15 to-teal-500/15 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                      <span className="font-semibold text-gray-800">Development Prospects</span>
                    </div>
                    <ul className="space-y-2">
                      {economicProspects.map((prospect, idx) => (
                        <li key={idx} className="text-sm text-emerald-800 flex items-start gap-2">
                          <span className="text-emerald-600 mt-0.5">✓</span>
                          <span>{prospect}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <Cloud className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-800">Climate Forecast (10 Years)</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-orange-500/15 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-sm card-hover">
                    <div className="flex items-center gap-2 mb-4">
                      <Thermometer className="w-5 h-5 text-orange-600" />
                      <span className="font-semibold text-gray-800">Temperature</span>
                    </div>
                    <p className="text-4xl font-bold text-orange-700">{climateForecast.avgTemperature}°C</p>
                    <p className="text-xs text-gray-600 mt-3">Trend: <span className="font-semibold text-orange-700">{climateForecast.temperatureTrend}</span></p>
                  </div>

                  <div className="bg-cyan-500/15 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm card-hover">
                    <div className="flex items-center gap-2 mb-4">
                      <Droplets className="w-5 h-5 text-cyan-600" />
                      <span className="font-semibold text-gray-800">Humidity</span>
                    </div>
                    <p className="text-4xl font-bold text-cyan-700">{climateForecast.avgHumidity}%</p>
                    <p className="text-xs text-gray-600 mt-3">Trend: <span className="font-semibold text-cyan-700">{climateForecast.humidityTrend}</span></p>
                  </div>

                  <div className="bg-slate-500/15 border border-slate-500/30 rounded-2xl p-6 backdrop-blur-sm md:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-5 h-5 text-slate-600" />
                      <span className="font-semibold text-gray-800">Natural Disaster Trend</span>
                    </div>
                    <p className="text-xl font-bold text-slate-700 flex items-center gap-2">
                      {climateForecast.disasterTrend === 'Increasing risk' && <span className="text-red-600">↑</span>}
                      {climateForecast.disasterTrend === 'Decreasing risk' && <span className="text-emerald-600">↓</span>}
                      {climateForecast.disasterTrend === 'Stable conditions' && <span className="text-amber-600">→</span>}
                      {climateForecast.disasterTrend}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
