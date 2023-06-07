import { kv } from '@vercel/kv';
 
export default async function handler(request, response) {
  return response.status(200).json(await kv.JSON.SET);
  const user = await kv.JSON.SET(doc, $, '{"a":2}');
  return response.status(200).json(user);
}