import { useAuth } from "../context/authContext"
import {Navigate} from 'react-router-dom'

function ProtectedRoutes({children}) {

    const {isAuth, loading} = useAuth()

    if(loading) return <div>Loading...</div>

    if(!isAuth) {
        return <Navigate to='/default' replace/>
    }

    return children
}

export default ProtectedRoutes