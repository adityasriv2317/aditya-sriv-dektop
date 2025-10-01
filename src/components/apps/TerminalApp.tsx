import { useState, useEffect, useRef } from 'react';

const TerminalApp = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    { command: '', output: 'Welcome to Aditya Srivastava Terminal v1.0\nType "help" for available commands.\n' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => `Available commands:
whoami       - Display user information
work_history - Show work experience
skills       - List technical skills
projects     - View portfolio projects
education    - Show educational background
clear        - Clear terminal
contact      - Show contact information`,

    whoami: () => `Aditya Srivastava
Full Stack Developer skilled in React.js, Node.js, and modern web technologies.
Passionate about building scalable applications and exploring AI/ML integration.
Currently working at Cloud Computing Cell, AKGEC.`,

    work_history: () => `Work Experience:
═══════════════════════════════════════════════
Full Stack Developer | Cloud Computing Cell, AKGEC
Oct 2024 - Present
• Built scalable web applications using React.js and Node.js
• Improved data handling performance by 20%
• Implemented real-time features with Socket.IO
• Collaborated on cloud-based solutions`,

    skills: () => `Technical Skills:
═══════════════════════════════════════════════
Languages:    JavaScript, TypeScript, C++, Python
Frontend:     React.js, Next.js, Tailwind CSS, HTML5, CSS3
Backend:      Node.js, Express.js, MongoDB, PostgreSQL
Tools:        Git, AWS, Postman, VS Code, Docker
Other:        Socket.IO, REST APIs, JWT, Responsive Design`,

    projects: () => `Portfolio Projects:
═══════════════════════════════════════════════
🤖 Lumina AI - AI-powered chatbot with React Native & Node.js
📧 Sampark AI - Automated email system with Gemini API
🌐 ION Browser - Custom mobile browser with performance optimization
🎮 Quizaki - Real-time quiz platform with Socket.IO
🌤️  Weather App - Live weather data with responsive design
🎮 Sonic Boom - 2D game built with JavaScript & Kaplay JS`,

    education: () => `Education:
═══════════════════════════════════════════════
Bachelor of Technology in Computer Science
Ajay Kumar Garg Engineering College
Oct 2023 - Oct 2027 (Expected)

Achievements:
• 1st Runner-Up, DTU Hackathon (March 2024)
• Active member of Cloud Computing Cell`,

    contact: () => `Contact Information:
═══════════════════════════════════════════════
📧 Email: adityaxia9237@gmail.com
💼 LinkedIn: /in/aditya-srivastava
🐙 GitHub: /aditya-srivastava
🌐 Portfolio: [Visit the main OS interface]`,

    clear: () => {
      setHistory([{ command: '', output: 'Terminal cleared.\n' }]);
      return '';
    }
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === 'clear') {
      commands.clear();
      return;
    }

    let output = '';
    if (trimmedCmd in commands) {
      output = (commands as any)[trimmedCmd]();
    } else if (trimmedCmd === '') {
      output = '';
    } else {
      output = `Command not found: ${trimmedCmd}\nType "help" for available commands.`;
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="bg-black text-green-400 font-mono text-sm h-full flex flex-col">
      <div className="flex-1 p-4 overflow-auto">
        {history.map((entry, index) => (
          <div key={index} className="mb-2">
            {entry.command && (
              <div className="flex">
                <span className="text-blue-400">aditya@portfolio:~$</span>
                <span className="ml-2">{entry.command}</span>
              </div>
            )}
            {entry.output && (
              <pre className="whitespace-pre-wrap text-green-300 mt-1">
                {entry.output}
              </pre>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex">
          <span className="text-blue-400">aditya@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="ml-2 bg-transparent outline-none flex-1 text-green-400"
            placeholder="Enter command..."
            autoFocus
          />
        </div>
      </form>
    </div>
  );
};

export default TerminalApp;