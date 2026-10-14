import React, { useState, useMemo } from 'react';
import {
  Search,
  Volume2,
  Mic,
  AlertCircle,
  CheckCircle,
  XCircle,
  Sparkles,
  Filter,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { PHRASES_DATABASE, CATEGORIES } from '../../data/phrasesData';
import { SUPPORTED_LANGUAGES } from '../../data/languagesData';
import { speakPhrase } from '../../services/speechService';

export const Learn = ({
  setActiveTab,
  setSelectedPhraseForPractice,
  selectedCategory,
  setSelectedCategory
}) => {
  const { profile } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProficiency, setSelectedProficiency] = useState('all');
  const [playingId, setPlayingId] = useState(null);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.id === profile.learningLanguage) || SUPPORTED_LANGUAGES[0];

  // Filter phrases
  const filteredPhrases = useMemo(() => {
    return PHRASES_DATABASE.filter(phrase => {
      // Language match (or fallback to Hindi if user selects a language with fewer demo phrases)
      const matchesLanguage = phrase.languageId === profile.learningLanguage ||
        (PHRASES_DATABASE.filter(p => p.languageId === profile.learningLanguage).length === 0 && phrase.languageId === 'hi');

      // Category match
      const matchesCategory = selectedCategory === 'all' || phrase.category === selectedCategory;

      // Proficiency match
      const matchesProf = selectedProficiency === 'all' || phrase.proficiency === selectedProficiency;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        phrase.targetPhrase.toLowerCase().includes(q) ||
        phrase.transliteration.toLowerCase().includes(q) ||
        phrase.englishMeaning.toLowerCase().includes(q) ||
        phrase.culturalContext.toLowerCase().includes(q) ||
        phrase.keywords?.some(k => k.toLowerCase().includes(q));

      return matchesLanguage && matchesCategory && matchesProf && matchesSearch;
    });
  }, [profile.learningLanguage, selectedCategory, selectedProficiency, searchQuery]);

  const handlePlayAudio = async (phrase) => {
    setPlayingId(phrase.id);
    try {
      await speakPhrase({
        text: phrase.targetPhrase,
        transliteration: phrase.transliteration,
        locale: currentLang.speechLocale,
        rate: phrase.audioSpeed || 0.9,
        languageId: phrase.languageId || profile.learningLanguage
      });
    } finally {
      setPlayingId(null);
    }
  };

  const handlePractice = (phrase) => {
    setSelectedPhraseForPractice(phrase);
    setActiveTab('practice');
  };

  const getFormalityBadge = (formality) => {
    const lower = formality.toLowerCase();
    if (lower.includes('formal')) {
      return 'bg-purple-50 text-purple-700 border-purple-200';
    }
    if (lower.includes('informal')) {
      return 'bg-amber-50 text-amber-700 border-amber-200';
    }
    return 'bg-blue-50 text-blue-700 border-blue-200';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Contextual Phrase Library
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Learn culturally appropriate phrases for real Indian situations in {currentLang.name}.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search phrase, meaning, keyword..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          🌟 All Categories
        </button>

        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{cat.tag}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Filter: Proficiency */}
      <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-100/70 p-2.5 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-medium text-slate-600">Filter by Level:</span>
          {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedProficiency(lvl)}
              className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                selectedProficiency === lvl
                  ? 'bg-white text-indigo-700 font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <span className="font-medium">
          Showing <strong>{filteredPhrases.length}</strong> phrases
        </span>
      </div>

      {/* Phrases Cards List */}
      {filteredPhrases.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No matching phrases found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, proficiency level, or select "All Categories".
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedProficiency('all'); }}
            className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-semibold hover:bg-indigo-100"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPhrases.map((phrase) => {
            const isPlaying = playingId === phrase.id;
            return (
              <div
                key={phrase.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Formality & Level */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getFormalityBadge(phrase.formality)}`}>
                      {phrase.formality}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 capitalize bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                      Level: {phrase.proficiency}
                    </span>
                  </div>

                  {/* Target Phrase */}
                  <div className="mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                      {phrase.targetPhrase}
                    </h3>
                    <p className="text-sm font-semibold text-indigo-600 italic mt-0.5">
                      "{phrase.transliteration}"
                    </p>
                  </div>

                  {/* Meanings */}
                  <div className="space-y-1 text-xs text-slate-600 mb-4 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                    <p>
                      <strong className="text-slate-800">English:</strong> {phrase.englishMeaning}
                    </p>
                    {phrase.hindiMeaning && phrase.languageId !== 'hi' && (
                      <p>
                        <strong className="text-slate-800">Hindi:</strong> {phrase.hindiMeaning}
                      </p>
                    )}
                  </div>

                  {/* Cultural Context */}
                  <div className="text-xs text-slate-700 mb-4 bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                    <p className="font-semibold text-amber-900 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Cultural Context & Etiquette:
                    </p>
                    <p className="leading-relaxed text-amber-950">
                      {phrase.culturalContext}
                    </p>
                  </div>

                  {/* When to use / When NOT to use */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] mb-4">
                    <div className="bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-100">
                      <span className="font-bold text-emerald-800 flex items-center gap-1 mb-0.5">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        When to use:
                      </span>
                      <p className="text-emerald-950">{phrase.whenToUse}</p>
                    </div>

                    <div className="bg-rose-50/80 p-2.5 rounded-lg border border-rose-100">
                      <span className="font-bold text-rose-800 flex items-center gap-1 mb-0.5">
                        <XCircle className="w-3 h-3 text-rose-600" />
                        When NOT to use:
                      </span>
                      <p className="text-rose-950">{phrase.whenNotToUse}</p>
                    </div>
                  </div>

                  {/* Avoid saying vs Better Alternative */}
                  {(phrase.avoidSaying || phrase.betterAlternative) && (
                    <div className="text-[11px] space-y-1.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 mb-4">
                      {phrase.avoidSaying && (
                        <p className="text-slate-600">
                          <strong className="text-rose-600">Avoid saying:</strong> <span className="line-through">{phrase.avoidSaying}</span>
                        </p>
                      )}
                      {phrase.betterAlternative && (
                        <p className="text-slate-700">
                          <strong className="text-emerald-600">Better alternative:</strong> {phrase.betterAlternative}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Actions: Listen & Practice */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handlePlayAudio(phrase)}
                    disabled={isPlaying}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-indigo-600 animate-pulse' : 'text-slate-500'}`} />
                    {isPlaying ? 'Playing...' : 'Listen (TTS)'}
                  </button>

                  <button
                    onClick={() => handlePractice(phrase)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
                  >
                    <Mic className="w-4 h-4" />
                    Practice Speaking
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
