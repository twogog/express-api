import { kv } from '@vercel/kv';
import { allowCors } from '../cors';

async function handler(request, response) {
  // kv.flushall()
  // kv.dbsize()
  const {name, password} = request.body;
  const registratedUsers = await kv.get('users') || []
  const currentUser = registratedUsers.find(user => user.name === name);
  if (currentUser.password === password) return response.status(200).json('login');
  return response.status(400).json('incorrect pass or nickname')
}

module.exports = allowCors(handler)