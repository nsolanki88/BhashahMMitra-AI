import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Award,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  MapPin,
  ArrowRight,
  ShieldAlert,
  GraduationCap,
  ShoppingBag,
  Users,
  Info
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { ROLEPLAY_SCENARIOS } from '../../data/scenariosData';
import { SUPPORTED_LANGUAGES } from '../../data/languagesData';
import { speakPhrase, isSpeechRecognitionSupported, createSpeechRecognizer } from '../../services/speechService';
import { generateRoleplayResponse, generateFeedback } from '../../services/aiService';

export const Roleplay = () => {
  const { profile, useLiveAi, recordRoleplayResult } = useUser();

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.id === profile.learningLanguage) || SUPPORTED_LANGUAGES[0];

  const [selectedScenario, setSelectedScenario] = useState(ROLEPLAY_SCENARIOS[0]);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [playingMsgIndex, setPlayingMsgIndex] = useState(null);
  const [feedbackReport, setFeedbackReport] = useState(null);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [micNotice, setMicNotice] = useState(null);

  const messagesEndRef = useRef(null);
  const recognizerRef = useRef(null);

  // Initialize scenario conversation
  useEffect(() => {
    resetConversation(selectedScenario);
  }, [selectedScenario.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiResponding]);

  const resetConversation = (scenario) => {
    setMessages([
      {
        id: 'msg-0',
        sender: 'ai',
        role: scenario.aiRole,
        avatar: scenario.avatar,
        text: scenario.initialMessage,
        transliteration: scenario.initialTransliteration,
        english: scenario.initialEnglish,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputText('');
    setFeedbackReport(null);
    setMicNotice(null);
  };

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim() || isAiResponding) return;

    const userMsg = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      role: selectedScenario.userRole,
      avatar: '🧑‍🎓',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsAiResponding(true);

    try {
      const aiReply = await generateRoleplayResponse({
        scenario: selectedScenario,
        messages: updatedMessages,
        userMessage: userMsg.text,
        useLiveAi
      });

      const aiMsg = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'ai',
        role: selectedScenario.aiRole,
        avatar: selectedScenario.avatar,
        text: aiReply.response,
        transliteration: aiReply.transliteration,
        english: aiReply.english,
        source: aiReply.source,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error generating AI response:', err);
    } finally {
      setIsAiResponding(false);
    }
  };

  // Browser STT for Roleplay
  const toggleListening = () => {
    if (isListening) {
      recognizerRef.current?.stop();
      setIsListening(false);
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      setMicNotice('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    setMicNotice(null);
    try {
      const recognizer = createSpeechRecognizer({
        locale: currentLang.speechLocale,
        onStart: () => setIsListening(true),
        onResult: (currentText, isFinal) => {
          setInputText(currentText);
          if (isFinal) {
            handleSendMessage(currentText);
          }
        },
        onError: (err) => {
          setIsListening(false);
          setMicNotice(`Microphone status: ${err}`);
        },
        onEnd: () => setIsListening(false)
      });

      if (recognizer) {
        recognizerRef.current = recognizer;
        recognizer.start();
      }
    } catch {
      setIsListening(false);
      setMicNotice('Could not start microphone recording.');
    }
  };

  // Play audio for an AI message
  const handlePlayMessageAudio = async (msg, idx) => {
    setPlayingMsgIndex(idx);
    try {
      await speakPhrase({
        text: msg.text,
        transliteration: msg.transliteration,
        locale: currentLang.speechLocale,
        languageId: profile.learningLanguage,
        rate: 0.9
      });
    } finally {
      setPlayingMsgIndex(null);
    }
  };

  // Generate evaluation rubric
  const handleGetFeedback = async () => {
    if (messages.length < 2) return;
    setIsGeneratingFeedback(true);
    try {
      const rubric = await generateFeedback({
        scenario: selectedScenario,
        messages,
        useLiveAi
      });
      setFeedbackReport(rubric);

      // Record to user history
      recordRoleplayResult({
        title: selectedScenario.title,
        score: rubric.relevanceScore,
        category: selectedScenario.category
      });
    } catch (err) {
      console.error('Failed to get feedback:', err);
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  const getScenarioIcon = (id) => {
    switch (id) {
      case 'shopping-market': return ShoppingBag;
      case 'directions-metro': return MapPin;
      case 'college-senior': return GraduationCap;
      case 'emergency-chemist': return ShieldAlert;
      default: return Users;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              AI Conversational Roleplay
            </h1>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
              useLiveAi
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-amber-50 text-amber-800 border-amber-300'
            }`}>
              {useLiveAi ? '✨ Live AI Mode' : '⚡ Local Demo Engine'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Simulate authentic local situations with code-switching and cultural feedback.
          </p>
        </div>

        {/* Feedback / Reset Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => resetConversation(selectedScenario)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Chat
          </button>

          <button
            onClick={handleGetFeedback}
            disabled={messages.length < 2 || isGeneratingFeedback}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm disabled:opacity-40 transition-all"
          >
            <Award className="w-3.5 h-3.5" />
            {isGeneratingFeedback ? 'Analyzing...' : 'Get Feedback'}
          </button>
        </div>
      </div>

      {/* Scenario Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {ROLEPLAY_SCENARIOS.map((sc) => {
          const isSelected = selectedScenario.id === sc.id;
          const Icon = getScenarioIcon(sc.id);
          return (
            <button
              key={sc.id}
              onClick={() => setSelectedScenario(sc)}
              className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{sc.avatar}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {sc.difficulty}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-xs line-clamp-1">{sc.title}</h4>
                <p className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                  Role: {sc.aiRole}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[520px] overflow-hidden">
        
        {/* Scenario Info Bar */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-lg">{selectedScenario.avatar}</span>
            <div>
              <span className="font-bold text-slate-800">{selectedScenario.aiRole}</span>
              <span className="text-slate-400 mx-1.5">•</span>
              <span className="text-slate-500">{selectedScenario.location}</span>
            </div>
          </div>

          <span className="hidden sm:inline-flex text-[11px] font-medium text-slate-500">
            You: <strong>{selectedScenario.userRole}</strong>
          </span>
        </div>

        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg, idx) => {
            const isUser = msg.sender === 'user';
            const isAudioPlaying = playingMsgIndex === idx;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${
                  isUser ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-800'
                }`}>
                  {msg.avatar || (isUser ? '🧑‍🎓' : '🤖')}
                </div>

                {/* Message Bubble */}
                <div className={`rounded-2xl p-4 shadow-xs space-y-1 ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-100 text-slate-900 rounded-tl-none border border-slate-200/70'
                }`}>
                  <div className="flex items-center justify-between gap-3 text-[11px]">
                    <span className={`font-bold ${isUser ? 'text-indigo-100' : 'text-slate-600'}`}>
                      {msg.role}
                    </span>
                    <span className={`text-[10px] ${isUser ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Main Text */}
                  <p className="text-sm font-semibold tracking-wide">
                    {msg.text}
                  </p>

                  {/* Transliteration for AI messages */}
                  {msg.transliteration && !isUser && (
                    <p className="text-xs font-medium text-indigo-600 italic">
                      "{msg.transliteration}"
                    </p>
                  )}

                  {/* English meaning for AI messages */}
                  {msg.english && !isUser && (
                    <p className="text-[11px] text-slate-500 pt-0.5 border-t border-slate-200/50 mt-1">
                      Meaning: {msg.english}
                    </p>
                  )}

                  {/* Listen button for AI message */}
                  {!isUser && (
                    <button
                      onClick={() => handlePlayMessageAudio(msg, idx)}
                      disabled={isAudioPlaying}
                      className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <Volume2 className={`w-3 h-3 ${isAudioPlaying ? 'text-indigo-600 animate-spin' : 'text-slate-500'}`} />
                      {isAudioPlaying ? 'Speaking...' : '🔊 Listen'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isAiResponding && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span>{selectedScenario.aiRole} is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Starter Chips */}
        {selectedScenario.suggestedStarters && (
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              Suggestions:
            </span>
            {selectedScenario.suggestedStarters.map((starter, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(starter)}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50 whitespace-nowrap transition-colors shadow-xs"
              >
                "{starter}"
              </button>
            ))}
          </div>
        )}

        {/* Mic Warning */}
        {micNotice && (
          <div className="px-4 py-1.5 bg-amber-50 border-t border-amber-200 text-[11px] text-amber-800 flex items-center justify-between">
            <span>{micNotice}</span>
            <button onClick={() => setMicNotice(null)} className="text-amber-900 font-bold ml-2">×</button>
          </div>
        )}

        {/* Input Controls Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          {/* Mic Button */}
          <button
            onClick={toggleListening}
            className={`p-2.5 rounded-xl border transition-all ${
              isListening
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title={isListening ? 'Stop listening' : 'Speak using microphone'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-indigo-600" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Reply to ${selectedScenario.aiRole} (mixed English + Hindi supported)...`}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white"
          />

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isAiResponding}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-colors shadow-sm"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Roleplay Evaluation Report Modal / Card */}
      {feedbackReport && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Conversation Analysis
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Roleplay Performance Feedback
              </h3>
            </div>
            <button
              onClick={() => setFeedbackReport(null)}
              className="text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              Close Feedback ✕
            </button>
          </div>

          {/* 3 Metric Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Conversational Relevance
              </span>
              <div className="text-3xl font-black text-emerald-700 my-1">
                {feedbackReport.relevanceScore}%
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                {feedbackReport.relevanceComment}
              </p>
            </div>

            <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-200">
              <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider block">
                Language & Code-Switching
              </span>
              <div className="text-3xl font-black text-indigo-700 my-1">
                {feedbackReport.languageScore}%
              </div>
              <p className="text-xs text-indigo-900 leading-relaxed">
                {feedbackReport.languageComment}
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
              <span className="text-xs font-bold text-purple-800 uppercase tracking-wider block">
                Formality & Etiquette
              </span>
              <div className="text-3xl font-black text-purple-700 my-1">
                {feedbackReport.formalityScore}%
              </div>
              <p className="text-xs text-purple-900 leading-relaxed">
                {feedbackReport.formalityComment}
              </p>
            </div>
          </div>

          {/* Cultural Tip & Suggested Improvement */}
          <div className="space-y-3">
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-900 block mb-0.5">Cultural Appropriateness Note:</strong>
                {feedbackReport.culturalTip}
              </div>
            </div>

            {feedbackReport.suggestedBetterResponse && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-800">
                <strong className="font-bold text-indigo-700 block mb-0.5">Suggested Native Response:</strong>
                <p className="font-semibold text-slate-900 text-sm">
                  "{feedbackReport.suggestedBetterResponse}"
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
