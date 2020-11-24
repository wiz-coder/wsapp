import http from "http"
import WebSocket from "websocket"
import path from "path"
import express from "express"
import { PassThrough } from "stream"

const app = express()
const WebSocketServer = WebSocket.server
const server = http.createServer(app)

app.use('/',(req,res)=>{
    console.log(path.join(__dirname,".."))
    res.render(path.join(__dirname,"..","views","index.html"))
})
const websocket = new WebSocketServer({
    "httpServer":server
}) // this is for the sake of first handshake

websocket.on("request",request=>{
    // if someone request a websocket the following will happen
    let conn = request.accept(null,request.origin)
 
    conn.on("close",(reasonCode,description)=>{
        console.log('peer with address: ',conn.remoteAddress,' disconnected')
        console.log('reasonCode: ',reasonCode,'desc: ',description)
    })
    
    conn.on("message",message=>{
        if(message.binaryData){
            console.log('received binary data of', message.binaryData.length,' bytes')
            conn.sendBytes(message.binaryData,err=>console.log('error while sending binary data ',err))
        }
        else if(message.utf8Data){
            console.log('Received message :',message.utf8Data)
        }
    })
})

const port = 8080 || process.env.PORT

server.listen(port,()=>console.log(`server listening to ${port}`))