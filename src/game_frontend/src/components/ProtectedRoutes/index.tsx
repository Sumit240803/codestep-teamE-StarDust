import { Suspense } from "react"
import { useAuth } from "../../hooks/useAuth"
import { Navigate } from "react-router-dom"
import Loader from "../ui/Loader"


const ProtectedRoutes = ({children} : React.PropsWithChildren) => {
    const auth = useAuth();
    //console.log(auth);
    if(!auth) return <Loader/>
    const {isAuthenticated , identity ,principal} = auth;
    const isAuthChecked = isAuthenticated.ii || isAuthenticated.plug;
    const isLoggedIn = isAuthChecked && principal && !principal.isAnonymous();
    if(!isLoggedIn){
        return <Loader/>
    }
    

    if (/*auth?.isAuthenticated.ii || auth?.isAuthenticated.plug*/ isLoggedIn) {
        return (
            <Suspense fallback={<Loader />}>
                {children}
            </Suspense>
        );
    } else {
        return <Navigate to="/unauthorized" replace />;
    }
};


export default ProtectedRoutes