import { kv } from '@vercel/kv';
 
export default async function handler(request, response) {
  const user = await kv.hgetall('user:me');
  return response.status(200).json(user);
}