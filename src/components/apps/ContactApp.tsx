import { Mail, Linkedin, Github, Globe, MapPin, Phone, Download } from 'lucide-react';

const ContactApp = () => {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'adityaxia9237@gmail.com',
      link: 'mailto:adityaxia9237@gmail.com',
      color: 'text-red-400'
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      value: '/in/aditya-srivastava',
      link: 'https://linkedin.com/in/aditya-srivastava',
      color: 'text-blue-400'
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: 'GitHub',
      value: '/aditya-srivastava',
      link: 'https://github.com/aditya-srivastava',
      color: 'text-gray-400'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      label: 'Portfolio',
      value: 'Visit Main Interface',
      link: '#',
      color: 'text-green-400'
    }
  ];

  const quickActions = [
    {
      icon: <Download className="w-5 h-5" />,
      label: 'Download Resume',
      description: 'Get the latest PDF version',
      action: () => alert('Resume download would start here'),
      color: 'bg-blue-500/20 text-blue-300'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Send Message',
      description: 'Quick email template',
      action: () => window.open('mailto:adityaxia9237@gmail.com?subject=Hello Aditya!'),
      color: 'bg-green-500/20 text-green-300'
    }
  ];

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold">
            AS
          </div>
          <h1 className="text-3xl font-bold mb-2">Get In Touch</h1>
          <p className="text-gray-300">Let's connect and build something amazing together!</p>
        </div>

        {/* Location */}
        <div className="glass p-6 rounded-lg mb-6 text-center">
          <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <h3 className="text-lg font-semibold mb-1">Location</h3>
          <p className="text-gray-300">Ghaziabad, Uttar Pradesh, India</p>
          <p className="text-sm text-gray-400">Available for remote work & collaborations</p>
        </div>

        {/* Contact Methods */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Methods</h2>
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
                  <div className={`${contact.color} mr-3`}>
                    {contact.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{contact.label}</h3>
                </div>
                <p className="text-gray-300 text-sm">{contact.value}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
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

        {/* Availability */}
        <div className="glass p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Availability</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
              <span>Open to new opportunities</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
              <span>Available for freelance projects</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
              <span>Interested in full-time positions</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-blue-300 text-sm">
              💡 <strong>Best time to reach:</strong> Monday-Friday, 9 AM - 6 PM IST
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>Response time: Usually within 24 hours</p>
        </div>
      </div>
    </div>
  );
};

export default ContactApp;