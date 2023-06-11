import { kv } from '@vercel/kv';
 
export default async function handler(request, response) {
  // kv.flushall()
  // kv.dbsize()
  
  const users = await kv.get('secret') || []

  if (!request?.body) return response.status(200).json(users)
  
  const {name, score = 0} = request.body;
  if(!name) return response.status(400).json('something wrong with your body or content-type')
  if (!score) { // first put
    const newUsers = users.find(user => user.name === name) 
      ? users
      : [...users, { name, score }]
    newUsers.length !== users.length 
      ? await kv.set('users', JSON.stringify(newUsers))
      : '';
    return response.status(200).json(await kv.get('users'))
  } else { // not first put
    const currentUser = users.find(user => user.name === name)
    if (!currentUser) return response.status(400).json('you have to add an user')
    if (currentUser.score < score) {
      const updatedUsers = users.map(user => {
        return user.name === name ? {...user, score} : user;
      })
      await kv.set('users', JSON.stringify(updatedUsers))
      return response.status(200).json(await kv.get('users'))
    } else return response.status(200).json(users);
  }
  
}