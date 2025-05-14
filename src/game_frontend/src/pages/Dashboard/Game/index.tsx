import React from 'react'
import Game1 from '../../../components/games/Game1'
import Game2 from '../../../components/games/Game2'
import Game3 from '../../../components/games/Game3'
import { Navigate, useParams } from 'react-router-dom'
import Navbar from '../../../components/ui/Navbar'
import { useAuth } from '../../../hooks/useAuth'
import { use } from 'matter'
import Game4 from '../../../components/games/Game4'




const GamePage = () => {
  const auth = useAuth();
  const { id } = useParams<{ id?: string }>()

  if (!id) {
    return <Navigate to="/notfound" replace />
  }
  const gamesComponent: Record<string, JSX.Element> = {
  
  1: <Game1 actor={auth?.actors} />,
  2: <Game2 actor={auth?.actors} />,
  3: <Game3 actor={auth?.actors} />,
  4: <Game4/>
  
}

  const selectedGame = gamesComponent[id]

  return (
    <div
      className="exchange scrollbar-hide"
      /*style={{
        backgroundImage: 'url("/assets/images/space-exchange-bg.webp")',
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover',
      }}*/
    >
      <div className='game-container'>
     
      {selectedGame ? selectedGame : <div>Game Not Found with id {id}</div>}
      </div>
    </div>
  )
}

export default GamePage
