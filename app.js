const fs = require("fs");
const path = require("path");
const express = require('express')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3003
const dbPath = path.join(path.resolve(process.cwd()), "db.json");

app.use(cors())
app.use(express.json());

function getDbData() {
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

app.get('/', (req, res) => {
  const db = getDbData()
  res.json(db)
})

app.put('/adduser', (req, res) => {
  const db = getDbData()
  const {name} = req.body
  db.users.push({name, score: 0})
  fs.writeFile(dbPath, JSON.stringify(db), (error, data) => {
    res.send(getDbData())
  });
})

app.put('/addscore', (req, res) => {
  const db = getDbData();
  const {score, name} = req.body
  
  const user = db.users.find(user => user.name === name)
    if (+user.score < +score) {
      const result = db.users = db.users.map(user => {
        return user.name === name ? {...user, score} : user
      })

      fs.writeFile(dbPath, JSON.stringify({users: result}), (error, data) => {
        res.send(JSON.stringify({users: result}))
      });
    } else res.send('previous score is better')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

exports.module = {
  app
};