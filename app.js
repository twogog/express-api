const fs = require("fs");
const express = require('express')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3003

const bodyParser = express.json

app.use(cors())

app.get('/', (req, res) => {
  fs.readFile("./public/db.json", 'utf-8', (error, data) => {
    console.log(2023)
    res.json(data)
  });
})

app.put('/adduser', bodyParser(), (req, res) => {
  fs.readFile("./db.json", (error, data) => {
    const response = JSON.parse(data)
    const {name} = req.body
    response.users.push({name, score: 0})
    fs.writeFile("./db.json", JSON.stringify(response), (error, data) => {
      res.send('success')
    });
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

export default app;