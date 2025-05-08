import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth"
import { GET_ALL_GAMES } from "../utils/api/query";

export const useAllGameCards = ()=>{
    const auth = useAuth();
    const [allGames , setAllGames] = useState<GameCards[]>([]);
    const [isLoading , setIsLoading] = useState(false);
    const {data : ALL_GAMES} = GET_ALL_GAMES(auth?.actors)
    const fetchGames = useCallback(async ()=>{
        try {
            setIsLoading(true);

            const allGamesData : Array<GameCards> = (ALL_GAMES as any)?.ok;
            console.log(allGamesData);
            setAllGames(allGamesData);
        } catch (error) {
            console.error("Error fetching games:", error);
        } finally{
            setIsLoading(false);
            console.info("Games Fetched");
        }
    },[auth , ALL_GAMES]);
    useEffect(()=>{
        fetchGames();
    },[fetchGames, ALL_GAMES]);
    return {allGames,isLoading};
}