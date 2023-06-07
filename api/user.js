import { kv } from '@vercel/kv';
 
export default async function handler(request, response) {
  const user = await kv.JSON.SET(doc, $, '{"a":2}');
  return response.status(200).json(user);
}