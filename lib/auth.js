import { betterAuth } from "better-auth";
import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3";

const authDbFile = process.env.BETTER_AUTH_DB_PATH || "./better-auth.db";
const sqlite = new Database(authDbFile);
const database = new Kysely({
  dialect: new SqliteDialect({
    database: sqlite,
  }),
});

const socialProviders = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}
if (process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET) {
  socialProviders.microsoft = {
    clientId: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  database: {
    db: database,
    type: "sqlite",
  },
  baseURL: process.env.APP_URL,
  basePath: process.env.BETTER_AUTH_BASE_PATH || "/api/auth",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: Object.keys(socialProviders).length > 0 ? socialProviders : undefined,
});

export default auth;
