import { kv } from '@vercel/kv'; 

module.exports = (req, res) => {
  //set header first to allow request or origin domain (value can be different)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

//---- other code

//Preflight CORS handler
  if(req.method === 'OPTIONS') {
      return res.status(200).json(({
          body: "OK"
      }))
  }

}

export default async function handler(request, response) {
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