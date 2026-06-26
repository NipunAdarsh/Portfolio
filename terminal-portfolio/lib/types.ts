// ============================================
// Terminal Portfolio — Types
// ============================================

export interface FileSystemNode {
  name: string;
  type: "file" | "directory";
  content?: string;
  children?: Record<string, FileSystemNode>;
}

export interface CommandResult {
  output: React.ReactNode;
  isError?: boolean;
  isWarning?: boolean;
  clear?: boolean;
  downloadUrl?: string;
}

export interface HistoryEntry {
  command: string;
  output: React.ReactNode;
  isError?: boolean;
  isWarning?: boolean;
  timestamp: number;
}

export interface TerminalState {
  history: HistoryEntry[];
  currentPath: string[];
  commandHistory: string[];
  commandHistoryIndex: number;
  isBooting: boolean;
  isContactMode: boolean;
  contactStep: number;
  contactData: {
    name: string;
    email: string;
    message: string;
  };
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  status: "ACTIVE" | "DONE" | "ARCHIVED";
  github?: string;
  liveUrl?: string;
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  website?: string;
  discord?: string;
}
