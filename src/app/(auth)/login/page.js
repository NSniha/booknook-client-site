import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";
import Spinner from "@/components/shared/Spinner";

export const metadata = { title: "Login" };
export default function LoginPage() {
  return (
    <AuthShell>
      <Suspense fallback={<Spinner />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
