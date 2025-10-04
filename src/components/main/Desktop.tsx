import React, { useState, useEffect } from "react";
import { Gamepad2 } from "lucide-react";

// utils
import type { WindowData, DesktopIconData } from "./types";
import { soundManager } from "@/lib/sounds";
import DesktopIcon from "./DesktopIcon";

// system components
import WindowManager from "./WindowManager";
import ContextMenu from "./ContextMenu";
import MenuBar from "./MenuBar";
import Dock from "./Dock";

// apps
import SettingsApp from "../apps/SettingsApp";
import LuminaAIApp from "../apps/projects/LuminaAIApp";
import SamparkAIApp from "../apps/projects/SamparkAIApp";
import IONBrowserApp from "../apps/projects/IONBrowserApp";
import QuizakiApp from "../apps/projects/QuizakiApp";
import WeatherApp from "../apps/projects/WeatherApp";
import SonicBoomApp from "../apps/projects/SonicBoomApp";
import BrowserApp from "../apps/BrowserApp";
import type { BrowserAppRef } from "../apps/BrowserApp";

const Desktop = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentWallpaper, setCurrentWallpaper] = useState(
    "linear-gradient(135deg, hsl(220 13% 18%), hsl(240 15% 12%), hsl(260 20% 8%))"
  );
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [desktopIcons, setDesktopIcons] = useState<DesktopIconData[]>([
    {
      id: "lumina-icon",
      name: "Lumina AI",
      icon: (
        <img src="/icons/lumina.png" className="w-12 h-12" alt="Lumina AI" />
      ),
      position: { x: 50, y: 150 },
      appId: "lumina-ai",
    },
    {
      id: "sampark-icon",
      name: "Sampark AI",
      icon: (
        <img src="/icons/sampark.png" className="w-12 h-12" alt="Sampark AI" />
      ),
      position: { x: 50, y: 250 },
      appId: "sampark-ai",
    },
    {
      id: "ion-icon",
      name: "ION Browser",
      icon: (
        <img src="/icons/ion.png" className="w-12 h-12" alt="ION Browser" />
      ),
      position: { x: 150, y: 150 },
      appId: "ion-browser",
    },
    {
      id: "quizaki-icon",
      name: "Quizaki",
      icon: (
        <img src="/icons/quizaki.svg" className="w-12 h-12" alt="Quizaki" />
      ),
      position: { x: 150, y: 250 },
      appId: "quizaki",
    },
    {
      id: "weather-icon",
      name: "Weather",
      icon: (
        <img
          src="/icons/weather.png"
          className="w-12 h-12 rounded-xl"
          alt="Weather"
        />
      ),
      position: { x: 250, y: 150 },
      appId: "weather-app",
    },
    {
      id: "sonic-icon",
      name: "Sonic Boom",
      icon: <Gamepad2 className="w-8 h-8" />,
      position: { x: 250, y: 250 },
      appId: "sonic-boom",
    },
  ]);

  const getAppComponent = (appId: string) => {
    switch (appId) {
      case "settings":
        return (
          <SettingsApp
            currentWallpaper={currentWallpaper}
            onWallpaperChange={setCurrentWallpaper}
            isDarkMode={isDarkMode}
            onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
            onResetSettings={() => {
              setCurrentWallpaper(
                "linear-gradient(135deg, hsl(220 13% 18%), hsl(240 15% 12%), hsl(260 20% 8%))"
              );
              setIsDarkMode(true);
            }}
          />
        );
      case "lumina-ai":
        return <LuminaAIApp />;
      case "sampark-ai":
        return <SamparkAIApp />;
      case "ion-browser":
        return <IONBrowserApp />;
      case "quizaki":
        return <QuizakiApp />;
      case "weather-app":
        return <WeatherApp />;
      case "sonic-boom":
        return <SonicBoomApp />;
      default:
        return <div className="p-6 text-white">App not found</div>;
    }
  };

  const openWindow = (
    appId: string,
    title: string,
    component?: React.ReactNode
  ) => {
    const existingWindow = windows.find((w) => w.appId === appId);

    if (existingWindow) {
      if (existingWindow.isMinimized) {
        updateWindow(existingWindow.id, { isMinimized: false });
        soundManager.windowOpen();
      }
      setActiveWindow(existingWindow.id);
      return;
    }

    const newWindow: WindowData = {
      id: `window-${Date.now()}`,
      appId,
      title,
      component: component || getAppComponent(appId),
      position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
      size: { width: 900, height: 700 },
      isMinimized: false,
      zIndex: windows.length + 1,
      isResizable: true,
    };

    setWindows((prev) => [...prev, newWindow]);
    setActiveWindow(newWindow.id);
    soundManager.windowOpen();
  };

  // Define the browser window interface
  interface BrowserWindowData {
    id: string;
    url: string;
    title: string;
    isVisible: boolean;
    component: React.ReactNode;
    ref: React.RefObject<BrowserAppRef | null>;
  }

  // Manage standalone browser windows separately from regular windows
  const [browserWindows, setBrowserWindows] = useState<BrowserWindowData[]>([]);

  // Listen for global open-in-browser events so other components can open links
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent)?.detail as { url: string; title?: string } | undefined;
      if (detail?.url) {
        openBrowser(detail.url, detail.title || "Browser");
      }
    };

    window.addEventListener("open-in-browser", handler as EventListener);
    return () => window.removeEventListener("open-in-browser", handler as EventListener);
  }, [browserWindows]);

  const openBrowser = (url: string, title: string) => {
    // If any browser window is already visible, use it to open a new tab
    const anyVisibleBrowser = browserWindows.find((bw) => bw.isVisible);

    if (anyVisibleBrowser && anyVisibleBrowser.ref.current) {
      // Add a new tab to the existing browser window
      anyVisibleBrowser.ref.current.addTab(url, title);
      return;
    }

    // Check if we have a hidden browser we can reuse
    const anyHiddenBrowser = browserWindows.find((bw) => !bw.isVisible);

    if (anyHiddenBrowser) {
      // Make it visible and open the URL in a new tab
      setBrowserWindows((prev) =>
        prev.map((bw) =>
          bw.id === anyHiddenBrowser.id ? { ...bw, isVisible: true } : bw
        )
      );

      // If the browser has a ref with the addTab method, use it
      if (anyHiddenBrowser.ref.current) {
        setTimeout(() => {
          anyHiddenBrowser.ref.current?.addTab(url, title);
        }, 100); // Small delay to ensure the browser is visible first
      }

      soundManager.windowOpen();
      return;
    }

    // Otherwise create a new browser window
    const newBrowserId = `browser-${Date.now()}`;
    const browserRef = React.createRef<BrowserAppRef>();

    const browserComponent = (
      <BrowserApp
        initialUrl={url}
        initialTitle={title}
        ref={browserRef}
        onClose={() => {
          setBrowserWindows((prev) =>
            prev.map((bw) =>
              bw.id === newBrowserId ? { ...bw, isVisible: false } : bw
            )
          );
          soundManager.windowClose();
        }}
      />
    );

    setBrowserWindows((prev) => [
      ...prev,
      {
        id: newBrowserId,
        url,
        title,
        isVisible: true,
        component: browserComponent,
        ref: browserRef,
      },
    ]);
    soundManager.windowOpen();
  };

  const closeWindow = (windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
    setActiveWindow(null);
    soundManager.windowClose();
  };

  const updateWindow = (windowId: string, updates: Partial<WindowData>) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, ...updates } : w))
    );
    if (updates.isMinimized) {
      soundManager.windowMinimize();
    }
  };

  const focusWindow = (windowId: string) => {
    const maxZ = Math.max(...windows.map((w) => w.zIndex));
    updateWindow(windowId, { zIndex: maxZ + 1 });
    setActiveWindow(windowId);
  };

  const handleIconDoubleClick = (appId: string) => {
    const appNames: { [key: string]: string } = {
      "lumina-ai": "Lumina AI",
      "sampark-ai": "Sampark AI",
      "ion-browser": "ION Browser",
      quizaki: "Quizaki",
      "weather-app": "Weather App",
      "sonic-boom": "Sonic Boom",
    };
    openWindow(appId, appNames[appId] || appId);
  };

  const handleIconDragUpdate = (
    iconId: string,
    position: { x: number; y: number }
  ) => {
    setDesktopIcons((prev) =>
      prev.map((icon) => (icon.id === iconId ? { ...icon, position } : icon))
    );
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleContextMenuAction = (action: string) => {
    switch (action) {
      case "refresh":
        // Refresh desktop
        window.location.reload();
        break;
      case "new-document":
        alert("New Document feature - Coming Soon!");
        break;
      case "settings":
        openWindow(
          "settings",
          "System Settings",
          <SettingsApp
            currentWallpaper={currentWallpaper}
            onWallpaperChange={setCurrentWallpaper}
            isDarkMode={isDarkMode}
            onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
            onResetSettings={() => {
              setCurrentWallpaper(
                "linear-gradient(135deg, hsl(220 13% 18%), hsl(240 15% 12%), hsl(260 20% 8%))"
              );
              setIsDarkMode(true);
            }}
          />
        );
        break;
      case "about":
        openWindow(
          "about",
          "About Aditya OS",
          <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Aditya Srivastava OS</h2>
            <p>Interactive Portfolio Operating System</p>
            <p>Version 1.0</p>
            <p className="mt-4">Built with React, TypeScript & Tailwind CSS</p>
          </div>
        );
        break;
      default:
        break;
    }
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: currentWallpaper }}
      onContextMenu={handleRightClick}
      onClick={closeContextMenu}
    >
      {/* Desktop wallpaper overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Desktop Icons */}
      {desktopIcons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          icon={icon}
          onDoubleClick={handleIconDoubleClick}
          onDragUpdate={handleIconDragUpdate}
        />
      ))}

      {/* Welcome message */}
      <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <h1 className="text-4xl font-light text-white/90 mb-2">
          Aditya Srivastava
        </h1>
        <p className="text-xl text-white/70">Full Stack Developer</p>
      </div>

      <MenuBar onOpenWindow={openWindow} onOpenBrowser={openBrowser} />

      <WindowManager
        windows={windows}
        activeWindow={activeWindow}
        onClose={closeWindow}
        onUpdate={updateWindow}
        onFocus={focusWindow}
      />

      <Dock
        windows={windows}
        onOpenWindow={openWindow}
        onFocusWindow={focusWindow}
        onOpenBrowser={openBrowser}
      />

      {/* Browser */}
      {browserWindows
        .filter((bw) => bw.isVisible)
        .map((browser) => (
          <div key={browser.id} className="relative z-40">
            {browser.component}
          </div>
        ))}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          position={contextMenu}
          onClose={closeContextMenu}
          onAction={handleContextMenuAction}
        />
      )}
    </div>
  );
};

export default Desktop;
