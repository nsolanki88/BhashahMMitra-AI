import React, { useState } from 'react';
import {
  Flame,
  Award,
  Sparkles,
  Volume2,
  Mic,
  ArrowRight,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  Zap,
  Info,
  CheckCircle2
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { PHRASES_DATABASE, CATEGORIES, CULTURAL_INSIGHTS } from '../../data/phrasesData';
import { SUPPORTED_LANGUAGES, PROFICIENCY_LEVELS } from '../../data/languagesData';
import { speakPhrase } from '../../services/speechService';

export const Dashboard = ({ setActiveTab, setSelectedPhraseForPractice, setSelectedCategory }) => {
  const { profile, stats } = useUser();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [dailyTipIndex, setDailyTipIndex] = useState(0);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.id === profile.learningLanguage) || SUPPORTED_LANGUAGES[0];
  const currentProf = PROFICIENCY_LEVELS.find(p => p.id === profile.proficiency) || PROFICIENCY_LEVELS[0];

  // Pick today's featured phrase based on user's target language
  const languagePhrases = PHRASES_DATABASE.filter(p => p.languageId === profile.learningLanguage);
  const featuredPhrase = languagePhrases[0] || PHRASES_DATABASE[0];

  const currentTip = CULTURAL_INSIGHTS[dailyTipIndex % CULTURAL_INSIGHTS.length];

  const handlePlayAudio = async () => {
    setIsPlayingAudio(true);
    try {
      await speakPhrase({
        text: featuredPhrase.targetPhrase,
        transliteration: featuredPhrase.transliteration,
        locale: currentLang.speechLocale,
        languageId: featuredPhrase.languageId || profile.learningLanguage,
        rate: 0.9
      });
    } finally {
      setIsPlayingAudio(false);
    }
  };

  const handlePracticeThisPhrase = (phrase) => {
    setSelectedPhraseForPractice(phrase);
    setActiveTab('practice');
  };

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    setActiveTab('learn');
  };

  // Dynamic time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-sm border border-white/15 text-orange-300">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>TCS AI Hackathon Demo</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {getGreeting()}, {profile.name} 👋
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl">
              Ready to practice real-life conversations? Speak like a local with contextual phrases, cultural nuance, and speech feedback.
            </p>

            {/* Quick Status Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-white/10 border border-white/20 text-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Learning: <strong className="text-white">{currentLang.name} ({currentLang.nativeName})</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-white/10 border border-white/20 text-slate-200">
                Level: <strong className="text-white">{currentProf.label}</strong>
              </span>
            </div>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-orange-400 mb-1">
                <Flame className="w-5 h-5 fill-orange-400 animate-bounce" />
                <span className="text-xl sm:text-2xl font-black text-white">{stats.streakDays}</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">Day Streak</p>
            </div>

            <div className="text-center px-2 border-x border-white/10">
              <div className="flex items-center justify-center gap-1 text-emerald-400 mb-1">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-xl sm:text-2xl font-black text-white">{stats.phrasesPracticed}</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">Phrases</p>
            </div>

            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-indigo-300 mb-1">
                <Award className="w-5 h-5 text-indigo-400" />
                <span className="text-xl sm:text-2xl font-black text-white">{stats.averagePronunciation}%</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">Avg Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4 Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Today's Featured Phrase */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
                <Zap className="w-3.5 h-3.5 text-orange-500" />
                Today's Contextual Phrase
              </span>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {featuredPhrase.formality}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
              {featuredPhrase.targetPhrase}
            </h3>
            <p className="text-sm font-medium text-indigo-600 mb-2 italic">
              "{featuredPhrase.transliteration}"
            </p>
            <p className="text-sm text-slate-600 mb-4">
              <strong>Meaning:</strong> {featuredPhrase.englishMeaning}
            </p>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs text-slate-600 space-y-1 mb-4">
              <p className="flex items-start gap-1.5">
                <span className="font-semibold text-slate-700 shrink-0">Context:</span>
                <span>{featuredPhrase.culturalContext}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => handlePlayAudio()}
              disabled={isPlayingAudio}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'text-indigo-600 animate-spin' : 'text-slate-600'}`} />
              {isPlayingAudio ? 'Playing Audio...' : '🔊 Listen'}
            </button>
            <button
              onClick={() => handlePracticeThisPhrase(featuredPhrase)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
            >
              <Mic className="w-4 h-4" />
              Practice Speaking
            </button>
          </div>
        </div>

        {/* Card 2: AI Roleplay Launcher */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-md shadow-indigo-600/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              AI Conversational Roleplay
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Step into realistic scenarios: chat with a local shopkeeper, college senior, or navigate transit.
            </p>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Text & Voice input</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Code-switching (Hinglish) support</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Detailed cultural rubric</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('roleplay')}
            className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-indigo-950 text-white transition-all shadow-sm"
          >
            Start Roleplay
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: Cultural Etiquette Tip */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/80 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                <Info className="w-5 h-5" />
              </div>
              <button
                onClick={() => setDailyTipIndex(prev => prev + 1)}
                className="text-[11px] font-semibold text-amber-800 hover:underline"
              >
                Next Tip →
              </button>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {currentTip.title}
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              {currentTip.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-amber-800 font-medium">
            <span>Cultural Sensitivity Tip #{((dailyTipIndex % CULTURAL_INSIGHTS.length) + 1)}</span>
            <span>Respectful Usage</span>
          </div>
        </div>

      </div>

      {/* Recommended Practice Situations / Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Explore Practice Situations
            </h2>
            <p className="text-xs text-slate-500">
              Select a real-world setting to discover high-frequency phrases and cultural dos & don'ts.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('learn')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            View All ({PHRASES_DATABASE.length} phrases) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const count = PHRASES_DATABASE.filter(p => p.category === cat.id).length;
            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className="group cursor-pointer bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl mb-2">{cat.tag.split(' ')[0]}</div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>{count} phrases</span>
                  <span className="text-indigo-600 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
