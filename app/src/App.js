import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';
import getCookie from './utils/cookie';

const App = (props) => {
    const [ user, setUser ] = useState(null);

    const login = (userObj) => {
        setUser({
            ...userObj,
            loggedIn: true
        });
    }

    const logout = () => {
        document.cookie = `aid=;expires=${new Date().toUTCString()}`;

        setUser({
            loggedIn: false
        })
    }

    useEffect(() => {
        const token = getCookie('aid');

        if (!token) {
            logout();
            return;
        }

        fetch('http://localhost:9999/verifyToken', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(promise => {
            return promise.json();
        }).then(response => {
            if (response.error) {
                logout();
            } else {
                const userObj = response.user;

                login(userObj);
            }
        });
    }, []);

    if (user === null || user.loggedIn === null || user.loggedIn === undefined) {
        return (<div></div>)
    }

    return (
        <UserContext.Provider value={{
            user,
            login,
            logout
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default App;
