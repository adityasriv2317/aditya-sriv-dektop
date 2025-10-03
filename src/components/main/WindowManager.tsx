import { useState, useEffect } from "react";
import { X, Minus, Maximize2, Minimize2 } from "lucide-react";
import type { WindowData } from "./types";
import { soundManager } from "@/lib/sounds";

interface WindowManagerProps {
  windows: WindowData[];
  activeWindow: string | null;
  onClose: (windowId: string) => void;
  onUpdate: (windowId: string, updates: Partial<WindowData>) => void;
  onFocus: (windowId: string) => void;
}

const WindowManager = ({
  windows,
  onClose,
  onUpdate,
  onFocus,
}: WindowManagerProps) => {
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    windowId: string | null;
    startPos: { x: number; y: number };
    startWindowPos: { x: number; y: number };
  }>({
    isDragging: false,
    windowId: null,
    startPos: { x: 0, y: 0 },
    startWindowPos: { x: 0, y: 0 },
  });

  const [resizeState, setResizeState] = useState<{
    isResizing: boolean;
    windowId: string | null;
    direction: string | null;
    startPos: { x: number; y: number };
    startSize: { width: number; height: number };
    startWindowPos: { x: number; y: number };
  }>({
    isResizing: false,
    windowId: null,
    direction: null,
    startPos: { x: 0, y: 0 },
    startSize: { width: 0, height: 0 },
    startWindowPos: { x: 0, y: 0 },
  });

  const handleMouseDown = (
    e: React.MouseEvent,
    windowId: string,
    window: WindowData
  ) => {
    onFocus(windowId);

    setDragState({
      isDragging: true,
      windowId,
      startPos: { x: e.clientX, y: e.clientY },
      startWindowPos: { x: window.position.x, y: window.position.y },
    });
  };

  // Handle window resize for maximized windows
  useEffect(() => {
    const handleResize = () => {
      // Update all maximized windows to fit the new screen size
      windows.forEach((window) => {
        if (window.isMaximized) {
          onUpdate(window.id, {
            position: { x: 0, y: 32 },
            size: {
              width: globalThis.window.innerWidth,
              height: globalThis.window.innerHeight - 32,
            },
          });
        }
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windows, onUpdate]);

  // Use document-level event listeners for smoother dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragState.isDragging && dragState.windowId) {
        e.preventDefault();
        const deltaX = e.clientX - dragState.startPos.x;
        const deltaY = e.clientY - dragState.startPos.y;

        onUpdate(dragState.windowId, {
          position: {
            x: dragState.startWindowPos.x + deltaX,
            y: Math.max(32, dragState.startWindowPos.y + deltaY),
          },
        });
      }

      if (resizeState.isResizing && resizeState.windowId) {
        e.preventDefault();
        const deltaX = e.clientX - resizeState.startPos.x;
        const deltaY = e.clientY - resizeState.startPos.y;
        const direction = resizeState.direction;

        let newWidth = resizeState.startSize.width;
        let newHeight = resizeState.startSize.height;
        let newX = resizeState.startWindowPos.x;
        let newY = resizeState.startWindowPos.y;

        if (direction?.includes("e")) {
          newWidth = Math.max(400, resizeState.startSize.width + deltaX);
        }
        if (direction?.includes("s")) {
          newHeight = Math.max(300, resizeState.startSize.height + deltaY);
        }
        if (direction?.includes("w")) {
          const widthChange = Math.min(
            deltaX,
            resizeState.startSize.width - 400
          );
          newWidth = resizeState.startSize.width - widthChange;
          newX = resizeState.startWindowPos.x + widthChange;
        }
        if (direction?.includes("n")) {
          const heightChange = Math.min(
            deltaY,
            resizeState.startSize.height - 300
          );
          newHeight = resizeState.startSize.height - heightChange;
          newY = Math.max(32, resizeState.startWindowPos.y + heightChange);
        }

        onUpdate(resizeState.windowId, {
          position: { x: newX, y: newY },
          size: { width: newWidth, height: newHeight },
        });
      }
    };

    const handleMouseUp = () => {
      setDragState({
        isDragging: false,
        windowId: null,
        startPos: { x: 0, y: 0 },
        startWindowPos: { x: 0, y: 0 },
      });
      setResizeState({
        isResizing: false,
        windowId: null,
        direction: null,
        startPos: { x: 0, y: 0 },
        startSize: { width: 0, height: 0 },
        startWindowPos: { x: 0, y: 0 },
      });
    };

    if (dragState.isDragging || resizeState.isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragState, resizeState, onUpdate]);

  const handleResizeStart = (
    e: React.MouseEvent,
    windowId: string,
    window: WindowData,
    direction: string
  ) => {
    e.stopPropagation();
    onFocus(windowId);

    setResizeState({
      isResizing: true,
      windowId,
      direction,
      startPos: { x: e.clientX, y: e.clientY },
      startSize: { width: window.size.width, height: window.size.height },
      startWindowPos: { x: window.position.x, y: window.position.y },
    });
  };

  const minimizeWindow = (windowId: string) => {
    // Apply minimize animation class first
    const window = windows.find((w) => w.id === windowId);
    if (window) {
      // First update with animation class
      onUpdate(windowId, {
        minimizeAnimation: true,
      });

      // Then after animation delay, actually minimize
      setTimeout(() => {
        onUpdate(windowId, {
          isMinimized: true,
          minimizeAnimation: false,
        });
      }, 200); // Match the animation duration
    }

    soundManager.windowMinimize();
  };

  const maximizeWindow = (windowId: string) => {
    const window = windows.find((w) => w.id === windowId);
    if (!window) return;

    if (window.isMaximized) {
      // Restore to previous size
      onUpdate(windowId, {
        isMaximized: false,
        position: window.previousPosition || { x: 100, y: 100 },
        size: window.previousSize || { width: 900, height: 700 },
      });
      soundManager.click();
    } else {
      // Maximize to full screen (with just enough space for menu bar)
      onUpdate(windowId, {
        isMaximized: true,
        previousPosition: window.position,
        previousSize: window.size,
        position: { x: 0, y: 32 },
        size: {
          width: globalThis.window.innerWidth,
          height: globalThis.window.innerHeight - 32,
        },
      });
      soundManager.click();
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Minimized window indicators */}
      <div className="fixed bottom-16 left-4 flex flex-col space-y-2">
        {windows
          .filter((window) => window.isMinimized)
          .map((window, index) => (
            <div
              key={window.id}
              className="w-10 h-10 bg-gray-800/70 rounded-lg shadow-lg 
                        flex items-center justify-center cursor-pointer transform transition-all 
                        hover:scale-110 border border-white/20 z-40 pointer-events-auto"
              onClick={() => onUpdate(window.id, { isMinimized: false })}
              title={window.title}
              style={{ left: `${4 + index * 12}px` }}
            >
              <div className="text-white font-semibold text-sm">
                {window.title.charAt(0)}
              </div>
            </div>
          ))}
      </div>

      {/* Regular windows */}
      {windows
        .filter((window) => !window.isMinimized)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((window) => (
          <div
            key={window.id}
            className={`absolute custom-scrollbar overflow-hidden glass shadow-2xl pointer-events-auto ${
              window.minimizeAnimation
                ? "animate-minimize"
                : window.isMaximized
                ? "animate-maximize"
                : "animate-window-appear"
            }`}
            style={{
              left: window.isMaximized ? 0 : window.position.x,
              top: window.isMaximized ? 32 : window.position.y,
              width: window.isMaximized ? "100vw" : window.size.width,
              height: window.isMaximized
                ? "calc(100vh - 32px)"
                : window.size.height,
              zIndex: window.zIndex,
              transition: window.isMaximized
                ? "all 0.3s ease"
                : dragState.isDragging && dragState.windowId === window.id
                ? "none"
                : "box-shadow 0.2s ease",
              boxShadow: window.isMaximized
                ? "none"
                : "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
              borderRadius: window.isMaximized ? 0 : "0.75rem",
            }}
            onClick={() => onFocus(window.id)}
          >
            {/* Window title bar */}
            <div
              className={`flex sticky top-0 backdrop-blur-md z-10 items-center justify-between py-2 px-4 select-none bg-gray-900/80 border-b border-white/10 ${
                dragState.isDragging && dragState.windowId === window.id
                  ? "cursor-grabbing"
                  : "cursor-grab"
              }`}
              onMouseDown={(e) => handleMouseDown(e, window.id, window)}
              onDoubleClick={(e) => {
                e.stopPropagation();
                maximizeWindow(window.id);
              }}
            >
              <div className="flex items-center space-x-3">
                {/* Traffic lights */}
                <div className="flex space-x-3 group">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose(window.id);
                      soundManager.windowClose();
                    }}
                    className="w-4 h-4 bg-red-500 rounded-full hover:bg-red-400 flex items-center justify-center transition-all hover:scale-105"
                    aria-label="Close window"
                  >
                    <X className="w-2 h-2 opacity-0 group-hover:opacity-100 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      minimizeWindow(window.id);
                      soundManager.windowMinimize();
                    }}
                    className="w-4 h-4 bg-yellow-500 rounded-full hover:bg-yellow-400 flex items-center justify-center transition-all hover:scale-105"
                    aria-label="Minimize window"
                  >
                    <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      maximizeWindow(window.id);
                    }}
                    className={`w-4 h-4 ${
                      window.isMaximized
                        ? "bg-blue-500 hover:bg-blue-400"
                        : "bg-green-500 hover:bg-green-400"
                    } rounded-full flex items-center justify-center transition-all hover:scale-105`}
                    aria-label={
                      window.isMaximized ? "Restore window" : "Maximize window"
                    }
                  >
                    {window.isMaximized ? (
                      <Minimize2 className="w-2 h-2 text-white" />
                    ) : (
                      <Maximize2 className="w-2 h-2 opacity-0 group-hover:opacity-100 text-white" />
                    )}
                  </button>
                </div>

                <h3 className="text-white font-medium text-sm">
                  {window.title}
                </h3>
              </div>
            </div>

            {/* Window content with custom scrollbar */}
            <div className="flex-1 overflow-auto">{window.component}</div>

            {/* Resize handles */}
            {window.isResizable && !window.isMaximized && (
              <>
                {/* Corners */}
                <div
                  className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize"
                  onMouseDown={(e) =>
                    handleResizeStart(e, window.id, window, "nw")
                  }
                />
                <div
                  className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize"
                  onMouseDown={(e) =>
                    handleResizeStart(e, window.id, window, "ne")
                  }
                />
                <div
                  className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize"
                  onMouseDown={(e) =>
                    handleResizeStart(e, window.id, window, "sw")
                  }
                />
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                  onMouseDown={(e) =>
                    handleResizeStart(e, window.id, window, "se")
                  }
                />

                {/* Edges */}
                <div
                  className="absolute top-0 left-4 right-4 h-1 cursor-n-resize"
                  onMouseDown={(e) =>
                    handleResizeStart(e, window.id, window, "n")
                  }
                />
                <div
                  className="absolute bottom-0 left-4 right-4 h-1 cursor-s-resize"
                  onMouseDown={(e) =>
                    handleResizeStart(e, window.id, window, "s")
                  }
                />
                <div
                  className="absolute left-0 top-4 bottom-4 w-1 cursor-w-resize"
                  onMouseDown={(e) =>
                    handleResizeStart(e, window.id, window, "w")
                  }
                />
                <div
                  className="absolute right-0 top-4 bottom-4 w-1 cursor-e-resize"
                  onMouseDown={(e) =>
                    handleResizeStart(e, window.id, window, "e")
                  }
                />
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default WindowManager;
