import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nipun | Terminal Portfolio",
  description:
    "Interactive CLI-themed developer portfolio. Type 'help' to explore. Built with Next.js.",
  keywords: [
    "developer",
    "portfolio",
    "terminal",
    "CLI",
    "interactive",
    "software engineer",
  ],
  authors: [{ name: "Nipun" }],
  openGraph: {
    title: "Nipun | Terminal Portfolio",
    description:
      "Interactive CLI-themed developer portfolio. Type 'help' to explore.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="crt-flicker">
        {children}
        <div className="crt-overlay" aria-hidden="true" />
        <noscript>
          <div
            style={{
              padding: "2rem",
              fontFamily: "monospace",
              color: "#E0E0E0",
              background: "#000",
            }}
          >
            <h1>Nipun — Developer Portfolio</h1>
            <p>
              This interactive terminal portfolio requires JavaScript to run.
            </p>
            <p>
              Please enable JavaScript or visit my GitHub:{" "}
              <a
                href="https://github.com/nipun"
                style={{ color: "#00FF41" }}
              >
                github.com/nipun
              </a>
            </p>
          </div>
        </noscript>
      </body>
    </html>
  );
}
