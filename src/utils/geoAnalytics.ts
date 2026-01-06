import { AnalysisResult } from '../lib/supabase';

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getRiskLevel(value: number): string {
  if (value < 0.33) return 'Low';
  if (value < 0.66) return 'Medium';
  return 'High';
}

function getStabilityLevel(value: number): string {
  if (value < 0.33) return 'Low';
  if (value < 0.66) return 'Medium';
  return 'High';
}

function calculateAQI(lat: number, lon: number): number {
  const seed = Math.abs(lat * 1000 + lon * 1000);
  const random = seededRandom(seed);
  return Math.floor(20 + random * 130);
}

function calculateLandCost(lat: number, lon: number, aqi: number): number {
  const seed = Math.abs(lat * 100 + lon * 100);
  const random = seededRandom(seed);

  const basePrice = 50000 + random * 450000;
  const aqiMultiplier = aqi < 50 ? 1.3 : aqi < 100 ? 1.0 : 0.7;

  return Math.floor(basePrice * aqiMultiplier);
}

function getUrbanPlanningRecommendations(
  groundStability: string,
  floodRisk: string,
  earthquakeRisk: string
): {
  optimal: string[];
  dangerous: string[];
  avoid: string[];
  reasons: string[];
} {
  const optimal: string[] = [];
  const dangerous: string[] = [];
  const avoid: string[] = [];
  const reasons: string[] = [];

  if (groundStability === 'High') {
    optimal.push('Residential high-rise buildings', 'Commercial centers', 'Industrial facilities');
    reasons.push('High ground stability allows for multi-story construction');
  } else if (groundStability === 'Low') {
    avoid.push('High-rise buildings', 'Heavy industrial structures');
    reasons.push('Low ground stability increases foundation failure risk');
  }

  if (floodRisk === 'Low') {
    optimal.push('Underground parking', 'Basement storage facilities');
  } else if (floodRisk === 'High') {
    dangerous.push('Low-lying areas', 'River proximity zones');
    avoid.push('Underground construction', 'Ground-floor residential');
    reasons.push('High flood risk requires elevated construction');
  }

  if (earthquakeRisk === 'High') {
    dangerous.push('Areas near fault lines', 'Non-reinforced structures');
    reasons.push('High seismic activity requires earthquake-resistant design');
  }

  if (optimal.length === 0) {
    optimal.push('Low-rise residential', 'Parks and recreation');
  }

  return { optimal, dangerous, avoid, reasons };
}

function getEconomicProspects(landCost: number, aqi: number): string[] {
  const prospects: string[] = [];

  if (landCost > 300000) {
    prospects.push('Prime location with high investment potential');
    prospects.push('Suitable for luxury residential or commercial development');
  } else if (landCost > 150000) {
    prospects.push('Moderate development potential');
    prospects.push('Balanced cost-benefit ratio for mid-range projects');
  } else {
    prospects.push('Affordable development opportunity');
    prospects.push('Suitable for budget-conscious projects');
  }

  if (aqi < 50) {
    prospects.push('Excellent air quality attracts premium residents');
  } else if (aqi > 100) {
    prospects.push('Air quality improvements needed to increase value');
  }

  return prospects;
}

function getClimateForecast(lat: number, lon: number): {
  temperatureTrend: string;
  humidityTrend: string;
  avgTemperature: number;
  avgHumidity: number;
  disasterTrend: string;
} {
  const seed = Math.abs(lat * 10 + lon * 10);
  const random = seededRandom(seed);

  const trends = ['Increasing', 'Stable', 'Decreasing'];
  const disasterTrends = ['Increasing risk', 'Stable conditions', 'Decreasing risk'];

  return {
    temperatureTrend: trends[Math.floor(random * 3)],
    humidityTrend: trends[Math.floor(seededRandom(seed + 1) * 3)],
    avgTemperature: Math.floor(15 + random * 20),
    avgHumidity: Math.floor(40 + random * 40),
    disasterTrend: disasterTrends[Math.floor(seededRandom(seed + 2) * 3)],
  };
}

export function analyzeLocation(latitude: number, longitude: number): {
  analysis: AnalysisResult;
  urbanPlanning: ReturnType<typeof getUrbanPlanningRecommendations>;
  economicProspects: string[];
  climateForecast: ReturnType<typeof getClimateForecast>;
} {
  const seed1 = Math.abs(latitude * 1000 + longitude);
  const seed2 = Math.abs(latitude + longitude * 1000);
  const seed3 = Math.abs(latitude * 500 + longitude * 500);
  const seed4 = Math.abs(latitude * 200 + longitude * 300);
  const seed5 = Math.abs(latitude * 300 + longitude * 200);

  const aqi = calculateAQI(latitude, longitude);
  const groundStability = getStabilityLevel(seededRandom(seed1));
  const floodRisk = getRiskLevel(seededRandom(seed2));
  const earthquakeRisk = getRiskLevel(seededRandom(seed3));
  const tsunamiRisk = getRiskLevel(seededRandom(seed4));
  const landslideRisk = getRiskLevel(seededRandom(seed5));
  const landCost = calculateLandCost(latitude, longitude, aqi);

  const analysis: AnalysisResult = {
    latitude,
    longitude,
    aqi,
    ground_stability: groundStability,
    flood_risk: floodRisk,
    earthquake_risk: earthquakeRisk,
    tsunami_risk: tsunamiRisk,
    landslide_risk: landslideRisk,
    land_cost: landCost,
  };

  const urbanPlanning = getUrbanPlanningRecommendations(
    groundStability,
    floodRisk,
    earthquakeRisk
  );

  const economicProspects = getEconomicProspects(landCost, aqi);
  const climateForecast = getClimateForecast(latitude, longitude);

  return {
    analysis,
    urbanPlanning,
    economicProspects,
    climateForecast,
  };
}
