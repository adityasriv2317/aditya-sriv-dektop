import { useState } from 'react';
import { Monitor, Moon, Sun, RotateCcw, Info, Palette, Code, Globe2 } from 'lucide-react';
import type { WallpaperData } from '../main/types';

interface SettingsAppProps {
  currentWallpaper: string;
  onWallpaperChange: (wallpaper: string) => void;
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
  onResetSettings: () => void;
}

const SettingsApp = ({ 
  currentWallpaper, 
  onWallpaperChange, 
  isDarkMode, 
  onDarkModeToggle, 
  onResetSettings 
}: SettingsAppProps) => {
  const [activeTab, setActiveTab] = useState('appearance');

  const wallpapers: WallpaperData[] = [
    {
      id: 'default',
      name: 'Default Dark',
      gradient: 'linear-gradient(135deg, hsl(220 13% 18%), hsl(240 15% 12%), hsl(260 20% 8%))'
    },
    {
      id: 'ocean',
      name: 'Ocean Blue',
      gradient: 'linear-gradient(135deg, #0c4a6e, #164e63, #0891b2)'
    },
    {
      id: 'sunset',
      name: 'Sunset',
      gradient: 'linear-gradient(135deg, #7c2d12, #ea580c, #f97316)'
    },
    {
      id: 'forest',
      name: 'Forest',
      gradient: 'linear-gradient(135deg, #14532d, #166534, #15803d)'
    },
    {
      id: 'purple',
      name: 'Purple Haze',
      gradient: 'linear-gradient(135deg, #581c87, #7c3aed, #8b5cf6)'
    },
    {
      id: 'minimal',
      name: 'Minimal Gray',
      gradient: 'linear-gradient(135deg, #374151, #4b5563, #6b7280)'
    }
  ];

  const techStack = [
    { name: 'React.js', icon: <Code className="w-5 h-5" />, color: 'text-blue-400' },
    { name: 'TypeScript', icon: <Code className="w-5 h-5" />, color: 'text-blue-500' },
    { name: 'Tailwind CSS', icon: <Palette className="w-5 h-5" />, color: 'text-cyan-400' },
    { name: 'Vite', icon: <Globe2 className="w-5 h-5" />, color: 'text-purple-400' },
    { name: 'Lucide Icons', icon: <Monitor className="w-5 h-5" />, color: 'text-orange-400' }
  ];

  const tabs = [
    { id: 'appearance', name: 'Appearance', icon: <Palette className="w-4 h-4" /> },
    { id: 'info', name: 'Project Info', icon: <Info className="w-4 h-4" /> }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold mb-2">System Settings</h1>
        <p className="text-gray-400">Customize your Aditya Srivastava OS experience</p>
      </div>

      <div className="flex h-[calc(100%-100px)]">
        {/* Sidebar */}
        <div className="w-48 border-r border-white/10 p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'hover:bg-white/5 text-gray-300'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === 'appearance' && (
            <div className="space-y-8">
              {/* Wallpapers */}
              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Monitor className="w-5 h-5 mr-2 text-blue-400" />
                  Wallpapers
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {wallpapers.map((wallpaper) => (
                    <button
                      key={wallpaper.id}
                      onClick={() => onWallpaperChange(wallpaper.gradient)}
                      className={`relative aspect-video rounded-lg overflow-hidden transition-all hover:scale-105 ${
                        currentWallpaper === wallpaper.gradient
                          ? 'ring-2 ring-blue-400'
                          : 'hover:ring-1 hover:ring-white/30'
                      }`}
                      style={{ background: wallpaper.gradient }}
                    >
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-2 left-2">
                        <span className="text-xs text-white/90 font-medium">
                          {wallpaper.name}
                        </span>
                      </div>
                      {currentWallpaper === wallpaper.gradient && (
                        <div className="absolute top-2 right-2">
                          <div className="w-4 h-4 bg-blue-400 rounded-full" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </section>

              {/* Theme */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Theme</h2>
                <div className="glass p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {isDarkMode ? (
                        <Moon className="w-5 h-5 mr-3 text-blue-400" />
                      ) : (
                        <Sun className="w-5 h-5 mr-3 text-yellow-400" />
                      )}
                      <div>
                        <h3 className="font-medium">
                          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Switch between light and dark themes
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onDarkModeToggle}
                      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                        isDarkMode ? 'bg-blue-500' : 'bg-gray-400'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          isDarkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </section>

              {/* Reset */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Reset</h2>
                <div className="glass p-4 rounded-lg">
                  <button
                    onClick={onResetSettings}
                    className="flex items-center px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset to Default Settings
                  </button>
                  <p className="text-sm text-gray-400 mt-2">
                    This will reset wallpaper, theme, and all customizations to default values.
                  </p>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">About This Project</h2>
                <div className="glass p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Aditya Srivastava OS</h3>
                  <p className="text-gray-300 mb-4">
                    An interactive portfolio operating system that showcases my work and skills 
                    through a fully functional desktop environment. This project demonstrates 
                    modern web development techniques and creative UI/UX design.
                  </p>
                  <div className="text-sm text-gray-400">
                    <p>Version: 1.0</p>
                    <p>Built: 2024</p>
                    <p>Developer: Aditya Srivastava</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {techStack.map((tech, index) => (
                    <div
                      key={index}
                      className="glass p-4 rounded-lg flex items-center"
                    >
                      <div className={`${tech.color} mr-3`}>
                        {tech.icon}
                      </div>
                      <span className="font-medium">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <div className="glass p-6 rounded-lg">
                  <ul className="space-y-2 text-gray-300">
                    <li>• Interactive desktop environment with window management</li>
                    <li>• Glassmorphism design with smooth animations</li>
                    <li>• Draggable desktop icons and resizable windows</li>
                    <li>• Portfolio projects as functional applications</li>
                    <li>• Right-click context menus and custom cursors</li>
                    <li>• Dynamic dock with app management</li>
                    <li>• Multiple wallpaper themes</li>
                    <li>• Terminal with interactive commands</li>
                    <li>• Fully responsive and accessible design</li>
                  </ul>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;