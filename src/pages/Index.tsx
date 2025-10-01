import BootScreen from "@/components/main/BootScreen";
import { useState } from "react";
import Desktop from "@/components/main/Desktop";

const Index = () => {
  const [isBooted, setIsBooted] = useState(false);

  const handleBoot = () => {
    setIsBooted(true);
  };

  return (
    <div className="relative">
      {!isBooted && <BootScreen onBootComplete={handleBoot} />}
      {isBooted && <Desktop />}
    </div>
  );
};

export default Index;
