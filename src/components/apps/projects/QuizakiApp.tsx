import { ExternalLink, Github, Star, Code, Users, Shield, Gamepad2 } from 'lucide-react';

const QuizakiApp = () => {
  const projectData = {
    name: 'Quizaki',
    description: 'A real-time quiz platform using React.js, Tailwind CSS, and Socket.IO. Features an admin panel and Google reCAPTCHA for bot protection with live multiplayer quiz functionality.',
    techStack: ['React.js', 'Tailwind CSS', 'Socket.IO', 'Node.js', 'Google reCAPTCHA', 'Express.js'],
    features: [
      'Real-time multiplayer quizzes',
      'Admin panel for quiz management',
      'Google reCAPTCHA bot protection',
      'Live leaderboards',
      'Custom quiz creation tools',
      'Real-time chat during quizzes',
      'Responsive design for all devices'
    ],
    githubUrl: 'https://github.com/aditya-srivastava/quizaki',
    deployedUrl: 'https://quizaki.vercel.app',
    status: 'Production Ready',
    type: 'Real-time Web Application'
  };

  return (
    <div className="h-full bg-gradient-to-br from-purple-900 to-pink-900 text-white overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mr-4">
            <Gamepad2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{projectData.name}</h1>
            <p className="text-purple-200">{projectData.type}</p>
          </div>
        </div>

        {/* Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="w-6 h-6 mr-2 text-purple-400" />
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

        {/* Real-time Features */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Users className="w-6 h-6 mr-2 text-pink-400" />
            Real-time Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-400">Live Multiplayer</h3>
              <p className="text-gray-300 text-sm">
                Multiple players can join quizzes simultaneously with real-time synchronization using Socket.IO.
              </p>
            </div>
            <div className="glass p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-400">Security</h3>
              <p className="text-gray-300 text-sm">
                Google reCAPTCHA integration prevents bot interference and ensures fair gameplay.
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
              <div className="mt-4 flex items-center text-purple-300">
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
                <Gamepad2 className="w-6 h-6 mr-3 text-pink-400 group-hover:text-pink-300" />
                <h3 className="text-lg font-semibold">Play Quiz</h3>
              </div>
              <p className="text-gray-400 text-sm">Try the live quiz platform</p>
              <div className="mt-4 flex items-center text-pink-300">
                <span>Start Playing</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default QuizakiApp;