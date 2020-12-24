import React, { useState, useEffect, createContext, useContext } from 'react';
import { isAuthenticated } from '../auth';
import { getUnseenMessagesByReceiver } from '../user/apiUser';

export const NotificationsContext = createContext();

export const UserProvider = (props)=> {
    const [notifications, setNotifications] = useState(0);
    const { user, token } = isAuthenticated();
    
    useEffect(() => {

        getUnseenMessagesByReceiver(user, token)
            .then(messages => {
                console.log('mm', messages);
                setNotifications(messages.length);
            });
        
        
    }, []);



    return(
        <NotificationsContext.Provider value={[notifications, setNotifications]}>
            {props.children}
        </NotificationsContext.Provider>
    )
}