// ============================================
// Terminal Portfolio — Virtual File System (VFS)
// ============================================

import { FileSystemNode } from "./types";
import { BIO, SKILLS, PROJECTS, CONTACT } from "./constants";

// Build skills text content
function buildSkillsContent(): string {
  let content = "  ┌────────────────────────────────────────────────────┐\n";
  content +=     "  │  TECHNICAL PROFICIENCY MATRIX                      │\n";
  content +=     "  └────────────────────────────────────────────────────┘\n\n";

  SKILLS.forEach((category) => {
    content += `  [${category.name}]\n`;
    category.skills.forEach((skill) => {
      const filled = Math.round(skill.level / 5);
      const empty = 20 - filled;
      const bar = "█".repeat(filled) + "░".repeat(empty);
      const paddedName = skill.name.padEnd(14);
      content += `  ${paddedName}[${bar}]  ${skill.level}%\n`;
    });
    content += "\n";
  });

  const totalSkills = SKILLS.reduce((sum, cat) => sum + cat.skills.length, 0);
  const avgLevel = Math.round(
    SKILLS.reduce(
      (sum, cat) => sum + cat.skills.reduce((s, sk) => s + sk.level, 0),
      0
    ) / totalSkills
  );
  content += `  Total Skills: ${totalSkills} | Avg Proficiency: ${avgLevel}%`;

  return content;
}

// Build project file content
function buildProjectContent(project: typeof PROJECTS[0]): string {
  let content = `  # ${project.name}\n\n`;
  content += `  ${project.description}\n\n`;
  content += `  Tech Stack : ${project.techStack.join(", ")}\n`;
  content += `  Status     : [${project.status}]\n`;
  if (project.github) content += `  GitHub     : ${project.github}\n`;
  if (project.liveUrl) content += `  Live URL   : ${project.liveUrl}\n`;
  return content;
}

// Build the full VFS tree
export function createFileSystem(): FileSystemNode {
  const projectChildren: Record<string, FileSystemNode> = {};
  PROJECTS.forEach((p) => {
    projectChildren[`${p.id}.md`] = {
      name: `${p.id}.md`,
      type: "file",
      content: buildProjectContent(p),
    };
  });

  return {
    name: "~",
    type: "directory",
    children: {
      "about.txt": {
        name: "about.txt",
        type: "file",
        content: `  ┌────────────────────────────────────────────────────┐
  │  ABOUT :: ${BIO.name}                               │
  └────────────────────────────────────────────────────┘

  ${BIO.longBio}

  Name     : ${BIO.name}
  Title    : ${BIO.title}
  Location : ${BIO.location}
  Status   : ${BIO.status}
  Editor   : ${BIO.editor}
  Terminal : ${BIO.favTerminal}`,
      },
      "resume.txt": {
        name: "resume.txt",
        type: "file",
        content: `  ┌────────────────────────────────────────────────────┐
  │  RESUME :: ${BIO.name}                              │
  └────────────────────────────────────────────────────┘

  ${BIO.name} — ${BIO.title}
  ${BIO.location}

  ${BIO.longBio}

  ─── SKILLS ──────────────────────────────────────────
  ${SKILLS.map(
    (cat) =>
      `  ${cat.name}: ${cat.skills.map((s) => s.name).join(", ")}`
  ).join("\n")}

  ─── PROJECTS ────────────────────────────────────────
  ${PROJECTS.map(
    (p) => `  • ${p.name} — ${p.description}`
  ).join("\n")}

  ─── CONTACT ─────────────────────────────────────────
  Email    : ${CONTACT.email}
  GitHub   : ${CONTACT.github}
  LinkedIn : ${CONTACT.linkedin}

  > Run 'wget resume.pdf' to download the full resume.`,
      },
      "skills.txt": {
        name: "skills.txt",
        type: "file",
        content: buildSkillsContent(),
      },
      "contact.sh": {
        name: "contact.sh",
        type: "file",
        content: `#!/bin/bash
# Contact Script — Run 'contact' to use the interactive form

echo "Contact: ${CONTACT.email}"
echo "GitHub:  ${CONTACT.github}"
echo "LinkedIn: ${CONTACT.linkedin}"`,
      },
      projects: {
        name: "projects",
        type: "directory",
        children: projectChildren,
      },
    },
  };
}

// Navigate to a path in the VFS
export function resolvePath(
  root: FileSystemNode,
  pathParts: string[]
): FileSystemNode | null {
  let current = root;
  for (const part of pathParts) {
    if (part === "" || part === "~") continue;
    if (current.type !== "directory" || !current.children) return null;
    const child = current.children[part];
    if (!child) return null;
    current = child;
  }
  return current;
}

// Get contents of a directory
export function listDirectory(node: FileSystemNode): string {
  if (node.type !== "directory" || !node.children) {
    return "  Not a directory.";
  }

  const entries = Object.values(node.children);
  const dirs = entries.filter((e) => e.type === "directory");
  const files = entries.filter((e) => e.type === "file");

  let output = "";
  dirs.forEach((d) => {
    output += `  <span class="text-yellow">${d.name}/</span>\n`;
  });
  files.forEach((f) => {
    output += `  ${f.name}\n`;
  });

  output += `\n  ${dirs.length} director${dirs.length === 1 ? "y" : "ies"}, ${files.length} file${files.length === 1 ? "" : "s"}`;
  return output;
}

// Read file contents
export function readFile(node: FileSystemNode): string {
  if (node.type !== "file") {
    return `  cat: ${node.name}: Is a directory`;
  }
  return node.content || "  (empty file)";
}

// Normalize a path (handle .., ., etc.)
export function normalizePath(
  currentPath: string[],
  targetPath: string
): string[] {
  // Handle absolute path
  if (targetPath === "~" || targetPath === "/") return [];

  const parts = targetPath.startsWith("~")
    ? targetPath.slice(2).split("/")
    : targetPath.split("/");

  const newPath = targetPath.startsWith("~") || targetPath.startsWith("/")
    ? []
    : [...currentPath];

  for (const part of parts) {
    if (part === "" || part === ".") continue;
    if (part === "..") {
      if (newPath.length > 0) newPath.pop();
    } else {
      newPath.push(part);
    }
  }

  return newPath;
}

// Format path for display
export function formatPath(pathParts: string[]): string {
  if (pathParts.length === 0) return "~";
  return "~/" + pathParts.join("/");
}
