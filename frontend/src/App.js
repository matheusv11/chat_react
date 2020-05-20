import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import {v4 as uuid} from "uuid"; 

const myId = uuid()
const socket = io('http://localhost:3030');
socket.on('connect', () => console.log('[IO] Connect => A new connection has been established'))

const App = () => {
    const [message, updateMessage] = useState('')
    const [messages, updateMessages] = useState([])

    // useEffect(() => {
    //     const handleNewMessage = newMessage =>
    //         updateMessages([...messages, newMessage])
    //     socket.on('chat.message', handleNewMessage)
    //     return () => socket.off('chat.message', handleNewMessage)
    // }, [messages])

    useEffect(()=>{
        const handleNewMessage= newMessage =>{
            updateMessages([...messages, newMessage]);
        }
        socket.on('chat.message', handleNewMessage)
        return ()=> socket.off('chat.message', handleNewMessage);
        //Retorna so os dados especificos do handle, senao ele retorna tudo do array
    }, [messages]);

    const handleFormSubmit = event => {
        event.preventDefault();

        if (message.trim()) {
            socket.emit('chat.message', {
                id: myId,
                message
            })
            updateMessage('');
        }
    }

    // const handleInputChange = event =>
    //     updateMessage(event.target.value)

    return (
        <div className="chat-container">

    <header className="chat-header">
      <h1><i className="fas fa-smile"></i> ChatCord</h1>
      <a href="index.html" className="btn">Leave Room</a>
    </header>
    <main className="chat-main">
      <div className="chat-sidebar">
        <h3><i className="fas fa-comments"></i> Room Name:</h3>
        <h2 id="room-name">JavaScript</h2>
        <h3><i className="fas fa-users"></i> Users</h3>
        <ul id="users">
          <li>Brad</li>
          <li>John</li>
          <li>Mary</li>
          <li>Paul</li>
          <li>Mike</li>
        </ul>
      </div>
      <div className="chat-messages">

        {messages.map(mensagem=>(
          <div className={`message--${mensagem.id===myId ? 'mine' : 'other'}`} key={mensagem.id}>
          <p className="meta">Brad <span>9:12pm</span></p>
          <p className="text">
            {mensagem.message}
          </p>

        </div>
        ))}
					

      </div>
    </main>
    <div className="chat-form-container" onSubmit={handleFormSubmit}>
      <form id="chat-form" >
        <input
          id="msg"
          type="text"
          value={message}
          placeholder="Enter Message"
          onChange={event=> updateMessage(event.target.value)}
          required
        
        />
        <button className="btn"><i className="fas fa-paper-plane"></i> Send</button>
      </form>
    </div>
  </div>

    )
}

export default App
