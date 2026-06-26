# UI/UX DESIGN SPECIFICATION: DIGITAL FOOTPRINT GUARDIAN

## Conceptual Aesthetic: CLI / Terminal Interface

---

### 1. Design Philosophy & Mood

The interface completely discards modern web conventions, adopting the raw, unfiltered environment of a command-line interface (CLI). The focus is on **immersion, raw data output, and low-latency aesthetics**. Cybersecurity data is presented exactly as a security analyst or penetration tester might see it—stripped of GUI comforts, utilizing a text-based, monospaced visual language. The user's risk profile feels immediate, technical, and brutally honest.

### 2. The Color System

The palette mimics classic cathode-ray tube (CRT) monitors or modern bare-metal terminals. It relies on a pitch-black foundation with high-contrast, phosphor-inspired typography. Gradients, shadows, and opacities are strictly forbidden.

* **Background (Canvas):** `#000000` (Absolute pitch black)
* **Surface (Panels/Modals):** `#0a0a0a` (Barely elevated off-black for overlay distinction, if strictly necessary)
* **Primary Accent:** `#00FF41` (Classic "Matrix" or Phosphor Green used for prompts, active inputs, and core data)
* **Typography (Primary):** `#E0E0E0` (Light gray for standard output text to prevent eye strain)
* **Typography (Secondary):** `#008F11` (Dimmed green for timestamps, file paths, and metadata)

**Semantic Status Colors (ANSI Inspired):**
Status colors mimic raw terminal output flags:

* **Critical/Dangerous:** `#FF003C` (High-alert terminal red)
* **Suspicious/Warning:** `#F3E600` (System warning yellow)
* **Safe/Clear:** `#00FFFF` (Cyan for successful execution or secure status)

### 3. Typography & Hierarchy

The entire application relies on a single typeface family. Visual hierarchy is established not through font families, but through text weight, ASCII framing, indentation, and capitalization.

* **Primary Typeface:** `JetBrains Mono`, `Fira Code`, or `VT323` (Weights: 400, 700)
* *Usage:* Used for everything.


* **Hierarchy Techniques:**
* **Headers:** Defined by ASCII art text, ALL CAPS, or prefix symbols (e.g., `### SYSTEM RISK SCORE ###` or `> INITIATING SCAN...`).
* **Body:** Standard monospaced flow, meticulously aligned to a character grid.
* **Highlighting:** Reversing the background and text color (e.g., black text on a `#00FF41` background) to simulate highlighted terminal blocks.



### 4. Grid System & Layout

The layout discards traditional responsive CSS grids in favor of a rigid, character-based grid simulating an 80x24 or 120x40 terminal window.

* **Container:** Fixed maximum character width, visually centered with heavy black margins on wide screens.
* **Column Structure:** Simulated via fixed-width spaces and manual alignment, mimicking tabbed terminal spacing.
* **Borders & Dividers:** Built entirely using ASCII characters. Use standard dash/pipe structures (`+---+`, `|`, `-`, `=`) instead of CSS borders to separate content zones.
* **Visual Effects (Optional):** A subtle, static CSS scanline overlay or a very slight text-shadow (`0 0 5px #00FF41`) to simulate CRT phosphor glow, applied sparingly.

### 5. Component Styling Guidelines

#### **Inputs & Forms**

* **Aesthetic:** Standard command prompt.
* **Shape:** No input boxes. The user types directly inline after a prompt.
* **Focus State:** A blinking block cursor (`█`) or underscore (`_`).
* **Prefix:** Input lines must feature a system prefix (e.g., `guest@guardian:~$ ` or `root/query> `).

#### **Data Cards (Breach Results & Phishing Signals)**

* **Structure:** Presented as raw data tables or system logs.
* **Layout:** Information is output in strict horizontal rows, mimicking a `.csv` read or database query result.
* **Formatting:** Utilize ASCII tables for structured data.
```text
+---------------+------------------+----------+
| BREACH SOURCE | COMPROMISED DATA | SEVERITY |
+---------------+------------------+----------+
| Adobe.com     | Passwords, Email | [ HIGH ] |
+---------------+------------------+----------+

```



#### **Buttons**

* **Primary Action:** No traditional buttons. Interactive elements are styled as selectable text bracketed by symbols (e.g., `[ EXECUTE ]` or `< SCAN >`).
* **Hover States:** Reversing the terminal colors (black text on green background) or adding an animated cursor block next to the hovered action (`> [ EXECUTE ] █`).

### 6. Interactive Elements & Motion

Motion should mimic computer processing, serial connections, and rendering text.

* **Loading States:** Classic CLI progress indicators.
* **Progress Bar:** `[████████░░░░░░] 64%`
* **Spinners:** Cycling through `|`, `/`, `-`, `\`.
* **Logs:** Rapidly printing fake technical processes to the screen (`Establishing secure connection... OK`, `Bypassing proxy... OK`).


* **Content Reveal:** Information should not fade in. It should appear via a "typewriter" effect, printing character by character or line by line at variable speeds to mimic data streaming.
* **Transitions:** Instantaneous block-swaps or a command-line `clear` effect followed by the rapid printing of the next view. No smooth sliding or easing.

---

How heavily do you want to lean into the "retro CRT" effects (like scanlines, screen curvature, and flicker) versus a clean, modern, bare-metal developer terminal?