export const ROLEPLAY_SCENARIOS = [
  {
    id: 'shopping-market',
    title: 'Buying Fruit at Local Market',
    category: 'shopping',
    icon: 'ShoppingBag',
    difficulty: 'Beginner',
    summary: 'Practice bargaining politely and asking for UPI payment with a street vendor.',
    userRole: 'College Student',
    aiRole: 'Local Fruit Vendor (Ramesh Bhaiya)',
    avatar: '👨🏽‍🌾',
    location: 'Lajpat Nagar Market, Delhi',
    initialMessage: 'नमस्ते भैया! आइए, ताज़े सेब और केले आए हैं आज ही। क्या चाहिए आपको?',
    initialTransliteration: 'Namaste bhaiya! Aaiye, taaze seb aur kele aaye hain aaj hi. Kya chahiye aapko?',
    initialEnglish: 'Hello brother! Welcome, fresh apples and bananas arrived today. What would you like?',
    suggestedStarters: [
      'Bhaiya, kela kitne rupaye darjan hai?',
      'Seb ka kya bhav lagaya hai?',
      'Sirf 1 kilo chahiye, thoda discount milega?'
    ],
    demoScript: [
      {
        triggerWords: ['kitne', 'kela', 'seb', 'bhav', 'rate', 'price', 'cost', 'how much'],
        response: 'सेब तो ₹120 किलो है भैया, एकदम मीठा कश्मीरी सेब! और केला ₹60 दर्जन है। बताइए कितना तौल दूँ?',
        transliteration: 'Seb toh ₹120 kilo hai bhaiya, ekdam meetha Kashmiri seb! Aur kela ₹60 darjan hai. Bataiye kitna taul doon?',
        english: 'Apples are ₹120 a kilo brother, very sweet Kashmiri apples! And bananas are ₹60 a dozen. Tell me how much should I weigh?'
      },
      {
        triggerWords: ['kam', 'discount', 'sahi', 'daam', 'thoda', 'mehenga', 'expensive', 'bargain'],
        response: 'अरे भैया, आप तो अपने छात्र भाई हो! चलिए आपके लिए ₹10 कम कर देते हैं, ₹110 लगा देंगे। बोलिए, पैक करूँ?',
        transliteration: 'Are bhaiya, aap toh apne chhatra bhai ho! Chaliye aapke liye ₹10 kam kar dete hain, ₹110 laga denge. Boliye, pack karoon?',
        english: 'Oh brother, you are a student brother! Alright, I will reduce ₹10 for you, make it ₹110. Tell me, shall I pack it?'
      },
      {
        triggerWords: ['upi', 'online', 'paytm', 'phonepe', 'gpay', 'cash', 'scanner', 'qr', 'paise'],
        response: 'हाँ भैया, बिल्कुल! सामने देखिए वो क्यूआर कोड लगा है, उसपे स्कैन कर दीजिए। आवाज़ आएगी स्पीकर में।',
        transliteration: 'Haan bhaiya, bilkul! Saamne dekhiye wo QR code laga hai, uspe scan kar dijiye. Aawaaz aayegi speaker mein.',
        english: 'Yes brother, absolutely! Look right in front, the QR code is pasted there, scan on it. The soundbox will chime.'
      },
      {
        triggerWords: ['dhanyawad', 'shukriya', 'thank', 'theek', 'pack', 'ho gaya'],
        response: 'बहुत-बहुत शुक्रिया भैया! फिर आइएगा। आपका दिन शुभ रहे!',
        transliteration: 'Bahut-bahut shukriya bhaiya! Phir aaiyega. Aapka din shubh rahe!',
        english: 'Thank you very much brother! Do come again. Have a great day!'
      }
    ],
    defaultFallback: 'अच्छा भैया, बात समझ गया। बताइए फल कौन सा पैक करना है या पैसे कैसे देंगे?',
    feedbackRubric: {
      relevanceScore: 92,
      relevanceComment: 'Your questions addressed pricing, polite bargaining, and modern digital payment naturally.',
      languageScore: 88,
      languageComment: 'Great usage of contextual conversational Hindi with natural code-switching.',
      formalityScore: 95,
      formalityComment: 'Using "Bhaiya" and respectful tone with the vendor hit the sweet spot of Indian bazaar etiquette.',
      culturalTip: 'In Indian local markets, asking for a small friendly concession ("chhatra discount" or "regular customer discount") is welcomed warmly when asked politely.',
      suggestedBetterResponse: 'Bhaiya, kela ₹50 darjan laga dijiye, regular leke jaate hain aapse!'
    }
  },
  {
    id: 'directions-metro',
    title: 'Asking for Directions to Metro Station',
    category: 'travel',
    icon: 'MapPin',
    difficulty: 'Beginner',
    summary: 'Ask a local resident or tea vendor for directions when Google Maps is ambiguous.',
    userRole: 'New Resident / Tourist',
    aiRole: 'Local Chai Stall Owner (Sunil Ji)',
    avatar: '☕',
    location: 'MG Road Junction',
    initialMessage: 'हाँ जी भाई साहब! कहिए, गर्मागर्म चाय बनाऊँ या कुछ रास्ता ढूंढ रहे हैं?',
    initialTransliteration: 'Haan ji bhai sahab! Kahiye, garam-garam chai banaoon ya kuch raasta dhoondh rahe hain?',
    initialEnglish: 'Yes brother! Tell me, shall I brew hot tea or are you looking for some direction?',
    suggestedStarters: [
      'Bhai sahab, metro station yahan se kitni door hai?',
      'Kya metro station paidal ja sakte hain?',
      'Nearest bus stop kidhar padega?'
    ],
    demoScript: [
      {
        triggerWords: ['metro', 'station', 'door', 'distance', 'far', 'where', 'kahan', 'kitni'],
        response: 'मेट्रो स्टेशन यहाँ से ज्यादा दूर नहीं है भैया। यहाँ से सीधा जाइए, पहले लाल बत्ती से बाएँ मुड़ जाना। मुश्किल से 500 मीटर है।',
        transliteration: 'Metro station yahan se zyada door nahi hai bhaiya. Yahan se seedha jaiye, pehle laal batti se baayein mud jaana. Mushkil se 500 meter hai.',
        english: 'The metro station is not far from here brother. Go straight from here, take a left from the first traffic signal. Hardly 500 meters.'
      },
      {
        triggerWords: ['paidal', 'walk', 'auto', 'rickshaw', 'rickshaw', 'cycle'],
        response: 'हाँ, बिल्कुल पैदल जा सकते हैं! 5 मिनट का रास्ता है। वैसे अगर धूप लग रही हो तो कोने से ₹10 वाला ई-रिक्शा भी मिल जाएगा।',
        transliteration: 'Haan, bilkul paidal ja sakte hain! 5 minute ka raasta hai. Waise agar dhoop lag rahi ho toh kone se ₹10 wala e-rickshaw bhi mil jaayega.',
        english: 'Yes, you can easily walk! It is a 5-minute walk. However if it feels too sunny, you will also get a ₹10 shared e-rickshaw right around the corner.'
      },
      {
        triggerWords: ['shukriya', 'thank', 'dhanyawad', 'tea', 'chai', 'shukriya'],
        response: 'कोई बात नहीं भैया, कभी भी पूछिए! चाय पीते जाइएगा अगली बार!',
        transliteration: 'Koi baat nahi bhaiya, kabhi bhi poochiye! Chai peete jaiyega agli baar!',
        english: 'No problem at all brother, ask anytime! Do stop by for tea next time!'
      }
    ],
    defaultFallback: 'जी भाई साहब, बस सीधा जाके किसी से भी पूछ लीजिएगा, सब बता देंगे।',
    feedbackRubric: {
      relevanceScore: 94,
      relevanceComment: 'Inquired accurately about landmark, distance, and transit modes.',
      languageScore: 90,
      languageComment: 'Smooth code-switching between English navigation terms and Hindi polite requests.',
      formalityScore: 92,
      formalityComment: 'Addressed the stall owner respectfully with "Bhai sahab".',
      culturalTip: 'Local tea vendors (chaiwalas) are India\'s most reliable, friendly offline GPS. Greeting them warmly always yields the most accurate local shortcuts.',
      suggestedBetterResponse: 'Bhai sahab, metro station ke liye seedha jaana hai ya koi shortcut hai?'
    }
  },
  {
    id: 'college-senior',
    title: 'Asking a Senior for Exam Notes & Guidance',
    category: 'college',
    icon: 'GraduationCap',
    difficulty: 'Intermediate',
    summary: 'Approach a college senior politely in the cafeteria to get semester insights and study material.',
    userRole: 'First Year Student',
    aiRole: 'Final Year Senior (Aman Bhaiya)',
    avatar: '🎒',
    location: 'College Canteen',
    initialMessage: 'अरे हाय! तुम फ़र्स्ट ईयर सीएस ब्रांच के हो ना? कुछ परेशान लग रहे हो, सब ठीक?',
    initialTransliteration: 'Are hi! Tum first year CS branch ke ho na? Kuch pareshaan lag rahe ho, sab theek?',
    initialEnglish: 'Hey! You are from the first-year CS branch right? You look a bit stressed, all good?',
    suggestedStarters: [
      'Aman bhaiya, mid-terms ke notes mil sakte hain kya?',
      'Professor Sharma ke paper ka pattern kaisa hota hai?',
      'Campus coding club join karna tha, guidance chahiye thi.'
    ],
    demoScript: [
      {
        triggerWords: ['notes', 'exam', 'midterm', 'study', 'padhai', 'book', 'syllabus'],
        response: 'हाँ यार, बिल्कुल चिंता मत करो! मेरे पास पिछले साल के पूरे हैंड-रिटन नोट्स और क्वेश्चन बैंक की ड्राइव लिंक है। अभी व्हाट्सएप कर दूँ?',
        transliteration: 'Haan yaar, bilkul chinta mat karo! Mere paas pichle saal ke poore hand-written notes aur question bank ki drive link hai. Abhi WhatsApp kar doon?',
        english: 'Yes yaar, do not worry at all! I have last year\'s entire handwritten notes and question bank drive link. Shall I WhatsApp it to you right now?'
      },
      {
        triggerWords: ['club', 'hackathon', 'coding', 'project', 'tcs', 'interview'],
        response: 'अरे बहुत बढ़िया! हमारे कॉलेज की टेक सोसाइटी जॉइन कर लो। इस वीकेंड हैकाथॉन की मेंटरशिप वर्कशॉप है, तुम भी आ जाना!',
        transliteration: 'Are bahut badhiya! Hamaare college ki tech society join kar lo. Is weekend hackathon ki mentorship workshop hai, tum bhi aa jaana!',
        english: 'Oh that is wonderful! Join our college tech society. This weekend we have a hackathon mentorship workshop, you come as well!'
      },
      {
        triggerWords: ['thank', 'shukriya', 'number', 'link', 'great'],
        response: 'चिल करो भाई! कोई भी दिक्कत हो तो सीधे 3rd फ्लोर लैब में आ जाना, सब सीनियर्स हेल्प कर देंगे।',
        transliteration: 'Chill karo bhai! Koi bhi dikkat ho toh seedhe 3rd floor lab mein aa jaana, sab seniors help kar denge.',
        english: 'Chill out bro! Any issue, directly come to 3rd floor lab, all seniors will help out.'
      }
    ],
    defaultFallback: 'हाँ भाई, बिंदास पूछो, सीनियर्स का काम ही है जूनियर्स की मदद करना!',
    feedbackRubric: {
      relevanceScore: 95,
      relevanceComment: 'Approached the senior with realistic student queries regarding notes and mentorship.',
      languageScore: 92,
      languageComment: 'Authentic Indian college slang ("bhaiya", "chill karo", "notes") seamlessly blended with English.',
      formalityScore: 90,
      formalityComment: 'Strikes the ideal balance between deference ("Aman bhaiya") and peer warmth ("yaar").',
      culturalTip: 'In Indian colleges, addressing immediate seniors as "Bhaiya" or "Didi" rather than "Sir/Ma\'am" creates warm mentoring relationships that last throughout your career.',
      suggestedBetterResponse: 'Bhaiya agar aap free hon toh 5 minute mid-term strategy samjha denge?'
    }
  },
  {
    id: 'emergency-chemist',
    title: 'Urgent Medicine at Pharmacy',
    category: 'emergency',
    icon: 'AlertTriangle',
    difficulty: 'Intermediate',
    summary: 'Explain symptoms politely and ask the chemist for urgent medicine and dosage advice.',
    userRole: 'Patient / Friend',
    aiRole: 'Pharmacist (Mr. Verma)',
    avatar: '💊',
    location: '24x7 Apollo Pharmacy',
    initialMessage: 'नमस्ते जी। कहिए, क्या तकलीफ़ है? डॉक्टर का पर्चा है या कोई दवाई चाहिए?',
    initialTransliteration: 'Namaste ji. Kahiye, kya takleef hai? Doctor ka parcha hai ya koi dawai chahiye?',
    initialEnglish: 'Hello. Tell me, what is the trouble? Do you have a doctor\'s prescription or need some medicine?',
    suggestedStarters: [
      'Bhaiya, pet mein bohot dard hai subah se.',
      'Sir dard aur halka bukhar hai, koi dawai de dijiye.',
      'Yeh dawai din mein kitni baar leni hai?'
    ],
    demoScript: [
      {
        triggerWords: ['dard', 'pain', 'pet', 'stomach', 'sir', 'headache', 'bukhar', 'fever'],
        response: 'ये पैरासिटामोल और एंटासिड ले लीजिए। खाना खाने के बाद एक गोली गुनगुने पानी से ले लीजिएगा। अगर कल तक आराम न मिले तो डॉक्टर को ज़रूर दिखाइएगा।',
        transliteration: 'Ye paracetamol aur antacid le lijiye. Khaana khaane ke baad ek goli gungune paani se le lijiyega. Agar kal tak aaraam na mile toh doctor ko zaroor dikhaiyega.',
        english: 'Take this paracetamol and antacid. Take one tablet with lukewarm water after meals. If you don\'t feel relief by tomorrow, definitely consult a doctor.'
      },
      {
        triggerWords: ['kitni', 'baar', 'how many', 'dose', 'time', 'khaana', 'pani'],
        response: 'सुबह और शाम, दिन में दो बार, खाना खाने के आधे घंटे बाद। खाली पेट मत लीजिएगा।',
        transliteration: 'Subah aur shaam, din mein do baar, khaana khaane ke aadhe ghante baad. Khaali pet mat lijiyega.',
        english: 'Morning and evening, twice a day, half an hour after food. Do not take on an empty stomach.'
      },
      {
        triggerWords: ['kitna', 'hua', 'cost', 'upi', 'bill', 'paise'],
        response: 'कुल ₹45 हुए हैं भैया। क्यूआर कोड काउंटर पर लगा है, स्कैन कर लीजिए।',
        transliteration: 'Kul ₹45 huye hain bhaiya. QR code counter par laga hai, scan kar lijiye.',
        english: 'Total is ₹45 brother. The QR code is on the counter, please scan.'
      }
    ],
    defaultFallback: 'जी, दवाई बिल्कुल सही समय पर लीजिएगा और पानी ज्यादा पीजिएगा।',
    feedbackRubric: {
      relevanceScore: 96,
      relevanceComment: 'Explained the health symptoms clearly and verified dosage instructions responsibly.',
      languageScore: 92,
      languageComment: 'Appropriate medical terminology mixed with respectful Hindi queries.',
      formalityScore: 95,
      formalityComment: 'Formal and clear, essential for healthcare interactions in India.',
      culturalTip: 'In India, local pharmacists often serve as the first point of contact for minor health queries. Always asking "khana khane ke baad ya pehle?" (after food or before?) is standard practice.',
      suggestedBetterResponse: 'Bhaiya, yeh dawai khali pet leni hai ya khana khane ke baad?'
    }
  },
  {
    id: 'social-guest',
    title: 'Visiting a Friend\'s Family Home',
    category: 'social',
    icon: 'Users',
    difficulty: 'Intermediate',
    summary: 'Enter an Indian household, greet the parents respectfully, accept tea, and engage in cordial conversation.',
    userRole: 'Friend / Guest',
    aiRole: 'Friend\'s Mother (Aunty Ji)',
    avatar: '🥻',
    location: 'Family Living Room',
    initialMessage: 'अरे बेटा! आओ आओ, अंदर आ जाओ! रोहन बता रहा था कि तुम दोनों साथ में प्रोजेक्ट कर रहे हो। बैठो, पानी लाती हूँ।',
    initialTransliteration: 'Are beta! Aao aao, andar aa jao! Rohan bata raha tha ki tum dono saath mein project kar rahe ho. Baitho, paani laati hoon.',
    initialEnglish: 'Oh child! Come in, come inside! Rohan was mentioning that both of you are doing a project together. Please sit, I will bring water.',
    suggestedStarters: [
      'Namaste Aunty ji, pranaam! Kaise hain aap log?',
      'Shukriya Aunty ji, takleef mat kijiye.',
      'Ghar bohot sundar sajaya hai aapne!'
    ],
    demoScript: [
      {
        triggerWords: ['namaste', 'pranam', 'pranaam', 'kaise', 'uncle', 'ghar'],
        response: 'जीते रहो बेटा! हम सब बहुत अच्छे हैं। तुमने रास्ते में कोई तकलीफ़ तो नहीं हुई? अदरक वाली कड़क चाय पियोगे या शिकंजी?',
        transliteration: 'Jeete raho beta! Hum sab bahut achhe hain. Tumhe raaste mein koi takleef toh nahi hui? Adrak wali kadak chai piyoge ya shikanji?',
        english: 'Stay blessed child! We all are very well. You didn\'t face any trouble on the way? Will you have strong ginger tea or lemonade?'
      },
      {
        triggerWords: ['chai', 'adrak', 'shikanji', 'pani', 'thoda', 'sweet', 'peeyenge'],
        response: 'अरे बिल्कुल, अभी गरमा-गरम चाय और समोसे बनवाए हैं। शर्माने की बिल्कुल ज़रूरत नहीं है, अपना ही घर समझो!',
        transliteration: 'Are bilkul, abhi garma-garam chai aur samose banwaye hain. Sharmaane ki bilkul zaroorat nahi hai, apna hi ghar samjho!',
        english: 'Oh absolutely, I just had piping hot tea and samosas made. No need to feel shy at all, consider this your own home!'
      },
      {
        triggerWords: ['swaad', 'achhi', 'samosa', 'shukriya', 'tasty', 'aunty', 'delicious'],
        response: 'अरे खुश रहो बेटा! रोहन हमेशा तुम्हारी तारीफ़ करता रहता है। मन लगाकर पढ़ाई करो!',
        transliteration: 'Are khush raho beta! Rohan hamesha tumhari tareef karta rehta hai. Man lagaakar padhai karo!',
        english: 'Oh stay happy child! Rohan always praises you. Study with all your heart!'
      }
    ],
    defaultFallback: 'बेटा, आराम से बैठो, कुछ और नाश्ता लाऊँ?',
    feedbackRubric: {
      relevanceScore: 98,
      relevanceComment: 'Gracefully observed Indian hospitality protocols, greeted with warmth, and complimented the refreshments.',
      languageScore: 94,
      languageComment: 'Exemplary respectful honorifics ("Aunty ji", "Pranam", "Aap").',
      formalityScore: 98,
      formalityComment: 'Shows perfect cultural warmth without being stiffly formal or casually disrespectful.',
      culturalTip: 'In Indian hospitality, guests are treated as divine ("Atithi Devo Bhava"). Politely hesitating once ("takleef mat kijiye") before warmly accepting snacks is the height of Indian etiquette.',
      suggestedBetterResponse: 'Aunty ji, chai aur samose lajawab bane hain, bahut-bahut shukriya!'
    }
  }
];
