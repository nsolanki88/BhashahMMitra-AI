import React from 'react';
import {
  Compass,
  BookOpen,
  Mic,
  MessageSquare,
  BarChart3,
  Sparkles,
  User,
  Settings,
  Languages
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { SUPPORTED_LANGUAGES } from '../data/languagesData';

export const Navbar = ({
  activeTab,
  setActiveTab,
  onOpenProfile,
  onOpenAiSettings
}) => {
  const { profile, useLiveAi } = useUser();

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.id === profile.learningLanguage) || SUPPORTED_LANGUAGES[0];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Mic },
    { id: 'roleplay', label: 'Roleplay', icon: MessageSquare },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Tagline */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 font-bold text-xl">
              BM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 bg-clip-text text-transparent">
                  BhashaMitra<span className="text-orange-600">.AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-100 text-orange-800 border border-orange-200">
                  TCS Hackathon Edition
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Speak Local. Speak Confidently.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions: AI Mode Pill, Language Badge, Profile */}
          <div className="flex items-center gap-2.5">
            {/* AI Mode Indicator / Switcher */}
            <button
              onClick={onOpenAiSettings}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                useLiveAi
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
              }`}
              title="Click to toggle between Demo Mode and Live Gemini AI"
            >
              <Sparkles className={`w-3.5 h-3.5 ${useLiveAi ? 'text-emerald-600' : 'text-amber-600'}`} />
              <span className="hidden lg:inline">{useLiveAi ? 'Live AI' : 'Demo Mode'}</span>
            </button>

            {/* Target Language Pill */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
              title="Change learning language & proficiency"
            >
              <Languages className="w-3.5 h-3.5 text-indigo-600" />
              <span>{currentLang.name}</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">({profile.proficiency.slice(0, 3)})</span>
            </button>

            {/* Profile Avatar Button */}
            <button
              onClick={onOpenProfile}
              className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center hover:bg-indigo-100 transition-colors shadow-sm"
              title="Open Learner Profile"
            >
              <User className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 bg-white py-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-2 text-xs font-medium ${
                isActive ? 'text-indigo-600 font-semibold' : 'text-slate-500'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
