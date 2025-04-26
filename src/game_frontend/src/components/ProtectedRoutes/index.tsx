import { Suspense } from "react"
import { useAuth } from "../../hooks/useAuth"
import { Navigate } from "react-router-dom"
import Loader from "../ui/Loader"


const ProtectedRoutes = ({children} : React.PropsWithChildren) => {
    const auth = useAuth()
    
    if(auth?.isAuthenticated.plug || auth?.isAuthenticated.ii) {
        return (
            <Suspense fallback={<Loader/>}>
                {children}
            </Suspense>
        )
    } else {
        
        return <Navigate to="/unauthorized" replace/>
    }
}

export default ProtectedRoutes