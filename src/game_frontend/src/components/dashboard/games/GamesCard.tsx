import React from 'react'
import "./index.css"
import Game, { GameType } from '../../ui/Games';
interface AllGameDetails{
    GameDetails : GameType[];
}
export const ListAllGames : React.FC<AllGameDetails> =({GameDetails})=>{
    return(
        <div className='card-grid'>
            {GameDetails?.map((game,index)=>(
                <Game
                key={index}
                title={game.title}
                description={game.description}
                image={game.image}
                winBonus={game.winBonus}
                energy={game.energy}
                />
            ))}
        </div>
    )
}