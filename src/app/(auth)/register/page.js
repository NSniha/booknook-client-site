import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";
import Spinner from "@/components/shared/Spinner";

export const metadata = { title: "Register" };
export default function RegisterPage() {
  return (
    <AuthShell register>
      <Suspense fallback={<Spinner />}>
        <RegisterForm />
      </Suspense>
    </AuthShell>
  );
}
