const express = require('express')
const properties = require('getconfig')
const expressPort = properties.express.port || 3000

const app = express()

// Configuration
app.use(express.json())

// Routes
app.use('/', require('./application/routes/index'))

app.listen(expressPort, () => {
  console.log(`Application started at port ${expressPort}`)
})
