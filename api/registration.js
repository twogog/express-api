import { kv } from '@vercel/kv'; 
import { allowCors } from '../cors';

async function handler(request, response) {
  // kv.flushall()
  // kv.dbsize()
    const {email, name, password, score = 0} = request.body;
    if (!email || !name || !password) return response.status(400).json('request is incorrect')
    const registratedUsers = await kv.get('users') || []
    const currentUser = registratedUsers.find(user => user.name === name);
    if (currentUser) return response.status(400).json('user already exist');
    const newUser = {email, name, password, score}
    const result = await kv.set('users', JSON.stringify([...registratedUsers, newUser]))
    const toFront = result.map(({name, score}) => ({name, score}))
    return response.status(200).json(toFront);
}

module.exports = allowCors(handler)
