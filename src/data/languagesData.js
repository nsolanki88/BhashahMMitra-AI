export const SUPPORTED_LANGUAGES = [
  {
    id: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    speechLocale: 'hi-IN',
    flag: '🇮🇳',
    description: 'Spoken widely across Northern and Central India.'
  },
  {
    id: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    speechLocale: 'ta-IN',
    flag: '🇮🇳',
    description: 'Classical Dravidian language spoken in Tamil Nadu & Puducherry.'
  },
  {
    id: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    speechLocale: 'te-IN',
    flag: '🇮🇳',
    description: 'Melodious language widely spoken in Andhra Pradesh and Telangana.'
  },
  {
    id: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    speechLocale: 'kn-IN',
    flag: '🇮🇳',
    description: 'Dravidian language spoken predominantly in Karnataka and Bengaluru.'
  },
  {
    id: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    speechLocale: 'bn-IN',
    flag: '🇮🇳',
    description: 'Expressive language spoken in West Bengal and Kolkata.'
  },
  {
    id: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    speechLocale: 'mr-IN',
    flag: '🇮🇳',
    description: 'Official language of Maharashtra, Mumbai, and Pune.'
  }
];

export const NATIVE_LANGUAGES = [
  { id: 'en', name: 'English' },
  { id: 'hi', name: 'Hindi' },
  { id: 'bn', name: 'Bengali' },
  { id: 'ta', name: 'Tamil' },
  { id: 'te', name: 'Telugu' },
  { id: 'mr', name: 'Marathi' },
  { id: 'gu', name: 'Gujarati' },
  { id: 'ml', name: 'Malayalam' }
];

export const PROFICIENCY_LEVELS = [
  {
    id: 'beginner',
    label: 'Beginner',
    description: 'New to the language. Focus on essential phrases, greetings, numbers, and basic politeness.',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    description: 'Can manage routine transactions. Working on conversational nuances, bargaining, and code-switching.',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  {
    id: 'advanced',
    label: 'Advanced',
    description: 'Fluent in everyday contexts. Polishing formal registers, regional idioms, and cultural subtext.',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
  }
];
