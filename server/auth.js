import "dotenv/config";
import express from "express";
import cors from "cors";
import { auth } from "../lib/auth.js";

const app = express();
const defaultClientOrigin = "http://localhost:3000";
const clientOrigin = process.env.VITE_AUTH_BASE_URL
  ? new URL(process.env.VITE_AUTH_BASE_URL).origin
  : defaultClientOrigin;

app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
);
app.use(express.raw({ type: "*/*", limit: "10mb" }));

app.all("/api/auth/*", async (req, res) => {
  const baseUrl = process.env.APP_URL || "http://localhost:4000";
  const url = new URL(req.originalUrl, baseUrl).toString();
  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : req,
  });

  const response = await auth.handler(request);

  response.headers.forEach((value, name) => {
    if (name.toLowerCase() === "set-cookie") {
      res.append("Set-Cookie", value);
    } else {
      res.setHeader(name, value);
    }
  });

  res.status(response.status);
  const body = await response.arrayBuffer();
  res.send(Buffer.from(body));
});

const port = Number(process.env.SERVER_PORT || 4000);
app.listen(port, () => {
  console.log(`Better Auth server listening on ${process.env.APP_URL || `http://localhost:${port}`}`);
});
