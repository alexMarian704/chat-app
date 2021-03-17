import './App.css';
import { useState, useEffect , useRef } from 'react'
import io from 'socket.io-client'

function App() {
  const [state, setState] = useState({ message: '', name: '' })
  const [chat, setChat] = useState([])

  const socketRef = useRef()

  useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:4000")
			socketRef.current.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)

  const textChange = (e)=>{
    setState({...state , [e.target.name]: e.target.value})
  }

  const messageSubmit = (e)=>{
    const { name, message } = state
		socketRef.current.emit("message", { name, message })
		e.preventDefault()
		setState({ message: "", name })
  }

  const renderChat = ()=>{
    return chat.map(({name , message} , index)=>(
      <div key={index}>
        <h2>{name} : <span>{message}</span></h2>
      </div>
    ))
  }

  return (
    <div className="App">
      <form onSubmit={messageSubmit}>
        <h1>Message</h1>
        <div>
          <label >Name:</label>
          <br/>
          <input type="text" name="name" onChange={(e) => textChange(e)} value={state.name} autoComplete="off" id="name"/>
        </div>
        <br/>
        <div>
        <label >Message:</label>
        <br/>
          <input type="text" name="message" value={state.message} onChange={(e) =>{textChange(e)}} autoComplete="off" id="message"/>
        </div>
        <br/>
        <button>Send Message</button>
      </form>

      <div id="chat-container">
        <h1>Chat</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default App;
