import { useState } from "react";
import { Wifi, Battery, Volume2, CircleEllipsis } from "lucide-react";
import ControlCenter from "./ControlCenter";
import Logo from "../ui/logo";

interface MenuBarProps {
  onOpenWindow: (
    appId: string,
    title: string,
    component?: React.ReactNode
  ) => void;
  onOpenBrowser?: (url: string, title: string) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ onOpenWindow, onOpenBrowser }) => {
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useState(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-8 glass menubar z-50 flex items-center justify-between px-4">
        {/* Left side - AS logo */}
        <div className="flex cursor-pointer items-center bg-white rounded-full transition-all ease-in-out px-1.5 py-0.5">
          <Logo />
        </div>

        {/* Right side - System indicators */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Wifi className="w-4 h-4 text-white" />
            <Battery className="w-4 h-4 text-white" />
            <Volume2 className="w-4 h-4 text-white" />
          </div>

          <div className="text-sm text-white/90 text-center">
            <div className="leading-none">{formatDate(currentTime)}</div>
            <div className="leading-none">{formatTime(currentTime)}</div>
          </div>

          <button
            onClick={() => setShowControlCenter(!showControlCenter)}
            className="p-1 rounded glass-hover transition-colors cursor-pointer"
          >
            <CircleEllipsis className="w-5 h-5 text-white/70" />
          </button>
        </div>
      </div>

      {showControlCenter && (
        <ControlCenter
          onClose={() => setShowControlCenter(false)}
          onOpenWindow={onOpenWindow}
          onOpenBrowser={onOpenBrowser}
        />
      )}
    </>
  );
};

export default MenuBar;
