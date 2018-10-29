const express = require('express')
const mongo = require('./Mongo.js')
const app = express()
var cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

const users = require('./routes/users')
app.use(users)
const services = require('./routes/services')
const about = require('../static/about')
app.use(services)
app.get('/about.json', (req, res) => about(req, res))

module.exports = {
  path: '/',
  handler: app
}