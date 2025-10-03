import { Code, Database, Globe, Award, Calendar, MapPin, NotebookPen } from "lucide-react";
import Aditya from "../../assets/aditya.jpg";

const AboutApp = () => {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Cloud Computing Cell, AKGEC",
      duration: "Oct 2024 - Present",
      location: "Ghaziabad, India",
      description:
        "Building scalable web applications and improving data handling performance by 20%.",
      skills: ["React.js", "Node.js", "MongoDB", "Socket.IO"],
    },
  ];

  const projects = [
    {
      name: "Lumina AI",
      description:
        "AI-powered chatbot with React Native & Node.js using Gemini API",
      tech: ["React Native", "Node.js", "Gemini API"],
    },
    {
      name: "Sampark AI",
      description: "Automated email system with intelligent content generation",
      tech: ["React.js", "MongoDB", "Nodemailer"],
    },
    {
      name: "ION Browser",
      description: "Custom mobile browser with 20% improved memory efficiency",
      tech: ["React Native", "Performance Optimization"],
    },
    {
      name: "Quizaki",
      description:
        "Real-time quiz platform with admin panel and bot protection",
      tech: ["React.js", "Socket.IO", "reCAPTCHA"],
    },
  ];

  const achievements = [
    {
      title: "1st Runner-Up",
      event: "DTU Hackathon",
      date: "March 2025",
      icon: <Award className="w-5 h-5 text-yellow-400" />,
    },
    {
      title: "Hosted & Conducted Workshop",
      event: "NIMBUS 2.9",
      date: "May 2025",
      icon: <NotebookPen className="w-5 h-5 text-yellow-400" />,
    },
  ];

  return (
    <div className="h-full rounded-t-xl overflow-auto glass text-white">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-8 mb-8">
          <img
            src={Aditya}
            alt="Aditya Srivastava"
            className="w-32 h-32 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">Aditya Srivastava</h1>
            <p className="text-xl text-gray-300 mb-2">Full Stack Developer</p>
            <div className="flex items-center justify-center text-gray-300">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Ghaziabad, India</span>
            </div>
          </div>
        </div>

        {/* About */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Globe className="w-6 h-6 mr-2 text-blue-400" />
            About Me
          </h2>
          <p className="text-gray-300 text-left leading-relaxed">
            Passionate Full Stack Developer with expertise in React.js, Node.js,
            and modern web technologies. I love building scalable applications
            and exploring the intersection of web development and AI/ML.
            Currently pursuing my Bachelor's in Computer Science while actively
            contributing to innovative projects at Cloud Computing Cell, AKGEC.
          </p>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="w-6 h-6 mr-2 text-green-400" />
            Experience
          </h2>
          <div className="space-y-4 text-left">
            {experiences.map((exp, index) => (
              <div key={index} className="glass p-6 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <span className="text-sm text-gray-400">{exp.duration}</span>
                </div>
                <div className="text-gray-300 mb-2">
                  {exp.company} • {exp.location}
                </div>
                <p className="text-gray-400 mb-3">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Database className="w-6 h-6 mr-2 text-purple-400" />
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <div key={index} className="glass p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-400 mb-3 text-sm">
                  {project.description}
                </p>
                <div className="flex items-center justify-center flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-yellow-400" />
            Achievements
          </h2>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="glass p-4 rounded-lg flex items-center"
              >
                {achievement.icon}
                <div className="ml-3 text-left">
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {achievement.event} • {achievement.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          <div className="glass p-6 rounded-lg">
            <h3 className="text-xl font-semibold">Bachelor of Technology</h3>
            <p className="text-gray-300">Computer Science Engineering</p>
            <p className="text-gray-400">Ajay Kumar Garg Engineering College</p>
            <p className="text-sm text-gray-500">
              Oct 2023 - Oct 2027 (Expected)
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutApp;
