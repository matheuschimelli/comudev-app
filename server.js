require('dotenv').config()

const next = require('next')
const express = require("express")
const http = require("http")
const { json } = require('body-parser')
const cors = require('cors')

const socket = require("socket.io")
const { createClient } = require('redis')

const { v4 } = require('uuid')
const moment = require('moment')

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';

const io = new socket.Server();

const redisClient = createClient({
  url: process.env.REDIS_CLIENT
})

const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app = express();
  const server = http.createServer(app);
  io.attach(server);
  app.use = (json())
  app.use = (cors())

  redisClient.on('error', console.error)

  redisClient.connect()
    .then(() => console.log('Connected to redis '))
    .catch(() => {
      console.error('Error connecting to redis')
    })

  app.post('/api/joim-room', async (req, res) => {
    const username = req.body.username
    const roomId = req.body.roomId

    // Verificamos se o parâmetro username existe e não está em branco
    if (!username || username === "") {
      return res.status(401).send({ error: true, message: "Nome de usuário não pode ficar em branco" })
    }

    // verificamos se o roomId não está em branco. se estiver criamos um novo room.
    if (!roomId || roomId === "") {
      const roomId = v4()
      await redisClient.hSet(`${roomId}:info`, {
        created: new Date()
      })

      return res.status(200).send({ roomId })
    }

  })

  app.all('*', (req, res) => nextHandler(req, res));

  io.on('connection', (socket) => {

    socket.on('DISSCONNECT_FROM_ROOM', async ({ roomId, username }) => {

    })

    socket.on('CONNECTED_TO_ROOM', async ({ roomId, username }) => {
      await client.lPush(`${roomId}:users`, `${username}`)
      await client.hSet(socket.id, { roomId, username })

      const users = await client.lRange(`${roomId}:users`, 0, -1)
      const roomName = `ROOM:${roomId}`
      socket.join(roomName)
      io.in(roomName).emit('ROOM:CONNECTION', users)
    })

    socket.on('disconnect', async () => {
      // TODO if 2 users have the same name
      const { roomId, username } = await client.hGetAll(socket.id)
      const users = await client.lRange(`${roomId}:users`, 0, -1)
      const newUsers = users.filter((user) => username !== user)
      if (newUsers.length) {
        await client.del(`${roomId}:users`)
        await client.lPush(`${roomId}:users`, newUsers)
      } else {
        await client.del(`${roomId}:users`)
      }
      const roomName = `ROOM:${roomId}`
      io.in(roomName).emit('ROOM:CONNECTION', newUsers)
    })

  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});