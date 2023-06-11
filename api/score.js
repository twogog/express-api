import { kv } from '@vercel/kv';
 
export default async function handler(request, response) {
  // kv.flushall()
  // kv.dbsize()
  const {name, score} = request.body;
  const registratedUsers = await kv.get('users') || []
  const toFront = registratedUsers.map(({name, score}) => {name, score})
  const currentUser = registratedUsers.find(user => user.name === name);
  currentUser.score = currentUser.score < score ? score : currentUser.score
  await kv.set('users', JSON.stringify())
}