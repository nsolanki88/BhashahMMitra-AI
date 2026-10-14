import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredApiKey, saveStoredApiKey } from '../services/aiService';

const UserContext = createContext();

const DEFAULT_PROFILE = {
  name: 'Aarav Sharma',
  nativeLanguage: 'en',
  learningLanguage: 'hi',
  proficiency: 'beginner',
  interactionMode: 'both' // 'both', 'voice', 'text'
};

const DEFAULT_STATS = {
  streakDays: 4,
  phrasesPracticed: 18,
  averagePronunciation: 87,
  roleplaysCompleted: 3,
  history: [
    {
      id: 'h1',
      date: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
      type: 'practice',
      phrase: 'भैया, क्या आप मेट्रो स्टेशन चलेंगे?',
      score: 91,
      category: 'travel'
    },
    {
      id: 'h2',
      date: new Date(Date.now() - 86400000).toLocaleDateString(),
      type: 'practice',
      phrase: 'भैया, यह कितने का है? थोड़ा सही दाम लगाइए ना।',
      score: 84,
      category: 'shopping'
    },
    {
      id: 'h3',
      date: new Date().toLocaleDateString(),
      type: 'roleplay',
      title: 'Buying Fruit at Local Market',
      score: 92,
      category: 'shopping'
    }
  ]
};

export const UserProvider = ({ children }) => {
  // Profile State
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('bhashamitra_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Stats State
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('bhashamitra_stats');
      return saved ? JSON.parse(saved) : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  // AI Mode State
  const [useLiveAi, setUseLiveAi] = useState(() => {
    const key = getStoredApiKey();
    return Boolean(key);
  });

  const [apiKey, setApiKey] = useState(() => getStoredApiKey());

  // Save changes
  useEffect(() => {
    localStorage.setItem('bhashamitra_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('bhashamitra_stats', JSON.stringify(stats));
  }, [stats]);

  const updateProfile = (updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const updateApiKey = (key) => {
    saveStoredApiKey(key);
    setApiKey(key);
    if (!key) {
      setUseLiveAi(false);
    }
  };

  const recordPracticeResult = ({ phrase, score, category }) => {
    setStats(prev => {
      const newCount = prev.phrasesPracticed + 1;
      const newAvg = Math.round(
        ((prev.averagePronunciation * prev.phrasesPracticed) + score) / newCount
      );
      const newHistoryItem = {
        id: 'h_' + Date.now(),
        date: new Date().toLocaleDateString(),
        type: 'practice',
        phrase,
        score,
        category
      };

      return {
        ...prev,
        phrasesPracticed: newCount,
        averagePronunciation: newAvg,
        history: [newHistoryItem, ...prev.history].slice(0, 30)
      };
    });
  };

  const recordRoleplayResult = ({ title, score, category }) => {
    setStats(prev => {
      const newRoleplays = prev.roleplaysCompleted + 1;
      const newHistoryItem = {
        id: 'h_' + Date.now(),
        date: new Date().toLocaleDateString(),
        type: 'roleplay',
        title,
        score,
        category
      };

      return {
        ...prev,
        roleplaysCompleted: newRoleplays,
        history: [newHistoryItem, ...prev.history].slice(0, 30)
      };
    });
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        updateProfile,
        stats,
        recordPracticeResult,
        recordRoleplayResult,
        useLiveAi,
        setUseLiveAi,
        apiKey,
        updateApiKey
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
