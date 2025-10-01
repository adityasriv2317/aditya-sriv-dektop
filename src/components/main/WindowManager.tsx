import { useState, useRef, useEffect } from "react";
import { X, Minus, Square, Maximize2, Minimize2 } from "lucide-react";
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
  activeWindow,
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
    onUpdate(windowId, { isMinimized: true });
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
      // Maximize to full screen (minus menu bar and some padding)
      onUpdate(windowId, {
        isMaximized: true,
        previousPosition: window.position,
        previousSize: window.size,
        position: { x: 20, y: 50 },
        size: {
          width: globalThis.window.innerWidth - 40,
          height: globalThis.window.innerHeight - 150,
        },
      });
      soundManager.click();
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      {windows
        .filter((window) => !window.isMinimized)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((window) => (
          <div
            key={window.id}
            className="absolute border custom-scrollbar rounded-xl overflow-auto glass shadow-2xl pointer-events-auto animate-window-appear"
            style={{
              left: window.position.x,
              top: window.position.y,
              width: window.size.width,
              height: window.size.height,
              zIndex: window.zIndex,
            }}
            onClick={() => onFocus(window.id)}
          >
            {/* Window title bar */}
            <div
              className={`flex sticky top-0 backdrop-blur-md z-10 items-center justify-between py-2 px-4 border-b border-white/10 select-none ${
                dragState.isDragging && dragState.windowId === window.id
                  ? "cursor-grabbing"
                  : "cursor-grab"
              }`}
              onMouseDown={(e) => handleMouseDown(e, window.id, window)}
            >
              <div className="flex items-center space-x-3">
                {/* Traffic lights */}
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose(window.id);
                    }}
                    className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      minimizeWindow(window.id);
                    }}
                    className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      maximizeWindow(window.id);
                    }}
                    className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors flex items-center justify-center"
                  >
                    {window.isMaximized ? (
                      <Minimize2 className="w-1.5 h-1.5 text-green-900" />
                    ) : (
                      <Maximize2 className="w-1.5 h-1.5 text-green-900" />
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
