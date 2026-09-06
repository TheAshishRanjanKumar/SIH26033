export const BIHAR_DISTRICTS = [
  'Patna',
  'Gaya',
  'Muzaffarpur',
  'Darbhanga',
  'Bhagalpur',
  'Purnea',
  'Rohtas',
  'Nalanda',
  'Bhojpur',
  'Buxar',
  'Kaimur',
  'Saran',
  'Siwan',
  'Gopalganj',
  'Vaishali',
  'Samastipur',
  'Begusarai',
  'Khagaria',
  'Munger',
  'Lakhisarai',
  'Sheikhpura',
  'Nawada',
  'Jehanabad',
  'Arwal',
  'Aurangabad',
  'Jamui',
  'Banka',
  'Saharsa',
  'Madhepura',
  'Supaul',
  'Araria',
  'Kishanganj',
  'Katihar',
  'West Champaran',
  'East Champaran',
  'Sitamarhi',
  'Sheohar',
  'Madhubani',
] as const;

export interface PopularCrop {
  id: string;
  nameHi: string;
  nameEn: string;
  variety: string;
  maxPrice: number;
  minPrice: number;
  modalPrice: number;
  trend: string;
  image: string;
  color: string;
}

export const POPULAR_CROPS: PopularCrop[] = [
  {
    id: 'dhaan',
    nameHi: 'धान',
    nameEn: 'Paddy',
    variety: 'Kharif',
    maxPrice: 2320,
    minPrice: 1850,
    modalPrice: 2100,
    trend: '+8%',
    image: '🌾',
    color: '#16a34a',
  },
  {
    id: 'gehu',
    nameHi: 'गेहूं',
    nameEn: 'Wheat',
    variety: 'Rabi',
    maxPrice: 2450,
    minPrice: 2150,
    modalPrice: 2350,
    trend: '+5%',
    image: '🌾',
    color: '#ca8a04',
  },
  {
    id: 'makki',
    nameHi: 'मक्का',
    nameEn: 'Maize',
    variety: 'Kharif / Rabi',
    maxPrice: 1980,
    minPrice: 1650,
    modalPrice: 1870,
    trend: '-2%',
    image: '🌽',
    color: '#eab308',
  },
  {
    id: 'dal',
    nameHi: 'दाल',
    nameEn: 'Pulses',
    variety: 'Masoor / Chana',
    maxPrice: 6600,
    minPrice: 5800,
    modalPrice: 6200,
    trend: '+12%',
    image: '🫘',
    color: '#b45309',
  },
  {
    id: 'pyaaz',
    nameHi: 'प्याज',
    nameEn: 'Onion',
    variety: 'Nashik / Local',
    maxPrice: 2200,
    minPrice: 1500,
    modalPrice: 1850,
    trend: '-4%',
    image: '🧅',
    color: '#e11d48',
  },
];

export interface DailyForecast {
  dayHi: string;
  dayEn: string;
  temp: number;
  conditionHi: string;
  conditionEn: string;
  icon: 'sun' | 'cloud' | 'rain';
}

export const FIVE_DAY_FORECAST: DailyForecast[] = [
  { dayHi: 'कल', dayEn: 'Tomorrow', temp: 31, conditionHi: 'साफ धूप', conditionEn: 'Sunny', icon: 'sun' },
  { dayHi: 'परसों', dayEn: 'Day after tomorrow', temp: 30, conditionHi: 'हल्का बादल', conditionEn: 'Partly Cloudy', icon: 'cloud' },
  { dayHi: '3 दिन बाद', dayEn: 'After 3 days', temp: 29, conditionHi: 'हल्की बारिश', conditionEn: 'Light Rain', icon: 'rain' },
  { dayHi: '4 दिन बाद', dayEn: 'After 4 days', temp: 28, conditionHi: 'साफ मौसम', conditionEn: 'Clear Sky', icon: 'sun' },
  { dayHi: '5 दिन बाद', dayEn: 'After 5 days', temp: 30, conditionHi: 'धूप', conditionEn: 'Sunny', icon: 'sun' },
];

export interface AdvisoryItem {
  id: string;
  titleKey: 'buaaiKaSamay' | 'sinchaiKeSujhav' | 'khadKaUpyog' | 'rogAurKeet' | 'fasalDekhbhaal' | 'visheshSalaah';
  icon: string;
  color: string;
  detailHi: string;
  detailEn: string;
}

export const ADVISORY_LIST: AdvisoryItem[] = [
  {
    id: 'buaai',
    titleKey: 'buaaiKaSamay',
    icon: '🌱',
    color: 'bg-emerald-50 text-emerald-700',
    detailHi: 'धान की रोपाई के लिए अभी अनुकूल समय है। 20-25 दिन पुराने पौधे ही खेत में लगाएं।',
    detailEn: 'Optimal period for paddy transplanting. Transplant 20-25 day old seedlings for best tillering.',
  },
  {
    id: 'sinchai',
    titleKey: 'sinchaiKeSujhav',
    icon: '💧',
    color: 'bg-blue-50 text-blue-700',
    detailHi: 'अगले दो दिनों में बारिश की संभावना है, इसलिए खेत में अतिरिक्त सिंचाई रोकें और जल निकासी सुनिश्चित करें।',
    detailEn: 'Light rainfall expected in next 48 hours; suspend additional irrigation and maintain drainage.',
  },
  {
    id: 'khad',
    titleKey: 'khadKaUpyog',
    icon: '🌾',
    color: 'bg-amber-50 text-amber-700',
    detailHi: 'रोपाई के समय डीएपी और पोटाश की संस्तुत मात्रा का प्रयोग करें। यूरिया 3 किस्तों में दें।',
    detailEn: 'Apply recommended DAP and MOP at transplanting. Split urea into 3 top dressings.',
  },
  {
    id: 'keet',
    titleKey: 'rogAurKeet',
    icon: '🐛',
    color: 'bg-rose-50 text-rose-700',
    detailHi: 'तना छेदक कीट के लक्षण दिखने पर नीम आधारित कीटनाशक (1500 पीपीएम) का 3 मिली प्रति लीटर पानी में छिड़काव करें।',
    detailEn: 'For stem borer symptoms, spray neem-based insecticide (1500 ppm) at 3 ml/L of water.',
  },
  {
    id: 'dekhbhaal',
    titleKey: 'fasalDekhbhaal',
    icon: '🌿',
    color: 'bg-green-50 text-green-700',
    detailHi: 'रोपाई के 15-20 दिन बाद पहली निराई-गुड़ाई करें ताकि खरपतवार पोषण न खींचें।',
    detailEn: 'Conduct first weeding 15-20 days post-transplanting to prevent weed competition.',
  },
  {
    id: 'vishesh',
    titleKey: 'visheshSalaah',
    icon: '📄',
    color: 'bg-purple-50 text-purple-700',
    detailHi: 'सरकारी समर्थन मूल्य (MSP) और निकटतम पैक्स (PACS) केंद्रों पर पंजीकरण हेतु किसान कार्ड अपडेट रखें।',
    detailEn: 'Keep farmer registration updated for Government Minimum Support Price (MSP) procurement.',
  },
];

export const MSP_PRICES: Record<string, number> = {
  dhaan: 2300,
  gehu: 2425,
  makki: 2225,
  dal: 6700,
  pyaaz: 1850,
};

export const DISTRICT_MANDIS: Record<string, string[]> = {
  Patna: ['दानापुर APMC (Danapur)', 'बख्तियारपुर (Bakhtiyarpur)', 'मसौढ़ी (Masaurhi)', 'मोकामा (Mokama)'],
  Gaya: ['गया मुख्य मंडी (Gaya Mandi)', 'शेरघाटी APMC (Sherghati)', 'टिकारी (Tekari)'],
  Muzaffarpur: ['मुजफ्फरपुर APMC (Muzaffarpur)', 'कांटी (Kanti)', 'मोतीपुर (Motipur)', 'सरैया (Saraiya)'],
  Darbhanga: ['दरभंगा APMC (Darbhanga)', 'बेनीपुर (Benipur)', 'बहेड़ी (Baheri)'],
  Bhagalpur: ['भागलपुर APMC (Bhagalpur)', 'बिहपुर (Bihpur)', 'कहलगांव (Colgong)'],
  Purnea: ['गुलाबबाग APMC (Gulabbagh)', 'कसबा (Kasba)', 'बनमनखी (Banmankhi)'],
  Rohtas: ['सासाराम APMC (Sasaram)', 'डेहरी (Dehri)', 'बिक्रमगंज (Bikramganj)', 'नोखा (Nokha)'],
  Nalanda: ['बिहार शरीफ APMC (Bihar Sharif)', 'राजगीर (Rajgir)', 'हिलसा (Hilsa)', 'इस्लामपुर (Islampur)'],
  Bhojpur: ['आरा APMC (Arrah)', 'जगदीशपुर (Jagdishpur)', 'पीरो (Piro)'],
  Buxar: ['बक्सर APMC (Buxar)', 'डुमरांव (Dumraon)', 'ब्रह्मपुर (Brahmpur)'],
  Begusarai: ['बलिया APMC (Balliah)', 'बेगूसराय मंडी (Begusarai)', 'तेघड़ा (Teghra)', 'बरौनी (Barauni)'],
  Samastipur: ['समस्तीपुर APMC (Samastipur)', 'रोसड़ा (Rosera)', 'दलसिंहसराय (Dalsinghsarai)'],
  Saran: ['छपरा APMC (Chhapra)', 'रिवलगंज (Revelganj)', 'सोनपुर (Sonpur)'],
  Vaishali: ['हाजीपुर APMC (Hajipur)', 'लालगंज (Lalganj)', 'महुआ (Mahua)'],
  'West Champaran': ['बेतिया APMC (Bettiah)', 'नरकटियागंज (Narkatiaganj)', 'बगहा (Bagaha)'],
  'East Champaran': ['मोतिहारी APMC (Motihari)', 'रक्सौल (Raxaul)', 'चकिया (Chakia)'],
};

function getDistrictHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export interface PriceHistoryPoint {
  dayLabelHi: string;
  dayLabelEn: string;
  date: string;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  volumeQtl: number;
}

export interface DistrictCropData {
  crop: PopularCrop;
  msp: number;
  mspDifference: number;
  isAboveMsp: boolean;
  mandis: string[];
  history: PriceHistoryPoint[];
  recommendation: {
    action: 'hold' | 'sell';
    badgeHi: string;
    badgeEn: string;
    reasonHi: string;
    reasonEn: string;
  };
}

export function getDistrictCropData(districtName: string, cropId: string): DistrictCropData {
  const baseCrop = POPULAR_CROPS.find((c) => c.id === cropId) || POPULAR_CROPS[0];
  const hash = getDistrictHash(`${districtName}-${cropId}`);

  // Variation (-6% to +8% based on district)
  const percentDelta = ((hash % 15) - 6) / 100;
  const modalPrice = Math.round((baseCrop.modalPrice * (1 + percentDelta)) / 10) * 10;
  const minPrice = Math.round((modalPrice * 0.9) / 10) * 10;
  const maxPrice = Math.round((modalPrice * 1.1) / 10) * 10;

  const msp = MSP_PRICES[cropId] || baseCrop.modalPrice;
  const mspDifference = modalPrice - msp;
  const isAboveMsp = mspDifference >= 0;

  // Generate 7-day history leading up to today
  const history: PriceHistoryPoint[] = [];
  const daysHi = ['सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि', 'आज'];
  const daysEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];

  for (let i = 6; i >= 0; i--) {
    const dayVariation = Math.sin((hash + i) * 1.7) * 45;
    const dayModal = Math.round((modalPrice - (6 - i) * 8 + dayVariation) / 10) * 10;
    const dayMin = Math.round((dayModal * 0.91) / 10) * 10;
    const dayMax = Math.round((dayModal * 1.09) / 10) * 10;
    const volume = 280 + ((hash * (i + 1)) % 450);

    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = `${d.getDate()}/${d.getMonth() + 1}`;

    history.push({
      dayLabelHi: daysHi[6 - i],
      dayLabelEn: daysEn[6 - i],
      date: dateStr,
      modalPrice: dayModal,
      minPrice: dayMin,
      maxPrice: dayMax,
      volumeQtl: volume,
    });
  }

  // Current day prices match latest entry
  history[history.length - 1].modalPrice = modalPrice;
  history[history.length - 1].minPrice = minPrice;
  history[history.length - 1].maxPrice = maxPrice;

  const mandis = DISTRICT_MANDIS[districtName] || [
    `${districtName} APMC मंडी`,
    `${districtName} मुख्य बाजार`,
    `निकटवर्ती किसान मंडी`,
  ];

  const trendStr = isAboveMsp
    ? `+${Math.abs(Math.round((mspDifference / msp) * 100))}%`
    : `-${Math.abs(Math.round((mspDifference / msp) * 100))}%`;

  const recommendation = isAboveMsp
    ? {
        action: 'sell' as const,
        badgeHi: 'बिक्री का उत्तम समय',
        badgeEn: 'Favorable Time to Sell',
        reasonHi: `बाजार भाव सरकारी समर्थन मूल्य (MSP: ₹${msp.toLocaleString('en-IN')}) से ₹${Math.abs(mspDifference).toLocaleString('en-IN')} अधिक चल रहा है। अच्छी मांग का लाभ लें।`,
        reasonEn: `Market rate is ₹${Math.abs(mspDifference).toLocaleString('en-IN')} above Govt MSP (₹${msp.toLocaleString('en-IN')}). Strong demand in local mandis.`,
      }
    : {
        action: 'hold' as const,
        badgeHi: 'फसल कुछ दिन रोकें या PACS में बेचें',
        badgeEn: 'Hold or Sell at PACS',
        reasonHi: `खुले बाजार में भाव MSP (₹${msp.toLocaleString('en-IN')}) से ₹${Math.abs(mspDifference).toLocaleString('en-IN')} नीचे है। निकटतम सरकारी पैक्स केंद्र में बेचें या 4-5 दिन प्रतीक्षा करें।`,
        reasonEn: `Open market rate is ₹${Math.abs(mspDifference).toLocaleString('en-IN')} below MSP. Consider selling via local Govt PACS center or hold.`,
      };

  return {
    crop: {
      ...baseCrop,
      modalPrice,
      minPrice,
      maxPrice,
      trend: trendStr,
    },
    msp,
    mspDifference,
    isAboveMsp,
    mandis,
    history,
    recommendation,
  };
}

export interface DistrictWeatherMetrics {
  temp: number;
  conditionHi: string;
  conditionEn: string;
  icon: 'sun' | 'cloud' | 'rain';
  rainMm: number;
  humidity: number;
  windSpeed: number;
  forecast: DailyForecast[];
}

export function getDistrictWeatherData(districtName: string): DistrictWeatherMetrics {
  const hash = getDistrictHash(districtName);
  const temp = 29 + (hash % 6);
  const humidity = 60 + (hash % 25);
  const windSpeed = 8 + (hash % 12);
  const rainMm = hash % 3 === 0 ? hash % 14 : 0;

  let conditionHi = 'हल्का बादल';
  let conditionEn = 'Partly Cloudy';
  let icon: 'sun' | 'cloud' | 'rain' = 'cloud';

  if (rainMm > 5) {
    conditionHi = 'हल्की बारिश';
    conditionEn = 'Light Rain';
    icon = 'rain';
  } else if (temp > 32) {
    conditionHi = 'तेज धूप';
    conditionEn = 'Sunny & Clear';
    icon = 'sun';
  }

  const forecast: DailyForecast[] = [
    { dayHi: 'कल', dayEn: 'Tomorrow', temp: temp - 1, conditionHi: 'साफ धूप', conditionEn: 'Sunny', icon: 'sun' },
    { dayHi: 'परसों', dayEn: 'Day after tomorrow', temp: temp, conditionHi: 'हल्का बादल', conditionEn: 'Partly Cloudy', icon: 'cloud' },
    { dayHi: '3 दिन बाद', dayEn: 'After 3 days', temp: temp - 2, conditionHi: 'हल्की फुहार', conditionEn: 'Light Shower', icon: 'rain' },
    { dayHi: '4 दिन बाद', dayEn: 'After 4 days', temp: temp + 1, conditionHi: 'धूप', conditionEn: 'Sunny', icon: 'sun' },
    { dayHi: '5 दिन बाद', dayEn: 'After 5 days', temp: temp, conditionHi: 'हल्का बादल', conditionEn: 'Partly Cloudy', icon: 'cloud' },
  ];

  return {
    temp,
    conditionHi,
    conditionEn,
    icon,
    rainMm,
    humidity,
    windSpeed,
    forecast,
  };
}

export interface DistrictProductionInfo {
  districtName: string;
  majorCropsHi: string[];
  majorCropsEn: string[];
  totalCroppedAreaHa: number;
  annualProductionTonnes: number;
  keySpecialtyHi: string;
  keySpecialtyEn: string;
}

export function getDistrictProductionData(districtName: string): DistrictProductionInfo {
  const hash = getDistrictHash(districtName);
  const totalCroppedAreaHa = 140000 + (hash % 120000);
  const annualProductionTonnes = 420000 + (hash % 380000);

  const specialties: Record<string, { hi: string; en: string }> = {
    Rohtas: {
      hi: 'बिहार का धान का कटोरा (सर्वाधिक धान उत्पादकता)',
      en: 'Rice Bowl of Bihar (Highest paddy productivity)',
    },
    Purnea: {
      hi: 'एशिया का सबसे बड़ा मक्का व्यापार केंद्र (गुलाबबाग)',
      en: "Asia's largest maize trading hub (Gulabbagh)",
    },
    Muzaffarpur: {
      hi: 'विश्व प्रसिद्ध शाही लीची एवं सब्जी उत्पादन क्लस्टर',
      en: 'GI-tagged Shahi Litchi & vegetable clusters',
    },
    Nalanda: {
      hi: 'आधुनिक संरक्षित सब्जी एवं जैविक खेती का प्रमुख केंद्र',
      en: 'Leading center for protected vegetable & organic farming',
    },
    Begusarai: {
      hi: 'मक्का, तिलहन एवं दलहन उत्पादन में अग्रणी',
      en: 'Prominent maize, oilseeds & pulses producer',
    },
    Bhagalpur: {
      hi: 'कतरनी चावल एवं जर्दालु आम का जीआई क्षेत्र',
      en: 'GI Katarni rice & Zardalu mango heritage belt',
    },
    Samastipur: {
      hi: 'तम्बाकू, मक्का एवं मसाला उत्पादन केंद्र',
      en: 'Renowned maize, spices and tobacco cultivation zone',
    },
    Bhojpur: {
      hi: 'गेहूं एवं दलहन की उच्च पैदावार',
      en: 'High-yield wheat and pulses belt',
    },
  };

  const spec = specialties[districtName] || {
    hi: `${districtName} में धान, गेहूं और दलहन की सघन खेती`,
    en: `Intensive paddy, wheat, and pulses farming in ${districtName}`,
  };

  return {
    districtName,
    majorCropsHi: ['धान (Paddy)', 'गेहूं (Wheat)', 'मक्का (Maize)', 'दलहन (Pulses)'],
    majorCropsEn: ['Paddy (Dhan)', 'Wheat (Gehu)', 'Maize (Makki)', 'Pulses (Dal)'],
    totalCroppedAreaHa,
    annualProductionTonnes,
    keySpecialtyHi: spec.hi,
    keySpecialtyEn: spec.en,
  };
}
