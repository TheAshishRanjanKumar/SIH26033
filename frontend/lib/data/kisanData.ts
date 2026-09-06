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
