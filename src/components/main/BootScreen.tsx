import { useState, useEffect } from "react";

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen = ({ onBootComplete }: BootScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<"logo" | "loading" | "complete">("logo");

  useEffect(() => {
    // Logo display phase
    const logoTimer = setTimeout(() => {
      setStage("loading");
    }, 1500);

    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    if (stage === "loading") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setStage("complete");
            setTimeout(onBootComplete, 500);
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [stage, onBootComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div
          className={`flex flex-col gap-4 items-center justify-center mb-16 transition-all duration-1000 ${
            stage === "logo" ? "opacity-0 scale-90" : "opacity-100 scale-100"
          }`}
        >
          <div
            className={`w-24 h-24 rounded-full bg-white flex items-center justify-center transition-all duration-1000 ${
              stage === "logo" ? "opacity-0 scale-90" : "opacity-100 scale-100"
            }`}
          >
            <span className="text-black text-3xl font-semibold tracking-tight">
              AS
            </span>
          </div>
          <span>Aditya Srivastava</span>
        </div>

        {/* Progress bar - only show during loading */}
        {stage === "loading" && (
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BootScreen;
