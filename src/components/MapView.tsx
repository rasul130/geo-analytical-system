import { MapPin, Waves } from 'lucide-react';

interface MapViewProps {
  latitude: number;
  longitude: number;
}

export function MapView({ latitude, longitude }: MapViewProps) {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.05},${latitude - 0.05},${longitude + 0.05},${latitude + 0.05}&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500 via-blue-500 to-teal-600 rounded-2xl opacity-30 blur-xl"></div>

      <div className="glass-morphism rounded-2xl p-6 relative backdrop-blur-xl border border-white/40">
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div className="absolute inset-1 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-lg font-bold gradient-text">Location Map</h3>
              <p className="text-xs text-gray-500">Terrain & Water Features</p>
            </div>
          </div>

          <div className="relative w-full h-80 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl overflow-hidden border border-white/50 shadow-inner card-glow">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              src={mapUrl}
              className="border-0"
              title="Location Map"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/10 to-transparent rounded-xl"></div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/40 rounded-lg backdrop-blur">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Coordinates</p>
                <p className="text-sm font-mono text-gray-800">{latitude.toFixed(4)}° × {longitude.toFixed(4)}°</p>
              </div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
              <Waves className="w-4 h-4 text-cyan-600 flex-shrink-0" />
              <p className="text-xs text-cyan-700">Water features and rivers displayed on map</p>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4 italic">
            Interactive map with terrain and hydrological data
          </p>
        </div>
      </div>
    </div>
  );
}
