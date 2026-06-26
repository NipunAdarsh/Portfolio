// ============================================
// Terminal Portfolio — Constants & Data
// ============================================

import { SkillCategory, Project, ContactInfo } from "./types";

// ASCII Art Banner
export const ASCII_BANNER = `
 _   _ _                   
| \\ | (_)_ __  _   _ _ __  
|  \\| | | '_ \\| | | | '_ \\ 
| |\\  | | |_) | |_| | | | |
|_| \\_|_| .__/ \\__,_|_| |_|
        |_|                
     _       _                     _     
    / \\   __| | __ _ _ __  ___| |__  
   / _ \\ / _\` |/ _\` | '__|/ __| '_ \\ 
  / ___ \\ (_| | (_| | |   \\__ \\ | | |
 /_/   \\_\\__,_|\\__,_|_|   |___/_| |_|`;

// System Info
export const SYSTEM_INFO = {
  os: "Terminal_Portfolio_OS v1.0",
  kernel: "portfolio-5.15.0",
  shell: "/bin/bash",
  terminal: "xterm-256color",
  uptime: "running since 2024",
};

// Bio Data
export const BIO = {
  name: "Nipun Adarsh",
  title: "AI & Cybersecurity Engineer | ML Security Researcher",
  location: "Bengaluru, India",
  status: "Researching and building RAG systems & SAST tools",
  shortBio:
    "Cyber Security engineering student focusing on the intersection of artificial intelligence and network defense, including ML-based intrusion detection and threat intelligence frameworks.",
  longBio: `I am a Cyber Security student at Dayananda Sagar College of Engineering with a track record of building security tools that work against real attack scenarios. My technical journey is driven by a deep interest in applying machine learning to vulnerability assessment and decentralised threat coordination. I pick up new targets fast and work from first principles to design AI-driven security frameworks, applying engineering principles throughout. I prefer clean, minimalist code architectures and am currently focused on identifying, assessing, and helping close security flaws across complex systems.

Education:
- B.E. Computer Science - Cyber Security Specialisation, Dayananda Sagar College of Engineering, Sep 2025 - 2028 (Expected)
- Diploma in Computer Science, The Oxford Polytechnic, Sep 2022 - May 2025`,
  editor: "VS Code",
  favTerminal: "Linux Terminal",
};

// Skills Data
export const SKILLS: SkillCategory[] = [
  {
    name: "PROGRAMMING",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 80 },
      { name: "HTML/CSS", level: 90 },
      { name: "C/C++", level: 75 },
      { name: "Node.js", level: 75 },
      { name: "Bash/SQL", level: 80 },
    ],
  },
  {
    name: "SECURITY & PEN-TESTING",
    skills: [
      { name: "Vuln Assessment", level: 85 },
      { name: "Kali Linux", level: 85 },
      { name: "Burp/Nmap", level: 80 },
      { name: "Wireshark", level: 85 },
      { name: "IDS (Snort)", level: 80 },
      { name: "Cryptography", level: 75 },
    ],
  },
  {
    name: "AI & MACHINE LEARNING",
    skills: [
      { name: "Local AI / NPU", level: 85 },
      { name: "Groq / Llama", level: 85 },
      { name: "Scikit-learn", level: 80 },
      { name: "RAG Systems", level: 80 },
    ],
  },
  {
    name: "INFRASTRUCTURE",
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "Supabase", level: 80 },
      { name: "Docker", level: 75 },
      { name: "VirtualBox/VM", level: 80 },
      { name: "Flask/React 18", level: 75 },
    ],
  },
];

// Projects Data
export const PROJECTS: Project[] = [
  {
    id: "digital-footprint-guardian",
    name: "Digital Footprint Guardian",
    description:
      "A full-stack threat intelligence platform featuring email breach detection, phishing URL analysis, and AI-driven remediation plans.",
    techStack: ["React 18", "Supabase", "Groq (Llama 3.3)", "Python"],
    status: "DONE",
    github: "https://github.com/NipunAdarsh/DIGITAL-FOOTPRINT-GUARDIAN",
  },
  {
    id: "traffic-analysis-ml",
    name: "Traffic Analysis ML",
    description:
      "A 3-model ML pipeline identifying security vulnerabilities across 6 protocol types, mapping to real-world attack patterns including Mirai Botnet and DDoS.",
    techStack: ["Python", "Scikit-learn", "Wireshark"],
    status: "DONE",
    github: "https://github.com/NipunAdarsh/Traffic-Analysis-and-Node-Categorization-Machine-Learning-Integrated-Framework",
  },
  {
    id: "swarmnet",
    name: "SwarmNet",
    description:
      "A 5-node decentralised threat coordination system using UDP multicast discovery and TCP heartbeat with automatic failover.",
    techStack: ["Decentralised Comp", "Local AI", "Networking"],
    status: "DONE",
    github: "https://github.com/NipunAdarsh/SwarmNet",
  },
  {
    id: "resume-optimiser",
    name: "Resume Optimiser",
    description:
      "An AI-powered job matching and resume optimization tool built during The Idea Company Startup Hackathon, winning 1st Runner-Up.",
    techStack: ["Python", "Flask", "AI"],
    status: "DONE",
    github: "https://github.com/NipunAdarsh/Resume-Optimiser-with-ATS-Scoring",
  },
];

// Contact Info
export const CONTACT: ContactInfo = {
  email: "nipunadarsh7@gmail.com",
  github: "https://github.com/NipunAdarsh",
  linkedin: "https://www.linkedin.com/in/nipun-adarsh-3a3848380/",
};

// Boot Sequence Lines
export const BOOT_LINES = [
  { text: "POST: System Check", delay: 100 },
  { text: "CPU: Neural Processing Unit Activated", delay: 80, status: "OK" },
  { text: "AI: Groq Llama 3.3 Models Loaded", delay: 80, status: "OK" },
  { text: "SEC: Intrusion Detection System Online", delay: 80, status: "OK" },
  { text: "NET: Initializing SwarmNet nodes", delay: 120, status: "OK" },
  { text: "", delay: 200 },
  { text: "Loading Threat Intelligence modules", delay: 150, status: "OK" },
  { text: "Mounting /dev/portfolio", delay: 150, status: "OK" },
  { text: "Starting AI-Sec daemon", delay: 200, status: "OK" },
  { text: "Establishing secure connection", delay: 180, status: "OK" },
  { text: "", delay: 300 },
];

// Help text entries
export const COMMANDS_HELP = [
  { cmd: "whoami", desc: "Display user bio & identity" },
  { cmd: "skills", desc: "Show technical proficiencies" },
  { cmd: "projects", desc: "List portfolio projects" },
  { cmd: "cat <file>", desc: "Read a file (about.txt, resume.txt)" },
  { cmd: "ls", desc: "List directory contents" },
  { cmd: "cd <dir>", desc: "Change directory" },
  { cmd: "clear", desc: "Clear terminal screen" },
  { cmd: "contact", desc: "Interactive contact form" },
  { cmd: "history", desc: "Show command history" },
  { cmd: "date", desc: "Show current date/time" },
  { cmd: "sudo", desc: "Try it and see..." },
  { cmd: "matrix", desc: "???" },
  { cmd: "help", desc: "Show this help menu" },
];

// Files available in the VFS
export const AVAILABLE_FILES = [
  "about.txt",
  "resume.txt",
  "skills.txt",
  "contact.sh",
];

// Directories available
export const AVAILABLE_DIRS = ["projects"];

// Easter egg messages
export const SUDO_MESSAGE = `
  [sudo] password for guest: ****
  guest is not in the sudoers file.
  This incident will be reported to Nipun Adarsh.`;

export const UNKNOWN_COMMAND = (cmd: string) =>
  `bash: ${cmd}: command not found. Type 'help' for available commands.`;
