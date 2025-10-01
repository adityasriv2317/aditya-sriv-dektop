import { ExternalLink, Github, Star, Code, Globe, Zap, Smartphone } from 'lucide-react';

const IONBrowserApp = () => {
  const projectData = {
    name: 'ION Browser',
    description: 'A custom mobile web browser built with React Native that features gesture-based navigation, advanced tab management, and performance optimizations that reduced memory usage by 20%.',
    techStack: ['React Native', 'JavaScript', 'WebView', 'AsyncStorage', 'Gesture Handler'],
    features: [
      'Gesture-based navigation system',
      'Advanced tab management',
      '20% improved memory efficiency',
      'Custom bookmarking system',
      'Private browsing mode',
      'Download manager integration',
      'Dark/Light theme support'
    ],
    githubUrl: 'https://github.com/aditya-srivastava/ion-browser',
    deployedUrl: 'https://ion-browser-demo.vercel.app',
    status: 'Beta Release',
    type: 'Mobile Browser Application'
  };

  return (
    <div className="h-full bg-gradient-to-br from-orange-900 to-red-900 text-white overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center mr-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{projectData.name}</h1>
            <p className="text-orange-200">{projectData.type}</p>
          </div>
        </div>

        {/* Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="w-6 h-6 mr-2 text-orange-400" />
            Project Overview
          </h2>
          <div className="glass p-6 rounded-lg">
            <p className="text-gray-200 leading-relaxed">{projectData.description}</p>
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
              <div className="text-sm text-gray-300">Memory Usage Reduction</div>
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
              <div className="mt-4 flex items-center text-orange-300">
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
                <Globe className="w-6 h-6 mr-3 text-red-400 group-hover:text-red-300" />
                <h3 className="text-lg font-semibold">Demo</h3>
              </div>
              <p className="text-gray-400 text-sm">Try the browser demo</p>
              <div className="mt-4 flex items-center text-red-300">
                <span>Open Demo</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IONBrowserApp;