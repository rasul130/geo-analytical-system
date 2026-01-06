import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AnalysisResult {
  id?: string;
  latitude: number;
  longitude: number;
  aqi: number;
  ground_stability: string;
  flood_risk: string;
  earthquake_risk: string;
  tsunami_risk: string;
  landslide_risk: string;
  land_cost: number;
  created_at?: string;
}

export async function saveAnalysis(analysis: AnalysisResult) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Must be authenticated to save analysis');
  }

  const { data, error } = await supabase
    .from('analysis_history')
    .insert(analysis)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getAnalysisHistory(limit = 10) {
  const { data, error } = await supabase
    .from('analysis_history')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
