import {
  ExternalLink,
  Github,
  Star,
  Code,
  Zap,
  Smartphone,
} from "lucide-react";

const IONBrowserApp = () => {
  const projectData = {
    name: "ION Browser",
    description:
      "A custom mobile web browser built with React Native that features gesture-based navigation, advanced tab management, and performance optimizations that reduced memory usage by 20%.",
    techStack: [
      "React Native",
      "Expo",
      "JavaScript",
      "WebView",
      "AsyncStorage",
      "React Native Reanimated",
    ],
    features: [
      "Modern browser experience",
      "Gesture-based navigation system",
      "Advanced tab management",
      "Custom bookmarking system",
      "Private browsing mode",
      "Download manager integration",
      "Dark/Light theme support",
    ],
    githubUrl: "https://github.com/adityasriv2317/ionBrowser/",
    deployedUrl:
      "https://github.com/adityasriv2317/ionBrowser/releases/tag/preRelease",
    status: "Beta Release",
    type: "Mobile Browser Application",
  };

  return (
    <div className="h-full rounded-t-xl bg-gradient-to-br from-indigo-900 to-violet-900 text-white overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img
              src="/icons/ion.png"
              className="w-18 h-18 rounded-xl flex items-center justify-center mr-4"
              alt="ION Browser"
            />
            <div className="text-left">
              <h1 className="text-3xl font-bold">{projectData.name}</h1>
              <p className="text-blue-200">{projectData.type}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={projectData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 rounded-2xl hover:rounded-full w-fit h-fit hover:bg-white/10 transition-all duration-200 hover:scale-105"
            >
              <Github className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </a>
            <a
              href={projectData.deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 rounded-2xl hover:rounded-full w-fit h-fit hover:bg-white/10 transition-all duration-200 hover:scale-105"
            >
              <ExternalLink className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </a>
          </div>
        </div>

        {/* Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="w-6 h-6 mr-2 text-orange-400" />
            Project Overview
          </h2>
          <div className="glass p-6 rounded-lg">
            <p className="text-gray-200 leading-relaxed">
              {projectData.description}
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                {projectData.status}
              </span>
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-yellow-400" />
            Performance Optimizations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">20%</div>
              <div className="text-sm text-gray-300">
                Memory Usage Reduction
              </div>
            </div>
            <div className="glass p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">30%</div>
              <div className="text-sm text-gray-300">Faster Page Loading</div>
            </div>
            <div className="glass p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">50%</div>
              <div className="text-sm text-gray-300">Improved Navigation</div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Smartphone className="w-6 h-6 mr-2 text-red-400" />
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
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0" />
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

export default IONBrowserApp;
