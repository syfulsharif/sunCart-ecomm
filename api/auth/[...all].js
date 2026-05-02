import "dotenv/config";
import { auth } from "../../lib/auth.js";

export default async function handler(req, res) {
  const baseUrl = process.env.APP_URL || `https://${req.headers.host}`;
  const url = new URL(req.url, baseUrl).toString();

  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : JSON.stringify(req.body),
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

  const body = await response.text();
  res.send(body);
}