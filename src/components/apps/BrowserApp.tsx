import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Plus, X, Minus, Maximize2, Minimize2, HelpCircle } from "lucide-react";

interface Tab {
  id: string;
  url: string;
  title: string;
  isLoading: boolean;
}

interface BrowserAppProps {
  initialUrl: string;
  initialTitle?: string;
  onClose: () => void;
  isResizable?: boolean;
}

export interface BrowserAppRef {
  addTab: (url: string, title: string) => string;
}

const BrowserApp = forwardRef<BrowserAppRef, BrowserAppProps>(
  (
    { initialUrl, initialTitle = "Browser", onClose, isResizable = true },
    ref
  ) => {
    const [position, setPosition] = useState({ x: 150, y: 80 });
    const [size, setSize] = useState({ width: 900, height: 700 });
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [previousState, setPreviousState] = useState<{
      pos: { x: number; y: number };
      size: { width: number; height: number };
    } | null>(null);

    const [dragState, setDragState] = useState({
      isDragging: false,
      startPos: { x: 0, y: 0 },
      startWindowPos: { x: 0, y: 0 },
    });

    const [resizeState, setResizeState] = useState({
      isResizing: false,
      direction: null as string | null,
      startPos: { x: 0, y: 0 },
      startSize: { width: 0, height: 0 },
      startWindowPos: { x: 0, y: 0 },
    });

    const handleDragStart = (e: React.MouseEvent) => {
      if (
        isMaximized ||
        (e.target as HTMLElement).tagName === "BUTTON" ||
        (e.target as HTMLElement).closest("button")
      ) {
        return;
      }

      e.preventDefault();
      setDragState({
        isDragging: true,
        startPos: { x: e.clientX, y: e.clientY },
        startWindowPos: { x: position.x, y: position.y },
      });
    };

    const handleResizeStart = (e: React.MouseEvent, direction: string) => {
      e.stopPropagation();
      setResizeState({
        isResizing: true,
        direction,
        startPos: { x: e.clientX, y: e.clientY },
        startSize: { width: size.width, height: size.height },
        startWindowPos: { x: position.x, y: position.y },
      });
    };

    const minimizeWindow = () => {
      setIsMinimized(true);
      const minimizeEvent = new CustomEvent("browser-minimized", {
        detail: { id: ref },
      });
      window.dispatchEvent(minimizeEvent);
    };

    const maximizeWindow = () => {
      if (isMaximized) {
        if (previousState) {
          setPosition(previousState.pos);
          setSize(previousState.size);
        }
        setIsMaximized(false);
        setPreviousState(null);
      } else {
        setPreviousState({ pos: position, size: size });
        setPosition({ x: 0, y: 32 });
        setSize({
          width: window.innerWidth,
          height: window.innerHeight - 32,
        });
        setIsMaximized(true);
      }
    };

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (dragState.isDragging) {
          document.body.style.cursor = "grabbing";
          const deltaX = e.clientX - dragState.startPos.x;
          const deltaY = e.clientY - dragState.startPos.y;

          const maxX = window.innerWidth - 100;
          const maxY = window.innerHeight - 50;

          setPosition({
            x: Math.min(maxX, Math.max(0, dragState.startWindowPos.x + deltaX)),
            y: Math.min(
              maxY,
              Math.max(32, dragState.startWindowPos.y + deltaY)
            ),
          });
        }

        if (resizeState.isResizing) {
          // Set appropriate cursor during resize
          if (resizeState.direction === "e" || resizeState.direction === "w") {
            document.body.style.cursor = "ew-resize";
          } else if (
            resizeState.direction === "n" ||
            resizeState.direction === "s"
          ) {
            document.body.style.cursor = "ns-resize";
          } else if (
            resizeState.direction === "se" ||
            resizeState.direction === "nw"
          ) {
            document.body.style.cursor = "nwse-resize";
          } else if (
            resizeState.direction === "ne" ||
            resizeState.direction === "sw"
          ) {
            document.body.style.cursor = "nesw-resize";
          }

          const deltaX = e.clientX - resizeState.startPos.x;
          const deltaY = e.clientY - resizeState.startPos.y;
          let newWidth = resizeState.startSize.width;
          let newHeight = resizeState.startSize.height;
          let newX = resizeState.startWindowPos.x;
          let newY = resizeState.startWindowPos.y;

          if (resizeState.direction?.includes("e"))
            newWidth = Math.max(400, resizeState.startSize.width + deltaX);
          if (resizeState.direction?.includes("s"))
            newHeight = Math.max(300, resizeState.startSize.height + deltaY);
          if (resizeState.direction?.includes("w")) {
            const widthChange = Math.min(
              deltaX,
              resizeState.startSize.width - 400
            );
            newWidth = resizeState.startSize.width - widthChange;
            newX = resizeState.startWindowPos.x + widthChange;
          }
          if (resizeState.direction?.includes("n")) {
            const heightChange = Math.min(
              deltaY,
              resizeState.startSize.height - 300
            );
            newHeight = resizeState.startSize.height - heightChange;
            newY = Math.max(32, resizeState.startWindowPos.y + heightChange);
          }

          setSize({ width: newWidth, height: newHeight });
          setPosition({ x: newX, y: newY });
        }
      };

      const handleMouseUp = () => {
        document.body.style.cursor = "";
        setDragState((prev) => ({ ...prev, isDragging: false }));
        setResizeState((prev) => ({
          ...prev,
          isResizing: false,
          direction: null,
        }));
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
      };
    }, [dragState, resizeState, position, size]);

    const [tabs, setTabs] = useState<Tab[]>([]);
    const [activeTabId, setActiveTabId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentUrl, setCurrentUrl] = useState(initialUrl);

    useEffect(() => {
      const initialTab: Tab = {
        id: `tab-${Date.now()}`,
        url: initialUrl,
        title: initialTitle || new URL(initialUrl).hostname,
        isLoading: true,
      };
      setTabs([initialTab]);
      setActiveTabId(initialTab.id);
    }, [initialUrl, initialTitle]);

    const activeTab = tabs.find((tab) => tab.id === activeTabId);

    const addNewTab = (newUrl = "about:blank", newTitle = "New Tab") => {
      const newTab: Tab = {
        id: `tab-${Date.now()}`,
        url: newUrl,
        title: newTitle,
        isLoading: true,
      };
      setTabs((prev) => [...prev, newTab]);
      setActiveTabId(newTab.id);
      setCurrentUrl(newUrl);
      return newTab.id;
    };

    useImperativeHandle(ref, () => ({
      addTab: (tabUrl: string, tabTitle: string) => addNewTab(tabUrl, tabTitle),
    }));

    const projectShortcuts: {
      name: string;
      url: string;
      icon?: React.ReactNode;
    }[] = [
      {
        name: "Cable",
        url: "https://cable-web-page.vercel.app/",
        icon: (
          <img
            src="/icons/target.png"
            className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-200 to-purple-600 flex items-center justify-center p-1"
          />
        ),
      },
      {
        name: "weCaptcha",
        url: "https://wecaptcha.vercel.app/",
        icon: (
          <img
            src="/icons/captcha.png"
            className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-200 to-purple-400 flex items-center justify-center p-1"
          />
        ),
      },
      {
        name: "Sonic Boom",
        url: "https://sonic-boomgame.vercel.app/",
        icon: (
          <img
            src="/icons/sonic.png"
            className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-200 to-purple-400 flex items-center justify-center p-1"
          />
        ),
      },
      {
        name: "Quizaki",
        url: "https://quizaki.vercel.app/",
        icon: (
          <img
            src="/icons/quizaki.svg"
            className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center p-1"
          />
        ),
      },
      {
        name: "Pratham",
        url: "https://pratham.adityasrivastava.me/",
        icon: (
          <img
            src="/icons/hospital.png"
            className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-200 to-purple-400 flex items-center justify-center p-1"
          />
        ),
      },
      {
        name: "Help",
        url: "/help/index.html",
        icon: (
          <HelpCircle
            color="black"
            fill="white"
            className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-200 to-purple-600 flex items-center justify-center p-1"
          />
        ),
      },
      {
        name: "My Medic",
        url: "https://my-medic.vercel.app/",
        icon: (
          <img
            src="/icons/medic.png"
            className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-200 to-purple-600 flex items-center justify-center p-1"
          />
        ),
      },
    ];

    const closeTab = (tabId: string, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();

      setTabs((prev) => {
        if (prev.length === 1) {
          onClose();
          return prev;
        }

        const idx = prev.findIndex((t) => t.id === tabId);
        const newTabs = prev.filter((t) => t.id !== tabId);

        if (activeTabId === tabId) {
          const newActiveIndex = Math.max(0, idx - 1);
          if (newTabs[newActiveIndex]) {
            setActiveTabId(newTabs[newActiveIndex].id);
            setCurrentUrl(newTabs[newActiveIndex].url);
            setIsLoading(newTabs[newActiveIndex].isLoading);
          }
        }

        return newTabs;
      });
    };

    const switchTab = (tabId: string) => {
      const tab = tabs.find((t) => t.id === tabId);
      if (tab) {
        setActiveTabId(tabId);
        setCurrentUrl(tab.url);
        setIsLoading(tab.isLoading);
      }
    };

    useEffect(() => {
      const handleResize = () => {
        if (isMaximized) {
          setSize({
            width: window.innerWidth,
            height: window.innerHeight - 32,
          });
        }
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [isMaximized]);

    if (isMinimized) {
      return (
        <div
          className="fixed bottom-4 left-4 w-10 h-10 bg-gray-800/70 rounded-lg shadow-lg 
                    flex items-center justify-center cursor-pointer transform transition-all 
                    hover:scale-110 border border-white/20 z-40"
          onClick={() => setIsMinimized(false)}
          title={activeTab?.title || "Browser"}
        >
          <img src="/icons/ionpc.png" className="w-6 h-6" alt="Browser" />
        </div>
      );
    }

    return (
      <div
        className={`absolute custom-scrollbar overflow-hidden glass shadow-2xl pointer-events-auto flex flex-col ${
          isMaximized ? "animate-maximize" : "animate-window-appear"
        }`}
        style={{
          left: isMaximized ? 0 : position.x,
          top: isMaximized ? 32 : position.y,
          width: isMaximized ? "100vw" : size.width,
          height: isMaximized ? "calc(100vh - 32px)" : size.height,
          zIndex: 50,
          transition: isMaximized
            ? "all 0.3s ease"
            : dragState.isDragging
            ? "none"
            : "box-shadow 0.2s ease",
          boxShadow: isMaximized
            ? "none"
            : dragState.isDragging
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
          borderRadius: isMaximized ? 0 : "0.75rem",
          opacity: isMinimized ? 0 : 1,
        }}
      >
        {/* Window Title Bar */}
        <div
          className={`flex sticky top-0  items-center justify-between py-0.5 px-4 select-none ${
            dragState.isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleDragStart}
          onDoubleClick={maximizeWindow}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <div
                className="flex space-x-3 group"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={onClose}
                  className="w-4 h-4 bg-red-500 rounded-full hover:bg-red-400 flex items-center justify-center transition-all hover:scale-105"
                  aria-label="Close window"
                >
                  <X className="w-3 h-3 opacity-0 group-hover:opacity-100 text-black" />
                </button>
                <button
                  onClick={minimizeWindow}
                  className="w-4 h-4 bg-yellow-500 rounded-full hover:bg-yellow-400 flex items-center justify-center transition-all hover:scale-105"
                  aria-label="Minimize window"
                >
                  <Minus className="w-3 h-3 opacity-0 group-hover:opacity-100 text-black" />
                </button>
                <button
                  onClick={maximizeWindow}
                  className={`w-4 h-4 ${
                    isMaximized
                      ? "bg-blue-500 hover:bg-blue-400"
                      : "bg-green-500 hover:bg-green-400"
                  } rounded-full flex items-center justify-center transition-all hover:scale-105`}
                  aria-label={
                    isMaximized ? "Restore window" : "Maximize window"
                  }
                >
                  {isMaximized ? (
                    <Minimize2 className="w-3 h-3 text-black" />
                  ) : (
                    <Maximize2 className="w-3 h-3 opacity-0 group-hover:opacity-100 text-black" />
                  )}
                </button>
              </div>
              {/* Tab Bar */}
              <div className="flex items-center" onDoubleClick={maximizeWindow}>
                <div className="flex-1 rounded-l-2xl rounded-r-2xl flex items-center overflow-x-auto hide-scrollbar">
                  {tabs.map((tab) => (
                    <div
                      key={tab.id}
                      onClick={() => switchTab(tab.id)}
                      className={`flex items-center px-3 py-2 min-w-[120px] max-w-[200px] border-r border-white/10 cursor-pointer ${
                        tab.id === activeTabId
                          ? "bg-black/25"
                          : "bg-gray-900/15 hover:bg-black/15"
                      }`}
                    >
                      <div className="flex-1 text-xs text-white/90 truncate">
                        {tab.title}
                      </div>
                      <button
                        onClick={(e) => closeTab(tab.id, e)}
                        className="ml-2 p-0.5 rounded-full hover:bg-white/20"
                      >
                        <X className="w-3 h-3 text-white/60" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => addNewTab()}
                  className="p-1 bg-black/20 hover:bg-black/40 rounded-full ml-0.5"
                  aria-label="New Tab"
                >
                  <Plus className="w-4 h-4 text-white/70" />
                </button>
              </div>
            </div>

            {/* Drag area */}
            <div className="flex-grow h-full" onMouseDown={handleDragStart} />
          </div>
        </div>

        {/* Browser Content Area */}
        <div className="flex flex-col flex-1 h-full min-h-0">
          {/* Iframe Content */}
          <div className="flex-1 relative rounded-xl custom-scrollbar h-full overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                <div className="animate-spin w-8 h-8 border-2 border-white/10 border-t-white/90 rounded-full"></div>
              </div>
            )}

            {/* If this tab is a fresh new tab, show shortcuts grid */}
            {currentUrl === "about:blank" ? (
              <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {projectShortcuts.map((s) => (
                  <button
                    key={s.url}
                    onClick={() => {
                      setCurrentUrl(s.url);
                      setIsLoading(true);
                      if (activeTabId) {
                        setTabs((prev) =>
                          prev.map((tab) =>
                            tab.id === activeTabId
                              ? {
                                  ...tab,
                                  url: s.url,
                                  title: s.name,
                                  isLoading: true,
                                }
                              : tab
                          )
                        );
                      }
                    }}
                    className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5"
                    title={s.name}
                  >
                    {s.icon ? (
                      s.icon
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {s.name.charAt(0)}
                      </div>
                    )}
                    <div className="mt-2 text-xs text-white/90">{s.name}</div>
                  </button>
                ))}
              </div>
            ) : (
              <iframe
                src={currentUrl}
                className="w-full h-full border-0"
                title={activeTab?.title || "Browser Tab"}
                onLoad={() => {
                  setIsLoading(false);
                  if (activeTabId) {
                    setTabs((prev) =>
                      prev.map((tab) =>
                        tab.id === activeTabId
                          ? { ...tab, isLoading: false }
                          : tab
                      )
                    );
                  }
                }}
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            )}
          </div>
        </div>

        {/* Resize Handles */}
        {isResizable && !isMaximized && (
          <>
            <div
              className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize"
              onMouseDown={(e) => handleResizeStart(e, "nw")}
            />
            <div
              className="absolute top-0 right-0 w-4 h-4 cursor-nesw-resize"
              onMouseDown={(e) => handleResizeStart(e, "ne")}
            />
            <div
              className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize"
              onMouseDown={(e) => handleResizeStart(e, "sw")}
            />
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
              onMouseDown={(e) => handleResizeStart(e, "se")}
            />
            <div
              className="absolute top-0 left-4 right-4 h-1 cursor-ns-resize"
              onMouseDown={(e) => handleResizeStart(e, "n")}
            />
            <div
              className="absolute bottom-0 left-4 right-4 h-1 cursor-ns-resize"
              onMouseDown={(e) => handleResizeStart(e, "s")}
            />
            <div
              className="absolute left-0 top-4 bottom-4 w-1 cursor-ew-resize"
              onMouseDown={(e) => handleResizeStart(e, "w")}
            />
            <div
              className="absolute right-0 top-4 bottom-4 w-1 cursor-ew-resize"
              onMouseDown={(e) => handleResizeStart(e, "e")}
            />
          </>
        )}
      </div>
    );
  }
);

export default BrowserApp;
