"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { safeCallback } from "@/lib/validation";
import PasswordField from "./PasswordField";
import GoogleButton from "./GoogleButton";

export default function LoginForm() {
  const params = useSearchParams();
  const callbackURL = safeCallback(params.get("callbackUrl"));
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const { data: session } = authClient.useSession();
  useEffect(() => {
    if (session) router.replace(callbackURL);
  }, [session, callbackURL, router]);
  useEffect(() => {
    if (params.get("error"))
      toast.error(
        "Google sign-in was not completed. Please try again or use email.",
        { id: "google-login-error" },
      );
  }, [params]);
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password) {
      setError("Enter a valid email address and your password.");
      toast.error("Check your email and password.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const { error: authError } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });
      if (authError)
        throw new Error(
          authError.message || "Your email or password is incorrect.",
        );
      toast.success("Welcome back. Your next chapter is waiting.");
      router.replace(callbackURL);
      router.refresh();
    } catch (err) {
      setError(err.message || "We could not log you in. Please try again.");
      toast.error(err.message || "Login failed.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <p className="eyebrow mb-3 text-center">Your reading life, all in one place</p>
      <h2 className="font-display text-panel text-center tracking-tight">Welcome back.</h2>
      <p className="mb-7 mt-3 text-center text-base leading-7 text-muted-foreground">
        Login to find your books and your next favourite read.
      </p>
      <GoogleButton callbackURL={callbackURL} />
      <div className="my-6 flex items-center gap-4 text-base uppercase tracking-widest text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or with your email
        <span className="h-px flex-1 bg-border" />
      </div>
      <form onSubmit={submit} noValidate className="space-y-5">
        <div>
          <label className="field-label" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            className="field"
            placeholder="you@example.com"
          />
        </div>
        <PasswordField />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() =>
              toast.info(
                "Password recovery is currently unavailable. Please contact the library for help.",
              )
            }
            className="text-base text-accent hover:underline"
          >
            Forgot password?
          </button>
        </div>
        {error && (
          <p
            role="alert"
            className="rounded-lg bg-accent-soft px-4 py-3 text-base leading-6 text-accent"
          >
            {error}
          </p>
        )}
        <button disabled={busy} className="btn-primary w-full">
          {busy ? (
            <>
              <LoaderCircle size={17} className="animate-spin" />
              Logging in…
            </>
          ) : (
            <>
              Login
              <ArrowUpRight size={17} />
            </>
          )}
        </button>
      </form>
      <p className="mt-6 text-center text-base text-muted-foreground">
        New to our shelves?{" "}
        <Link
          className="font-medium text-accent hover:underline"
          href={`/register?callbackUrl=${encodeURIComponent(callbackURL)}`}
        >
          Create an account
        </Link>
      </p>
    </>
  );
}
