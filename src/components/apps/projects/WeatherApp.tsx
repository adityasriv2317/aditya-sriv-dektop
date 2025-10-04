import {
  ExternalLink,
  Github,
  Star,
  Code,
  Smartphone,
  MapPin,
} from "lucide-react";

const WeatherApp = () => {
  const projectData = {
    name: "Weather App",
    description:
      "A responsive weather app that fetches and displays live data from external APIs using React Native and Axios. Ensures cross-device compatibility with adaptive layouts and real-time weather updates.",
    techStack: [
      "React Native",
      "Axios",
      "Weather API",
      "JavaScript",
      "Geolocation API",
      "AsyncStorage",
    ],
    features: [
      "Real-time weather data fetching",
      "Location-based weather updates",
      "Cross-device compatibility",
      "Adaptive responsive layouts",
      "Weather forecasts and alerts",
      "Offline data caching",
      "Beautiful weather animations",
    ],
    githubUrl: "https://github.com/adityasriv2317/weatherApp",
    deployedUrl:
      "https://github.com/adityasriv2317/weatherApp/releases/tag/pre-release",
    status: "Production Ready",
    type: "Mobile Weather Application",
  };

  return (
    <div className="h-full rounded-t-xl bg-gradient-to-br from-cyan-900 to-blue-900 text-white overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img
              src="/icons/weather.png"
              className="w-18 h-18 mr-4 rounded-xl flex items-center justify-center"
              alt="Weather App"
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
            <Code className="w-6 h-6 mr-2 text-cyan-400" />
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

        {/* API Integration */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-blue-400" />
            API Integrations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-cyan-400">
                Weather Data
              </h3>
              <p className="text-gray-300 text-sm">
                Integrates with external weather APIs using Axios for real-time
                weather information.
              </p>
            </div>
            <div className="glass p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-400">
                Geolocation
              </h3>
              <p className="text-gray-300 text-sm">
                Uses device geolocation to provide location-based weather
                updates automatically.
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Smartphone className="w-6 h-6 mr-2 text-purple-400" />
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
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0" />
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

export default WeatherApp;
