import React from "react";

interface BrowserAppProps {
  url: string;
}

const BrowserApp: React.FC<BrowserAppProps> = ({ url }) => {
  return (
    <div className="h-full rounded-t-xl glass text-white overflow-hidden">
      <iframe
        src={url}
        className="w-full h-full border-0"
        title="Browser App"
      ></iframe>
    </div>
  );
};

export default BrowserApp;
