import { Sun, Moon, Minus, Plus } from "lucide-react";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import BrowserApp from "@/components/apps/BrowserApp";

interface ControlCenterProps {
  onClose: () => void;
  onOpenWindow: (
    appId: string,
    title: string,
    component?: React.ReactNode
  ) => void;
  onOpenBrowser?: (url: string, title: string) => void;
}

const ControlCenter = ({ onClose, onOpenWindow, onOpenBrowser }: ControlCenterProps) => {
  const { isDarkMode, setIsDarkMode, fontSize, setFontSize } = useAppSettings();

  const portfolioVersions = [
    {
      name: "V2",
      url: "https://aditya2317.vercel.app/",
      title: "Portfolio V2",
    },
    {
      name: "V1",
      url: "https://adityasrivastava1.vercel.app/",
      title: "Portfolio V1",
    },
  ];

  const handlePortfolioOpen = (url: string, title: string) => {
    // Always prefer using onOpenBrowser to ensure tabs are used
    if (onOpenBrowser) {
      onOpenBrowser(url, title);
    } else {
      // Fallback to opening in a new window if onOpenBrowser is not available
      const windowId = `browser-${Date.now()}`;
      onOpenWindow(windowId, title, 
        <BrowserApp 
          initialUrl={url} 
          initialTitle={title} 
          onClose={() => {}} // This will be overridden by WindowManager
        />
      );
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div
        className="absolute top-8 right-4 w-80 glass rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Theme Toggle */}
        <div className="mb-6">
          <label className="flex items-center justify-between">
            <span className="text-white/90">Dark Mode</span>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                isDarkMode ? "bg-blue-500" : "bg-gray-400"
              }`}
              aria-pressed={isDarkMode}
              role="switch"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform flex items-center justify-center ${
                  isDarkMode ? "translate-x-6" : "translate-x-1"
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
            <span className="text-white/90">Display Scale:</span>
            <span className="text-white/70 text-sm">{fontSize}px</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setFontSize(Math.max(12, fontSize - 1))}
              className="p-2 rounded-lg glass-hover transition-colors"
              aria-label="Decrease font size"
            >
              <Minus className="w-4 h-4 text-white/70" />
            </button>
            <div className="flex-1 h-2 bg-gray-600 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${((fontSize - 12) / 8) * 100}%` }}
              />
            </div>
            <button
              onClick={() => setFontSize(Math.min(20, fontSize + 1))}
              className="p-2 rounded-lg glass-hover transition-colors"
              aria-label="Increase font size"
            >
              <Plus className="w-4 h-4 text-white/70" />
            </button>
          </div>
        </div>

        {/* Portfolio Versions */}
        <div>
          <h4 className="text-white/90 mb-3">Previous Portfolios</h4>
          <div className="space-y-2">
            {portfolioVersions.map((portfolio, index) => (
              <div
                key={index}
                onClick={() =>
                  handlePortfolioOpen(portfolio.url, portfolio.title)
                }
                className="flex items-center justify-between p-3 rounded-lg glass-hover transition-colors cursor-pointer"
              >
                <div className="text-white/90 text-sm">{portfolio.name}</div>
                <div className="text-blue-400 text-xs">View</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;
