import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { CoordinateInput } from './components/CoordinateInput';
import { AnalysisResults } from './components/AnalysisResults';
import { MapView } from './components/MapView';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { analyzeLocation } from './utils/geoAnalytics';
import { saveAnalysis, AnalysisResult } from './lib/supabase';

interface AnalysisData {
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
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const { user, signOut } = useAuth();

  const handleAnalyze = async (lat: number, lon: number) => {
    setIsLoading(true);
    setError('');
    setAnalysisData(null);

    try {
      const result = analyzeLocation(lat, lon);

      await saveAnalysis(result.analysis);

      setCurrentLocation({ lat, lon });
      setAnalysisData(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Analysis failed. Please try again.';
      setError(message);
      console.error('Analysis failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setAnalysisData(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-16">
          <div className="text-center flex-1">
            <h1 className="text-5xl font-bold gradient-text mb-3">Geo-Analytical Intelligence</h1>
            <p className="text-gray-300 text-lg">Advanced territory analysis powered by geospatial data</p>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Signed in as</p>
                <p className="text-sm font-semibold text-white">{user.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-lg hover:bg-red-500/30 transition text-red-300"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-12">
          <CoordinateInput onAnalyze={handleAnalyze} isLoading={isLoading} />

          {error && (
            <div className="w-full max-w-md text-red-400 text-sm bg-red-500/10 border border-red-500/30 p-4 rounded-xl backdrop-blur">
              {error}
            </div>
          )}

          {currentLocation && !isLoading && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <MapView latitude={currentLocation.lat} longitude={currentLocation.lon} />
            </div>
          )}
        </div>
      </div>

      {analysisData && (
        <AnalysisResults
          analysis={analysisData.analysis}
          urbanPlanning={analysisData.urbanPlanning}
          economicProspects={analysisData.economicProspects}
          climateForecast={analysisData.climateForecast}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

function AuthPage() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold gradient-text mb-3">Geo-Analytical Intelligence</h1>
          <p className="text-gray-300 text-lg">Advanced territory analysis powered by geospatial data</p>
        </div>

        <div className="flex flex-col items-center gap-8">
          {showSignUp ? (
            <SignUp onSwitchToLogin={() => setShowSignUp(false)} />
          ) : (
            <Login onSwitchToSignUp={() => setShowSignUp(true)} />
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <AppContent /> : <AuthPage />;
}

export default App;
