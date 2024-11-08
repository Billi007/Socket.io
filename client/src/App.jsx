import { useState, useEffect } from 'react'
import {io} from 'socket.io-client'
import {nanoid} from 'nanoid'
import './App.css'

const socket = io.connect("http://localhost:8000");    //better approach with key connection

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [socketId, setSocketId] = useState("");
  
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {message})
    setMessage("");
  }

  useEffect(() => {
    socket.on("chat", (data) => {
      setSocketId(socket.id)
      setChat([...chat, data]);
    })
  })

  return (
    <>
     <div className="app">
      <header className="app-header">
        <h1>Chatty App</h1>
        <h5>Id:- {socket.id}</h5>


      <form onSubmit={sendChat}>
      <input 
        type="text" 
        name="id" 
        placeholder='enter Id' 
        value={socketId}
        onChange={e => setSocketId(e.target.value)}
        />
        <input 
        type="text" 
        name="chat" 
        placeholder='send message' 
        value={message}
        onChange={e => setMessage(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>

      {chat.map((data ,id) => {
        return (
          <p key={id}><span>{data.message}</span>  </p>
        )
      })}
        </header>
     </div>
    </>
  )
}

export default App
