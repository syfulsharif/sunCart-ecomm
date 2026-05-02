import { buffer } from 'node:stream/consumers';
import { auth } from '../../../lib/auth.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const body = req.method === 'GET' || req.method === 'HEAD' ? undefined : await buffer(req);
  const baseUrl = process.env.APP_URL || `http://${req.headers.host}`;
  const requestUrl = new URL(req.url, baseUrl).toString();

  const request = new Request(requestUrl, {
    method: req.method,
    headers: req.headers,
    body,
  });

  const response = await auth.handler(request);

  response.headers.forEach((value, name) => {
    if (name !== 'transfer-encoding') {
      res.setHeader(name, value);
    }
  });

  const bufferBody = Buffer.from(await response.arrayBuffer());
  res.status(response.status).send(bufferBody);
}
