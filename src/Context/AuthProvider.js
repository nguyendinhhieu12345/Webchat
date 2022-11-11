import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../LoginWith/config';
import { Spin } from 'antd';
import { ConfigRouter } from '~/config';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const history = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    React.useEffect(() => {
        const unsubscibed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, uid, photoURL, email, phone } = user;
                setUser({ displayName, uid, photoURL, email, phone });
                /*const userLogin=[displayName,photoURL,uid]
                const jsonUser=JSON.stringify(userLogin)
                localStorage.setItem("user", jsonUser);*/
                setIsLoading(false);
                history(ConfigRouter.Chat);
                return;
            }
            else{
                setUser({});
                setIsLoading(false);
                // history();
            }
        });

        // clean function
        return () => {
            unsubscibed();
        };

    },[history]);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
        </AuthContext.Provider>
    );
}
