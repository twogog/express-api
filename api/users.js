import { kv } from '@vercel/kv';
 
export default async function handler(request, response) {
  if (!request?.body) {
    const users = await kv.get('users')
    return response.status(200).json(users)
  } else {
    const {name, score} = request.body;
    if (!score) {
      const users = await kv.get('users') || []
      const newUsers = [...users, { name, score: 0}]
      const result = await kv.set('users', JSON.stringify(newUsers))
      return response.status(200).json(result)
    } else {
      
    }
    
  }
  
  // return response.status(200).json({23: 23});
  // kv.flushall()
  // kv.dbsize()
}