import {
  ExternalLink,
  Github,
  Star,
  Code,
  Zap,
  Calendar,
} from "lucide-react";

const SamparkAIApp = () => {
  const projectData = {
    name: "Sampark AI",
    description:
      "A full-stack web application that automates personalized email invitations using React.js, Node.js, and MongoDB. It integrates Nodemailer and Cron for scheduling and the Gemini API for intelligent content generation.",
    techStack: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Nodemailer",
      "Gemini API",
      "Cron Jobs",
    ],
    features: [
      "Automated email invitation system",
      "AI-powered content generation",
      "Scheduled email campaigns",
      "Personalized email templates",
      "MongoDB database integration",
      "Real-time email tracking",
      "Responsive web interface",
    ],
    githubUrl: "https://github.com/adityasriv2317/sampark-ai",
    deployedUrl: "https://sampark-ai.vercel.app",
    status: "Production Ready",
    type: "Full-Stack Web Application",
  };

  return (
    <div className="h-full rounded-t-xl bg-gradient-to-br from-blue-900 to-purple-900 text-white overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img
              src="/icons/sampark.png"
              className="w-18 h-18 rounded-xl flex items-center justify-center mr-4"
              alt="Sampark AI"
            />
            <div className="text-left">
              <h1 className="text-3xl font-bold">{projectData.name}</h1>
              <p className="text-purple-200">{projectData.type}</p>
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
            <Code className="w-6 h-6 mr-2 text-green-400" />
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
            <Zap className="w-6 h-6 mr-2 text-teal-400" />
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
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-gray-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Architecture Highlight */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-400" />
            Architecture Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-400">
                AI Integration
              </h3>
              <p className="text-gray-300 text-sm">
                Leverages Gemini API to generate personalized email content
                based on recipient data and context.
              </p>
            </div>
            <div className="glass p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-teal-400">
                Automation
              </h3>
              <p className="text-gray-300 text-sm">
                Cron jobs handle scheduled email campaigns with Nodemailer for
                reliable email delivery.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SamparkAIApp;
