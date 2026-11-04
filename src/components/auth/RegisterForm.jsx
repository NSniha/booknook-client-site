"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { passwordError, safeCallback } from "@/lib/validation";
import PasswordField from "./PasswordField";
import GoogleButton from "./GoogleButton";

export default function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackURL = safeCallback(params.get("callbackUrl"));
  const { data: session } = authClient.useSession();
  useEffect(() => {
    if (session) router.replace("/");
  }, [session, router]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  async function submit(event) {
    event.preventDefault();

    if (busy) return;

    setPasswordTouched(true);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const image = String(form.get("image") || "").trim();

    let validation = passwordError(password);

    if (name.length < 2 || name.length > 80) {
      validation = "Your name should contain 2–80 characters.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validation = "Enter a valid email address.";
    } else {
      try {
        if (new URL(image).protocol !== "https:") {
          throw new Error();
        }
      } catch {
        validation = "Add a valid HTTPS photo URL.";
      }
    }

    if (validation) {
      setError(validation);
      toast.error(validation);
      return;
    }

    setBusy(true);
    setError("");

    try {
      const { data, error: authError } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
      });

      if (authError) {
        throw new Error(
          authError.message || "We could not create your account.",
        );
      }

      if (!data?.user) {
        throw new Error("Registration failed. Please try again.");
      }

      toast.success("Your account is ready. Please log in.");

      router.push(
        `/login?callbackUrl=${encodeURIComponent(callbackURL)}`,
      );

      router.refresh();
    } catch (err) {
      const message = err.message || "Registration failed. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <p className="eyebrow mb-3 text-center">A place on the shelf, just for you</p>
      <h2 className="font-display text-panel text-center tracking-tight">
        Join the library.
      </h2>
      <p className="mb-6 mt-3 text-center text-base text-muted-foreground">
        More curiosity. More stories. Your first chapter starts here.
      </p>
      <GoogleButton callbackURL="/" />
      <div className="my-5 flex items-center gap-4 text-base uppercase tracking-widest text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or with your email
        <span className="h-px flex-1 bg-border" />
      </div>
      <form onSubmit={submit} noValidate className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="field-label">
              Your name
            </label>
            <input
              id="name"
              name="name"
              required
              maxLength={80}
              autoComplete="name"
              placeholder="Your full name"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="email" className="field-label">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="you@example.com"
              className="field"
            />
          </div>
        </div>
        <div>
          <label htmlFor="photo" className="field-label">
            Photo URL
          </label>
          <input
            id="photo"
            name="image"
            type="url"
            required
            maxLength={2048}
            placeholder="https://example.com/your-photo.jpg"
            className="field"
          />
        </div>
        <PasswordField
          autoComplete="new-password"
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordTouched(true);
          }}
          error={passwordTouched ? passwordError(password) : ""}
        />
        <ul aria-label="Password requirements" className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground sm:text-[13px]">
          {[
            [password.length >= 6, "6+ characters"],
            [/[A-Z]/.test(password), "An uppercase letter"],
            [/[a-z]/.test(password), "A lowercase letter"],
          ].map(([valid, label]) => (
            <li
              key={label}
              className={`flex items-center gap-1 ${valid ? "text-success" : ""}`}
            >
              <Check
                size={12}
                className={valid ? "opacity-100" : "opacity-30"}
              />
              {label}
            </li>
          ))}
        </ul>
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
              <LoaderCircle size={16} className="animate-spin" />
              Creating account…
            </>
          ) : (
            <>
              Register
              <ArrowUpRight size={16} />
            </>
          )}
        </button>
      </form>
      <p className="mt-5 text-center text-base text-muted-foreground">
        Already a member?{" "}
        <Link
          href={`/login?callbackUrl=${encodeURIComponent(callbackURL)}`}
          className="font-medium text-accent hover:underline"
        >
          Login here
        </Link>
      </p>
    </>
  );
}
