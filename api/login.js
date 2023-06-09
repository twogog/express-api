import { kv } from '@vercel/kv';
import { allowCors } from '../cors';

async function handler(request, response) {
  // kv.flushall()
  // kv.dbsize()
  const {name, password} = request.body;
  const registratedUsers = await kv.get('users') || []
  const toFront = registratedUsers.map(({name, score}) => ({name, score}))
  const currentUser = registratedUsers.find(user => user.name === name);
  if (password && currentUser?.password === password) return response.status(200).json(toFront);
  return response.status(400).json('incorrect password or nickname')
}

module.exports = allowCors(handler)