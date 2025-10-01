import { ExternalLink, Github, Star, Code, Mail, Zap, Calendar } from 'lucide-react';

const SamparkAIApp = () => {
  const projectData = {
    name: 'Sampark AI',
    description: 'A full-stack web application that automates personalized email invitations using React.js, Node.js, and MongoDB. It integrates Nodemailer and Cron for scheduling and the Gemini API for intelligent content generation.',
    techStack: ['React.js', 'Node.js', 'MongoDB', 'Nodemailer', 'Gemini API', 'Cron Jobs'],
    features: [
      'Automated email invitation system',
      'AI-powered content generation',
      'Scheduled email campaigns',
      'Personalized email templates',
      'MongoDB database integration',
      'Real-time email tracking',
      'Responsive web interface'
    ],
    githubUrl: 'https://github.com/aditya-srivastava/sampark-ai',
    deployedUrl: 'https://sampark-ai.vercel.app',
    status: 'Production Ready',
    type: 'Full-Stack Web Application'
  };

  return (
    <div className="h-full bg-gradient-to-br from-green-900 to-teal-900 text-white overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-xl flex items-center justify-center mr-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{projectData.name}</h1>
            <p className="text-green-200">{projectData.type}</p>
          </div>
        </div>

        {/* Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="w-6 h-6 mr-2 text-green-400" />
            Project Overview
          </h2>
          <div className="glass p-6 rounded-lg">
            <p className="text-gray-200 leading-relaxed">{projectData.description}</p>
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
              <h3 className="text-lg font-semibold mb-3 text-green-400">AI Integration</h3>
              <p className="text-gray-300 text-sm">
                Leverages Gemini API to generate personalized email content based on recipient data and context.
              </p>
            </div>
            <div className="glass p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-teal-400">Automation</h3>
              <p className="text-gray-300 text-sm">
                Cron jobs handle scheduled email campaigns with Nodemailer for reliable email delivery.
              </p>
            </div>
          </div>
        </section>

        {/* Links */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Project Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={projectData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 rounded-lg hover:bg-white/10 transition-all hover:scale-105 group"
            >
              <div className="flex items-center mb-3">
                <Github className="w-6 h-6 mr-3 text-gray-300 group-hover:text-white" />
                <h3 className="text-lg font-semibold">Source Code</h3>
              </div>
              <p className="text-gray-400 text-sm">View the complete source code on GitHub</p>
              <div className="mt-4 flex items-center text-green-300">
                <span>View Repository</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </div>
            </a>

            <a
              href={projectData.deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 rounded-lg hover:bg-white/10 transition-all hover:scale-105 group"
            >
              <div className="flex items-center mb-3">
                <Mail className="w-6 h-6 mr-3 text-teal-400 group-hover:text-teal-300" />
                <h3 className="text-lg font-semibold">Live Application</h3>
              </div>
              <p className="text-gray-400 text-sm">Try the live email automation platform</p>
              <div className="mt-4 flex items-center text-teal-300">
                <span>Open App</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SamparkAIApp;