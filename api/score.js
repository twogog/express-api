import { kv } from '@vercel/kv';
import { allowCors } from '../cors';

async function handler(request, response) {
  // kv.flushall()
  // kv.dbsize()
  const {name, score} = request.body;
  const registratedUsers = await kv.get('users') || []
  const currentUser = registratedUsers.find(user => user.name === name);
  if (currentUser.score < score) {
    const updatedUsers = registratedUsers.map(user => {
      return user.name === name 
        ?  {...user, score}
        : user
    })
    await kv.set('users', JSON.stringify(updatedUsers))
    const result = await kv.get('users') || []
    const toFront = result.map(({name, score}) => ({name, score}))
    return response.status(200).json(toFront)
  }
  const toFront = registratedUsers.map(({name, score}) => ({name, score}))
  return response.status(200).json(toFront)
}

module.exports = allowCors(handler)