import React, { useState } from 'react';
import { UserProvider } from './context/UserContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Learn } from './components/Learn/Learn';
import { Practice } from './components/Practice/Practice';
import { Roleplay } from './components/Roleplay/Roleplay';
import { Progress } from './components/Progress/Progress';
import { ProfileModal } from './components/Modals/ProfileModal';
import { AiSettingsModal } from './components/Modals/AiSettingsModal';
import { PHRASES_DATABASE } from './data/phrasesData';
import { Sparkles, Heart } from 'lucide-react';

export function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPhrase, setSelectedPhrase] = useState(PHRASES_DATABASE[0]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAiSettingsOpen, setIsAiSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAiSettings={() => setIsAiSettingsOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            setActiveTab={setActiveTab}
            setSelectedPhraseForPractice={setSelectedPhrase}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {activeTab === 'learn' && (
          <Learn
            setActiveTab={setActiveTab}
            setSelectedPhraseForPractice={setSelectedPhrase}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {activeTab === 'practice' && (
          <Practice
            selectedPhrase={selectedPhrase}
            setSelectedPhrase={setSelectedPhrase}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'roleplay' && (
          <Roleplay />
        )}

        {activeTab === 'progress' && (
          <Progress setActiveTab={setActiveTab} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900">BhashaMitra AI</span>
            <span>•</span>
            <span>TCS Tech Day AI Hackathon 2026</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsProfileOpen(true)}
              className="hover:text-indigo-600 transition-colors"
            >
              Learner Profile
            </button>
            <span>•</span>
            <button
              onClick={() => setIsAiSettingsOpen(true)}
              className="hover:text-indigo-600 transition-colors"
            >
              AI Engine & Demo Mode
            </button>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Indian Languages
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <AiSettingsModal
        isOpen={isAiSettingsOpen}
        onClose={() => setIsAiSettingsOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
