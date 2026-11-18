"use client";

import { useEffect } from "react";

export default function Toast({ toast, onClose }) {

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div
      role={toast.type === "error" ? "alert" : "status"}
      aria-live={toast.type === "error" ? "assertive" : "polite"}
      className={`fixed right-4 top-20 z-100 flex max-w-sm  gap-2 rounded-xl border px-4 py-3 text-sm shadow-xl ${
        toast.type === "success"
          ? "border-green-500/20 bg-card text-green-400"
          : toast.type === "info"
            ? "border-accent/30 bg-card text-foreground"
            : "border-red-500/20 bg-card text-red-400"
      }`}
    >
      <span>
        {toast.type === "success" ? "✓" : toast.type === "info" ? " " : "!"}
      </span>

      <p>{toast.message}</p>
    </div>
  );
}
