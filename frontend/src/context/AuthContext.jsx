import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const expiry = localStorage.getItem('user_expiry');
        const now = new Date().getTime();

        if(storedUser && expiry) {
            if(now > parseInt(expiry)) {
                localStorage.removeItem('user');
                localStorage.removeItem('user_expiry');
                localStorage.removeItem('token');    
                setUser(null);            
    
            } else {
                setUser(JSON.parse(storedUser))
            }
        }

    }, [])

    const login = (userData) => {
        const fullUser = {
            ...userData,
        };
        const now = new Date().getTime();
        const expiryTime = now + 60 * 60 * 1000;
        setUser(fullUser)
        
        localStorage.setItem('user', JSON.stringify(fullUser))
        localStorage.setItem('user_expiry', expiryTime.toString());
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        localStorage.removeItem('user_expiry');
        localStorage.removeItem('token')
    }

    return (
            <AuthContext.Provider value={{ user, login, logout }}>
            {children}
            </AuthContext.Provider>
        );
}

export const useAuth = () => useContext(AuthContext);