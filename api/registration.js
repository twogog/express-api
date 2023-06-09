import { kv } from '@vercel/kv'; 
import { allowCors } from '../cors';

async function handler(request, response) {
  // kv.flushall()
  // kv.dbsize()
    const {email, name, password, score = 0} = request.body;
    if (!email || !name || !password) return response.status(400).json('request is incorrect')
    const registratedUsers = await kv.get('users') || []

    const currentUserName = registratedUsers.find(user => user.name === name);
    if (currentUserName) return response.status(400).json('the name already exist');
    const currentUserEmail = registratedUsers.find(user => user.email === email);
    if (currentUserEmail) return response.status(400).json('email already exist');
    
    const newUser = {email, name, password, score}
    await kv.set('users', JSON.stringify([...registratedUsers, newUser]))
    const toFront = (await kv.get('users')).map(({name, score}) => ({name, score}))
    return response.status(200).json(toFront);
}

module.exports = allowCors(handler)
