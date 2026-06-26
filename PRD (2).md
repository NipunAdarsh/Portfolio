# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## PROJECT: TERMINAL_PORTFOLIO_OS (v1.0)
**Document Status:** FINAL | **Author:** System Architect | **Date:** 2026-06-26

---

## 1. EXECUTIVE SUMMARY
**1.1 Product Vision**
To construct an interactive, immersive, and highly memorable developer portfolio that discards traditional web paradigms (GUIs, scrolling, buttons) in favor of a raw Command-Line Interface (CLI). The application will simulate a secure Unix-like environment where visitors "hack" or navigate their way through the developer's experience, projects, and contact information using standard terminal commands.

**1.2 Core Value Proposition**
* **Demonstration over Declaration:** Instead of just listing "JavaScript" as a skill, the environment itself proves front-end mastery, state management, and creative engineering.
* **Friction as Engagement:** By requiring the user to type commands (e.g., `help`, `cat resume.txt`), it transforms passive reading into active engagement, increasing dwell time and memorability.
* **Brand Identity:** Establishes the developer as technically deep, security-minded, and detail-oriented.

---

## 2. GOALS & SUCCESS METRICS
### 2.1 Primary Goals
1. Provide a flawless, zero-latency terminal emulation experience in the browser.
2. Ensure critical information (resume, contact, key projects) is accessible within 2 commands.
3. Maintain full mobile compatibility and accessibility despite the unconventional UI.

### 2.2 Key Performance Indicators (KPIs)
* **Engagement Rate:** >80% of visitors execute at least two commands.
* **Easter Egg Discovery:** >15% of users trigger hidden commands (e.g., `sudo`, `matrix`).
* **Conversion:** >10% of users execute the `contact` command or download the resume via `wget resume.pdf`.
* **Performance:** Lighthouse score of 100 in Performance (minimal DOM elements, no heavy assets).

---

## 3. USER PERSONAS
**Persona 1: The Recruiter (Time-Starved, Non-Technical)**
* **Goal:** Needs to quickly assess if the candidate meets the job requirements.
* **Pain Point:** Might be confused by a CLI.
* **Solution:** An auto-running boot sequence that ends with clear instructions: *"Type 'help' to begin or 'resume' for a quick overview."*

**Persona 2: The Hiring Manager / Tech Lead (Analytical, Curious)**
* **Goal:** Wants to assess the depth of technical knowledge and coding style.
* **Pain Point:** Bored by standard template portfolios.
* **Solution:** Complex interactive projects launched via `./scripts`, mock file system navigation (`cd`, `ls`), and clean, bug-free command parsing.

---

## 4. DESIGN & AESTHETIC SPECIFICATION
*(Note: Directly aligned with the CLI/Terminal UI/UX Specification)*

* **Canvas:** Pitch black (`#000000`).
* **Typography:** `JetBrains Mono` or `VT323`, size 16px (desktop).
* **Color Palette:**
  * Output Text: Light Gray (`#E0E0E0`)
  * Accent/Prompt: Phosphor Green (`#00FF41`)
  * Errors: Terminal Red (`#FF003C`)
  * Warnings/Directories: System Yellow (`#F3E600`)
* **Motion:** * Blinking block cursor (`█`).
  * Simulated "typewriter" rendering for heavy text blocks (simulating 9600 baud rate).
  * Fake system initialization boot sequence on first load.

---

## 5. CORE EPICS & FEATURE REQUIREMENTS

### EPIC 1: Terminal Engine (The Core)
* **REQ-1.1:** The engine must capture keystrokes system-wide. No clicking required to focus the input.
* **REQ-1.2:** Implement command history navigation using `Up` and `Down` arrow keys.
* **REQ-1.3:** Implement `Tab` auto-completion for known files and commands.
* **REQ-1.4:** The input line must clearly display the prompt (e.g., `guest@portfolio:~$`).

### EPIC 2: Command Architecture
The system must support the following base commands:
* `help` - Lists all available commands.
* `whoami` - Prints a brief bio/intro.
* `skills` - Outputs an ASCII table of technical proficiencies.
* `projects` - Lists key projects.
* `cat [filename]` - Reads specific text files (e.g., `cat about.txt`).
* `clear` - Wipes the terminal history from the screen.
* `contact` - Initiates an interactive prompt for the user to leave a message.
* `sudo` - Returns a cheeky error message (e.g., "User is not in the sudoers file. This incident will be reported.").

### EPIC 3: Simulated File System (VFS)
* **REQ-3.1:** Maintain a virtual state tree representing a mock directory structure (e.g., `/home/guest/`, `/var/projects/`).
* **REQ-3.2:** Support `ls` (list directories) and `cd` (change directory).
* **REQ-3.3:** Prevent users from escaping the sandbox (handle `cd ../../` gracefully).

### EPIC 4: Mobile & Accessibility
* **REQ-4.1:** On mobile devices, a virtual keyboard must automatically focus, or provide a toggleable GUI button overlay for basic commands to avoid typing frustration on small screens.
* **REQ-4.2:** Use `aria-live="polite"` on the terminal output container so screen readers announce new lines of text as they appear.
* **REQ-4.3:** Ensure a semantic HTML fallback is present if JavaScript fails or is disabled (a `<noscript>` tag containing a basic text resume).

---

## 6. TECHNICAL ARCHITECTURE

* **Framework:** React.js (Next.js for static site generation and optimal SEO).
* **State Management:** React Context API or Zustand to manage terminal history, current path, and input state.
* **Styling:** Tailwind CSS (Strictly using utility classes for colors, monospace fonts, and spacing. No flex-box layouts for the terminal output, rely on standard block formatting to mimic raw text).
* **Deployment:** Vercel (Edge network for lowest possible TTFB).

---

## 7. RELEASE PHASES

* **Phase 1 (Alpha - v0.1):** Basic terminal engine, parsing, and static command outputs (`help`, `whoami`, `clear`).
* **Phase 2 (Beta - v0.5):** Virtual File System implemented (`cd`, `ls`, `cat`), tab-completion, and command history.
* **Phase 3 (V1.0 - Launch):** Boot sequence animation, mobile optimization, easter eggs, and analytics tracking (capturing command usage via Plausible/Google Analytics).
