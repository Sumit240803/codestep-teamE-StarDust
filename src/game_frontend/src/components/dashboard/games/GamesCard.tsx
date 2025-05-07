import React, { useState } from 'react'
import "./index.css"
import Game, { GameType } from '../../ui/Games';
import { Navigate, useNavigate } from 'react-router-dom';
interface AllGameDetails{
    GameDetails : GameType[];
}
export const ListAllGames : React.FC<AllGameDetails> =({GameDetails})=>{
    const navigate = useNavigate();
    //const [goTo , setGoTo] = useState<boolean>(false);
    //const [game , setGame] = useState<string | null>(null);
   // const [isLoading , setIsLoading] = useState<boolean>(false);
    const handleGameClick = (id : bigint)=>{
        navigate(`/dashboard/game/${id}`)
        /*setIsLoading(true);
        setGame(title);
        setGoTo(true);*/
    }
    /*if(goTo && game !== null && game !== ""){
        setGoTo(false);
        setIsLoading(false);
        return <Navigate to={`/dashboard/game/${game}`} replace/> 
    }
*/
    return(
        <div className='card-grid'>
            {GameDetails?.map((game)=>(
                <Game
                key={game.id}
                title={game.title}
                description={game.description}
                gimage={game.gimage}
                gameType={game.gameType}
                id={game.id}
                onClick={()=>handleGameClick(game.id)}
                />
            ))}
        </div>
    )
}