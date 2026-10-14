import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Mic,
  MicOff,
  Keyboard,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Info,
  ArrowRight,
  ArrowLeft,
  Sliders,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useUser } from '../../context/UserContext';
import { PHRASES_DATABASE } from '../../data/phrasesData';
import { SUPPORTED_LANGUAGES } from '../../data/languagesData';
import {
  speakPhrase,
  stopSpeech,
  isSpeechRecognitionSupported,
  createSpeechRecognizer
} from '../../services/speechService';
import { evaluatePronunciation } from '../../services/pronunciationService';

export const Practice = ({ selectedPhrase, setSelectedPhrase, setActiveTab }) => {
  const { profile, recordPracticeResult } = useUser();

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.id === profile.learningLanguage) || SUPPORTED_LANGUAGES[0];

  // Pick phrase or fallback
  const phrases = PHRASES_DATABASE.filter(p => p.languageId === profile.learningLanguage) || PHRASES_DATABASE;
  const activePhrase = selectedPhrase || phrases[0] || PHRASES_DATABASE[0];

  // States
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(0.9);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isTypingMode, setIsTypingMode] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [evalResult, setEvalResult] = useState(null);
  const [speechError, setSpeechError] = useState(null);

  const recognizerRef = useRef(null);
  const isSupported = isSpeechRecognitionSupported();

  // Reset states when phrase changes
  useEffect(() => {
    setTranscript('');
    setManualInput('');
    setEvalResult(null);
    setSpeechError(null);
    stopSpeech();
    if (isRecording && recognizerRef.current) {
      try { recognizerRef.current.stop(); } catch {}
    }
  }, [activePhrase.id]);

  const handlePlayAudio = async (textToPlay = null) => {
    setIsPlayingAudio(true);
    try {
      await speakPhrase({
        text: textToPlay || activePhrase.targetPhrase,
        transliteration: activePhrase.transliteration,
        locale: currentLang.speechLocale,
        rate: audioSpeed,
        languageId: activePhrase.languageId || profile.learningLanguage
      });
    } finally {
      setIsPlayingAudio(false);
    }
  };

  const startVoiceRecording = () => {
    setSpeechError(null);
    setTranscript('');
    setEvalResult(null);

    if (!isSupported) {
      setSpeechError('Speech Recognition is not supported on this browser. Please use the text input below.');
      setIsTypingMode(true);
      return;
    }

    try {
      const recognizer = createSpeechRecognizer({
        locale: currentLang.speechLocale,
        onStart: () => setIsRecording(true),
        onResult: (currentText, isFinal) => {
          setTranscript(currentText);
          if (isFinal) {
            handleRunEvaluation(currentText);
          }
        },
        onError: (err) => {
          setIsRecording(false);
          if (err === 'not-allowed') {
            setSpeechError('Microphone permission was denied. Please allow microphone access in your browser settings.');
          } else if (err === 'no-speech') {
            setSpeechError('No speech detected. Please speak clearly into the microphone.');
          } else {
            setSpeechError(`Speech recognition notice: ${err}. You can also type your pronunciation.`);
          }
        },
        onEnd: () => {
          setIsRecording(false);
        }
      });

      if (recognizer) {
        recognizerRef.current = recognizer;
        recognizer.start();
      }
    } catch (e) {
      setIsRecording(false);
      setSpeechError('Could not initialize speech recognition. Please try typing instead.');
      setIsTypingMode(true);
    }
  };

  const stopVoiceRecording = () => {
    if (recognizerRef.current) {
      try {
        recognizerRef.current.stop();
      } catch {}
    }
    setIsRecording(false);

    if (transcript && !evalResult) {
      handleRunEvaluation(transcript);
    }
  };

  const handleRunEvaluation = (spokenText) => {
    const textToEvaluate = spokenText || manualInput || transcript;
    if (!textToEvaluate.trim()) return;

    const result = evaluatePronunciation(
      textToEvaluate,
      activePhrase.targetPhrase,
      activePhrase.transliteration
    );

    setEvalResult(result);

    // Save to user stats
    recordPracticeResult({
      phrase: activePhrase.targetPhrase,
      score: result.score,
      category: activePhrase.category
    });

    // Trigger celebration if high score
    if (result.score >= 85) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  const handleReset = () => {
    setTranscript('');
    setManualInput('');
    setEvalResult(null);
    setSpeechError(null);
  };

  // Navigate next/prev phrase
  const currentIndex = phrases.findIndex(p => p.id === activePhrase.id);
  const handleNextPhrase = () => {
    const nextIdx = (currentIndex + 1) % phrases.length;
    setSelectedPhrase(phrases[nextIdx]);
  };
  const handlePrevPhrase = () => {
    const prevIdx = (currentIndex - 1 + phrases.length) % phrases.length;
    setSelectedPhrase(phrases[prevIdx]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      
      {/* Top Navigation & Phrase Switcher */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
            Practice Module
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Pronunciation & Fluency Lab
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPhrase}
            disabled={phrases.length <= 1}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40"
            title="Previous phrase"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold text-slate-500">
            {currentIndex + 1} of {phrases.length}
          </span>
          <button
            onClick={handleNextPhrase}
            disabled={phrases.length <= 1}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40"
            title="Next phrase"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Target Phrase Hero Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 relative overflow-hidden">
        
        {/* Category & Formality Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              {activePhrase.category.toUpperCase()}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              {activePhrase.formality}
            </span>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Sliders className="w-3.5 h-3.5" />
            <span>Audio Speed:</span>
            <button
              onClick={() => setAudioSpeed(s => (s === 0.9 ? 0.75 : 0.9))}
              className="px-2 py-0.5 rounded font-bold bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              {audioSpeed === 0.75 ? '0.75x (Slow)' : '0.9x (Normal)'}
            </button>
          </div>
        </div>

        {/* Large Target Phrase Display */}
        <div className="text-center py-4 space-y-3">
          <p className="text-xs uppercase tracking-widest font-semibold text-slate-400">
            Target Phrase
          </p>
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {activePhrase.targetPhrase}
            </h2>
            <button
              onClick={() => handlePlayAudio(activePhrase.targetPhrase)}
              disabled={isPlayingAudio}
              className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors shadow-xs"
              title="Play Native Pronunciation"
            >
              <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'animate-bounce text-indigo-600' : ''}`} />
            </button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-base sm:text-lg font-semibold text-indigo-600 italic">
              "{activePhrase.transliteration}"
            </p>
            <button
              onClick={() => handlePlayAudio(activePhrase.transliteration)}
              disabled={isPlayingAudio}
              className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
              title="Play Transliteration Pronunciation"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            <strong>Meaning:</strong> {activePhrase.englishMeaning}
          </p>
        </div>

        {/* Cultural Context Note */}
        <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-amber-900 block mb-0.5">Cultural Usage Note:</strong>
            {activePhrase.culturalContext}
          </div>
        </div>

        {/* Primary Interaction Buttons (Listen & Speak) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          
          {/* Listen Button */}
          <button
            onClick={() => handlePlayAudio()}
            disabled={isPlayingAudio}
            className="w-full sm:w-auto min-w-[170px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all shadow-sm active:scale-95"
          >
            <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'text-indigo-600 animate-bounce' : 'text-slate-600'}`} />
            <span>{isPlayingAudio ? 'Playing Audio...' : '🔊 Listen First'}</span>
          </button>

          {/* Speak Button (or Stop Recording) */}
          {!isRecording ? (
            <button
              onClick={startVoiceRecording}
              className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 transition-all active:scale-95 group"
            >
              <Mic className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              <span>🎤 Click to Speak</span>
            </button>
          ) : (
            <button
              onClick={stopVoiceRecording}
              className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/25 transition-all animate-pulse active:scale-95"
            >
              <MicOff className="w-5 h-5 text-white" />
              <span>⏹️ Stop Recording</span>
            </button>
          )}

          {/* Type Instead Toggle */}
          <button
            onClick={() => setIsTypingMode(!isTypingMode)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <Keyboard className="w-4 h-4 text-slate-400" />
            <span>{isTypingMode ? 'Hide Type Option' : '⌨️ Type Instead'}</span>
          </button>

        </div>

        {/* Live Recording Pulse Banner */}
        {isRecording && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-center animate-fadeIn">
            <div className="flex items-center justify-center gap-2 text-indigo-700 font-bold text-sm mb-1">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span>Listening... Speak the phrase clearly into your mic</span>
            </div>
            <p className="text-xs text-indigo-900/70">
              Say: "{activePhrase.transliteration}" or "{activePhrase.targetPhrase}"
            </p>
            {transcript && (
              <p className="mt-2 text-sm font-semibold text-slate-800 bg-white/80 py-1.5 px-3 rounded-lg border border-indigo-100 inline-block">
                Recognized: "{transcript}"
              </p>
            )}
          </div>
        )}

        {/* Browser Speech API Warning / Fallback Notice */}
        {speechError && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-2.5 animate-fadeIn">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">{speechError}</p>
              <p className="text-amber-800">
                You can type the phrase below to test transcript evaluation without a microphone.
              </p>
            </div>
          </div>
        )}

        {/* Text Input Fallback / Alternative */}
        {isTypingMode && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Keyboard className="w-4 h-4 text-indigo-600" />
                Type Spoken Transcript (English transliteration or native script):
              </label>
              <button
                onClick={() => setManualInput(activePhrase.transliteration)}
                className="text-[11px] font-semibold text-indigo-600 hover:underline"
              >
                Insert sample correct speech
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="e.g. Aap kaise hain? or Bhaiya metro station chalenge..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                onKeyDown={(e) => e.key === 'Enter' && handleRunEvaluation(manualInput)}
              />
              <button
                onClick={() => handleRunEvaluation(manualInput)}
                disabled={!manualInput.trim()}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-colors shadow-sm"
              >
                Evaluate
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Evaluation & Pronunciation Feedback Section */}
      {evalResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 animate-fadeIn">
          
          {/* Header Score Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-1">
                <Info className="w-3.5 h-3.5 text-indigo-600" />
                <span>Transcript-Based Pronunciation Feedback</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Evaluation Results
              </h3>
            </div>

            {/* Score Pill */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs text-slate-400 font-medium block">Accuracy Score</span>
                <span className={`text-3xl font-black ${
                  evalResult.score >= 85 ? 'text-emerald-600' :
                  evalResult.score >= 60 ? 'text-amber-600' : 'text-rose-600'
                }`}>
                  {evalResult.score}%
                </span>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl ${
                evalResult.score >= 85 ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300' :
                evalResult.score >= 60 ? 'bg-amber-100 text-amber-800 border-2 border-amber-300' :
                'bg-rose-100 text-rose-800 border-2 border-rose-300'
              }`}>
                {evalResult.score >= 85 ? '🎉' : evalResult.score >= 60 ? '👍' : '💪'}
              </div>
            </div>
          </div>

          {/* User's Spoken Transcript */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Your Spoken Transcript:
            </span>
            <p className="text-base font-semibold text-slate-800">
              "{transcript || manualInput}"
            </p>
          </div>

          {/* Word Analysis Chips */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Word-By-Word Breakdown:
            </h4>

            {/* Target Words status */}
            <div className="flex flex-wrap gap-2">
              {evalResult.targetWordsStatus.map((item, idx) => (
                <span
                  key={idx}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold border ${
                    item.status === 'matched'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-rose-50 text-rose-800 border-rose-300 line-through decoration-rose-400'
                  }`}
                >
                  {item.status === 'matched' ? '✓' : '✗'} {item.word}
                </span>
              ))}
            </div>

            {/* Matched / Missing / Extra Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-800 block mb-1">
                  ✓ Matched Words ({evalResult.matchedWords.length})
                </span>
                <p className="text-emerald-950 font-medium">
                  {evalResult.matchedWords.length > 0 ? evalResult.matchedWords.join(', ') : 'None'}
                </p>
              </div>

              <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-200">
                <span className="font-bold text-rose-800 block mb-1">
                  ✗ Missing Words ({evalResult.missingWords.length})
                </span>
                <p className="text-rose-950 font-medium">
                  {evalResult.missingWords.length > 0 ? evalResult.missingWords.join(', ') : 'None'}
                </p>
              </div>

              <div className="bg-slate-100 p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-700 block mb-1">
                  + Extra Words ({evalResult.extraWords.length})
                </span>
                <p className="text-slate-700 font-medium">
                  {evalResult.extraWords.length > 0 ? evalResult.extraWords.join(', ') : 'None'}
                </p>
              </div>
            </div>
          </div>

          {/* Actionable Fluency Feedback Text */}
          <div className="bg-indigo-50/80 rounded-2xl p-4 border border-indigo-100 text-xs text-indigo-950 space-y-1">
            <span className="font-bold text-indigo-900 flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Fluency & Pronunciation Guidance:
            </span>
            <p className="text-indigo-900 leading-relaxed font-medium">
              {evalResult.feedback}
            </p>
          </div>

          {/* Bottom Action: Try Again or Next */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <button
              onClick={handleReset}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Try Again
            </button>

            <button
              onClick={handleNextPhrase}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all"
            >
              Practice Next Phrase
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
