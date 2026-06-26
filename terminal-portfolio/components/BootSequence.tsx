"use client";

// ============================================
// Boot Sequence — Cinematic BIOS Startup
// ============================================

import { useState, useEffect, useCallback } from "react";
import { BOOT_LINES, ASCII_BANNER } from "@/lib/constants";

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<
    { text: string; status?: string; visible: boolean }[]
  >([]);
  const [progress, setProgress] = useState(0);
  const [showBanner, setShowBanner] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [skipVisible, setSkipVisible] = useState(false);

  const skip = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Show skip hint after 1s
    const skipTimer = setTimeout(() => setSkipVisible(true), 1000);

    // Add keyboard listener for skip
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        skip();
      }
    };
    window.addEventListener("keydown", handleKey);

    // Animate boot lines
    let currentLine = 0;
    const bootInterval = setInterval(() => {
      if (currentLine < BOOT_LINES.length) {
        const line = BOOT_LINES[currentLine];
        setLines((prev) => [
          ...prev,
          { text: line.text, status: line.status, visible: true },
        ]);
        currentLine++;
      } else {
        clearInterval(bootInterval);

        // Animate progress bar
        let prog = 0;
        const progressInterval = setInterval(() => {
          prog += 3;
          setProgress(Math.min(prog, 100));
          if (prog >= 100) {
            clearInterval(progressInterval);

            // Show ASCII banner
            setTimeout(() => {
              setShowBanner(true);

              // Show welcome message
              setTimeout(() => {
                setShowWelcome(true);

                // Complete boot after brief pause
                setTimeout(() => {
                  onComplete();
                }, 1500);
              }, 800);
            }, 400);
          }
        }, 30);
      }
    }, 100);

    return () => {
      clearTimeout(skipTimer);
      clearInterval(bootInterval);
      window.removeEventListener("keydown", handleKey);
    };
  }, [onComplete, skip]);

  // Build progress bar
  const progressBarWidth = 40;
  const filled = Math.round((progress / 100) * progressBarWidth);
  const empty = progressBarWidth - filled;
  const progressBar = "█".repeat(filled) + "░".repeat(empty);

  return (
    <div
      className="terminal-window"
      onClick={skip}
      role="button"
      tabIndex={0}
      aria-label="Boot sequence - press any key to skip"
    >
      <div className="terminal-body" style={{ padding: "24px" }}>
        {/* Boot lines */}
        {lines.map((line, i) => (
          <div key={i} className="slide-up" style={{ minHeight: "22px" }}>
            {line.text && (
              <span>
                <span className="text-gray">{line.text}</span>
                {line.status && (
                  <>
                    <span className="text-gray-dim">
                      {"." .repeat(
                        Math.max(
                          2,
                          50 - line.text.length - line.status.length - 3
                        )
                      )}
                    </span>
                    <span className="text-green"> [{line.status}]</span>
                  </>
                )}
              </span>
            )}
          </div>
        ))}

        {/* Progress bar */}
        {lines.length >= BOOT_LINES.length && progress > 0 && (
          <div className="fade-in" style={{ marginTop: "16px" }}>
            <span className="text-green">[{progressBar}]</span>
            <span className="text-yellow"> {progress}%</span>
          </div>
        )}

        {/* ASCII Banner */}
        {showBanner && (
          <pre
            className="text-green text-glow-strong fade-in"
            style={{ marginTop: "24px", fontSize: "12px", lineHeight: "1.2" }}
          >
            {ASCII_BANNER}
          </pre>
        )}

        {/* Welcome Message */}
        {showWelcome && (
          <div className="fade-in" style={{ marginTop: "24px" }}>
            <div className="text-green">
              ╔══════════════════════════════════════════════════╗
            </div>
            <div className="text-green">
              ║{"  "}
              <span className="text-glow">TERMINAL_PORTFOLIO_OS v1.0</span>
              {"                    "}║
            </div>
            <div className="text-green">
              ║{"  "}Secure Shell Access Granted
              {"                "}║
            </div>
            <div className="text-green">
              ║{"  "}
              <span className="text-gray-dim">
                Last login: {new Date().toDateString()} from 127.0.0.1
              </span>
              {"  "}║
            </div>
            <div className="text-green">
              ╚══════════════════════════════════════════════════╝
            </div>
          </div>
        )}

        {/* Skip hint */}
        {skipVisible && !showWelcome && (
          <div
            className="text-gray-dim fade-in"
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              fontSize: "12px",
            }}
          >
            Press any key to skip...
          </div>
        )}
      </div>
    </div>
  );
}
