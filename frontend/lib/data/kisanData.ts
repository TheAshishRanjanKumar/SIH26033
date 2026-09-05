export interface CropForecastPoint {
  month: string;
  historical: number | null;
  forecasted: number | null;
  tooltip?: {
    date: string;
    price: number;
    change: string;
    predicted: boolean;
  };
}

export interface CropInfo {
  id: string;
  nameKey: 'cropPaddy' | 'cropWheat' | 'cropMaize' | 'cropLentil' | 'cropGram';
  nameEn: string;
  nameHi: string;
  currentPrice: number;
  predictedPrice: number;
  trend: string;
  isPositive: boolean;
  production2023: string;
  seasonEn: string;
  seasonHi: string;
  districts: string;
  descriptionEn: string;
  descriptionHi: string;
  forecast6M: CropForecastPoint[];
  productionHistory: { year: string; value: number }[];
}

export const CROPS_DATA: Record<string, CropInfo> = {
  paddy: {
    id: 'paddy',
    nameKey: 'cropPaddy',
    nameEn: 'Paddy (Dhan)',
    nameHi: 'धान (Paddy)',
    currentPrice: 2180,
    predictedPrice: 2320,
    trend: '+12%',
    isPositive: true,
    production2023: '95.2 L Tonnes',
    seasonEn: 'Kharif · Major crop in Bihar',
    seasonHi: 'खरीफ · बिहार की प्रमुख फसल',
    districts: 'Patna, Gaya, Purnea',
    descriptionEn:
      'Paddy is the most important food crop in Bihar, widely cultivated during the Kharif season. It plays a key role in the state\'s food security and farmer livelihood.',
    descriptionHi:
      'धान बिहार की सबसे महत्वपूर्ण खाद्य फसल है, जिसकी खरीफ मौसम में व्यापक खेती की जाती है। यह राज्य की खाद्य सुरक्षा और किसानों की आजीविका में महत्वपूर्ण भूमिका निभाती है।',
    forecast6M: [
      { month: 'Jan', historical: 1500, forecasted: null },
      { month: 'Feb', historical: 1950, forecasted: null },
      { month: 'Mar', historical: 1980, forecasted: null },
      { month: 'Apr', historical: 2180, forecasted: 2180 },
      { month: 'May', historical: null, forecasted: 2050 },
      {
        month: 'Jun',
        historical: null,
        forecasted: 2320,
        tooltip: {
          date: 'Jun 2025',
          price: 2320,
          change: '↑ 12% from last month',
          predicted: true,
        },
      },
    ],
    productionHistory: [
      { year: '2019', value: 58 },
      { year: '2020', value: 68 },
      { year: '2021', value: 78 },
      { year: '2022', value: 86 },
      { year: '2023', value: 104 },
    ],
  },
  wheat: {
    id: 'wheat',
    nameKey: 'cropWheat',
    nameEn: 'Wheat',
    nameHi: 'गेहूं (Wheat)',
    currentPrice: 2350,
    predictedPrice: 2480,
    trend: '+8%',
    isPositive: true,
    production2023: '68.5 L Tonnes',
    seasonEn: 'Rabi · Key cereal crop',
    seasonHi: 'रबी · प्रमुख अनाज फसल',
    districts: 'Rohtas, Bhojpur, Nalanda',
    descriptionEn:
      'Wheat is the leading Rabi cereal in Bihar with extensive acreage in southern and central plains benefiting from canal and tube well irrigation.',
    descriptionHi:
      'गेहूं बिहार में रबी की प्रमुख अनाज फसल है, जिसकी दक्षिण और मध्य मैदानी इलाकों में व्यापक खेती की जाती है।',
    forecast6M: [
      { month: 'Jan', historical: 2100, forecasted: null },
      { month: 'Feb', historical: 2180, forecasted: null },
      { month: 'Mar', historical: 2240, forecasted: null },
      { month: 'Apr', historical: 2350, forecasted: 2350 },
      { month: 'May', historical: null, forecasted: 2400 },
      {
        month: 'Jun',
        historical: null,
        forecasted: 2480,
        tooltip: {
          date: 'Jun 2025',
          price: 2480,
          change: '↑ 5% from last month',
          predicted: true,
        },
      },
    ],
    productionHistory: [
      { year: '2019', value: 50 },
      { year: '2020', value: 55 },
      { year: '2021', value: 60 },
      { year: '2022', value: 63 },
      { year: '2023', value: 69 },
    ],
  },
  maize: {
    id: 'maize',
    nameKey: 'cropMaize',
    nameEn: 'Maize',
    nameHi: 'मक्का (Maize)',
    currentPrice: 1870,
    predictedPrice: 1780,
    trend: '-5%',
    isPositive: false,
    production2023: '48.0 L Tonnes',
    seasonEn: 'Rabi / Kharif · High yield in Koshi belt',
    seasonHi: 'रबी / खरीफ · कोशी क्षेत्र में उच्च उत्पादन',
    districts: 'Khagaria, Saharsa, Samastipur',
    descriptionEn:
      'Bihar is known as the maize bowl of India. The Koshi-Seemanchal belt produces top-grade hybrid maize with immense industrial and export demand.',
    descriptionHi:
      'बिहार को भारत का मक्का कटोरा कहा जाता है। कोशी-सीमांचल क्षेत्र में उच्च गुणवत्ता वाले हाइब्रिड मक्के का भारी उत्पादन होता है।',
    forecast6M: [
      { month: 'Jan', historical: 1950, forecasted: null },
      { month: 'Feb', historical: 1900, forecasted: null },
      { month: 'Mar', historical: 1880, forecasted: null },
      { month: 'Apr', historical: 1870, forecasted: 1870 },
      { month: 'May', historical: null, forecasted: 1820 },
      {
        month: 'Jun',
        historical: null,
        forecasted: 1780,
        tooltip: {
          date: 'Jun 2025',
          price: 1780,
          change: '↓ 2% from last month',
          predicted: true,
        },
      },
    ],
    productionHistory: [
      { year: '2019', value: 30 },
      { year: '2020', value: 35 },
      { year: '2021', value: 40 },
      { year: '2022', value: 44 },
      { year: '2023', value: 50 },
    ],
  },
  lentil: {
    id: 'lentil',
    nameKey: 'cropLentil',
    nameEn: 'Lentil (Masoor)',
    nameHi: 'मसूर (Lentil)',
    currentPrice: 6200,
    predictedPrice: 6500,
    trend: '+15%',
    isPositive: true,
    production2023: '18.4 L Tonnes',
    seasonEn: 'Rabi · High protein pulse',
    seasonHi: 'रबी · प्रमुख दलहन फसल',
    districts: 'Patna (Tal area), Nalanda, Gaya',
    descriptionEn:
      'Bihar’s Mokama and Barh Tal lands are famous worldwide for high-protein pulses, particularly Masoor, produced organically in receding floodwaters.',
    descriptionHi:
      'बिहार के मोकामा और बाढ़ टाल क्षेत्र उच्च प्रोटीन युक्त दलहन, विशेषकर मसूर के लिए प्रसिद्ध हैं।',
    forecast6M: [
      { month: 'Jan', historical: 5400, forecasted: null },
      { month: 'Feb', historical: 5650, forecasted: null },
      { month: 'Mar', historical: 5900, forecasted: null },
      { month: 'Apr', historical: 6200, forecasted: 6200 },
      { month: 'May', historical: null, forecasted: 6350 },
      {
        month: 'Jun',
        historical: null,
        forecasted: 6500,
        tooltip: {
          date: 'Jun 2025',
          price: 6500,
          change: '↑ 3% from last month',
          predicted: true,
        },
      },
    ],
    productionHistory: [
      { year: '2019', value: 12 },
      { year: '2020', value: 13 },
      { year: '2021', value: 15 },
      { year: '2022', value: 16 },
      { year: '2023', value: 19 },
    ],
  },
  gram: {
    id: 'gram',
    nameKey: 'cropGram',
    nameEn: 'Gram (Chana)',
    nameHi: 'चना (Gram)',
    currentPrice: 5850,
    predictedPrice: 6100,
    trend: '+10%',
    isPositive: true,
    production2023: '14.2 L Tonnes',
    seasonEn: 'Rabi · High market demand',
    seasonHi: 'रबी · उच्च बाजार मांग',
    districts: 'Rohtas, Buxar, Aurangabad',
    descriptionEn:
      'Gram is heavily grown in the southwestern districts with expanding market arrivals and solid support price realization.',
    descriptionHi:
      'चना दक्षिण-पश्चिमी जिलों में प्रमुखता से उगाया जाता है और मंडियों में इसकी अच्छी आवक व मूल्य प्राप्ति होती है।',
    forecast6M: [
      { month: 'Jan', historical: 5100, forecasted: null },
      { month: 'Feb', historical: 5300, forecasted: null },
      { month: 'Mar', historical: 5600, forecasted: null },
      { month: 'Apr', historical: 5850, forecasted: 5850 },
      { month: 'May', historical: null, forecasted: 5980 },
      {
        month: 'Jun',
        historical: null,
        forecasted: 6100,
        tooltip: {
          date: 'Jun 2025',
          price: 6100,
          change: '↑ 2% from last month',
          predicted: true,
        },
      },
    ],
    productionHistory: [
      { year: '2019', value: 9 },
      { year: '2020', value: 10 },
      { year: '2021', value: 12 },
      { year: '2022', value: 13 },
      { year: '2023', value: 15 },
    ],
  },
};

export interface DistrictRainfall {
  name: string;
  nameHi: string;
  rainfallMm: number;
  level: 'low' | 'med-low' | 'med' | 'med-high' | 'high';
  color: string;
}

export const BIHAR_DISTRICT_RAINFALL: DistrictRainfall[] = [
  { name: 'Patna', nameHi: 'पटना', rainfallMm: 120, level: 'high', color: '#1d4ed8' },
  { name: 'Gaya', nameHi: 'गया', rainfallMm: 98, level: 'med', color: '#3b82f6' },
  { name: 'Muzaffarpur', nameHi: 'मुजफ्फरपुर', rainfallMm: 110, level: 'med-high', color: '#2563eb' },
  { name: 'Darbhanga', nameHi: 'दरभंगा', rainfallMm: 85, level: 'med-low', color: '#60a5fa' },
  { name: 'Purnea', nameHi: 'पूर्णिया', rainfallMm: 140, level: 'high', color: '#1e40af' },
  { name: 'Kishanganj', nameHi: 'किशनगंज', rainfallMm: 155, level: 'high', color: '#172554' },
  { name: 'Bhagalpur', nameHi: 'भागलपुर', rainfallMm: 115, level: 'med-high', color: '#2563eb' },
  { name: 'Nalanda', nameHi: 'नालंदा', rainfallMm: 102, level: 'med', color: '#3b82f6' },
  { name: 'Rohtas', nameHi: 'रोहतास', rainfallMm: 88, level: 'med-low', color: '#60a5fa' },
  { name: 'West Champaran', nameHi: 'प. चंपारण', rainfallMm: 135, level: 'high', color: '#1d4ed8' },
  { name: 'East Champaran', nameHi: 'पू. चंपारण', rainfallMm: 125, level: 'high', color: '#1d4ed8' },
  { name: 'Madhubani', nameHi: 'मधुबनी', rainfallMm: 90, level: 'med', color: '#3b82f6' },
  { name: 'Samastipur', nameHi: 'समस्तीपुर', rainfallMm: 95, level: 'med', color: '#3b82f6' },
  { name: 'Saharsa', nameHi: 'सहरसा', rainfallMm: 105, level: 'med-high', color: '#2563eb' },
  { name: 'Katihar', nameHi: 'कटिहार', rainfallMm: 130, level: 'high', color: '#1d4ed8' },
  { name: 'Saran', nameHi: 'सारण', rainfallMm: 86, level: 'med-low', color: '#60a5fa' },
  { name: 'Vaishali', nameHi: 'वैशाली', rainfallMm: 108, level: 'med-high', color: '#2563eb' },
  { name: 'Siwan', nameHi: 'सीवान', rainfallMm: 78, level: 'low', color: '#93c5fd' },
  { name: 'Gopalganj', nameHi: 'गोपालगंज', rainfallMm: 82, level: 'med-low', color: '#60a5fa' },
  { name: 'Buxar', nameHi: 'बक्सर', rainfallMm: 79, level: 'low', color: '#93c5fd' },
];

export const MARKET_ALERTS = [
  {
    id: '1',
    textEn: 'Maize prices up 8% in Saharsa',
    textHi: 'सहरसा में मक्के का भाव 8% बढ़ा',
    timeEn: '2 hours ago',
    timeHi: '2 घंटे पहले',
    type: 'up',
  },
  {
    id: '2',
    textEn: 'Onion prices down 5% in Patna',
    textHi: 'पटना में प्याज का भाव 5% गिरा',
    timeEn: '5 hours ago',
    timeHi: '5 घंटे पहले',
    type: 'down',
  },
  {
    id: '3',
    textEn: 'Paddy demand increasing in Muzaffarpur',
    textHi: 'मुजफ्फरपुर में धान की मांग बढ़ी',
    timeEn: '1 day ago',
    timeHi: '1 दिन पहले',
    type: 'up',
  },
];

