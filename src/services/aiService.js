/**
 * AI Service Abstraction Layer
 * Supports both Live Gemini API and Offline Realistic Demo Engine.
 * Configured via VITE_AI_API_KEY or in-app API Key Settings.
 */

// Reads API Key safely from environment or localStorage
export const getStoredApiKey = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('bhashamitra_ai_key');
    if (saved) return saved.trim();
  }
  return (import.meta.env.VITE_AI_API_KEY || '').trim();
};

export const saveStoredApiKey = (key) => {
  if (typeof window !== 'undefined') {
    if (key) {
      localStorage.setItem('bhashamitra_ai_key', key.trim());
    } else {
      localStorage.removeItem('bhashamitra_ai_key');
    }
  }
};

export const isLiveAiAvailable = () => {
  return Boolean(getStoredApiKey());
};

/**
 * Call Gemini 1.5 Flash endpoint if API key exists
 */
const callGeminiApi = async (prompt, systemInstruction = '') => {
  const apiKey = getStoredApiKey();
  if (!apiKey) {
    throw new Error('No API key configured.');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 600
    }
  };

  if (systemInstruction) {
    payload.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `API request failed with status ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Empty response from AI model.');
  }
  return text;
};

/**
 * FEATURE: Generate Roleplay Response
 */
export const generateRoleplayResponse = async ({
  scenario,
  messages,
  userMessage,
  useLiveAi = false
}) => {
  // If Live AI is requested and API key is set
  if (useLiveAi && isLiveAiAvailable()) {
    try {
      const systemInstruction = `You are roleplaying as "${scenario.aiRole}" in "${scenario.location}". The user is a "${scenario.userRole}".
Your character should speak natural Indian English, Hindi, or conversational code-switching (Hinglish).
Keep your reply short (1 to 2 sentences), authentic, and inviting.
Always format your output in valid JSON matching this exact structure:
{
  "response": "Local/Hindi script response",
  "transliteration": "Latin/English phonetic transliteration",
  "english": "English translation"
}`;

      const historyPrompt = messages.map(m => `${m.sender === 'user' ? 'User' : scenario.aiRole}: ${m.text}`).join('\n');
      const prompt = `Current conversation history:\n${historyPrompt}\nUser just said: "${userMessage}"\nRespond in character.`;

      const raw = await callGeminiApi(prompt, systemInstruction);
      // Clean possible markdown code fences
      const cleanJson = raw.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return {
        ...parsed,
        source: 'live-ai'
      };
    } catch (err) {
      console.warn('Live AI failed, falling back to Demo Engine:', err.message);
    }
  }

  // DEMO MODE: Realistic Rule-Based Conversational Engine
  // Simulate natural delay (400ms - 800ms) for realistic UX
  await new Promise(r => setTimeout(r, 600));

  const lowerUser = userMessage.toLowerCase();

  // Check scenario triggers
  if (scenario.demoScript && scenario.demoScript.length > 0) {
    for (const item of scenario.demoScript) {
      const match = item.triggerWords.some(trigger => lowerUser.includes(trigger.toLowerCase()));
      if (match) {
        return {
          response: item.response,
          transliteration: item.transliteration,
          english: item.english,
          source: 'demo-mode'
        };
      }
    }
  }

  // Fallback response for unscripted queries in Demo Mode
  return {
    response: scenario.defaultFallback || 'हाँ जी, बिल्कुल! कहिए आगे क्या करना है?',
    transliteration: 'Haan ji, bilkul! Kahiye aage kya karna hai?',
    english: 'Yes, absolutely! Tell me what next would you like to do?',
    source: 'demo-mode'
  };
};

/**
 * FEATURE: Generate Roleplay Feedback & Rubric
 */
export const generateFeedback = async ({
  scenario,
  messages,
  useLiveAi = false
}) => {
  if (useLiveAi && isLiveAiAvailable()) {
    try {
      const systemInstruction = `You are an expert Indian local language and culture mentor evaluating a roleplay between a learner (${scenario.userRole}) and ${scenario.aiRole}.
Evaluate the conversation on 4 metrics:
1. Relevance (0-100)
2. Language Accuracy (0-100)
3. Formality & Etiquette (0-100)
4. Cultural Context & Nuance
Also suggest 1 better contextual phrase.
Return ONLY valid JSON matching this schema:
{
  "relevanceScore": 92,
  "relevanceComment": "string",
  "languageScore": 88,
  "languageComment": "string",
  "formalityScore": 95,
  "formalityComment": "string",
  "culturalTip": "string",
  "suggestedBetterResponse": "string"
}`;

      const dialogue = messages.map(m => `${m.sender}: ${m.text}`).join('\n');
      const prompt = `Evaluate this dialogue:\n${dialogue}`;
      const raw = await callGeminiApi(prompt, systemInstruction);
      const cleanJson = raw.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return { ...parsed, source: 'live-ai' };
    } catch (err) {
      console.warn('Live feedback generation failed, using demo rubric:', err);
    }
  }

  // DEMO MODE: Realistic Pre-calibrated Feedback
  await new Promise(r => setTimeout(r, 700));
  return {
    ...scenario.feedbackRubric,
    source: 'demo-mode'
  };
};

/**
 * FEATURE: Explain Cultural Context
 */
export const explainCulturalContext = async ({ phrase, context, useLiveAi = false }) => {
  if (useLiveAi && isLiveAiAvailable()) {
    try {
      const prompt = `Explain the cultural nuance and social etiquette behind the phrase "${phrase}". Context: "${context}". Keep explanation concise under 80 words.`;
      const result = await callGeminiApi(prompt);
      return { explanation: result, source: 'live-ai' };
    } catch (err) {
      console.warn('Live cultural explanation failed, falling back to static:', err);
    }
  }

  return {
    explanation: context || 'This phrase is deeply rooted in local Indian social etiquette, ensuring polite and respectful interactions.',
    source: 'demo-mode'
  };
};
