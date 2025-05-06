import { useState } from "react";
import { useAuth } from "./useAuth"

export const useAllGameCards = ()=>{
    const auth = useAuth();
    const [allGames , setAllGames] = useState<GameCards[]>([]);
    const [isLoading , setIsLoading] = useState(false);
    
}