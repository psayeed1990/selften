import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { adminLinks } from '../user/AdminDashboard';
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
                setMessagesPair(data);
                
            }
        })
    },[])

    return (



        <Layout
            title={`Hi ${user.name}`}
            description={`This is Message Page`}
            className="container-fluid"
        >
            <div className="row">
            <div className="col-md-3">{adminLinks()}</div>
                
                    
                    {
                        messagesPair ?
                            messagesPair.map(messages=>{
                                return (
                                    <div className="col-md-6 offset-md-2 m-b-250 mb-5">
                                    <Link className="border" exact to={`/messages/${messages.user._id}/${messages.receiver._id}`}>
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
        </Layout>
    )
}

export default ShowMessagePair;


