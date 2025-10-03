import { useState, useEffect } from "react";
import { RefreshCw, FileText, Settings, Info, HelpCircle } from "lucide-react";

interface ContextMenuProps {
  position: { x: number; y: number };
  onClose: () => void;
  onAction: (action: string) => void;
}

const ContextMenu = ({ position, onClose, onAction }: ContextMenuProps) => {
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  useEffect(() => {
    // Adjust position to prevent menu from going off-screen
    const menuWidth = 220;
    const menuHeight = 280;
    const padding = 10;

    const adjustedX = Math.min(
      position.x,
      window.innerWidth - menuWidth - padding
    );
    const adjustedY = Math.min(
      position.y,
      window.innerHeight - menuHeight - padding
    );

    setAdjustedPosition({ x: adjustedX, y: adjustedY });
  }, [position]);

  const menuItems = [
    {
      icon: <RefreshCw className="w-4 h-4" />,
      label: "Refresh Desktop",
      action: "refresh",
      shortcut: "F5",
    },
    { type: "separator" },
    {
      icon: <FileText className="w-4 h-4" />,
      label: "New Document",
      action: "new-document",
    },
    {
      icon: <Settings className="w-4 h-4" />,
      label: "System Preferences",
      action: "settings",
    },
    { type: "separator" },
    {
      icon: <HelpCircle className="w-4 h-4" />,
      label: "Help",
      action: "help",
    },
    {
      icon: <Info className="w-4 h-4" />,
      label: "About Aditya OS",
      action: "about",
    },
  ];

  const handleItemClick = (action: string) => {
    onAction(action);
    onClose();
  };

  return (
    <div
      className="fixed z-50 glass rounded-lg shadow-2xl border border-white/20 py-2 min-w-[220px]"
      style={{
        left: adjustedPosition.x,
        top: adjustedPosition.y,
        backdropFilter: "blur(20px) saturate(180%)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {menuItems.map((item, index) => {
        if (item.type === "separator") {
          return <div key={index} className="h-px bg-white/10 mx-2 my-1" />;
        }

        return (
          <button
            key={index}
            onClick={() => handleItemClick(item.action!)}
            className="w-full flex items-center px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors group"
          >
            <span className="text-white/70 mr-3 group-hover:text-white/90 transition-colors">
              {item.icon}
            </span>
            <span className="flex-1 text-left">{item.label}</span>
            {item.shortcut && (
              <span className="text-xs text-white/50 ml-2">
                {item.shortcut}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ContextMenu;
