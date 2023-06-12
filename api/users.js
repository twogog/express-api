import { kv } from '@vercel/kv';
 
export default async function handler(request, response) {
  // kv.flushall()
  // kv.dbsize()
  const users = await kv.get('users') || []
  const toFront = users.map(({name, score}) => ({name, score}))
  return response.status(200).json(toFront)
}