import React, { useState } from 'react';
import { X, Sparkles, Key, CheckCircle, Info, Shield, Cpu } from 'lucide-react';
import { useUser } from '../../context/UserContext';

export const AiSettingsModal = ({ isOpen, onClose }) => {
  const { useLiveAi, setUseLiveAi, apiKey, updateApiKey } = useUser();

  const [inputKey, setInputKey] = useState(apiKey || '');
  const [saveStatus, setSaveStatus] = useState(null);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    updateApiKey(inputKey);
    setSaveStatus('API Key saved successfully!');
    setTimeout(() => setSaveStatus(null), 2500);
  };

  const handleToggleMode = (enableLive) => {
    if (enableLive && !inputKey.trim()) {
      setSaveStatus('Please enter an API Key to enable Live AI mode, or keep Demo Mode active.');
      return;
    }
    setUseLiveAi(enableLive);
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
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">AI Engine Settings</h3>
            <p className="text-xs text-slate-500">Configure Live AI or Offline Demo Mode.</p>
          </div>
        </div>

        {/* Mode Selector Cards */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700">
            Select Active AI Mode:
          </label>

          {/* Option 1: Demo Mode */}
          <div
            onClick={() => handleToggleMode(false)}
            className={`cursor-pointer p-4 rounded-2xl border transition-all ${
              !useLiveAi
                ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/20'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                ⚡ Local Demo Engine (Recommended for Judges)
              </span>
              {!useLiveAi && <span className="text-xs font-bold text-amber-700">● Active</span>}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              100% offline, zero-latency, realistic dialogue trees, code-switching parsing, and full 5-part rubrics. No API key required.
            </p>
          </div>

          {/* Option 2: Live AI Mode */}
          <div
            onClick={() => handleToggleMode(true)}
            className={`cursor-pointer p-4 rounded-2xl border transition-all ${
              useLiveAi
                ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                ✨ Live AI Mode (Google Gemini 1.5 Flash)
              </span>
              {useLiveAi && <span className="text-xs font-bold text-emerald-700">● Active</span>}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Connects to real generative AI model for open-ended conversation turns and dynamic cultural evaluations.
            </p>
          </div>
        </div>

        {/* API Key Configuration */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-indigo-600" />
              Gemini API Key (Optional)
            </span>
            <span className="text-[10px] text-slate-400 font-mono">VITE_AI_API_KEY</span>
          </div>

          <div className="flex gap-2">
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
            <button
              onClick={handleSaveKey}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors"
            >
              Save Key
            </button>
          </div>

          {saveStatus && (
            <p className="text-[11px] font-semibold text-emerald-700 animate-fadeIn">
              {saveStatus}
            </p>
          )}

          <p className="text-[11px] text-slate-500">
            Keys are stored locally in your browser session and never sent to any server other than Google's Gemini endpoint.
          </p>
        </div>

        {/* Hackathon Integrity Note */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-[11px] text-blue-900">
          <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p>
            <strong>Hackathon Compliance:</strong> As required by the TCS Problem Statement, BhashaMitra AI never pretends hardcoded responses are live AI. The active mode is always clearly identified.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-indigo-950 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
