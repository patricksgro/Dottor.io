import { useAuth } from "../context/authContext"
import { Navigate } from 'react-router-dom'

function PublicRoutes({ children }) {

    const {  loading } = useAuth()

    if (loading) return <div>Loading...</div>

    return children
}

export default PublicRoutes