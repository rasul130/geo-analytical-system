/*
  # Geo-Analysis System Database Schema

  1. New Tables
    - `analysis_history`
      - `id` (uuid, primary key) - Unique identifier for each analysis
      - `latitude` (numeric) - Latitude coordinate
      - `longitude` (numeric) - Longitude coordinate
      - `aqi` (integer) - Air Quality Index value
      - `ground_stability` (text) - Ground stability assessment
      - `flood_risk` (text) - Flood risk level
      - `earthquake_risk` (text) - Earthquake risk level
      - `tsunami_risk` (text) - Tsunami risk level
      - `landslide_risk` (text) - Landslide risk level
      - `land_cost` (numeric) - Estimated land cost
      - `created_at` (timestamptz) - Timestamp of analysis
      
  2. Security
    - Enable RLS on `analysis_history` table
    - Add policy for public read access (anyone can view analysis history)
    - Add policy for public insert access (anyone can save analysis)
*/

CREATE TABLE IF NOT EXISTS analysis_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  aqi integer NOT NULL,
  ground_stability text NOT NULL,
  flood_risk text NOT NULL,
  earthquake_risk text NOT NULL,
  tsunami_risk text NOT NULL,
  landslide_risk text NOT NULL,
  land_cost numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analysis_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view analysis history"
  ON analysis_history
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can save analysis"
  ON analysis_history
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);