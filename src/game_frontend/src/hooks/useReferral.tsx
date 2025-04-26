import { useCallback, useEffect, useState } from "react";
import { GET_REFERAL_ID } from "../utils/api/query";
import { useAuth } from "./useAuth";


const useReferral = ()=>{
    const auth = useAuth();
    const {data, isLoading, error}  = GET_REFERAL_ID(auth?.actors)
    const [referralId, setReferralId] = useState<string | undefined>(undefined)

    useEffect(()=>{
        if((data as any)?.ok){
            setReferralId((data as any)?.ok)
        }
    },[data])

    const generateReferralId = useCallback(()=>{
        return `${window.location.origin}?ref=${referralId}`
    },[referralId])

    return {generateReferralId,isLoading, error}
}

export default useReferral; 