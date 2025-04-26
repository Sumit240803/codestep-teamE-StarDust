import { useMemo, useState } from "react";
import { extractPrincipal, validateName } from "../utils";
import { useAuth } from "./useAuth";
import { CREATE_USER } from "../utils/api/update";
import { useNavigate } from "react-router-dom";
import useQueryParams from "./useQueryParams";

const useRegister = ()=>{
    const [playerName, setPlayerName] = useState<string>('');
    const auth = useAuth();
    const navigate = useNavigate();

    const ref_id = useQueryParams().get('ref');

    const refPrincipal = useMemo(()=>{
        return ref_id ? [extractPrincipal(ref_id.split('ref_')[1])] : [] // ref_id is a string like 'ref_1234' if it's null return empty array else return [Principal]
        }
    ,[ref_id])

    const {mutateAsync, isLoading,error,reset}  = CREATE_USER(auth?.actors, {user : {name : playerName}, refBy : refPrincipal})
    
    const handleSubmit = async(e : React.FormEvent)=>{
        e.preventDefault();
        try {
            if(validateName(playerName) && auth){
                await mutateAsync()
            }
        } catch (err) {
            console.error(err)
        } finally {
            if(!error){
                const targetPath = ref_id ? `/dashboard?ref=${ref_id}` : '/dashboard'
                navigate(targetPath, {replace : true})
            }
            setPlayerName('')
            reset()
        }
    }

    const onChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        setPlayerName(e.target.value)
    }

    return {playerName, handleSubmit, onChange, isLoading}
}

export default useRegister