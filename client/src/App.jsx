import { useState, useEffect } from 'react'
import {io} from 'socket.io-client'
import {nanoid} from 'nanoid'
import './App.css'

const socket = io.connect("http://localhost:8000");    //better approach with key connection

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const username = nanoid()
  
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {message})
    setMessage("");
  }

  useEffect(() => {
    socket.on("chat", (data) => {
      setChat([...chat, data]);
    })
  })

  return (
    <>
     <div className="app">
      <header className="app-header">
        <h1>Chatty App</h1>
      </header>

      {chat.map((data ,id) => (
       <p key={id}>{data.message}</p>
      ))}

      <form onSubmit={sendChat}>
        <input 
        type="text" 
        name="chat" 
        placeholder='send message' 
        value={message}
        onChange={e => setMessage(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
     </div>
    </>
  )
}

export default App
