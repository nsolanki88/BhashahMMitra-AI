export const CATEGORIES = [
  {
    id: 'travel',
    name: 'Travel & Commute',
    icon: 'Plane',
    color: 'from-blue-500 to-indigo-600',
    lightBg: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    tag: '✈️ Travel',
    description: 'Auto-rickshaws, metro, bus stops, asking directions, and airport navigation.'
  },
  {
    id: 'shopping',
    name: 'Shopping & Markets',
    icon: 'ShoppingBag',
    color: 'from-amber-500 to-orange-600',
    lightBg: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    tag: '🛍️ Shopping',
    description: 'Bargaining politely, asking for prices, UPI payments, and vegetable vendors.'
  },
  {
    id: 'college',
    name: 'College & Campus',
    icon: 'GraduationCap',
    color: 'from-emerald-500 to-teal-600',
    lightBg: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    tag: '🎓 College',
    description: 'Talking to seniors, professors, canteen banter, library queries, and project teams.'
  },
  {
    id: 'emergency',
    name: 'Health & Emergency',
    icon: 'AlertTriangle',
    color: 'from-rose-500 to-red-600',
    lightBg: 'bg-rose-50',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-200',
    tag: '🚨 Emergency',
    description: 'Urgent medical help, pharmacy orders, reporting lost items, and asking police.'
  },
  {
    id: 'social',
    name: 'Social & Hospitality',
    icon: 'Users',
    color: 'from-purple-500 to-violet-600',
    lightBg: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    tag: '🤝 Social',
    description: 'Visiting Indian homes, chai time, greetings, compliments, and casual chit-chat.'
  }
];

export const PHRASES_DATABASE = [
  // ==================== TRAVEL (HINDI) ====================
  {
    id: 'travel-hi-1',
    languageId: 'hi',
    category: 'travel',
    proficiency: 'beginner',
    targetPhrase: 'भैया, क्या आप मेट्रो स्टेशन चलेंगे?',
    transliteration: 'Bhaiya, kya aap metro station chalenge?',
    englishMeaning: 'Brother, will you go to the metro station?',
    hindiMeaning: 'भैया, क्या आप मेट्रो स्टेशन चलेंगे?',
    formality: 'Neutral-Polite',
    culturalContext: 'Using "Bhaiya" (brother) with auto or cab drivers establishes respectful, friendly rapport rather than a transactional tone.',
    whenToUse: 'When hailing an auto-rickshaw or taxi on the street.',
    whenNotToUse: 'Avoid with senior citizens, women, or in formal corporate offices.',
    avoidSaying: 'Aye auto! Station chal! (Too blunt, rude)',
    betterAlternative: 'Bhaiya, metro station chalenge kya? Meter se chalenge?',
    audioSpeed: 0.9,
    keywords: ['metro', 'auto', 'station', 'travel', 'bhaiya']
  },
  {
    id: 'travel-hi-2',
    languageId: 'hi',
    category: 'travel',
    proficiency: 'intermediate',
    targetPhrase: 'भैया, मीटर से चलेंगे क्या? या कितना लेंगे?',
    transliteration: 'Bhaiya, meter se chalenge kya? Ya kitna lenge?',
    englishMeaning: 'Brother, will you go by the meter, or how much will you charge?',
    hindiMeaning: 'भैया, मीटर से चलेंगे क्या? या कितना लेंगे?',
    formality: 'Neutral-Polite',
    culturalContext: 'In most Indian cities like Delhi or Mumbai, asking "meter se chalenge" upfront avoids surprises. Keeping your voice calm and polite ensures a cooperative response.',
    whenToUse: 'Before stepping into an auto-rickshaw to clarify the fare.',
    whenNotToUse: 'When booking through prepaid booths or rideshare apps like Uber/Ola where fare is already fixed.',
    avoidSaying: 'Zyada mat maangna! (Accusatory)',
    betterAlternative: 'Bhaiya, jo meter pe aayega utna de denge, theek hai?',
    audioSpeed: 0.9,
    keywords: ['meter', 'auto', 'fare', 'kitna']
  },
  {
    id: 'travel-hi-3',
    languageId: 'hi',
    category: 'travel',
    proficiency: 'beginner',
    targetPhrase: 'माफ़ कीजिये, क्या यह बस कनाट प्लेस जाएगी?',
    transliteration: 'Maaf kijiye, kya yeh bus Connaught Place jaayegi?',
    englishMeaning: 'Excuse me, will this bus go to Connaught Place?',
    hindiMeaning: 'माफ़ कीजिये, क्या यह बस कनाट प्लेस जाएगी?',
    formality: 'Formal',
    culturalContext: '"Maaf kijiye" (Excuse me/Forgive me) is the most respectful way to seek attention in crowded public transport without sounding invasive.',
    whenToUse: 'Asking fellow commuters, conductors, or bus depot staff.',
    whenNotToUse: 'Do not use informal "Suno" with strangers.',
    avoidSaying: 'Oye! CP ja rahi hai kya?',
    betterAlternative: 'Bhai sahab, yeh bus CP jaayegi kya?',
    audioSpeed: 0.9,
    keywords: ['bus', 'travel', 'directions', 'excuse me']
  },

  // ==================== SHOPPING (HINDI) ====================
  {
    id: 'shop-hi-1',
    languageId: 'hi',
    category: 'shopping',
    proficiency: 'beginner',
    targetPhrase: 'भैया, यह कितने का है? थोड़ा सही दाम लगाइए ना।',
    transliteration: 'Bhaiya, yeh kitne ka hai? Thoda sahi daam lagaiye na.',
    englishMeaning: 'Brother, how much is this for? Please quote a reasonable price.',
    hindiMeaning: 'भैया, यह कितने का है? थोड़ा सही दाम लगाइए ना।',
    formality: 'Neutral-Polite',
    culturalContext: 'Bargaining in local Indian markets is a social conversation, not an argument. Saying "thoda sahi daam lagaiye na" (quote a fair price) acknowledges the seller respectfully while asking for a discount.',
    whenToUse: 'Street markets, flea markets, local clothing and handicraft stores.',
    whenNotToUse: 'Fixed price supermarkets, mall showrooms, or government emporiums.',
    avoidSaying: 'Itna mehenga kyun bech rahe ho! Loot rahe ho! (Hostile and offensive)',
    betterAlternative: 'Bhaiya, hum regular customer hain, thoda discount toh banta hai!',
    audioSpeed: 0.9,
    keywords: ['price', 'discount', 'bargain', 'shopping', 'daam']
  },
  {
    id: 'shop-hi-2',
    languageId: 'hi',
    category: 'shopping',
    proficiency: 'intermediate',
    targetPhrase: 'भैया, यहाँ ऑनलाइन पेमेंट या UPI चलेगा?',
    transliteration: 'Bhaiya, yahan online payment ya UPI chalega?',
    englishMeaning: 'Brother, will online payment or UPI work here?',
    hindiMeaning: 'भैया, क्या यहाँ ऑनलाइन पेमेंट या UPI चलेगा?',
    formality: 'Neutral-Polite',
    culturalContext: 'UPI (Google Pay, PhonePe, Paytm) is ubiquitous across India, even with tea stalls. Asking beforehand prevents checkout delays.',
    whenToUse: 'Before finalizing purchase at small vendors or street kiosks.',
    whenNotToUse: 'No restriction.',
    avoidSaying: 'QR code kahan feka hai?',
    betterAlternative: 'Scanner kahan hai bhaiya, QR scan kar leta hoon.',
    audioSpeed: 0.9,
    keywords: ['upi', 'payment', 'scanner', 'online']
  },

  // ==================== COLLEGE (HINDI) ====================
  {
    id: 'college-hi-1',
    languageId: 'hi',
    category: 'college',
    proficiency: 'beginner',
    targetPhrase: 'नमस्ते सर, क्या मैं अंदर आ सकता हूँ?',
    transliteration: 'Namaste Sir, kya main andar aa sakta hoon?',
    englishMeaning: 'Hello Sir, may I please come in?',
    hindiMeaning: 'नमस्ते सर, क्या मैं अंदर आ सकता हूँ?',
    formality: 'Formal',
    culturalContext: 'In Indian academia, greeting with "Namaste Sir/Ma\'am" and asking permission before entering shows deep deference and academic discipline.',
    whenToUse: 'Entering faculty rooms, laboratories, or classrooms after the professor has started.',
    whenNotToUse: 'Never use casual English slang like "Hey prof" or "Can I pop in?".',
    avoidSaying: 'Sir main aa jaoon? (Lacks the respectful "kya")',
    betterAlternative: 'Good morning Sir, kya main andar aa sakta hoon?',
    audioSpeed: 0.9,
    keywords: ['professor', 'college', 'permission', 'class']
  },
  {
    id: 'college-hi-2',
    languageId: 'hi',
    category: 'college',
    proficiency: 'intermediate',
    targetPhrase: 'हाय भाई, कल के लेक्चर के नोट्स मिल सकते हैं क्या?',
    transliteration: 'Hi bhai, kal ke lecture ke notes mil sakte hain kya?',
    englishMeaning: 'Hey bro, could I get the notes from yesterday\'s lecture?',
    hindiMeaning: 'हाय भाई, कल के लेक्चर के नोट्स मिल सकते हैं क्या?',
    formality: 'Informal-Friendly',
    culturalContext: '"Bhai" or "yaar" is common college student slang across North and Western India among peers. It builds immediate camaraderie.',
    whenToUse: 'Classmates and batchmates of your same age or study group.',
    whenNotToUse: 'Do not use "yaar" or "bhai" with professors, TAs, or administrative deans.',
    avoidSaying: 'Notes de jaldi!',
    betterAlternative: 'Bhai agar photo kheench loon toh chalega?',
    audioSpeed: 0.9,
    keywords: ['college', 'notes', 'lecture', 'bhai', 'yaar']
  },

  // ==================== EMERGENCY (HINDI) ====================
  {
    id: 'emerg-hi-1',
    languageId: 'hi',
    category: 'emergency',
    proficiency: 'beginner',
    targetPhrase: 'कृपया मदद कीजिये, यहाँ कोई डॉक्टर या केमिस्ट है?',
    transliteration: 'Kripya madad kijiye, yahan koi doctor ya chemist hai?',
    englishMeaning: 'Please help, is there any doctor or pharmacy nearby?',
    hindiMeaning: 'कृपया मदद कीजिये, यहाँ कोई डॉक्टर या केमिस्ट है?',
    formality: 'Formal-Urgent',
    culturalContext: 'Using "Kripya madad kijiye" immediately signals urgency and will cause bystanders in India to rally and assist immediately.',
    whenToUse: 'Sudden illness, feeling faint, or seeking an urgent pharmacy.',
    whenNotToUse: 'Casual non-emergencies.',
    avoidSaying: 'Koi sun raha hai kya?! (Panicky and unclear)',
    betterAlternative: 'Emergency hai bhaiya, paas mein hospital kahan hai?',
    audioSpeed: 0.9,
    keywords: ['emergency', 'doctor', 'help', 'chemist', 'madad']
  },
  {
    id: 'emerg-hi-2',
    languageId: 'hi',
    category: 'emergency',
    proficiency: 'intermediate',
    targetPhrase: 'मेरा बटुआ कहीं गिर गया है, क्या यहाँ कोई पुलिस चौकी है?',
    transliteration: 'Mera batua kahin gir gaya hai, kya yahan koi police chowki hai?',
    englishMeaning: 'My wallet has dropped somewhere, is there a police booth nearby?',
    hindiMeaning: 'मेरा बटुआ कहीं गिर गया है, क्या यहाँ कोई पुलिस चौकी है?',
    formality: 'Formal',
    culturalContext: '"Police Chowki" refers to a local beat box or small neighborhood police station in India, which is often quicker to reach than a main headquarters.',
    whenToUse: 'Reporting lost documents, phone, or wallet to local authorities.',
    whenNotToUse: 'When everything is safe.',
    avoidSaying: 'Chor chor! (Unless someone actively snatched it in front of you)',
    betterAlternative: 'Bhai sahab, mera wallet kho gaya, complaint kahan darj hogi?',
    audioSpeed: 0.9,
    keywords: ['police', 'lost', 'wallet', 'emergency']
  },

  // ==================== SOCIAL (HINDI) ====================
  {
    id: 'social-hi-1',
    languageId: 'hi',
    category: 'social',
    proficiency: 'beginner',
    targetPhrase: 'नमस्ते अंकल, आप कैसे हैं? घर में सब कुशल-मंगल?',
    transliteration: 'Namaste Uncle, aap kaise hain? Ghar mein sab kushal-mangal?',
    englishMeaning: 'Hello Uncle, how are you? Is everything well and peaceful at home?',
    hindiMeaning: 'नमस्ते अंकल, आप कैसे हैं? घर में सब कुशल-मंगल?',
    formality: 'Formal-Warm',
    culturalContext: 'In Indian culture, asking about the family\'s wellbeing ("Ghar mein sab...") shows genuine care and upbringing (sanskaar). Simply saying "Hi" to an elder feels cold.',
    whenToUse: 'Meeting friends\' parents, neighbors, senior relatives, or community elders.',
    whenNotToUse: 'Never address an Indian elder simply by their first name.',
    avoidSaying: 'What\'s up Ramesh? (Extreme cultural faux pas for elders)',
    betterAlternative: 'Namaste aunty, pranam! Kaise hain aap log?',
    audioSpeed: 0.9,
    keywords: ['namaste', 'elder', 'family', 'greetings', 'respect']
  },
  {
    id: 'social-hi-2',
    languageId: 'hi',
    category: 'social',
    proficiency: 'intermediate',
    targetPhrase: 'चाय बहुत ही स्वादिष्ट बनी है, शुक्रिया!',
    transliteration: 'Chai bahut hi swaadisht bani hai, shukriya!',
    englishMeaning: 'The tea is very delicious, thank you!',
    hindiMeaning: 'चाय बहुत ही स्वादिष्ट बनी है, शुक्रिया!',
    formality: 'Neutral-Warm',
    culturalContext: 'When visiting an Indian household, accepting and praising the chai or snacks is the ultimate compliment to the host\'s hospitality.',
    whenToUse: 'When served tea or snacks at someone\'s home, office, or get-together.',
    whenNotToUse: 'Do not flatly reject hospitality; even a small sip is considered polite.',
    avoidSaying: 'Sugar bohot zyada hai! (Unless asked specifically for medical reasons)',
    betterAlternative: 'Aunty ji, chai ka swaad lajawab hai!',
    audioSpeed: 0.9,
    keywords: ['chai', 'hospitality', 'compliment', 'social']
  },

  // ==================== TAMIL PHRASES ====================
  {
    id: 'travel-ta-1',
    languageId: 'ta',
    category: 'travel',
    proficiency: 'beginner',
    targetPhrase: 'அண்ணா, சென்ட்ரல் ஸ்டேஷன் போவீங்களா?',
    transliteration: 'Anna, Central Station poveengala?',
    englishMeaning: 'Brother, will you go to Central Station?',
    hindiMeaning: 'भैया, क्या आप सेंट्रल स्टेशन चलेंगे?',
    formality: 'Neutral-Polite',
    culturalContext: 'In Tamil Nadu, addressing auto drivers, conductors, and shopkeepers as "Anna" (elder brother) creates warmth and mutual respect.',
    whenToUse: 'Hailing an auto or taxi in Chennai or Coimbatore.',
    whenNotToUse: 'Do not address women as Anna (use Akka).',
    avoidSaying: 'Auto! Nillu! (Stop! - too blunt)',
    betterAlternative: 'Anna, meter poduveengala? (Brother, will you put the meter?)',
    audioSpeed: 0.9,
    keywords: ['anna', 'tamil', 'travel', 'station', 'auto']
  },
  {
    id: 'shop-ta-1',
    languageId: 'ta',
    category: 'shopping',
    proficiency: 'beginner',
    targetPhrase: 'இது என்ன விலை? கொஞ்சம் குறைச்சு கொடுங்க அண்ணா.',
    transliteration: 'Idhu enna vilai? Konjam kuraichu kudunga anna.',
    englishMeaning: 'What is the price of this? Please reduce the price a little, brother.',
    hindiMeaning: 'यह कितने का है? थोड़ा कम कीजिये भैया।',
    formality: 'Neutral-Polite',
    culturalContext: '"Konjam kuraichu kudunga" is the classic friendly bargaining phrase in Tamil Nadu bazaars like T. Nagar or Pondy Bazaar.',
    whenToUse: 'Street shops, flower markets, local garment stalls.',
    whenNotToUse: 'Supermarkets with barcodes.',
    avoidSaying: 'Romba adhigam! (Too loud/aggressive)',
    betterAlternative: 'Anna, regular customer naan, pathu podunga.',
    audioSpeed: 0.9,
    keywords: ['shopping', 'tamil', 'price', 'bargain']
  },

  // ==================== KANNADA PHRASES ====================
  {
    id: 'travel-kn-1',
    languageId: 'kn',
    category: 'travel',
    proficiency: 'beginner',
    targetPhrase: 'ಅಣ್ಣಾ, ಮೆಟ್ರೋ ನಿಲ್ದಾಣಕ್ಕೆ ಹೋಗುತ್ತೀರಾ?',
    transliteration: 'Anna, metro nildanakke hogutteera?',
    englishMeaning: 'Brother, will you go to the metro station?',
    hindiMeaning: 'भैया, क्या आप मेट्रो स्टेशन चलेंगे?',
    formality: 'Neutral-Polite',
    culturalContext: 'In Bengaluru, making an effort to speak basic Kannada with auto drivers ("Anna, hogutteera?") transforms their willingness to help.',
    whenToUse: 'Auto stands and bus stops across Bengaluru and Karnataka.',
    whenNotToUse: 'Do not demand in English without a greeting.',
    avoidSaying: 'Auto, go to Indiranagar now!',
    betterAlternative: 'Anna, Indiranagar ge meter haaki hogona?',
    audioSpeed: 0.9,
    keywords: ['kannada', 'bengaluru', 'travel', 'auto', 'anna']
  },
  {
    id: 'social-kn-1',
    languageId: 'kn',
    category: 'social',
    proficiency: 'beginner',
    targetPhrase: 'ನಮಸ್ಕಾರ, ಊಟ ಆಯ್ತಾ?',
    transliteration: 'Namaskara, oota aayitha?',
    englishMeaning: 'Hello, have you had your meal?',
    hindiMeaning: 'नमस्ते, क्या आपने खाना खा लिया?',
    formality: 'Warm-Friendly',
    culturalContext: '"Oota aayitha?" (Did you eat?) is the signature affectionate Kannada greeting. It functions like "How are you?" and signifies warmth.',
    whenToUse: 'Meeting friends, colleagues after lunchtime, or welcoming guests.',
    whenNotToUse: 'Early morning breakfast time (use "thindi aayitha?" instead for breakfast).',
    avoidSaying: 'Why are you asking about my food? (Cultural misunderstanding)',
    betterAlternative: 'Namaskara! Oota aayithu, neevu oota maadidra?',
    audioSpeed: 0.9,
    keywords: ['kannada', 'namaskara', 'oota', 'social']
  }
];

export const CULTURAL_INSIGHTS = [
  {
    title: 'The Power of "Bhaiya" & "Didi / Akka"',
    description: 'In India, kinship terms are universally used to establish respectful, family-like rapport with service workers, vendors, and strangers. Never feel like you are being overly familiar—it is expected and appreciated.'
  },
  {
    title: 'The Indian Head Wobble Explained',
    description: 'The subtle tilt or head wobble often means "I understand", "acknowledged", or "yes, sure". It is a friendly sign of active listening.'
  },
  {
    title: 'Code-Switching is Natural, Not Broken',
    description: 'Mixing Hindi/regional words with English ("Hinglish", "Tanglish", "Kanglish") is normal in universities, IT workplaces, and urban spaces. Don\'t worry about pure grammar when conversational fluidity matters most.'
  },
  {
    title: 'Respecting Elders & The "Aap" Factor',
    description: 'In Hindi, always use "Aap" (honorific you) rather than "Tum" or "Tu" for anyone older, unfamiliar, or in professional roles. Using "Tu" with an elder can cause unintentional offense.'
  }
];
