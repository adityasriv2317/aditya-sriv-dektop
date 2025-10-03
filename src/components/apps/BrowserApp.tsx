import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  RefreshCw,
  Plus,
  X,
  Minus,
  Maximize2,
  Minimize2,
  Globe,
} from "lucide-react";

// --- TYPE DEFINITIONS ---

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
  addTab: (url: string, title: string) => void;
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
      // Prevent dragging when clicking on buttons
      if (
        isMaximized ||
        (e.target as HTMLElement).tagName === "BUTTON" ||
        (e.target as HTMLElement).closest("button")
      ) {
        return;
      }

      e.preventDefault(); // Prevent text selection during drag
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
      // When minimizing, dispatch a custom event that can be listened to by parent components
      const minimizeEvent = new CustomEvent("browser-minimized", {
        detail: { id: ref },
      });
      window.dispatchEvent(minimizeEvent);
    };

    // Function to restore the window from minimized state
    const restoreFromMinimized = () => {
      setIsMinimized(false);
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
        // Add cursor styles to body during dragging/resizing
        if (dragState.isDragging) {
          document.body.style.cursor = "grabbing";
          const deltaX = e.clientX - dragState.startPos.x;
          const deltaY = e.clientY - dragState.startPos.y;

          // Keep window within viewport bounds
          const maxX = window.innerWidth - 100; // Keep at least part of window visible
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
        // Reset cursor
        document.body.style.cursor = "";
        setDragState((prev) => ({ ...prev, isDragging: false }));
        setResizeState((prev) => ({
          ...prev,
          isResizing: false,
          direction: null,
        }));
      };

      // Always add and remove listeners to ensure cleanup on unmount
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
      };
    }, [dragState, resizeState, position, size]);

    // === BROWSER STATE & LOGIC (from BrowserApp) ===

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
      setTabs([...tabs, newTab]);
      setActiveTabId(newTab.id);
      setCurrentUrl(newUrl);
    };

    useImperativeHandle(ref, () => ({
      addTab: (tabUrl: string, tabTitle: string) => addNewTab(tabUrl, tabTitle),
    }));

    const closeTab = (tabId: string, e: React.MouseEvent) => {
      e.stopPropagation();

      if (tabs.length === 1) {
        onClose();
        return;
      }

      const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
      const newTabs = tabs.filter((tab) => tab.id !== tabId);
      setTabs(newTabs);

      // If the closed tab was active, switch to an adjacent tab
      if (activeTabId === tabId) {
        const newActiveIndex = Math.max(0, tabIndex - 1);
        if (newTabs[newActiveIndex]) {
          setActiveTabId(newTabs[newActiveIndex].id);
          setCurrentUrl(newTabs[newActiveIndex].url);
          setIsLoading(newTabs[newActiveIndex].isLoading);
        }
      }
    };

    const switchTab = (tabId: string) => {
      const tab = tabs.find((t) => t.id === tabId);
      if (tab) {
        setActiveTabId(tabId);
        setCurrentUrl(tab.url);
        setIsLoading(tab.isLoading);
      }
    };

    // Add an effect to handle window resize events for maximized windows
    useEffect(() => {
      const handleResize = () => {
        if (isMaximized) {
          // Update the maximized window size when the browser window resizes
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
      // When minimized, render a small indicator that can be clicked to restore
      return (
        <div
          className="fixed bottom-4 left-4 w-10 h-10 bg-gray-800/70 rounded-lg shadow-lg 
                    flex items-center justify-center cursor-pointer transform transition-all 
                    hover:scale-110 border border-white/20 z-40"
          onClick={() => setIsMinimized(false)}
          title={activeTab?.title || "Browser"}
        >
          <Globe className="w-5 h-5 text-white/90" />
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
                          : "bg-gray-900/10 hover:bg-gray-800/50"
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
          <div className="flex-1 relative rounded-xl custom-scrollbar h-full overflow-auto">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                <div className="animate-spin w-8 h-8 border-2 border-white/10 border-t-white/90 rounded-full"></div>
              </div>
            )}
            <iframe
              src={currentUrl}
              className="w-full h-full border-0"
              title={activeTab?.title || "Browser Tab"}
              onLoad={() => {
                setIsLoading(false);
                if (activeTabId) {
                  setTabs(
                    tabs.map((tab) =>
                      tab.id === activeTabId
                        ? { ...tab, isLoading: false }
                        : tab
                    )
                  );
                }
              }}
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
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
