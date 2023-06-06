const fs = require("fs");
const path = require("path");
const express = require('express')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3003
const dbPath = path.join(path.resolve(process.cwd(), "public"), "db.json");
const bodyParser = express.json

app.use(cors())

function getDbData() {
  return fs.readFileSync(dbPath, "utf8");
}

app.get('/', (req, res) => {
  const db = getDbData()
  res.json(db)
})

app.put('/adduser', bodyParser(), (req, res) => {
  const db = getDbData()
  const {name} = req.body
  db.users.push({name, score: 0})
    
  fs.writeFile(dbPath, JSON.stringify(db), (error, data) => {
    res.send('success')
  });
})

app.put('/addscore', bodyParser(), (req, res) => {
  fs.readFile("./db.json", (error, data) => {
    const response = JSON.parse(data)
    const {score, name} = req.body
    const user = response.users.find(user => user.name === name)
    if (+user.score < +score) {
      const result = response.users = response.users.map(user => {
        return user.name === name ? {...user, score} : user
      })
      fs.writeFile("./db.json", JSON.stringify({users: result}), (error, data) => {
        res.send(JSON.stringify({users: result}))
      });
    } else res.send('previous score is better')
  });
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

exports.module = {
  app
};