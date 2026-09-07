// Crop image mapping utility
// Maps crop names to their image paths and provides a consistent visual identity

const cropImageMap: Record<string, string> = {
  tomato: '/crops/tomato.jpg',
  onion: '/crops/onion.jpg',
  potato: '/crops/potato.jpg',
  chilli: '/crops/chilli.jpg',
  'green chilli': '/crops/chilli.jpg',
  cabbage: '/crops/cabbage.jpg',
};

export function getCropImage(cropName: string): string {
  const key = cropName.toLowerCase().trim();
  for (const [crop, path] of Object.entries(cropImageMap)) {
    if (key.includes(crop)) return path;
  }
  return '/crops/tomato.jpg'; // fallback
}

// Market data for farmer-facing pages
export const marketPrices: Record<string, {
  current: number;
  expected: [number, number];
  direction: 'up' | 'down' | 'stable';
  advice: string;
  adviceHi: string;
  window: string;
  demand: string;
}> = {
  Tomato: {
    current: 24,
    expected: [28, 30],
    direction: 'up',
    advice: 'Good time to sell',
    adviceHi: 'बेचने का अच्छा समय',
    window: '3–5 days',
    demand: 'High',
  },
  Onion: {
    current: 18,
    expected: [15, 17],
    direction: 'down',
    advice: 'Sell now, price may drop',
    adviceHi: 'अभी बेचें, भाव गिर सकता है',
    window: 'Today',
    demand: 'Moderate',
  },
  Potato: {
    current: 15,
    expected: [18, 20],
    direction: 'up',
    advice: 'Wait for better price',
    adviceHi: 'बेहतर भाव का इंतज़ार करें',
    window: '5–7 days',
    demand: 'Rising',
  },
  'Green Chilli': {
    current: 45,
    expected: [50, 55],
    direction: 'up',
    advice: 'High demand, sell soon',
    adviceHi: 'मांग ज़्यादा है, जल्दी बेचें',
    window: '2–3 days',
    demand: 'High',
  },
  Cabbage: {
    current: 12,
    expected: [12, 14],
    direction: 'stable',
    advice: 'Price is stable',
    adviceHi: 'भाव स्थिर है',
    window: 'Anytime',
    demand: 'Low',
  },
};

export function getMarketData(cropName: string) {
  for (const [key, data] of Object.entries(marketPrices)) {
    if (cropName.toLowerCase().includes(key.toLowerCase())) return { crop: key, ...data };
  }
  return { crop: 'Tomato', ...marketPrices.Tomato };
}
