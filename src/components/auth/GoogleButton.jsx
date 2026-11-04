"use client";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function GoogleButton({ callbackURL = "/" }) {
  const [busy, setBusy] = useState(false);
  async function login() {
    if (process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED !== "true") {
      toast.error(
        "Google sign-in is currently unavailable. Please continue with email.",
      );
      return;
    }
    setBusy(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL,
        errorCallbackURL: "/login?error=google",
      });
      if (error) throw new Error(error.message);
    } catch (error) {
      toast.error(error.message || "Google sign-in could not be started.");
      setBusy(false);
    }
  }
  return (
    <button
      type="button"
      disabled={busy}
      onClick={login}
      className="btn-secondary w-full rounded-lg py-3"
    >
      {busy ? (
        <LoaderCircle className="animate-spin" size={18} />
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
          <path
            fill="#4285F4"
            d="M21.8 12.2c0-.7-.1-1.4-.2-2.1H12v4h5.5a4.7 4.7 0 0 1-2 3.1v2.6h3.3c1.9-1.8 3-4.3 3-7.6Z"
          />
          <path
            fill="#34A853"
            d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.6c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.7A10 10 0 0 0 12 22Z"
          />
          <path
            fill="#FBBC05"
            d="M6.4 13.9a6 6 0 0 1 0-3.8V7.4H3a10 10 0 0 0 0 9.2l3.4-2.7Z"
          />
          <path
            fill="#EA4335"
            d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A9.6 9.6 0 0 0 12 2a10 10 0 0 0-9 5.4l3.4 2.7A6 6 0 0 1 12 6Z"
          />
        </svg>
      )}
      {busy ? "Connecting…" : "Continue with Google"}
    </button>
  );
}
