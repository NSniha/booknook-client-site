"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider, useTheme } from "next-themes";
import { MotionConfig } from "motion/react";
import { Toaster, toast } from "sonner";

function AppEvents({ children }) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    const onUnauthorized = () => {
      if (window.location.pathname === "/login") return;
      toast.error("Please log in to continue.", { id: "session-expired" });
      router.push(
        `/login?callbackUrl=${encodeURIComponent(window.location.pathname + window.location.search)}`,
      );
      router.refresh();
    };
    window.addEventListener("booknook:unauthorized", onUnauthorized);
    return () =>
      window.removeEventListener("booknook:unauthorized", onUnauthorized);
  }, [router]);
  return (
    <>
      {children}
      <Toaster
        richColors
        position="top-right"
        closeButton
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </>
  );
}

export default function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        <AppEvents>{children}</AppEvents>
      </MotionConfig>
    </ThemeProvider>
  );
}
