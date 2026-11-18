"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  // Check and listen to authentication state
  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (mounted) {
        setUser(error ? null : user);
        setAuthLoading(false);
      }
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      setUser(session?.user ?? null);
      setAuthLoading(false);
      setMenuOpen(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout
  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout failed:", error.message);
        return;
      }

      setUser(null);
      setMenuOpen(false);

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <nav className="navbar fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-5 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-1.5 text-lg font-semibold tracking-tight"
        >
          <img
            src="/roadmap-logo.png"
            alt="RoadmapAI"
            className="h-7 w-7 object-contain"
          />

          <span className="transition-opacity duration-300 group-hover:opacity-80">
            RoadmapAI
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* How it works */}
          <a
            href="/#how-it-works"
            className="whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            How it works
          </a>

          {/* Profile and Account Dropdown */}
          {!authLoading && (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Open account menu"
                aria-expanded={menuOpen}
                className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border bg-card text-muted transition-all duration-200 hover:border-border-hover hover:text-foreground"
              >
                {user ? (
                  <span className="text-sm font-semibold text-foreground">
                    {(user.user_metadata?.full_name || user.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                  </svg>
                )}
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
                  {user ? (
                    <>
                      <div className="border-b border-border px-4 py-3">
                        <p className="text-sm font-medium text-foreground">
                          {user.user_metadata?.full_name || "Your account"}
                        </p>

                        <p className="mt-1 truncate text-xs text-muted">
                          {user.email}
                        </p>
                      </div>

                      <div className="p-1.5">
                        <button
                          type="button"
                          onClick={handleLogout}
                          disabled={loggingOut}
                          className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-background hover:text-foreground disabled:opacity-50"
                        >
                          {loggingOut ? "Signing out..." : "Sign out"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-2">
                      <Link
                        href="/login"
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-foreground"
                      >
                        Sign in
                      </Link>

                      <Link
                        href="/signup"
                        onClick={() => setMenuOpen(false)}
                        className="mt-1 block rounded-lg bg-accent px-3 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                      >
                        Create account
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
