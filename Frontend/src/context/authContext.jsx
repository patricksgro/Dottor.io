import { createContext, useContext, useEffect, useState } from 'react';
import { logout } from '../../axios/auth';
import { userData } from '../../axios/auth';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // GET ME → verifica se la sessione è valida
    const fetchLoggedUser = async () => {
        try {
            const res = await userData();
            setUser(res);
            setIsAuth(true);
        } catch (err) {
            setUser(null);
            setIsAuth(false);
        } finally {
            setLoading(false);
        }
    };

    // LOGIN SUCCESSO → aggiorna stato
    const loginSuccess = async () => {
        await fetchLoggedUser();
        navigate('/', { replace: true });
    };

    // LOGOUT
    const logoutUser = async () => {
        try {
            await logout();
        } catch (err) { 
            console.log(err)
        }

        setUser(null);
        setIsAuth(false);
        navigate('/default', { replace: true });
    };

    //heart beat eliminato: LA SESSIONE SCADE PER INATTIVITà TRATTANDOSI DI UN SISTEMA SENSIBILE QUINDI DISCONNETTIAMO L'UTENTE

    // 401 intercettati dal axios interceptor → evento session-expired
    useEffect(() => {
        const handler = () => logoutUser();
        window.addEventListener("session-expired", handler);
        return () => window.removeEventListener("session-expired", handler);
    }, []);

    // INIT → verifica sessione all’avvio
    useEffect(() => {
        fetchLoggedUser();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            isAuth,
            loading,
            loginSuccess,
            logoutUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
