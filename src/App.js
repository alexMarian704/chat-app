import './App.css';
import Login from './components/Login';
import {useState} from 'react'

function App() {
  const [id, setId] = useState('')

  return (
    <div className="App">
      <Login onIdSubmit={setId}/>
      <h1>{id}</h1>
    </div>
  );
}

export default App;
