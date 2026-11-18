"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SiGmail } from "react-icons/si";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Toast from "@/components/ui/Toast";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!success) return;

    const checkVerification = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user && user.email_confirmed_at && !error) {
        router.replace("/dashboard");
        router.refresh();
      }
    };

    const handleFocus = () => {
      checkVerification();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkVerification();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [success, supabase, router]);

  // Show toast notification
  function showToast(message, type = "error") {
    setToast({ message, type });
  }

  // Validate form
  function validateForm() {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    // 1. Full name
    if (!trimmedName) {
      showToast("Please enter your full name.");
      return false;
    }

    if (trimmedName.length < 2) {
      showToast("Name must contain at least 2 characters.");
      return false;
    }

    if (trimmedName.length > 60) {
      showToast("Name cannot exceed 60 characters.");
      return false;
    }

    // 2. Email
    if (!trimmedEmail) {
      showToast("Please enter your email address.");
      return false;
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    if (!emailRegex.test(trimmedEmail)) {
      showToast("Please enter a valid email address.");
      return false;
    }

    // 3. Password
    if (!password) {
      showToast("Please enter a password.");
      return false;
    }

    if (password.length < 8) {
      showToast("Password must contain at least 8 characters.");
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      showToast("Password must contain at least one uppercase letter.");
      return false;
    }

    if (!/[a-z]/.test(password)) {
      showToast("Password must contain at least one lowercase letter.");
      return false;
    }

    if (!/[0-9]/.test(password)) {
      showToast("Password must contain at least one number.");
      return false;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      showToast("Password must contain at least one special character.");
      return false;
    }

    // 4. Confirm password
    if (!confirmPassword) {
      showToast("Please confirm your password.");
      return false;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match.");
      return false;
    }

    return true;
  }

  // Handle signup
  async function handleSignup(event) {
    event.preventDefault();

    if (loading) return;

    setToast(null);

    if (!validateForm()) return;

    try {
      setLoading(true);
      showToast("Creating your account...", "info");

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim(),
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      if (data.user?.identities?.length === 0) {
        showToast("An account with this email already exists.");
        return;
      }

      setSuccess(true);
      setPassword("");
      setConfirmPassword("");

      showToast(
        "Account created! Check your email to confirm your account.",
        "success",
      );
    } catch (err) {
      console.error("Signup error:", err);

      let message = "Something went wrong. Please try again.";

      if (err.message?.toLowerCase().includes("already registered")) {
        message = "An account with this email already exists.";
      } else if (
        err.message?.toLowerCase().includes("password") ||
        err.message?.toLowerCase().includes("email")
      ) {
        message = err.message;
      }

      showToast(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      {/* Toast notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
        {/* Heading */}
        <div className="mb-8 ">
          <h1 className="text-2xl font-semibold text-foreground">
            {success ? "Check your email" : "Create your account"}
          </h1>

          <p className="mt-2 text-sm text-muted">
            {success
              ? "One last step before you get started."
              : "Start building your personalized roadmaps."}
          </p>
        </div>

        {success ? (
          /* Email confirmation success */
          <div className="space-y-5">
            {/* Email address */}
            <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <SiGmail className="h-6 w-6 text-accent" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted">Verification link sent to</p>

                <p className="mt-1 break-all text-sm font-medium text-foreground">
                  {email.trim()}
                </p>
              </div>
            </div>

            {/* Next step */}
            <p className="text-sm leading-relaxed text-muted">
              Open the email and click the confirmation link to activate your
              account.
            </p>
          </div>
        ) : (
          /* Signup form */
          <SignupForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            loading={loading}
            onSubmit={handleSignup}
          />
        )}

        {/* Sign in link */}
        {!success && (
          <p className="mt-6 text-sm text-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-accent hover:underline"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
