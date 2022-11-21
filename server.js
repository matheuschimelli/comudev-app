require('dotenv').config()
console.log(process.env)

const express = require("express")
const http = require("http")
const next = require('next')
const socketio = require("socket.io")

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const cors = require('cors')
const { json } = require('body-parser')
const { createClient } = require('redis')

const { v4 } = require('uuid')
const moment = require('moment')

nextApp.prepare().then(async() => {
    const app = express();
    const server= http.createServer(app);
    const io = new socketio.Server();
    io.attach(server);

    const client = createClient()
    app.use = (json())
    app.use = (cors())

    client.on('error', console.error)
    client.connect().then(() => console.log('Connected to redis locally!'))
    .catch(() => {
    console.error('Error connecting to redis')
    })

    app.get('/hello', async (_, res) => {
        res.send('Hello World')
    });

    app.post('/sua-sala', async (req, res) => {
        const { username } = req.body
        const roomId = v4()
      
        await client
          .hSet(`${roomId}:info`, {
            created: moment(),
            updated: moment(),
          })
          .catch((err) => {
            console.error(1, err)
          })
      
        // await client.lSet(`${roomId}:users`, [])
      
        res.status(201).send({ roomId })
      })
    
      socket.on('DISSCONNECT_FROM_ROOM', async ({ roomId, username }) => {})

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

    app.all('*', (req, res) => nextHandler(req, res));

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});