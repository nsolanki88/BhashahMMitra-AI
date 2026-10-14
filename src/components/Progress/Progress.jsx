import React from 'react';
import {
  Flame,
  Award,
  ShieldCheck,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { SUPPORTED_LANGUAGES, PROFICIENCY_LEVELS } from '../../data/languagesData';

export const Progress = ({ setActiveTab }) => {
  const { profile, stats } = useUser();

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.id === profile.learningLanguage) || SUPPORTED_LANGUAGES[0];
  const currentProf = PROFICIENCY_LEVELS.find(p => p.id === profile.proficiency) || PROFICIENCY_LEVELS[0];

  const milestones = [
    { title: 'Local Commuter', desc: 'Practiced 5+ travel phrases', unlocked: true, icon: '✈️' },
    { title: 'Bazaar Master', desc: 'Completed Shopping roleplay', unlocked: stats.roleplaysCompleted >= 1, icon: '🛍️' },
    { title: 'Pronunciation Ace', desc: 'Scored 85%+ in practice lab', unlocked: stats.averagePronunciation >= 85, icon: '🎯' },
    { title: 'Campus Socializer', desc: 'Connected in College scenario', unlocked: stats.roleplaysCompleted >= 2, icon: '🎓' },
    { title: 'Cultural Diplomat', desc: 'Completed 3+ full roleplay dialogues', unlocked: stats.roleplaysCompleted >= 3, icon: '🤝' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Learning Progress & Fluency Analytics
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Track your conversational growth, practice streaks, and pronunciation milestones in {currentLang.name}.
        </p>
      </div>

      {/* 4 Big Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100">
            <Flame className="w-6 h-6 fill-orange-500" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Daily Streak</span>
            <div className="text-2xl font-black text-slate-900">{stats.streakDays} Days</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
            <ShieldCheck className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Phrases Practiced</span>
            <div className="text-2xl font-black text-slate-900">{stats.phrasesPracticed}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <Award className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Avg Accuracy</span>
            <div className="text-2xl font-black text-slate-900">{stats.averagePronunciation}%</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
            <MessageSquare className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Roleplays Done</span>
            <div className="text-2xl font-black text-slate-900">{stats.roleplaysCompleted}</div>
          </div>
        </div>

      </div>

      {/* Progress Bars: Category Fluency */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Category Mastery */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Situation Fluency Breakdown</h3>
              <p className="text-xs text-slate-500">Your practice proficiency across common daily situations.</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
              Target: {currentProf.label}
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { label: '✈️ Travel & Commute', score: 85, color: 'bg-blue-600' },
              { label: '🛍️ Shopping & Bargaining', score: 92, color: 'bg-amber-500' },
              { label: '🎓 College & Academics', score: 78, color: 'bg-emerald-600' },
              { label: '🚨 Health & Emergency', score: 70, color: 'bg-rose-500' },
              { label: '🤝 Social & Hospitality', score: 88, color: 'bg-purple-600' },
            ].map((cat, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{cat.label}</span>
                  <span>{cat.score}% Fluency</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`${cat.color} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-600">Want to boost your Health & Emergency fluency?</span>
            <button
              onClick={() => setActiveTab('learn')}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Practice Emergency Phrases →
            </button>
          </div>
        </div>

        {/* Milestone Badges */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Cultural Milestones</h3>
          <p className="text-xs text-slate-500">Unlock conversational honors as you communicate naturally.</p>

          <div className="space-y-2.5 pt-1">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                  m.unlocked
                    ? 'bg-emerald-50/50 border-emerald-200 text-slate-900'
                    : 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <span className="text-2xl">{m.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <h5 className="font-bold text-xs">{m.title}</h5>
                    {m.unlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Practice History */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Recent Activity Log</h3>
        
        {stats.history && stats.history.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {stats.history.slice(0, 8).map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                    item.type === 'roleplay' ? 'bg-purple-100 text-purple-700' : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {item.type === 'roleplay' ? '💬' : '🗣️'}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">
                      {item.phrase || item.title}
                    </p>
                    <span className="text-slate-400 text-[11px] capitalize">
                      {item.type} • {item.category} • {item.date}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-black text-sm ${
                    item.score >= 85 ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {item.score}%
                  </span>
                  <span className="block text-[10px] text-slate-400">Score</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-4 text-center">No practice history recorded yet.</p>
        )}
      </div>

    </div>
  );
};
