import { useCallback, useEffect, useState } from "react";
import { INCREMENT_POINTS } from "../utils/api/update";
import { useAuth } from "./useAuth";
import { GET_USER_POINTS } from "../utils/api/query";
import { bigIntToNumber } from "../utils";

const usePoints = (initialValue : number = 0)=>{
    const auth = useAuth()
    const [points, setPoints] = useState<number>(initialValue);
    const {mutateAsync, data: incrementData} = INCREMENT_POINTS(auth?.actors)
    const {data , isLoading} : {data : any, isLoading : boolean} = GET_USER_POINTS(auth?.actors)
    
    useEffect(()=>{
        if(data?.ok){
            const _points = bigIntToNumber(data.ok) * 0.001
            setPoints(_points)
        }
    },[data])

    const incrementPoints = useCallback(async()=>{
        setPoints((val)=>val + 0.001);
        try {
            const result : any = await mutateAsync()
            if(result.err){
                throw new Error(result.err)
            }
        } catch (err){
            setPoints((val)=>val - 0.001)
            console.error(err)
        } finally {
            console.log(incrementData)
        }

    },[initialValue])

    return {points, incrementPoints, setPoints, isLoading}
}

export default usePoints