import {
  ExternalLink,
  Github,
  Star,
  Code,
  Music,
  Gamepad2,
  Trophy,
} from "lucide-react";

const SonicBoomApp = () => {
  const projectData = {
    name: "Sonic Boom",
    description:
      "A 2D game developed with JavaScript and Kaplay JS, featuring smooth animations, immersive music, and a high-score system using local storage. An engaging arcade-style game with modern web technologies.",
    techStack: [
      "JavaScript",
      "Kaplay JS",
      "HTML5 Canvas",
      "JS Audio API",
      "Local Storage",
      "CSS3",
    ],
    features: [
      "Smooth 2D animations",
      "Immersive background music",
      "High-score tracking system",
      "Local storage integration",
      "Responsive game controls",
      "Modern arcade-style gameplay",
      "Cross-platform compatibility",
    ],
    githubUrl: "https://github.com/adityasriv2317/sonic-boom",
    deployedUrl: "https://sonic-boomgame.vercel.app/",
    status: "Completed",
    type: "2D Web Game",
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-800 to-black text-white overflow-auto">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center mr-4">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold">{projectData.name}</h1>
              <p className="text-gray-200">{projectData.type}</p>
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
            <Code className="w-6 h-6 mr-2 text-indigo-400" />
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

        {/* Game Features */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Music className="w-6 h-6 mr-2 text-purple-400" />
            Game Mechanics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass p-6 rounded-lg text-center">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">High Scores</h3>
              <p className="text-gray-300 text-sm">
                Local storage system tracks player achievements
              </p>
            </div>
            <div className="glass p-6 rounded-lg text-center">
              <Music className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Audio</h3>
              <p className="text-gray-300 text-sm">
                Immersive sound effects and background music
              </p>
            </div>
            <div className="glass p-6 rounded-lg text-center">
              <Gamepad2 className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Controls</h3>
              <p className="text-gray-300 text-sm">
                Responsive keyboard and touch controls
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-400" />
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
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0" />
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

export default SonicBoomApp;
