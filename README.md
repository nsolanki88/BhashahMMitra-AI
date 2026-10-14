# BhashaMitra AI 🇮🇳
> *"Speak Local. Speak Confidently."*

**TCS Tech Day AI Hackathon MVP**  
**Problem Statement:** Conversational Local Language and Culture Assistant  
**Team Role:** Senior Full-Stack & AI Engineer, UI/UX Designer & Hackathon Mentor

---

## 🌟 Overview & Problem Solved

Direct translation alone does not prepare students for real conversations in unfamiliar Indian cities. Spoken language varies dramatically by context, formality, accent, regional code-switching, and cultural setting. Incorrect phrasing can lead to confusion or unintended offense.

**BhashaMitra AI** is an intelligent assistant that empowers learners to master practical local-language communication through contextual conversations, cultural etiquette guardrails, browser-based voice interaction, pronunciation scoring, and AI roleplay.

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| **1. Personalized Learning** | Learner profiles track name, native language, target language (Hindi, Tamil, Telugu, Kannada, Bengali, Marathi), proficiency level (Beginner, Intermediate, Advanced), and preferred interaction modes. |
| **2. Situation Phrase Library** | Rich contextual phrases across **✈️ Travel**, **🛍️ Shopping**, **🎓 College**, **🚨 Emergency**, and **🤝 Social**. Each phrase includes native script, transliteration, English & Hindi meanings, formality labels, cultural etiquette notes, when to use, and when NOT to use. |
| **3. Voice Interaction** | Browser-native Web Speech API integration: Speech-to-Text (STT) for voice input and SpeechSynthesis (TTS) with Indian regional accent matching and adjustable audio speeds (0.75x slow / 0.9x normal). Includes graceful fallbacks for unsupported browsers. |
| **4. Transcript-Based Pronunciation Lab** | Word-by-word token alignment comparing spoken transcripts with target phrases. Highlights matched words (green), missing words (rose), extra words, and generates an accuracy percentage score (0-100%) and actionable fluency feedback. |
| **5. Cultural Context & Formality** | Explicit labels for Formal, Neutral, and Informal registers. Highlights kinship terms (*Bhaiya*, *Anna*, *Aunty ji*), bargaining etiquette, campus senior-junior dynamics, and respectful phrasing (*Aap* vs *Tum*). |
| **6. AI Roleplay Practice** | 5 interactive scenarios (Asking for directions, Fruit vendor market, College senior mentorship, Pharmacy emergency, Visiting family home). Interactive chat supporting both voice and text with contextual audio playback. |
| **7. Code-Switching (Hinglish/Tanglish)** | Natural mixed-language understanding (e.g., *"Bhaiya, metro station kahan hai, can you help me?"*). Extensible regional language architecture. |
| **8. Multi-Metric Evaluation Rubric** | Evaluates learner roleplays on 4 dimensions: Conversational Relevance, Language Accuracy, Formality & Etiquette, and Cultural Appropriateness, with suggested native responses. |
| **9. Dual AI Engine Architecture** | Seamless toggle between **Offline Demo Engine** (zero-latency, realistic dialogue trees for offline hackathon judging) and **Live AI Mode** (Google Gemini 1.5 Flash API via `VITE_AI_API_KEY`). |
| **10. Gamified Progress Tracking** | Daily streaks, phrases learned, average pronunciation score, category fluency bars, activity history, and cultural milestone badges stored locally in `localStorage`. |

---

## ⏱️ 2-Minute Hackathon Demonstration Script

Follow this seamless flow during your pitch or jury demo:

1. **Step 1: Profile Setup (15s)**
   - Click the profile avatar in the navbar.
   - Show learner name: *"Aarav Sharma"*, target language: *Hindi*, level: *Beginner*.
2. **Step 2: Dashboard Overview (20s)**
   - Highlight the greeting, 4-day streak, quick metrics, and today's featured phrase.
   - Click the category card **🛍️ Shopping & Markets**.
3. **Step 3: Phrase Library & Cultural Etiquette (30s)**
   - Inspect the phrase: *"Bhaiya, yeh kitne ka hai? Thoda sahi daam lagaiye na."*
   - Point out the **Cultural Context Note** (bargaining as friendly social bonding) and **When NOT to use** (fixed-price malls).
   - Click **🔊 Listen (TTS)** to play native pronunciation.
   - Click **🎤 Practice Speaking** to jump straight into the Lab.
4. **Step 4: Pronunciation & Fluency Lab (30s)**
   - Click **🎤 Click to Speak** and read the phrase (or click **⌨️ Type Instead** if microphone is in a noisy conference room).
   - View the **Accuracy Score**, matched words (green), missing words, and actionable feedback.
5. **Step 5: AI Roleplay Simulation (45s)**
   - Navigate to **Roleplay** tab and select *"Buying Fruit at Local Market"*.
   - Send code-switched response: *"Bhaiya, kela kitne rupaye darjan hai?"*
   - Hear the fruit vendor's voice response.
   - Reply: *"Thoda discount milega kya? UPI chalega?"*
   - Click **🏆 Get Feedback** to generate the comprehensive 4-metric evaluation report.
6. **Step 6: Progress Analytics (15s)**
   - Navigate to **Progress** to showcase category fluency bars, unlocked badges, and practice logs.

---

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite 5
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **Icons:** Lucide React
- **Gamification:** Canvas Confetti
- **Speech Tech:** Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)
- **AI Backend:** Google Gemini 1.5 Flash REST API + Smart Offline Rule Engine

---

## 💻 Running Locally

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build production bundle
npm run build
```

Open `http://localhost:3000` in Google Chrome or any modern Chromium browser (for full Web Speech API compatibility).
