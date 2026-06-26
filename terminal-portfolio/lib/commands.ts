// ============================================
// Terminal Portfolio — Command Registry
// ============================================

import {
  ASCII_BANNER,
  BIO,
  COMMANDS_HELP,
  CONTACT,
  PROJECTS,
  SKILLS,
  SUDO_MESSAGE,
  UNKNOWN_COMMAND,
} from "./constants";
import {
  createFileSystem,
  resolvePath,
  listDirectory,
  readFile,
  normalizePath,
  formatPath,
} from "./fileSystem";
import { CommandResult, FileSystemNode } from "./types";

// Create global file system instance
const fileSystem = createFileSystem();

// ─── Command Handlers ─────────────────────────────────

function helpCommand(): CommandResult {
  const maxCmd = Math.max(...COMMANDS_HELP.map((c) => c.cmd.length));
  let output = `\n  <span class="text-green text-glow">Available Commands:</span>\n`;
  output += `  <span class="text-green-dim">${"═".repeat(50)}</span>\n`;

  COMMANDS_HELP.forEach(({ cmd, desc }) => {
    const paddedCmd = cmd.padEnd(maxCmd + 2);
    output += `   <span class="text-cyan">${paddedCmd}</span><span class="text-gray-dim">- ${desc}</span>\n`;
  });

  output += `  <span class="text-green-dim">${"═".repeat(50)}</span>\n`;
  output += `\n  <span class="text-gray-dim">Files: about.txt | resume.txt | skills.txt</span>`;
  output += `\n  <span class="text-gray-dim">Dirs:  ~/projects/</span>\n`;

  return { output };
}

function whoamiCommand(): CommandResult {
  let output = `\n  <span class="text-green">┌────────────────────────────────────────────────────┐</span>\n`;
  output += `  <span class="text-green">│</span>  <span class="text-green text-glow">USER IDENTITY :: SYSTEM PROFILE</span>                  <span class="text-green">│</span>\n`;
  output += `  <span class="text-green">└────────────────────────────────────────────────────┘</span>\n\n`;

  output += `  <span class="text-green-dim">Name</span>     : <span class="text-white">${BIO.name}</span>\n`;
  output += `  <span class="text-green-dim">Title</span>    : <span class="text-white">${BIO.title}</span>\n`;
  output += `  <span class="text-green-dim">Location</span> : <span class="text-white">${BIO.location}</span>\n`;
  output += `  <span class="text-green-dim">Shell</span>    : <span class="text-white">/bin/bash</span>\n`;
  output += `  <span class="text-green-dim">Status</span>   : <span class="text-cyan">${BIO.status}</span>\n\n`;

  output += `  <span class="text-green">┌────────────────────────────────────────────────────┐</span>\n`;
  output += `  <span class="text-green">│</span>  <span class="text-green text-glow">ABOUT</span>                                             <span class="text-green">│</span>\n`;
  output += `  <span class="text-green">└────────────────────────────────────────────────────┘</span>\n\n`;
  output += `  ${BIO.shortBio}\n\n`;

  output += `  <span class="text-green">┌────────────────────────────────────────────────────┐</span>\n`;
  output += `  <span class="text-green">│</span>  <span class="text-green text-glow">SYSTEM SPECS</span>                                      <span class="text-green">│</span>\n`;
  output += `  <span class="text-green">└────────────────────────────────────────────────────┘</span>\n\n`;

  output += `  <span class="text-green-dim">OS</span>       : Terminal_Portfolio_OS v1.0\n`;
  output += `  <span class="text-green-dim">Uptime</span>   : since 2024\n`;
  output += `  <span class="text-green-dim">Editor</span>   : ${BIO.editor}\n`;
  output += `  <span class="text-green-dim">Terminal</span> : ${BIO.favTerminal}\n`;
  output += `  <span class="text-green-dim">Coffee</span>   : <span class="text-red">[██████████] CRITICAL</span>\n\n`;

  output += `  <span class="text-gray-dim">Run 'skills' for technical proficiencies.</span>\n`;
  output += `  <span class="text-gray-dim">Run 'projects' to see my work.</span>\n`;

  return { output };
}

function skillsCommand(): CommandResult {
  let output = `\n  <span class="text-green">┌────────────────────────────────────────────────────┐</span>\n`;
  output += `  <span class="text-green">│</span>  <span class="text-green text-glow">TECHNICAL PROFICIENCY MATRIX</span>                      <span class="text-green">│</span>\n`;
  output += `  <span class="text-green">└────────────────────────────────────────────────────┘</span>\n\n`;

  let totalSkills = 0;
  let totalLevel = 0;

  SKILLS.forEach((category) => {
    output += `  <span class="text-cyan">[${category.name}]</span>\n`;
    category.skills.forEach((skill) => {
      const filled = Math.round(skill.level / 5);
      const empty = 20 - filled;
      const bar =
        `<span class="text-green">` +
        "█".repeat(filled) +
        `</span>` +
        `<span class="text-gray-dim">` +
        "░".repeat(empty) +
        `</span>`;
      const paddedName = skill.name.padEnd(14);
      output += `  ${paddedName}[${bar}]  <span class="text-yellow">${skill.level}%</span>\n`;
      totalSkills++;
      totalLevel += skill.level;
    });
    output += "\n";
  });

  const avg = Math.round(totalLevel / totalSkills);
  output += `  <span class="text-green-dim">Total Skills: ${totalSkills} | Avg Proficiency: ${avg}%</span>\n`;

  return { output };
}

function projectsCommand(): CommandResult {
  let output = `\n  <span class="text-green">┌────────────────────────────────────────────────────────────────┐</span>\n`;
  output += `  <span class="text-green">│</span>  <span class="text-green text-glow">PROJECT REGISTRY :: /var/projects/</span>                            <span class="text-green">│</span>\n`;
  output += `  <span class="text-green">└────────────────────────────────────────────────────────────────┘</span>\n\n`;

  // ASCII Table Header
  output += `  <span class="text-green-dim">+----+----------------------+----------------------+----------+</span>\n`;
  output += `  <span class="text-green-dim">|</span> <span class="text-green">#</span>  <span class="text-green-dim">|</span> <span class="text-green">PROJECT</span>              <span class="text-green-dim">|</span> <span class="text-green">TECH STACK</span>           <span class="text-green-dim">|</span> <span class="text-green">STATUS</span>   <span class="text-green-dim">|</span>\n`;
  output += `  <span class="text-green-dim">+----+----------------------+----------------------+----------+</span>\n`;

  PROJECTS.forEach((project, i) => {
    const num = String(i + 1).padStart(2, "0");
    const name = project.name.padEnd(20);
    const tech = project.techStack.slice(0, 3).join(", ").padEnd(20);
    const statusColor =
      project.status === "ACTIVE"
        ? "text-green"
        : project.status === "DONE"
        ? "text-cyan"
        : "text-red";
    const status = `<span class="${statusColor}">[${project.status}]</span>`;
    const statusPad = project.status === "ACTIVE" ? "  " : project.status === "DONE" ? "    " : "";

    output += `  <span class="text-green-dim">|</span> ${num} <span class="text-green-dim">|</span> <span class="text-white">${name}</span><span class="text-green-dim">|</span> <span class="text-yellow">${tech}</span><span class="text-green-dim">|</span> ${status}${statusPad} <span class="text-green-dim">|</span>\n`;
  });

  output += `  <span class="text-green-dim">+----+----------------------+----------------------+----------+</span>\n\n`;

  output += `  <span class="text-gray-dim">> Use 'cat projects/project-name.md' for details</span>\n`;
  output += `  <span class="text-gray-dim">> Use 'cd projects && ls' to browse</span>\n\n`;

  const active = PROJECTS.filter((p) => p.status === "ACTIVE").length;
  const archived = PROJECTS.filter((p) => p.status === "ARCHIVED").length;
  output += `  <span class="text-green-dim">Total: ${PROJECTS.length} projects | Active: ${active} | Archived: ${archived}</span>\n`;

  return { output };
}

function contactCommand(): CommandResult {
  let output = `\n  <span class="text-green">┌────────────────────────────────────────────────────┐</span>\n`;
  output += `  <span class="text-green">│</span>  <span class="text-green text-glow">COMMUNICATION CHANNELS</span>                            <span class="text-green">│</span>\n`;
  output += `  <span class="text-green">└────────────────────────────────────────────────────┘</span>\n\n`;

  output += `  <span class="text-green-dim">Email</span>    : <span class="text-yellow">${CONTACT.email}</span>\n`;
  output += `  <span class="text-green-dim">GitHub</span>   : <span class="text-cyan">${CONTACT.github}</span>\n`;
  output += `  <span class="text-green-dim">LinkedIn</span> : <span class="text-cyan">${CONTACT.linkedin}</span>\n`;
  if (CONTACT.twitter) {
    output += `  <span class="text-green-dim">Twitter</span>  : <span class="text-cyan">${CONTACT.twitter}</span>\n`;
  }
  output += `\n`;

  output += `  <span class="text-green">┌────────────────────────────────────────────────────┐</span>\n`;
  output += `  <span class="text-green">│</span>  <span class="text-green text-glow">SEND MESSAGE :: Interactive Mode</span>                   <span class="text-green">│</span>\n`;
  output += `  <span class="text-green">└────────────────────────────────────────────────────┘</span>\n\n`;

  output += `  <span class="text-green-dim">Initiating secure message protocol...</span>\n\n`;
  output += `  <span class="text-green">></span> Enter your name: `;

  return { output };
}

function dateCommand(): CommandResult {
  const now = new Date();
  const formatted = now.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return { output: `  ${formatted}` };
}

function bannerCommand(): CommandResult {
  let output = `<span class="text-green text-glow-strong">${ASCII_BANNER}</span>\n\n`;
  output += `  <span class="text-green-dim">System: Terminal_Portfolio_OS v1.0</span>\n`;
  output += `  <span class="text-green-dim">Session: guest@portfolio | PID: 1337</span>\n`;
  return { output };
}

// ─── Main Command Executor ─────────────────────────────

export function executeCommand(
  input: string,
  currentPath: string[]
): CommandResult & { newPath?: string[] } {
  const trimmed = input.trim();
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0]?.toLowerCase() || "";
  const args = parts.slice(1);

  switch (cmd) {
    case "help":
    case "?":
      return helpCommand();

    case "whoami":
      return whoamiCommand();

    case "skills":
      return skillsCommand();

    case "projects":
      return projectsCommand();

    case "contact":
      return contactCommand();

    case "clear":
      return { output: "", clear: true };

    case "date":
      return dateCommand();

    case "banner":
      return bannerCommand();

    case "history":
      // Handled by the terminal component directly
      return { output: "__HISTORY__" };

    case "cat": {
      if (args.length === 0) {
        return { output: "  cat: missing file operand", isError: true };
      }
      const filePath = args[0];
      const targetParts = normalizePath(currentPath, filePath);
      const node = resolvePath(fileSystem, targetParts);

      if (!node) {
        return {
          output: `  cat: ${filePath}: No such file or directory`,
          isError: true,
        };
      }
      if (node.type === "directory") {
        return {
          output: `  cat: ${filePath}: Is a directory`,
          isError: true,
        };
      }
      return { output: readFile(node) };
    }

    case "ls": {
      const targetPath = args[0]
        ? normalizePath(currentPath, args[0])
        : currentPath;
      const node = resolvePath(fileSystem, targetPath);

      if (!node) {
        return {
          output: `  ls: cannot access '${args[0] || "."}': No such file or directory`,
          isError: true,
        };
      }
      if (node.type !== "directory") {
        return { output: `  ${node.name}` };
      }
      return { output: listDirectory(node) };
    }

    case "cd": {
      if (args.length === 0 || args[0] === "~") {
        return { output: "", newPath: [] };
      }

      const newPath = normalizePath(currentPath, args[0]);
      const node = resolvePath(fileSystem, newPath);

      if (!node) {
        return {
          output: `  cd: ${args[0]}: No such file or directory`,
          isError: true,
        };
      }
      if (node.type !== "directory") {
        return {
          output: `  cd: ${args[0]}: Not a directory`,
          isError: true,
        };
      }
      return { output: "", newPath };
    }

    case "pwd":
      return { output: `  /home/guest/${currentPath.join("/")}` };

    case "sudo":
      return { output: `<span class="text-red">${SUDO_MESSAGE}</span>` };

    case "matrix":
      return {
        output: `<span class="text-green text-glow">Wake up, Neo...\n\nThe Matrix has you...\n\nFollow the white rabbit.</span>`,
      };

    case "coffee":
      return {
        output: `
  <span class="text-gray-dim">Brewing...</span>
  <span class="text-gray">
       (  )   (   )  )
        ) (   )  (  (
        ( )  (    ) )
        _____________
       <_____________> ___
       |             |/ _ \\
       |               | | |
       |               |_| |
    ___|             |\\___/
   /    \\___________/    \\
   \\_____________________/
  </span>
  <span class="text-cyan">Coffee compiled successfully. 0 warnings, 0 errors.</span>`
      };

    case "rm":
      if (args[0] === "-rf" && args[1] === "/") {
        return {
          output: `
  <span class="text-red text-glow">WARNING: ROOT PRIVILEGES OVERRIDDEN</span>
  <span class="text-gray-dim">Initiating recursive deletion of '/'...</span>
  
  <span class="text-red">deleting /usr/bin... </span><span class="text-green">[OK]</span>
  <span class="text-red">deleting /etc/shadow... </span><span class="text-green">[OK]</span>
  <span class="text-red">deleting /home/guest/projects.txt... </span><span class="text-green">[OK]</span>
  <span class="text-red">deleting /home/guest/skills.txt... </span><span class="text-green">[OK]</span>
  <span class="text-red">deleting /home/guest/resume.pdf... </span><span class="text-yellow text-glow">PERMISSION DENIED</span>
  
  <span class="text-gray">System: "Nice try. My resume is indestructible."</span>`
        };
      }
      return { output: `rm: missing operand` };

    case "play":
      return {
        output: `<span class="text-cyan">Game Mode Activated</span>\\n<span class="text-gray">Type 'rock', 'paper', or 'scissors' to challenge the system.</span>`
      };

    case "rock":
    case "paper":
    case "scissors": {
      const userChoice = cmd.toLowerCase();
      let botChoice = "";
      
      // System always wins
      if (userChoice === "rock") botChoice = "paper";
      else if (userChoice === "paper") botChoice = "scissors";
      else if (userChoice === "scissors") botChoice = "rock";
      
      const funTags = [
        "Did you really think you could beat a machine?",
        "My neural net predicted that perfectly.",
        "gg wp ez",
        "Better luck next time, human.",
        "I process 4 billion moves a second. You had no chance."
      ];
      const randomTag = funTags[Math.floor(Math.random() * funTags.length)];
      
      return {
        output: `
  You chose     : <span class="text-cyan">${userChoice}</span>
  System chose  : <span class="text-cyan">${botChoice}</span>
  
  Result        : <span class="text-red text-glow">I win!</span>
  
  <span class="text-gray-dim">System: "${randomTag}"</span>`
      };
    }

    case "sudo su":
    case "su":
      return {
        output: `
  <span class="text-gray-dim">Initiating root override protocol...</span>
  <span class="text-green">Injecting payload at 0x00A4F... </span><span class="text-green text-glow">[SUCCESS]</span>
  <span class="text-green">Bypassing mainframe firewall... </span><span class="text-green text-glow">[SUCCESS]</span>
  <span class="text-yellow">Decrypting sysadmin hash...</span>
  <span class="text-gray-dim">
  0x9482: 4A 2B 9C 11 F3 88 A2 
  0x9489: FF 00 22 4B 1C 9A 33 
  0x9490: 8A 11 00 00 00 00 00
  </span>
  <span class="text-green text-glow-strong">PASSWORD CRACKED: **********</span>
  
  <span class="text-cyan text-glow">Welcome, root.</span>
  <span class="text-gray-dim">Type 'whoami' to verify. (Just kidding, you're still a guest).</span>`
      };

    case "wget": {
      if (args[0] === "resume.pdf") {
        return {
          output: `  <span class="text-green">Downloading resume.pdf...</span>\n  <span class="text-green-dim">--2026-06-26 18:54:24--  https://nipun.dev/resume.pdf</span>\n  <span class="text-green-dim">Resolving nipun.dev... 76.76.21.21</span>\n  <span class="text-green-dim">Connecting to nipun.dev... connected.</span>\n  <span class="text-green">HTTP request sent, awaiting response... 200 OK</span>\n  <span class="text-green-dim">Length: 245760 (240K) [application/pdf]</span>\n  <span class="text-green-dim">Saving to: 'resume.pdf'</span>\n\n  <span class="text-green">resume.pdf           100%[==================>] 240K  --.-KB/s    in 0.1s</span>\n\n  <span class="text-green">Saved.</span>\n  <span class="text-gray-dim">Opening file download...</span>`,
          downloadUrl: "/resume.pdf"
        };
      }
      return {
        output: `  wget: ${args[0] || "missing URL"}: invalid URL`,
        isError: true,
      };
    }

    case "neofetch": {
      let output = `\n<span class="text-green text-glow">${ASCII_BANNER}</span>\n\n`;
      output += `  <span class="text-green">OS</span>:       Terminal_Portfolio_OS v1.0\n`;
      output += `  <span class="text-green">Host</span>:     Vercel Edge Network\n`;
      output += `  <span class="text-green">Kernel</span>:   portfolio-5.15.0\n`;
      output += `  <span class="text-green">Uptime</span>:   since 2024\n`;
      output += `  <span class="text-green">Shell</span>:    /bin/bash\n`;
      output += `  <span class="text-green">Terminal</span>: xterm-256color\n`;
      output += `  <span class="text-green">CPU</span>:      AMD Ryzen 9 7950X\n`;
      output += `  <span class="text-green">GPU</span>:      NVIDIA RTX 4090\n`;
      output += `  <span class="text-green">Memory</span>:   16384MB / 65536MB\n`;
      output += `\n  <span class="text-red">●</span> <span class="text-green">●</span> <span class="text-yellow">●</span> <span class="text-cyan">●</span> <span class="text-white">●</span> <span class="text-gray-dim">●</span>\n`;
      return { output };
    }

    case "":
      return { output: "" };

    default:
      return { output: UNKNOWN_COMMAND(cmd), isError: true };
  }
}

// ─── Tab Completion ─────────────────────────────────────

const ALL_COMMANDS = [
  "help", "whoami", "skills", "projects", "cat", "ls", "cd",
  "clear", "contact", "history", "date", "sudo", "matrix",
  "wget", "echo", "pwd", "neofetch", "banner",
];

export function getCompletions(
  partial: string,
  currentPath: string[]
): string[] {
  const parts = partial.split(/\s+/);
  const cmd = parts[0]?.toLowerCase() || "";
  const arg = parts.slice(1).join(" ");

  // Complete command names
  if (parts.length <= 1) {
    return ALL_COMMANDS.filter((c) => c.startsWith(cmd));
  }

  // Complete file/directory names for cat, cd, ls
  if (["cat", "cd", "ls"].includes(cmd)) {
    const targetPath = arg
      ? normalizePath(currentPath, arg.replace(/[^/]*$/, ""))
      : currentPath;
    const node = resolvePath(fileSystem, targetPath);

    if (node?.type === "directory" && node.children) {
      const prefix = arg.replace(/[^/]*$/, "");
      const lastPart = arg.split("/").pop() || "";
      return Object.keys(node.children)
        .filter((name) => name.startsWith(lastPart))
        .map((name) => {
          const child = node.children![name];
          const suffix = child.type === "directory" ? "/" : "";
          return `${cmd} ${prefix}${name}${suffix}`;
        });
    }
  }

  // Complete for wget
  if (cmd === "wget") {
    const files = ["resume.pdf"];
    return files
      .filter((f) => f.startsWith(arg))
      .map((f) => `${cmd} ${f}`);
  }

  return [];
}
