import logo from './logo.svg';
import './App.css';
import React, { Children } from 'react'
import {useLocalStore,useObserver} from 'mobx-react'



const GamesContext=React.createContext()
const GamesProvider=({children})=>{
  const store=useLocalStore(()=>(
    {
      games:["Cricket","Hockey"],
      addGame:(game)=>{
        store.games.push(game)
      },
      get gamesCount(){
        return this.games.length
      }
     } 
  )
  )
  return(
    <GamesContext.Provider value={store}>
      {children}
    </GamesContext.Provider>
  )
}

const GamesList=()=>{
  const store=React.useContext(GamesContext)
  return useObserver(()=>{
     return   <div>Games Count {store.gamesCount}
       <ul>
            { store.games.map(game=>(
                <li key={game}>{game}</li>
            ))}
        </ul>
        </div>
    })
  }

const AddNewGame=()=>{
  const [txtGame,setTxtGame]=React.useState('')
  const store=React.useContext(GamesContext)
  const addGame=(e)=>{
    e.preventDefault()
    store.addGame(txtGame)
    setTxtGame('')
  }
  return (
    <form onSubmit={(e)=>e.preventDefault()}>
      <input type="text" 
        name="txtGame" 
        value={txtGame} 
        onChange={(e)=>{setTxtGame(e.target.value)}}
      />
      <button onClick={addGame}>Submit</button>
    </form>
  )
}

function App() {
  return (
    <GamesProvider>
      <AddNewGame/>
      <GamesList/>
    </GamesProvider>
  );
}

export default App;
