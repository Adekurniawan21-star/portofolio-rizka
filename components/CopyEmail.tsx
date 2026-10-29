"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyEmail({
  email = "rizkakamila27@gmail.com",
}: {
  email?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Gagal menyalin email:", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.75rem",
        background: "var(--surface-2)",
        border: "1px solid var(--line)",
        borderRadius: 12,
        padding: "0.55rem 0.85rem",
        marginTop: "1.1rem",
        fontSize: "0.86rem",
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          color: "var(--text)",
          fontFamily: "ui-monospace, monospace, sans-serif",
          fontWeight: 500,
          userSelect: "all",
          wordBreak: "break-all",
        }}
      >
        {email}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Salin alamat email ke clipboard"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          padding: "0.35rem 0.75rem",
          borderRadius: 8,
          border: "1px solid var(--line)",
          background: copied ? "var(--accent)" : "var(--surface)",
          color: copied ? "#F6F1E4" : "var(--text)",
          fontSize: "0.78rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s ease",
          flexShrink: 0,
        }}
      >
        {copied ? (
          <>
            <Check size={14} />
            <span>Tersalin</span>
          </>
        ) : (
          <>
            <Copy size={14} />
            <span>Salin</span>
          </>
        )}
      </button>
    </div>
  );
}

