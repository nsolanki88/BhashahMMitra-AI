/**
 * Speech Service: Multi-Tier Pronunciation & Speech Engine
 * Tier 1: High-Fidelity Web Audio (Native Pronunciation for Indian languages)
 * Tier 2: Browser SpeechSynthesis (Web Speech API) with Voice Matching & Transliteration Fallback
 * STT: SpeechRecognition with browser support detection and error handling
 */

// Active utterance reference to prevent V8 garbage-collection bugs
let activeUtterances = new Set();
let cachedVoices = [];
let activeAudioElement = null;

// Initialize and cache browser voices
const loadVoices = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  try {
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      cachedVoices = voices;
    }
  } catch (e) {
    console.warn('Voice loading notice:', e);
  }
  return cachedVoices;
};

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}

export const isSpeechSynthesisSupported = () => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

export const isSpeechRecognitionSupported = () => {
  return typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
};

/**
 * Finds the best matching voice for a given locale
 */
export const getBestVoice = (locale = 'hi-IN') => {
  const voices = cachedVoices.length > 0 ? cachedVoices : loadVoices();
  const langPrefix = locale.split('-')[0].toLowerCase();

  // 1. Exact match (e.g. 'hi-IN')
  let matched = voices.find(v => v.lang.toLowerCase() === locale.toLowerCase());
  if (matched) return { voice: matched, isNative: true };

  // 2. Prefix match (e.g. 'hi')
  matched = voices.find(v => v.lang.toLowerCase().startsWith(langPrefix));
  if (matched) return { voice: matched, isNative: true };

  // 3. Indian English accent (e.g. 'en-IN' or 'India')
  matched = voices.find(v =>
    v.lang.toLowerCase() === 'en-in' ||
    v.lang.toLowerCase().includes('in') ||
    v.name.toLowerCase().includes('india')
  );
  if (matched) return { voice: matched, isNative: false };

  // 4. Default OS voice
  matched = voices.find(v => v.default) || voices[0];
  return { voice: matched, isNative: false };
};

/**
 * Tier 1: Plays audio via Google TTS CDN (Authentic Indian language pronunciations)
 */
const playWebAudioTts = (text, languageCode = 'hi') => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('No window'));
      return;
    }

    try {
      stopSpeech();

      // Clean text: strip special punctuation
      const clean = text.replace(/[।.,?!;:'"()–—_\[\]{}]/g, '').trim();
      if (!clean) {
        resolve(true);
        return;
      }

      // Map language ID to TTS language code
      const langMap = {
        hi: 'hi',
        ta: 'ta',
        te: 'te',
        kn: 'kn',
        bn: 'bn',
        mr: 'mr'
      };
      const tl = langMap[languageCode] || 'hi';

      const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${encodeURIComponent(clean)}`;
      const audio = new Audio(url);
      activeAudioElement = audio;

      let hasFinished = false;

      // 6-second safety timeout in case of network stall
      const timeout = setTimeout(() => {
        if (!hasFinished) {
          hasFinished = true;
          activeAudioElement = null;
          resolve(false);
        }
      }, 6000);

      audio.onended = () => {
        if (!hasFinished) {
          hasFinished = true;
          clearTimeout(timeout);
          activeAudioElement = null;
          resolve(true);
        }
      };

      audio.onerror = (e) => {
        if (!hasFinished) {
          hasFinished = true;
          clearTimeout(timeout);
          activeAudioElement = null;
          reject(e);
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          if (!hasFinished) {
            hasFinished = true;
            clearTimeout(timeout);
            activeAudioElement = null;
            reject(err);
          }
        });
      }
    } catch (err) {
      activeAudioElement = null;
      reject(err);
    }
  });
};

/**
 * Tier 2: Browser SpeechSynthesis (Web Speech API)
 * If no native language voice is installed on OS, falls back to pronouncing the transliteration.
 */
const playBrowserSynthesis = (textToSpeak, locale = 'hi-IN', rate = 0.9) => {
  return new Promise((resolve) => {
    if (!isSpeechSynthesisSupported()) {
      resolve(false);
      return;
    }

    try {
      // Resume if stuck in paused state
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = rate;
      utterance.pitch = 1.0;

      const { voice, isNative } = getBestVoice(locale);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang || locale;
      } else {
        utterance.lang = locale;
      }

      // Track utterance in Set to prevent V8 garbage-collection bugs
      activeUtterances.add(utterance);

      let finished = false;
      const cleanup = () => {
        if (!finished) {
          finished = true;
          activeUtterances.delete(utterance);
          clearTimeout(safetyTimeout);
        }
      };

      // Safety timeout: 7 seconds max for an utterance
      const safetyTimeout = setTimeout(() => {
        cleanup();
        resolve(true);
      }, 7000);

      utterance.onend = () => {
        cleanup();
        resolve(true);
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis notice:', e.error || e);
        cleanup();
        resolve(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Browser synthesis failed:', e);
      resolve(false);
    }
  });
};

/**
 * Universal Speak Function:
 * Intelligently combines Tier 1 (CDN Audio) and Tier 2 (Browser Synthesis)
 * Guaranteed to produce clear audio feedback without freezing.
 */
export const speakPhrase = async ({
  text = '',
  transliteration = '',
  locale = 'hi-IN',
  rate = 0.9,
  languageId = 'hi'
}) => {
  stopSpeech();

  // 1. Try High-Fidelity Web Audio first for native script
  if (text) {
    try {
      const ok = await playWebAudioTts(text, languageId);
      if (ok) return true;
    } catch (e) {
      // Network/CORS fallback, proceed to Tier 2
    }
  }

  // 2. Tier 2: Check if browser has a native voice installed for this language
  const { isNative } = getBestVoice(locale);

  // If browser has a native voice (e.g. Hindi Lekha or Tamil), speak native text
  // If browser only has English voice, speak the Romanized transliteration so it's clearly pronounced!
  const textForSynthesis = isNative ? (text || transliteration) : (transliteration || text);

  return await playBrowserSynthesis(textForSynthesis, locale, rate);
};

/**
 * Backward compatible simple speakText wrapper
 */
export const speakText = async (text, locale = 'hi-IN', rate = 0.9) => {
  return await speakPhrase({ text, transliteration: text, locale, rate });
};

/**
 * Stop any active audio or synthesis immediately
 */
export const stopSpeech = () => {
  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
    } catch {}
    activeAudioElement = null;
  }

  if (isSpeechSynthesisSupported()) {
    try {
      window.speechSynthesis.cancel();
      activeUtterances.clear();
    } catch {}
  }
};

/**
 * Speech Recognition Helper
 */
export const createSpeechRecognizer = ({
  locale = 'hi-IN',
  onResult,
  onError,
  onEnd,
  onStart
}) => {
  if (!isSpeechRecognitionSupported()) {
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = locale;

  recognition.onstart = () => {
    if (onStart) onStart();
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    const currentText = finalTranscript || interimTranscript;
    if (onResult && currentText) {
      onResult(currentText.trim(), !!finalTranscript);
    }
  };

  recognition.onerror = (event) => {
    console.warn('Speech recognition warning:', event.error);
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  return recognition;
};
