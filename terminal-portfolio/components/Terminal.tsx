"use client";

// ============================================
// Terminal Engine — Core Interactive Component
// ============================================

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { executeCommand, getCompletions } from "@/lib/commands";
import { formatPath } from "@/lib/fileSystem";
import { ASCII_BANNER } from "@/lib/constants";
import { HistoryEntry } from "@/lib/types";

const MOBILE_COMMANDS = [
  "help",
  "whoami",
  "skills",
  "projects",
  "contact",
  "clear",
  "ls",
];

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isContactMode, setIsContactMode] = useState(false);
  const [contactStep, setContactStep] = useState(0);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop =
        terminalBodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  // Add initial welcome to history
  useEffect(() => {
    const welcomeOutput = `<span class="text-green text-glow-strong" style="font-size:12px;line-height:1.2;">${ASCII_BANNER}</span>

  <span class="text-green-dim">System: Terminal_Portfolio_OS v1.0</span>
  <span class="text-green-dim">Session: guest@portfolio | PID: 1337</span>

  <span class="text-gray">Welcome, guest. Type '<span class="text-cyan">help</span>' to see available commands.</span>
`;

    setHistory([
      {
        command: "",
        output: welcomeOutput,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  // Global click to focus
  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle contact mode input
  const handleContactInput = useCallback(
    (value: string) => {
      const steps = ["name", "email", "message"];
      const currentField = steps[contactStep];

      const newContactData = { ...contactData, [currentField]: value };
      setContactData(newContactData);

      if (contactStep < 2) {
        // Show next prompt
        const nextField = steps[contactStep + 1];
        const promptLabel =
          nextField === "email"
            ? "Enter your email"
            : "Enter your message";

        setHistory((prev) => [
          ...prev,
          {
            command: value,
            output: `  <span class="text-green">></span> ${promptLabel}: `,
            timestamp: Date.now(),
          },
        ]);
        setContactStep(contactStep + 1);
      } else {
        // Submit
        setHistory((prev) => [
          ...prev,
          {
            command: value,
            output: `
  <span class="text-green">┌────────────────────────────────────────────────────┐</span>
  <span class="text-green">│</span>  <span class="text-green text-glow">MESSAGE SENT SUCCESSFULLY</span>                         <span class="text-green">│</span>
  <span class="text-green">└────────────────────────────────────────────────────┘</span>

  <span class="text-green-dim">From</span>    : ${newContactData.name}
  <span class="text-green-dim">Email</span>   : ${newContactData.email}
  <span class="text-green-dim">Message</span> : ${newContactData.message}

  <span class="text-cyan">Thank you! I'll get back to you within 24 hours.</span>
  <span class="text-gray-dim">Message delivered via secure relay protocol.</span>`,
            timestamp: Date.now(),
          },
        ]);
        setIsContactMode(false);
        setContactStep(0);
        setContactData({ name: "", email: "", message: "" });
      }
    },
    [contactStep, contactData]
  );

  // Execute a command
  const handleCommand = useCallback(
    (cmd: string) => {
      if (isContactMode) {
        handleContactInput(cmd);
        setInput("");
        return;
      }

      const trimmed = cmd.trim();

      // Add to command history
      if (trimmed) {
        setCommandHistory((prev) => [...prev, trimmed]);
      }
      setHistoryIndex(-1);

      // Handle history command
      if (trimmed.toLowerCase() === "history") {
        const histOutput = commandHistory
          .map(
            (c, i) =>
              `  <span class="text-green-dim">${String(i + 1).padStart(4)}</span>  ${c}`
          )
          .join("\n");
        setHistory((prev) => [
          ...prev,
          {
            command: trimmed,
            output: histOutput || "  No commands in history.",
            timestamp: Date.now(),
          },
        ]);
        setInput("");
        return;
      }

      // Execute the command
      const result = executeCommand(trimmed, currentPath);

      // Handle clear
      if (result.clear) {
        setHistory([]);
        setInput("");
        return;
      }

      // Handle cd (path change)
      if (result.newPath !== undefined) {
        setCurrentPath(result.newPath);
      }

      // Handle contact mode activation
      if (trimmed.toLowerCase() === "contact") {
        setIsContactMode(true);
        setContactStep(0);
      }

      // Add to history
      setHistory((prev) => [
        ...prev,
        {
          command: trimmed,
          output: result.output,
          isError: result.isError,
          isWarning: result.isWarning,
          timestamp: Date.now(),
        },
      ]);

      setInput("");
    },
    [
      currentPath,
      commandHistory,
      isContactMode,
      handleContactInput,
    ]
  );

  // Keyboard handler
  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          handleCommand(input);
          break;

        case "ArrowUp":
          e.preventDefault();
          if (commandHistory.length > 0) {
            const newIndex =
              historyIndex === -1
                ? commandHistory.length - 1
                : Math.max(0, historyIndex - 1);
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
          }
          break;

        case "ArrowDown":
          e.preventDefault();
          if (historyIndex !== -1) {
            const newIndex = historyIndex + 1;
            if (newIndex >= commandHistory.length) {
              setHistoryIndex(-1);
              setInput("");
            } else {
              setHistoryIndex(newIndex);
              setInput(commandHistory[newIndex]);
            }
          }
          break;

        case "Tab":
          e.preventDefault();
          const completions = getCompletions(input, currentPath);
          if (completions.length === 1) {
            setInput(completions[0]);
          } else if (completions.length > 1) {
            // Show completion options
            setHistory((prev) => [
              ...prev,
              {
                command: input,
                output: completions
                  .map(
                    (c) =>
                      `  <span class="text-cyan">${c}</span>`
                  )
                  .join("\n"),
                timestamp: Date.now(),
              },
            ]);
          }
          break;

        case "c":
          if (e.ctrlKey) {
            e.preventDefault();
            if (isContactMode) {
              setIsContactMode(false);
              setContactStep(0);
              setContactData({ name: "", email: "", message: "" });
              setHistory((prev) => [
                ...prev,
                {
                  command: "^C",
                  output:
                    '  <span class="text-yellow">Contact form cancelled.</span>',
                  timestamp: Date.now(),
                },
              ]);
            } else {
              setInput("");
              setHistory((prev) => [
                ...prev,
                {
                  command: input + "^C",
                  output: "",
                  timestamp: Date.now(),
                },
              ]);
            }
          }
          break;

        case "l":
          if (e.ctrlKey) {
            e.preventDefault();
            setHistory([]);
          }
          break;
      }
    },
    [
      input,
      handleCommand,
      commandHistory,
      historyIndex,
      currentPath,
      isContactMode,
    ]
  );

  // Mobile command button handler
  const handleMobileCommand = useCallback(
    (cmd: string) => {
      handleCommand(cmd);
      // Focus hidden input for keyboard
      hiddenInputRef.current?.focus();
    },
    [handleCommand]
  );

  const promptPath = formatPath(currentPath);
  const promptPrefix = isContactMode
    ? ""
    : `guest@portfolio:${promptPath}$ `;

  // Determine active tab based on last command
  const lastCmd = history.length > 0 ? history[history.length - 1].command?.split(" ")[0].toLowerCase() : "";
  const activeTab = lastCmd || "help";

  return (
    <div className="os-desktop">
      {/* Top OS Navbar */}
      <div className="os-navbar">
        <div className="os-nav-left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="text-green text-glow">GUEST@PORTFOLIO: ~ (SSH)</span>
        </div>
        
        <div className="os-nav-links hidden md:flex">
          <span 
            className={`os-nav-link ${activeTab === 'help' || activeTab === '' ? 'active' : ''}`}
            onClick={() => handleCommand('help')}
          >
            HELP
          </span>
          <span 
            className={`os-nav-link ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => handleCommand('projects')}
          >
            PROJECTS
          </span>
          <span 
            className={`os-nav-link ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => handleCommand('skills')}
          >
            SKILLS
          </span>
          <span 
            className={`os-nav-link ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => handleCommand('contact')}
          >
            CONTACT
          </span>
        </div>

        <div className="os-nav-right">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-dim cursor-pointer hover:text-green">
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
            <line x1="12" y1="2" x2="12" y2="12"></line>
          </svg>
        </div>
      </div>

      {/* Middle Body Area with Sidebar and Main Content */}
      <div className="os-body" style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Left Sidebar */}
        <div className="os-sidebar hidden lg:flex">
          <div className="sidebar-header">
            <div className="text-green font-bold">SYS_ADMIN</div>
            <div className="text-gray-dim text-xs">127.0.0.1</div>
          </div>
          
          <div className="sidebar-nav">
            <div className="sidebar-item" onClick={() => handleCommand('su')}>
              <span className="sidebar-icon">📁</span> ROOT
            </div>
            <div className="sidebar-item" onClick={() => handleCommand('coffee')}>
              <span className="sidebar-icon">{'<>'}</span> SRC
            </div>
            <div className="sidebar-item" onClick={() => handleCommand('rm -rf /')}>
              <span className="sidebar-icon">{'>_'}</span> BIN
            </div>
            <div className="sidebar-item" onClick={() => handleCommand('play')}>
              <span className="sidebar-icon">≡</span> VAR
            </div>
          </div>
        </div>

        {/* Main Content Area (Centered Terminal) */}
        <div className="os-main">
          <div className="terminal-window shadow-green">
            {/* Title Bar */}
          <div className="terminal-titlebar">
            <div className="titlebar-dots">
              <div className="titlebar-dot red" />
              <div className="titlebar-dot yellow" />
              <div className="titlebar-dot green" />
            </div>
            <span className="titlebar-text">
              guest@portfolio — bash — 80x24
            </span>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalBodyRef}
            className="terminal-body"
            role="log"
            aria-live="polite"
            aria-label="Terminal output"
          >
            {/* History entries */}
            {history.map((entry, i) => (
              <div key={i} className="slide-up" style={{ marginBottom: "8px" }}>
                {/* Command line */}
                {entry.command !== undefined && entry.command !== "" && (
                  <div>
                    <span className="text-green text-glow">
                      guest@portfolio:{promptPath}${" "}
                    </span>
                    <span className="text-white">{entry.command}</span>
                  </div>
                )}
                {/* Output */}
                {entry.output && (
                  <div
                    className={
                      entry.isError
                        ? "text-red"
                        : entry.isWarning
                        ? "text-yellow"
                        : ""
                    }
                    style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", marginTop: "4px" }}
                    dangerouslySetInnerHTML={{
                      __html: entry.output as string,
                    }}
                  />
                )}
              </div>
            ))}

            {/* Active input line */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: "22px",
                marginTop: "4px"
              }}
            >
              <span className="text-green text-glow">{promptPrefix}</span>
              <span className="text-white">{input}</span>
              <span
                className="cursor-blink text-green text-glow"
                style={{ marginLeft: "1px" }}
              >
                █
              </span>
            </div>

            {/* Hidden input for capturing keystrokes */}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="hidden-input"
              aria-label="Terminal input"
              autoFocus
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />

            {/* Hidden input for mobile keyboard */}
            <input
              ref={hiddenInputRef}
              type="text"
              className="hidden-input"
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      </div>

      {/* Bottom Status Bar */}
      <div className="os-statusbar hidden md:flex">
        <div>(C) 1984 PORTFOLIO_OS V1.0.4</div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>ST_LOGS</span>
          <span>KERN_REPORT</span>
        </div>
        <div className="text-green">SYS_OK</div>
      </div>

      {/* Mobile Quick Commands */}
      <div className="mobile-overlay">
        {MOBILE_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            className="mobile-btn"
            onClick={() => handleMobileCommand(cmd)}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
