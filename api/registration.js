import { kv } from '@vercel/kv'; 

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

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
