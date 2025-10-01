import { useState, useRef, useEffect } from "react";
// import type { DesktopIconData } from '../os/types';
import type { DesktopIconData } from "./types";

interface DesktopIconProps {
  icon: DesktopIconData;
  onDoubleClick: (appId: string) => void;
  onDragUpdate: (id: string, position: { x: number; y: number }) => void;
}

const DesktopIcon = ({
  icon,
  onDoubleClick,
  onDragUpdate,
}: DesktopIconProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const iconRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = iconRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  // Use document-level event listeners for smooth dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        onDragUpdate(icon.id, { x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, icon.id, onDragUpdate]);

  return (
    <div
      ref={iconRef}
      className={`desktop-icon glass rounded-lg p-3 transition-all duration-200 absolute w-20 h-20 flex flex-col items-center justify-center text-center cursor-pointer select-none ${
        isDragging ? "dragging" : ""
      }`}
      style={{
        left: icon.position.x,
        top: icon.position.y,
        userSelect: "none",
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={() => !isDragging && onDoubleClick(icon.appId)}
    >
      <div className="text-white/80 mb-1">{icon.icon}</div>
      <span className="text-xs text-white/90 font-medium">{icon.name}</span>
    </div>
  );
};

export default DesktopIcon;
