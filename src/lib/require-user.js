import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "./auth";

export async function requireUser(returnTo) {
  const requestHeaders = await headers();
  let session = null;
  if (requestHeaders.get("cookie")) {
    session = await getAuth().api.getSession({ headers: requestHeaders });
  }
  if (!session) redirect(`/login?callbackUrl=${encodeURIComponent(returnTo)}`);
  return session.user;
}
