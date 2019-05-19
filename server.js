'use strict';

const express = require('express')
const app = express()
const helmet = require('helmet')
const debug = require('debug')('server')
const { createServer } = require('http')

const port = 3000

app.use(helmet())
app.get('/', (req, res, next) => {
  res.set({
    'Feature-Policy': "fullscreen 'none'"
  })
  next()
})
app.use(express.static('public'));

const server = createServer(app)
server.listen(port)

server.on('listening', () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`

  debug(`Listening on ${bind}`)
})

process.on('uncaughtException', err => {
  debug('Uncaught exception')
  debug(err)
  throw err
})

process.on('unhandledRejection', err => {
  debug('Unhandled Rejection')
  debug(err)
})
