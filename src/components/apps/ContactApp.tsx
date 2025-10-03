import { Mail, Linkedin, Github, MapPin, Download, Code } from "lucide-react";
import Aditya from "../../assets/aditya.jpg";
import web from "/icons/web.png";
import app from "/icons/app.png";
import webResume from "../../assets/adityaResume.pdf";
import appResume from "../../assets/adityaSrivastavaResume.pdf";

const ContactApp = () => {
  const contactMethods = [
    {
      icon: (
        <div className="bg-red-600 w-8 h-8 p-1 rounded-full flex items-center justify-center">
          <Mail className="w-6 h-6 text-white" />
        </div>
      ),
      label: "Email",
      value: "adityaxia9237@gmail.com",
      link: "mailto:adityaxia9237@gmail.com",
      color: "text-red-50",
    },
    {
      icon: (
        <div className="bg-blue-600 w-8 h-8 p-1 rounded-full flex items-center justify-center">
          <Linkedin className="w-6 h-6 text-white" />
        </div>
      ),
      label: "LinkedIn",
      value: "/in/aditya-srivastava",
      link: "https://linkedin.com/in/aditya2317",
      color: "text-blue-50",
    },
    {
      icon: (
        <div className="bg-purple-600 w-8 h-8 p-1 rounded-full flex items-center justify-center">
          <Github className="w-6 h-6 text-white" />
        </div>
      ),
      label: "GitHub",
      value: "/aditya-srivastava",
      link: "https://github.com/adityasriv2317",
      color: "text-purple-50",
    },
    {
      icon: (
        <div className="bg-orange-400 w-8 h-8 p-1 rounded-full flex items-center justify-center">
          <Code className="w-6 h-6 text-white" />
        </div>
      ),
      label: "LeetCode",
      value: "/u/aditya2317/",
      link: "https://leetcode.com/u/aditya2317/",
      color: "text-yellow-50",
    },
  ];

  return (
    <div className="h-full rounded-xl overflow-auto glass text-white">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-8 mb-4.5">
          <img
            src={Aditya}
            alt="Aditya Srivastava"
            className="w-32 h-32 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-suse font-bold mb-2">
              Aditya Srivastava
            </h1>
            <p className="text-xl text-gray-200 mb-2">Full Stack Developer</p>
            <div className="flex items-center justify-center text-gray-300">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Ghaziabad, India</span>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="mb-4.5">
          <h2 className="text-2xl font-semibold font-suse mb-4">My Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactMethods.map((contact, index) => (
              <a
                key={index}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-6 cursor-pointer flex items-center justify-between rounded-lg hover:glass-hover transition-all duration-200 hover:scale-105"
              >
                <span className="flex items-center">
                  <div className={`${contact.color} mr-3`}>{contact.icon}</div>
                  <h3 className="text-lg font-src font-semibold">
                    {contact.label}
                  </h3>
                </span>
                <span className="text-gray-300 text-sm">{contact.value}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="">
          <h2 className="text-2xl font-suse font-semibold mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* {quickActions.map((action, index) => (
              <button
              key={index}
              onClick={action.action}
              className={`${action.color} p-6 rounded-lg hover:scale-105 transition-all duration-200 text-left`}
              >
              <div className="flex font-src items-center mb-2">
              {action.icon}
              <h3 className="ml-3 font-semibold">{action.label}</h3>
              </div>
              <p className="text-sm opacity-80">{action.description}</p>
              </button>
              ))} */}
            <div
              className={`bg-blue-500/20 flex items-center justify-between text-blue-300 p-6 rounded-lg hover:scale-105 transition-all duration-200 text-left`}
            >
              <div className="flex font-src items-center mb-2">
                <Download className="w-5 h-5" />
                <h3 className="ml-3 font-semibold">Download Resume</h3>
                {/* <p className="text-sm opacity-80 font-mono">
                  Get the latest PDF version
                </p> */}
              </div>
              <span className="flex flex-col gap-2">
                {/* webdev resume */}
                <a
                  href={webResume}
                  className="px-4 py-2 cursor-pointer bg-blue-600/30 flex flex-row gap-2 hover:bg-blue-600/50 rounded-md text-sm font-medium transition"
                >
                  <img
                    src={web}
                    alt="Web Development Resume"
                    className="w-5 h-5"
                  />
                  Web Dev
                </a>
                <a
                  href={appResume}
                  className="px-4 py-2 cursor-pointer bg-blue-600/30 flex flex-row gap-2 hover:bg-blue-600/50 rounded-md text-sm font-medium transition"
                >
                  <img
                    src={app}
                    alt="App Development Resume"
                    className="w-5 h-5"
                    style={{
                      filter:
                        "invert(52%) sepia(98%) saturate(749%) hue-rotate(74deg) brightness(93%) contrast(92%)",
                    }}
                  />
                  App Dev
                </a>
              </span>
            </div>
            <div
              onClick={() =>
                window.open(
                  "mailto:adityaxia9237@gmail.com?subject=Hello Aditya!"
                )
              }
              className={`bg-green-500/20 flex items-center justify-between text-green-300 p-6 rounded-lg hover:scale-105 transition-all duration-200 text-left`}
            >
              <div className="flex font-src items-center mb-2">
                <Mail className="w-5 h-5" />
                <h3 className="ml-3 font-semibold">Send Message</h3>
              </div>
              <p className="text-sm opacity-80 font-mono">
                Quick email template
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactApp;
