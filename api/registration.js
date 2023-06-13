import { kv } from '@vercel/kv'; 
import { allowCors } from '../cors';

async function handler(request, response) {
  // kv.flushall()
  // kv.dbsize()
    const {email, name, password, score = 0} = request.body;
    const registratedUsers = await kv.get('users') || []
    const currentUser = registratedUsers.find(user => user.name === name);
    if (currentUser) return response.status(400).json('user already exist');
    const newUser = {email, name, password, score}
    
    await kv.set('users', JSON.stringify([...registratedUsers, newUser]))
    return response.status(200).json('success');  
}

module.exports = allowCors(handler)
