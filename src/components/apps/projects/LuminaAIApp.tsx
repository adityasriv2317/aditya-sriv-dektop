import {
  ExternalLink,
  Github,
  Star,
  Code,
  Zap,
} from "lucide-react";

const LuminaAIApp = () => {
  const projectData = {
    name: "Lumina AI",
    description:
      "An AI-powered chatbot application built with React Native and Node.js that leverages the Gemini API for intelligent responses and features a modern UI with smooth animations.",
    techStack: [
      "React Native",
      "Node.js",
      "Gemini API",
      "JavaScript",
      "REST APIs",
      "MongoDB",
    ],
    features: [
      "Contextual AI responses",
      "Real-time response generation",
      "Modern and intuitive UI design",
      "Smooth animations and transitions",
      "Gemini API integration for intelligent responses",
    ],
    githubUrl: "https://github.com/adityasriv2317/luminaAi",
    deployedUrl:
      "https://github.com/adityasriv2317/luminaAi/releases/tag/pre-release",
    status: "Active Development",
    type: "Mobile Application",
  };

  return (
    <div className="h-full rounded-t-xl bg-gradient-to-br from-green-900 to-teal-900 text-white overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img
              src="/icons/lumina.png"
              className="w-18 h-18 rounded-xl flex items-center justify-center mr-4"
              alt="Lumina AI"
            />
            <div className="text-left">
              <h1 className="text-3xl font-bold">{projectData.name}</h1>
              <p className="text-green-200">{projectData.type}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-in-browser', { detail: { url: projectData.githubUrl, title: projectData.name + ' - GitHub' } }))}
              className="glass p-6 rounded-2xl hover:rounded-full w-fit h-fit hover:bg-white/10 transition-all duration-200 hover:scale-105"
              aria-label="Open GitHub"
            >
              <Github className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-in-browser', { detail: { url: projectData.deployedUrl, title: projectData.name } }))}
              className="glass p-6 rounded-2xl hover:rounded-full w-fit h-fit hover:bg-white/10 transition-all duration-200 hover:scale-105"
              aria-label="Open Demo"
            >
              <ExternalLink className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="w-6 h-6 mr-2 text-blue-400" />
            Project Overview
          </h2>
          <div className="glass p-6 rounded-lg">
            <p className="text-gray-200 leading-relaxed">
              {projectData.description}
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                {projectData.status}
              </span>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-purple-400" />
            Technology Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {projectData.techStack.map((tech, index) => (
              <div
                key={index}
                className="glass p-4 rounded-lg text-center hover:bg-white/10 transition-colors"
              >
                <span className="font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-400" />
            Key Features
          </h2>
          <div className="glass p-6 rounded-lg">
            <ul className="space-y-3">
              {projectData.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-gray-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LuminaAIApp;
