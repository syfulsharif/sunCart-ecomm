import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL || "/api/auth",
  basePath: "/api/auth",
});

export const useSession = authClient.useSession;
export default authClient;
