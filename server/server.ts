import express from 'express';
import { Request, Response } from 'express';
import http from 'http';
import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app)
const PORT = process.env.PORT || 3000;
const io = new Server(server)

app.use(express.static(path.join(__dirname, '../public')))

app.get("/", (_: Request, res: Response) => {
	console.log("Home route")
	res.send('Hello world')
})

io.on('connection', (socket) => {
	console.log('a user connected')
	socket.on('chat message', (msg) => {
		console.log('message: ' + msg)
	})
})

// app.get("/", (_: Request, res: Response) => { 
// 	res.sendFile(path.join(__dirname, '../public/index.html'))
// })


server.listen(PORT, () => {
	console.log(`App listening on port 127.0.0.1:${PORT}`)
})

