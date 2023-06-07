const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json());

app.get('/api', (req, res) => {
  res.send('sdf')
})

app.put('/api/adduser', (req, res) => {
  const {name} = req.body
 
})

app.put('/api/addscore', (req, res) => {

  const {score, name} = req.body
})

export default app;