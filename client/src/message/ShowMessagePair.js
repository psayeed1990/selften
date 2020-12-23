import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { adminLinks } from '../user/AdminDashboard';
import { userLinks } from './../user/UserDashboard';
import { isAuthenticated } from '../auth';
import { getMessage } from '../core/apiCore';

const ShowMessagePair = () => {
    const [messagesPair, setMessagesPair] = useState(null);
    const { user, token } = isAuthenticated();

    useEffect(() => {
        getMessage(user._id, token).then(data => {
            if (!data) {
                console.log('no message')
            } else {
                console.log(data)
                setMessagesPair(data);
                
            }
        })
    }, []);

    return (



        <Layout
            title={`Hi ${user.name}`}
            description={`This is Message Page`}
            className="container-fluid"
        >
            <div className="row">
                {
                    user.role === 1 ?
                        <div className="col-md-3">{adminLinks()}</div>
                        :
                        <div className="col-md-3">{userLinks()}</div>
                }
            
                <div className="col-md-6 offset-md-2 m-b-250 mb-5">
                    
                    {
                        messagesPair ?
                            messagesPair.map(messages=>{
                                return (
                                    <div className="border p-1 m-3" key={messages._id}>
                                        <Link exact to={`/messages/pair/${messages._id}/`}>
                                            <p>By: {messages.user.name}</p>
                                            <p>Message: {messages.message[0].message}</p>
                                            <p>To: {messages.receiver.name}</p>
                                            
                                        </Link>
                                    </div>
                                       
                                )
                            
                            })
                            :
                            <Fragment></Fragment>
                    }
                </div>  
               
            </div>
        </Layout>
    )
}

export default ShowMessagePair;


