import { useState } from 'react';
import { Mail, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  onSwitchToSignUp: () => void;
}

export function Login({ onSwitchToSignUp }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<'email' | 'password' | null>(null);
  const [emailValid, setEmailValid] = useState(false);
  const { signIn } = useAuth();

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailValid(isValid);
    setEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!emailValid) {
      setError('Please enter a valid email');
      return;
    }

    setIsLoading(true);

    try {
      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md fade-in-up">
      <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 rounded-3xl opacity-25 blur-2xl glow-pulse"></div>

      <div className="glass-morphism-dark rounded-3xl p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl -z-10 animate-pulse" style={{animationDelay: '1s'}}></div>

        <div className="mb-10 fade-in-down stagger-1">
          <div className="flex items-center gap-3 mb-2 bounce-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-lg opacity-75 glow-spin"></div>
              <Mail className="w-8 h-8 text-white relative z-10" />
            </div>
            <h1 className="text-4xl font-black gradient-text">Welcome Back</h1>
          </div>
          <p className="text-sm text-gray-400 ml-11 fade-in-left stagger-2">Access your geospatial intelligence</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2 fade-in-up stagger-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-gray-700">EMAIL</label>
              {emailValid && (
                <span className="text-xs text-emerald-500 font-semibold scale-in">✓ Valid</span>
              )}
            </div>
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-300 blur-sm ${
                emailValid ? 'opacity-100' : ''
              }`}></div>
              <input
                type="email"
                value={email}
                onChange={(e) => validateEmail(e.target.value)}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                placeholder="you@example.com"
                className="relative w-full px-5 py-3.5 bg-white/60 border border-white/40 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition backdrop-blur placeholder-gray-500 text-gray-900 font-medium hover:bg-white/70 transition-colors"
                disabled={isLoading}
              />
              {focused === 'email' && (
                <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 animate-spin" />
              )}
            </div>
          </div>

          <div className="space-y-2 fade-in-up stagger-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-gray-700">PASSWORD</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs text-gray-500 hover:text-gray-700 transition font-semibold hover:scale-110 transform"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-300 blur-sm`}></div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                placeholder="Enter your password"
                className="relative w-full px-5 py-3.5 bg-white/60 border border-white/40 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition backdrop-blur placeholder-gray-500 text-gray-900 font-medium hover:bg-white/70 transition-colors"
                disabled={isLoading}
              />
              {focused === 'password' && (
                <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500 animate-spin" />
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-4 backdrop-blur-sm fade-in-down slide-in-down">
              <p className="text-sm text-red-300 font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="relative w-full group mt-8 disabled:opacity-50 disabled:cursor-not-allowed fade-in-up stagger-4 button-ripple"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 rounded-2xl opacity-75 group-enabled:group-hover:opacity-100 transition-opacity duration-300 blur-lg group-enabled:group-hover:blur-xl"></div>
            <div className={`relative px-6 py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-2xl font-bold text-white transition-all duration-300 group-enabled:group-hover:scale-105 flex items-center justify-center gap-3 ${
              isLoading ? 'scale-95' : ''
            }`}>
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/10 fade-in-up stagger-5">
          <p className="text-sm text-gray-600 text-center mb-2">New to Geo-Analytics?</p>
          <button
            onClick={onSwitchToSignUp}
            className="w-full py-3 px-4 border-2 border-dashed border-blue-400/50 rounded-2xl text-blue-400 font-bold hover:bg-blue-500/10 transition-all duration-300 hover:border-blue-400 hover:scale-105 transform active:scale-95"
          >
            Create Account
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-2 fade-in-up stagger-5">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full bounce-in stagger-1"></div>
          <p className="text-xs text-gray-500">Secure Supabase Authentication</p>
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full bounce-in stagger-2"></div>
        </div>
      </div>
    </div>
  );
}
