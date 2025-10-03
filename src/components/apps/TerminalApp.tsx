import { useState, useEffect, useRef } from "react";

const TerminalApp = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<
    Array<{ command: string; output: string }>
  >([
    {
      command: "",
      output: 'Terminal v1.0\nType "help" for available commands.\n',
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => `available commands:
whoami - display user information
work_history - show work experience
skills - list technical skills
projects - view portfolio projects
education - show educational background
clear - clear terminal
contact - show contact information`,

    whoami: () => `Aditya Srivastava
Full Stack Developer skilled in React.js, Node.js, and modern web technologies.
Passionate about building scalable applications and exploring AI/ML integration.
Currently working at Cloud Computing Cell, AKGEC.`,

    work_history: () => `work experience:
═══════════════════════════════════════════════
Full Stack Developer | Cloud Computing Cell, AKGEC
Oct 2024 - Present
• Built scalable web applications using React.js and Node.js
• Improved data handling performance by 20%
• Implemented real-time features with Socket.IO
• Collaborated on cloud-based solutions`,

    skills: () => `technical skills:
═══════════════════════════════════════════════
Languages: JavaScript, TypeScript, C++, Python
Frontend: React.js, Next.js, Tailwind CSS, HTML5, CSS3
Backend: Node.js, Express.js, MongoDB, PostgreSQL
Tools: Git, AWS, Postman, VS Code, Docker
Other: Socket.IO, REST APIs, JWT, Responsive Design`,

    projects: () => `my projects:
═══════════════════════════════════════════════
🎮 Quizaki - Real-time quiz platform with Socket.IO
🤖 Lumina AI - AI-powered chatbot with React Native & Node.js
🌐 ION Browser - Custom mobile browser with performance optimization
🎮 Sonic Boom - 2D game built with JavaScript & Kaplay JS
📧 Sampark AI - Automated email system with Gemini API`,

    education: () => `education:
═══════════════════════════════════════════════
Bachelor of Technology in Computer Science
Ajay Kumar Garg Engineering College
Oct 2023 - Oct 2027 (Expected)

Achievements:
• 1st Runner-Up, DTU Hackathon (March 2024)
• Active member of Cloud Computing Cell`,

    contact: () => `contact information:
═══════════════════════════════════════════════
📧 Email: adityaxia9237@gmail.com
💼 LinkedIn: https://www.linkedin.com/in/aditya-srivastava
🐙 GitHub: https://github.com/adityasriv2317
🌐 Portfolio: https://shikhar.is-a.dev/`,

    clear: () => {
      setHistory([{ command: "", output: "Terminal cleared.\n" }]);
      return "";
    },
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === "clear") {
      commands.clear();
      return;
    }

    let output = "";
    if (trimmedCmd in commands) {
      output = (commands as any)[trimmedCmd]();
    } else if (trimmedCmd === "") {
      output = "";
    } else {
      output = `Command not found: ${trimmedCmd}\nType "help" for available commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="bg-black rounded-t-xl text-green-400 font-src text-sm h-full flex flex-col">
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
