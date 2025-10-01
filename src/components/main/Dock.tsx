import {
  Terminal,
  User,
  Calendar,
  HelpCircle,
  Mail,
  Settings,
  Brain,
  Mail as MailIcon,
  Globe,
  Gamepad2,
  Cloud,
  Music,
} from "lucide-react";
import type { WindowData } from "./types";
import TerminalApp from "../apps/TerminalApp";
import AboutApp from "../apps/AboutApp";
import ContactApp from "../apps/ContactApp";

interface DockProps {
  windows: WindowData[];
  onOpenWindow: (
    appId: string,
    title: string,
    component?: React.ReactNode
  ) => void;
  onFocusWindow: (windowId: string) => void;
}

const Dock = ({ windows, onOpenWindow, onFocusWindow }: DockProps) => {
  const systemApps = [
    {
      id: "terminal",
      name: "Terminal",
      icon: <Terminal className="w-8 h-8" />,
      component: <TerminalApp />,
    },
    {
      id: "about",
      name: "About Me",
      icon: <User className="w-8 h-8" />,
      component: <AboutApp />,
    },
    {
      id: "contact",
      name: "Contact",
      icon: <Mail className="w-8 h-8" />,
      component: <ContactApp />,
    },
    {
      id: "settings",
      name: "Settings",
      icon: <Settings className="w-8 h-8" />,
    },
  ];

  const projectAppIcons: { [key: string]: React.ReactNode } = {
    "lumina-ai": <Brain className="w-8 h-8" />,
    "sampark-ai": <MailIcon className="w-8 h-8" />,
    "ion-browser": <Globe className="w-8 h-8" />,
    quizaki: <Gamepad2 className="w-8 h-8" />,
    "weather-app": <Cloud className="w-8 h-8" />,
    "sonic-boom": <Music className="w-8 h-8" />,
  };

  // Get unique open project apps
  const openProjectApps = windows
    .filter((w) => !w.isMinimized && projectAppIcons[w.appId])
    .reduce((acc, window) => {
      if (!acc.find((app) => app.appId === window.appId)) {
        acc.push({
          appId: window.appId,
          title: window.title,
          icon: projectAppIcons[window.appId],
        });
      }
      return acc;
    }, [] as Array<{ appId: string; title: string; icon: React.ReactNode }>);

  const isAppOpen = (appId: string) => {
    return windows.some((w) => w.appId === appId && !w.isMinimized);
  };

  const handleAppClick = (app: any) => {
    const existingWindow = windows.find((w) => w.appId === app.id);

    if (existingWindow) {
      if (existingWindow.isMinimized) {
        // Restore minimized window
        onOpenWindow(app.id, app.name, app.component);
      } else {
        // Focus existing window
        onFocusWindow(existingWindow.id);
      }
    } else {
      // Open new window
      onOpenWindow(app.id, app.name, app.component);
    }
  };

  const handleProjectAppClick = (appId: string) => {
    const existingWindow = windows.find((w) => w.appId === appId);

    if (existingWindow) {
      if (existingWindow.isMinimized) {
        onOpenWindow(appId, existingWindow.title);
      } else {
        onFocusWindow(existingWindow.id);
      }
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="dock glass rounded-2xl px-4 py-3 flex items-center space-x-2">
        {/* System Apps */}
        {systemApps.map((app) => (
          <div key={app.id} className="relative group">
            <button
              onClick={() => handleAppClick(app)}
              className="p-3 rounded-xl glass-hover transition-all duration-200 hover:scale-110 relative cursor-pointer"
              title={app.name}
            >
              <div className="text-white/80 group-hover:text-white transition-colors">
                {app.icon}
              </div>

              {/* Active indicator */}
              {windows.some((w) => w.appId === app.id && !w.isMinimized) && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse" />
              )}
            </button>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {app.name}
            </div>
          </div>
        ))}

        {/* Separator if project apps are open */}
        {openProjectApps.length > 0 && (
          <div className="w-px h-8 bg-white/20 mx-1" />
        )}

        {/* Open Project Apps */}
        {openProjectApps.map((app) => (
          <div key={app.appId} className="relative group">
            <button
              onClick={() => handleProjectAppClick(app.appId)}
              className="p-3 rounded-xl glass-hover transition-all duration-200 hover:scale-110 relative cursor-pointer animate-fade-in"
              title={app.title}
            >
              <div className="text-white/80 group-hover:text-white transition-colors">
                {app.icon}
              </div>

              {/* Active indicator */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
            </button>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {app.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dock;
