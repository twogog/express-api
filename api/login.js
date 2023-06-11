import { kv } from '@vercel/kv';
 
export default async function handler(request, response) {
  // kv.flushall()
  // kv.dbsize()
  const {name, password} = request.body;
  const registratedUsers = await kv.get('users') || []
  const toFront = registratedUsers.map(({name, score}) => {name, score})
  const currentUser = registratedUsers.find(user => user.name === name);
  if (currentUser.password === password) return response.status(200).json('login');
  return response.status(400).json('incorrect pass or nickname')
  
  await kv.set('users', JSON.stringify(...registratedUsers, newUser))
  return response.status(200).json('success');
}