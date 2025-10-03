import { Mail, Linkedin, Github, Globe, MapPin, Download } from "lucide-react";
import Aditya from "../../assets/aditya.jpg";

const ContactApp = () => {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "adityaxia9237@gmail.com",
      link: "mailto:adityaxia9237@gmail.com",
      color: "text-red-400",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      value: "/in/aditya-srivastava",
      link: "https://linkedin.com/in/aditya-srivastava",
      color: "text-blue-400",
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      value: "/aditya-srivastava",
      link: "https://github.com/aditya-srivastava",
      color: "text-gray-400",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      label: "Portfolio",
      value: "Visit Main Interface",
      link: "#",
      color: "text-green-400",
    },
  ];

  const quickActions = [
    {
      icon: <Download className="w-5 h-5" />,
      label: "Download Resume",
      description: "Get the latest PDF version",
      action: () => alert("Resume download would start here"),
      color: "bg-blue-500/20 text-blue-300",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Send Message",
      description: "Quick email template",
      action: () =>
        window.open("mailto:adityaxia9237@gmail.com?subject=Hello Aditya!"),
      color: "bg-green-500/20 text-green-300",
    },
  ];

  return (
    <div className="h-full rounded-t-xl overflow-auto glass text-white">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-8 mb-4.5">
          <img
            src={Aditya}
            alt="Aditya Srivastava"
            className="w-32 h-32 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">Aditya Srivastava</h1>
            <p className="text-xl text-gray-300 mb-4">Full Stack Developer</p>
            <div className="flex items-center justify-center text-gray-400">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Ghaziabad, India</span>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="mb-4.5">
          <h2 className="text-2xl font-semibold mb-4">My Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactMethods.map((contact, index) => (
              <a
                key={index}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-6 rounded-lg hover:glass-hover transition-all duration-200 hover:scale-105 block"
              >
                <div className="flex items-center mb-3">
                  <div className={`${contact.color} mr-3`}>{contact.icon}</div>
                  <h3 className="text-lg font-semibold">{contact.label}</h3>
                </div>
                <p className="text-gray-300 text-sm">{contact.value}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`${action.color} p-6 rounded-lg hover:scale-105 transition-all duration-200 text-left`}
              >
                <div className="flex items-center mb-2">
                  {action.icon}
                  <h3 className="ml-3 font-semibold">{action.label}</h3>
                </div>
                <p className="text-sm opacity-80">{action.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactApp;
