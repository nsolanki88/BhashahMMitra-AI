/**
 * Pronunciation & Fluency Evaluation Service
 * Evaluates spoken transcript against target phrase and transliteration.
 * Note: Clearly labeled as transcript-based pronunciation scoring.
 */

// Cleans text by removing punctuation and extra spaces, converting to lowercase
export const normalizeText = (text = '') => {
  return text
    .toLowerCase()
    .replace(/[।.,?!;:'"()–—_\[\]{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

// Computes Levenshtein Distance for similarity scoring
const levenshteinDistance = (a, b) => {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

// Checks if two words are a close phonetic match
const isWordMatch = (wordA, wordB) => {
  const cleanA = normalizeText(wordA);
  const cleanB = normalizeText(wordB);
  if (cleanA === cleanB) return true;
  if (!cleanA || !cleanB) return false;

  // Allow 1 edit distance for words >= 4 chars
  const dist = levenshteinDistance(cleanA, cleanB);
  if (cleanA.length >= 4 && dist <= 1) return true;
  return false;
};

/**
 * Evaluates user transcript against target phrase.
 * If transliteration is provided, it tries matching against both
 * and selects the better score (handles Speech Recognition returning Latin or Native script).
 */
export const evaluatePronunciation = (userTranscript, targetPhrase, transliteration = '') => {
  if (!userTranscript || !userTranscript.trim()) {
    return {
      score: 0,
      matchedWords: [],
      missingWords: targetPhrase.split(/\s+/),
      extraWords: [],
      feedback: 'No speech recognized. Please tap the microphone and speak aloud.',
      targetWordsStatus: targetPhrase.split(/\s+/).map(w => ({ word: w, status: 'missing' })),
      isTranscriptBased: true
    };
  }

  const evalNative = runTokenComparison(userTranscript, targetPhrase);
  let bestEval = evalNative;

  if (transliteration) {
    const evalTranslit = runTokenComparison(userTranscript, transliteration);
    if (evalTranslit.score > evalNative.score) {
      bestEval = evalTranslit;
    }
  }

  // Generate specific feedback commentary
  let feedback = '';
  if (bestEval.score >= 90) {
    feedback = 'Outstanding pronunciation! Clear delivery, rhythm, and accurate vocabulary.';
  } else if (bestEval.score >= 75) {
    if (bestEval.missingWords.length > 0) {
      feedback = `Very close! You missed ${bestEval.missingWords.length === 1 ? `the word "${bestEval.missingWords[0]}"` : `a few words (${bestEval.missingWords.slice(0, 2).join(', ')})`}.`;
    } else if (bestEval.extraWords.length > 0) {
      feedback = `Good attempt! You added extra filler words (${bestEval.extraWords.slice(0, 2).join(', ')}). Focus on crisp cadence.`;
    } else {
      feedback = 'Great job! Minor enunciation variations detected.';
    }
  } else if (bestEval.score >= 50) {
    feedback = `Good start! Recognized ${bestEval.matchedWords.length} out of ${bestEval.targetTokens.length} words. Try speaking slightly slower and emphasizing key vowel sounds.`;
  } else {
    feedback = `Recognized "${userTranscript.slice(0, 40)}...". Let's listen to the audio guide again and practice phrase by phrase.`;
  }

  return {
    ...bestEval,
    feedback,
    isTranscriptBased: true
  };
};

const runTokenComparison = (userTranscript, referenceText) => {
  const normUser = normalizeText(userTranscript);
  const normRef = normalizeText(referenceText);

  const rawUserTokens = userTranscript.trim().split(/\s+/).filter(Boolean);
  const rawRefTokens = referenceText.trim().split(/\s+/).filter(Boolean);

  const userTokens = normUser.split(' ').filter(Boolean);
  const refTokens = normRef.split(' ').filter(Boolean);

  const matchedWords = [];
  const missingWords = [];
  const extraWords = [];

  const matchedUserIndices = new Set();
  const targetWordsStatus = [];

  // Match reference tokens
  refTokens.forEach((rToken, rIdx) => {
    let foundIndex = -1;
    for (let uIdx = 0; uIdx < userTokens.length; uIdx++) {
      if (!matchedUserIndices.has(uIdx) && isWordMatch(rToken, userTokens[uIdx])) {
        foundIndex = uIdx;
        break;
      }
    }

    const rawRefWord = rawRefTokens[rIdx] || rToken;

    if (foundIndex !== -1) {
      matchedUserIndices.add(foundIndex);
      matchedWords.push(rawRefWord);
      targetWordsStatus.push({ word: rawRefWord, status: 'matched' });
    } else {
      missingWords.push(rawRefWord);
      targetWordsStatus.push({ word: rawRefWord, status: 'missing' });
    }
  });

  // Extra words spoken by user
  userTokens.forEach((uToken, uIdx) => {
    if (!matchedUserIndices.has(uIdx)) {
      extraWords.push(rawUserTokens[uIdx] || uToken);
    }
  });

  // Calculate score
  const totalRef = refTokens.length || 1;
  const matchRatio = matchedWords.length / totalRef;
  const extraPenalty = Math.min(extraWords.length * 0.05, 0.2); // slight penalty for stray words
  const calculatedScore = Math.max(0, Math.min(100, Math.round((matchRatio - extraPenalty) * 100)));

  return {
    score: calculatedScore,
    matchedWords,
    missingWords,
    extraWords,
    targetTokens: rawRefTokens,
    targetWordsStatus
  };
};
