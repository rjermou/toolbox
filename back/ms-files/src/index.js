const express = require('express')
const properties = require('getconfig')
const cors = require('cors');
const expressPort = properties.express.port || 3031
const expressHost = properties.express.host || '0.0.0.0'

const app = express()

// Configuration
app.use(cors(properties.cors));
app.use(express.json())

// Routes
app.use('/', require('./application/routes/index'))

app.listen(expressPort, expressHost, () => {
  console.log(`Application started at http://${expressHost}:${expressPort}`)
})
