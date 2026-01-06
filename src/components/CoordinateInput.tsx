import { useState } from 'react';
import { MapPin, Sparkles } from 'lucide-react';

interface CoordinateInputProps {
  onAnalyze: (lat: number, lon: number) => void;
  isLoading: boolean;
}

export function CoordinateInput({ onAnalyze, isLoading }: CoordinateInputProps) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState('');
  const [focused, setFocused] = useState<'lat' | 'lon' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      setError('Please enter valid numbers');
      return;
    }

    if (lat < -90 || lat > 90) {
      setError('Latitude must be between -90 and 90');
      return;
    }

    if (lon < -180 || lon > 180) {
      setError('Longitude must be between -180 and 180');
      return;
    }

    onAnalyze(lat, lon);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 rounded-2xl opacity-20 blur-xl"></div>

      <div className="glass-morphism-dark rounded-2xl p-8 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>

        <div className="flex items-center gap-3 mb-8">
          <div className="relative">
            <MapPin className="w-8 h-8 text-blue-600" />
            <Sparkles className="w-4 h-4 text-cyan-500 absolute -top-1 -right-1 float-animation" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Geo-Analytical</h1>
            <p className="text-xs text-gray-500">Territory Intelligence System</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Latitude
            </label>
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur`}></div>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                onFocus={() => setFocused('lat')}
                onBlur={() => setFocused(null)}
                placeholder="e.g., 40.7128"
                className="relative w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition backdrop-blur placeholder-gray-400 text-gray-800"
                disabled={isLoading}
              />
              {focused === 'lat' && (
                <div className="absolute right-3 top-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Longitude
            </label>
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur`}></div>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                onFocus={() => setFocused('lon')}
                onBlur={() => setFocused(null)}
                placeholder="e.g., -74.0060"
                className="relative w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition backdrop-blur placeholder-gray-400 text-gray-800"
                disabled={isLoading}
              />
              {focused === 'lon' && (
                <div className="absolute right-3 top-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-500/10 border border-red-500/30 p-3 rounded-xl backdrop-blur">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full group mt-6"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
            <div className={`relative px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold text-white transition-all duration-300 ${
              isLoading ? 'opacity-75 scale-95' : 'group-hover:scale-105'
            }`}>
              <div className="flex items-center justify-center gap-2">
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                <span>{isLoading ? 'Analyzing...' : 'Analyze Location'}</span>
              </div>
            </div>
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          Powered by advanced geospatial intelligence
        </p>
      </div>
    </div>
  );
}
