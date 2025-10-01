import { useState } from 'react';
import { X, Sun, Moon, Minus, Plus, Download } from 'lucide-react';

interface ControlCenterProps {
  onClose: () => void;
}

const ControlCenter = ({ onClose }: ControlCenterProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  const resumeVersions = [
    { name: 'Latest Resume', date: 'November 2024', url: '#' },
    { name: 'Previous Version', date: 'October 2024', url: '#' },
    { name: 'Internship Resume', date: 'September 2024', url: '#' },
  ];

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div 
        className="absolute top-8 right-4 w-80 glass rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Control Center</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full glass-hover transition-colors"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="mb-6">
          <label className="flex items-center justify-between">
            <span className="text-white/90">Dark Mode</span>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                isDarkMode ? 'bg-blue-500' : 'bg-gray-400'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform flex items-center justify-center ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              >
                {isDarkMode ? (
                  <Moon className="w-3 h-3 text-blue-500" />
                ) : (
                  <Sun className="w-3 h-3 text-gray-400" />
                )}
              </div>
            </button>
          </label>
        </div>

        {/* Font Size */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/90">Font Size</span>
            <span className="text-white/70 text-sm">{fontSize}px</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setFontSize(Math.max(12, fontSize - 2))}
              className="p-2 rounded-lg glass-hover transition-colors"
            >
              <Minus className="w-4 h-4 text-white/70" />
            </button>
            <div className="flex-1 h-2 bg-gray-600 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                style={{ width: `${((fontSize - 12) / 8) * 100}%` }}
              />
            </div>
            <button
              onClick={() => setFontSize(Math.min(20, fontSize + 2))}
              className="p-2 rounded-lg glass-hover transition-colors"
            >
              <Plus className="w-4 h-4 text-white/70" />
            </button>
          </div>
        </div>

        {/* Resume Versions */}
        <div>
          <h4 className="text-white/90 mb-3">Resume Versions</h4>
          <div className="space-y-2">
            {resumeVersions.map((resume, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg glass-hover transition-colors cursor-pointer"
              >
                <div>
                  <div className="text-white/90 text-sm">{resume.name}</div>
                  <div className="text-white/60 text-xs">{resume.date}</div>
                </div>
                <Download className="w-4 h-4 text-white/70" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;