import WebSocket from "websocket"

const W3CWebSocket = WebSocket.w3cwebsocket

const client = new W3CWebSocket("ws://localhost:8080",null)

client.onerror = (error) => {
    console.log('error occured: ',error)
}

client.onopen = () => {
    console.log('websocket client connected')
}

client.onclose = () => {
    console.log('websocket client closed')
}

client.onmessage = e => {
    if(typeof e.data === 'string'){
        let messages = document.getElementById('messages')
        let newMessage = document.createElement('p')
        newMessage.className = "message"
        messages.appendChild(newMessage)
    }
}
let newpost = document.querySelector('#newpost')
console.log(newpost)
newpost.addEventListener('submit',e=>{
    e.preventDefault()
    console.log('inside new post submission')
    console.log('form data',e)
})