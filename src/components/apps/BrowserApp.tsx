import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { RefreshCw, Plus, X } from "lucide-react";

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
}

export interface BrowserAppRef {
  addTab: (url: string, title: string) => void;
}

// --- MAIN COMPONENT ---

const BrowserApp = forwardRef<BrowserAppRef, BrowserAppProps>(
  ({ initialUrl, initialTitle = "Browser", onClose }, ref) => {
    // === BROWSER STATE & LOGIC ===
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [activeTabId, setActiveTabId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentUrl, setCurrentUrl] = useState(initialUrl);

    // Initialize with the first tab
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

    // Add a new tab function
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

    // Expose addTab function to parent components
    useImperativeHandle(ref, () => ({
      addTab: (tabUrl: string, tabTitle: string) => addNewTab(tabUrl, tabTitle),
    }));

    // Close tab function
    const closeTab = (tabId: string, e: React.MouseEvent) => {
      e.stopPropagation();

      // If it's the last tab, close the entire window
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

    // Switch tab function
    const switchTab = (tabId: string) => {
      const tab = tabs.find((t) => t.id === tabId);
      if (tab) {
        setActiveTabId(tabId);
        setCurrentUrl(tab.url);
        setIsLoading(tab.isLoading);
      }
    };

    // --- JSX RENDER ---
    return (
      <div className="flex flex-col h-full">
        {/* Browser Content Area */}
        <div className="flex flex-col flex-1 h-full min-h-0">
          {/* Tab Bar */}
          <div className="bg-gray-900/90 border-b border-white/10 flex items-center">
            <div className="flex-1 flex items-center overflow-x-auto hide-scrollbar">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => switchTab(tab.id)}
                  className={`flex items-center px-3 py-2 min-w-[120px] max-w-[200px] border-r border-white/10 cursor-pointer ${
                    tab.id === activeTabId
                      ? "bg-gray-800/80"
                      : "bg-gray-900/30 hover:bg-gray-800/50"
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
              className="p-1.5 hover:bg-white/10"
              aria-label="New Tab"
            >
              <Plus className="w-4 h-4 text-white/70" />
            </button>
          </div>

          {/* Iframe Content */}
          <div className="flex-1 relative custom-scrollbar h-full overflow-auto">
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
      </div>
    );
  }
);

export default BrowserApp;
