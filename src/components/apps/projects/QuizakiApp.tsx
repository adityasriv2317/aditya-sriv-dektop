import { ExternalLink, Github, Star, Code, Users, Shield } from "lucide-react";

const QuizakiApp = () => {
  const projectData = {
    name: "Quizaki",
    description:
      "A real-time quiz platform using React.js, Tailwind CSS, and Socket.IO. Features an admin panel and Google reCAPTCHA for bot protection with live multiplayer quiz functionality.",
    techStack: [
      "React.js",
      "Tailwind CSS",
      "Socket.IO",
      "Node.js",
      "Google reCAPTCHA",
      "Express.js",
      "Framer Motion",
    ],
    features: [
      "Real-time multiplayer quizzes",
      "Admin panel for quiz management",
      "Google reCAPTCHA bot protection",
      "Live leaderboards",
      "Custom quiz creation tools",
      "Real-time chat during quizzes",
      "Responsive design for all devices",
    ],
    githubUrl: "https://github.com/adityasriv2317/quizaki",
    deployedUrl: "https://quizaki.vercel.app",
    status: "Production Ready",
    type: "Real-time Web Application",
  };

  return (
    <div className="h-full rounded-t-xl bg-gradient-to-br from-pink-900 to-red-950 text-white overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img
              src="/icons/quizaki.svg"
              className="w-18 h-18 rounded-xl flex items-center justify-center mr-4"
              alt="Quizaki"
            />
            <div className="text-left">
              <h1 className="text-3xl font-bold">{projectData.name}</h1>
              <p className="text-blue-200">{projectData.type}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("open-in-browser", {
                    detail: {
                      url: projectData.githubUrl,
                      title: projectData.name + " - GitHub",
                    },
                  })
                )
              }
              className="glass p-6 rounded-2xl hover:rounded-full w-fit h-fit hover:bg-white/10 transition-all duration-200 hover:scale-105"
              aria-label="Open GitHub"
            >
              <Github className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </button>
            <button
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("open-in-browser", {
                    detail: {
                      url: projectData.deployedUrl,
                      title: projectData.name,
                    },
                  })
                )
              }
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
            <Code className="w-6 h-6 mr-2 text-purple-400" />
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

        {/* Real-time Features */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Users className="w-6 h-6 mr-2 text-pink-400" />
            Real-time Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-400">
                Live Multiplayer
              </h3>
              <p className="text-gray-300 text-sm">
                Multiple players can join quizzes simultaneously with real-time
                synchronization using Socket.IO.
              </p>
            </div>
            <div className="glass p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-400">
                Security
              </h3>
              <p className="text-gray-300 text-sm">
                Google reCAPTCHA integration prevents bot interference and
                ensures fair gameplay.
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-green-400" />
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
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0" />
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

export default QuizakiApp;
