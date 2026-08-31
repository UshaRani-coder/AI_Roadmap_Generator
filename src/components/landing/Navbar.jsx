"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", isLight);
  }, [isLight]);

  return (
    <nav className="navbar fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className=" flex h-16 mx-4 items-center justify-between px-5 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-1.5 text-lg font-semibold tracking-tight"
        >
          {/* <span className="text-accent transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
            ✦
          </span> */}

          <span className="transition-opacity duration-300 group-hover:opacity-80">
            RoadmapAI
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button className="hidden text-sm text-muted transition-colors duration-300 hover:text-foreground sm:block">
            How it works
          </button>

          {/* Theme toggle */}
          <button
            onClick={() => setIsLight((prev) => !prev)}
            className="group flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm transition-all duration-300 hover:border-border-hover hover:bg-card"
            aria-label={
              isLight ? "Switch to dark mode" : "Switch to light mode"
            }
          >
            <span
              className={`transition-all duration-300 ${
                isLight ? "rotate-0 scale-100" : "rotate-90 scale-100"
              }`}
            >
              {isLight ? "☾" : "☀"}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
