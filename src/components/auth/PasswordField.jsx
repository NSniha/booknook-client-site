"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordField({
  onChange,
  autoComplete = "current-password",
  error,
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label htmlFor="password" className="field-label">
        Password
      </label>
      <div className="relative">
        <input
          id="password"
          name="password"
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          required
          maxLength={128}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "password-error" : undefined}
          className="field pr-12"
          placeholder="Enter your password"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center text-muted-foreground"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
      {error && (
        <p
          id="password-error"
          role="alert"
          className="mt-2 text-base text-accent"
        >
          {error}
        </p>
      )}
    </div>
  );
}
