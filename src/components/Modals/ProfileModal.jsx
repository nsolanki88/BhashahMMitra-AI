import React, { useState } from 'react';
import { X, User, Languages, Check, Award, Sparkles } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { SUPPORTED_LANGUAGES, NATIVE_LANGUAGES, PROFICIENCY_LEVELS } from '../../data/languagesData';

export const ProfileModal = ({ isOpen, onClose }) => {
  const { profile, updateProfile } = useUser();

  const [formData, setFormData] = useState({ ...profile });

  if (!isOpen) return null;

  const handleSave = () => {
    updateProfile(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Learner Profile</h3>
            <p className="text-xs text-slate-500">Personalize your local-language learning journey.</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 text-sm">
          
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="e.g. Aarav Sharma"
            />
          </div>

          {/* Learning Language */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Language You Want to Learn
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = formData.learningLanguage === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, learningLanguage: lang.id })}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <span className="block text-sm">{lang.name}</span>
                      <span className="block text-[11px] text-slate-400 font-normal">{lang.nativeName}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Native / Preferred Language */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Native / Preferred Language
            </label>
            <select
              value={formData.nativeLanguage}
              onChange={(e) => setFormData({ ...formData, nativeLanguage: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
            >
              {NATIVE_LANGUAGES.map((nl) => (
                <option key={nl.id} value={nl.id}>{nl.name}</option>
              ))}
            </select>
          </div>

          {/* Proficiency Level */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Proficiency Level
            </label>
            <div className="space-y-2">
              {PROFICIENCY_LEVELS.map((lvl) => {
                const isSelected = formData.proficiency === lvl.id;
                return (
                  <div
                    key={lvl.id}
                    onClick={() => setFormData({ ...formData, proficiency: lvl.id })}
                    className={`cursor-pointer p-3 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? 'bg-indigo-50/70 border-indigo-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>{lvl.label}</span>
                      {isSelected && <span className="text-indigo-600">✓ Selected</span>}
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5">{lvl.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preferred Interaction Mode */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Preferred Interaction Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'both', label: '🎙️ & ⌨️ Both' },
                { id: 'voice', label: '🎙️ Voice First' },
                { id: 'text', label: '⌨️ Text First' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, interactionMode: m.id })}
                  className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                    formData.interactionMode === m.id
                      ? 'bg-indigo-600 text-white font-bold border-indigo-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
          >
            Save Profile
          </button>
        </div>

      </div>
    </div>
  );
};
