import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { AdminLinks } from '../user/AdminDashboard';
import { UserLinks } from './../user/UserDashboard';
import { isAuthenticated } from '../auth';
import { getMessage } from '../core/apiCore';
import moment from 'moment';
import './message.css';

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
                        <div className="col-md-3"><AdminLinks /></div>
                        :
                        <div className="col-md-3"><UserLinks /></div>
                }
            
                <div className="col-md-9 m-b-250 mb-5">
                    
                    {
                        messagesPair ?
                            messagesPair.map(messages=>{
                                return (
                                    <div className="border p-1 m-3 msg-pair" key={messages._id}>
                                        <Link exact to={`/messages/pair/${messages._id}/`}>
                                            <p className="msg-text">By: {messages.user.name}</p>
                                            {
                                                messages.message.filter(receivedMsg => {
                                                    return (receivedMsg.user === user._id && receivedMsg.seen === false)
                                                }).length > 0 ?
                                                <Fragment>
                                                
                                                    <p>Latest Message: {messages.message[messages.message.length - 1].message}<sup>unread</sup></p>
                                                    </Fragment>
                                                    :
                                                    <p>Latest Message: {messages.message[messages.message.length - 1].message}<sup>read</sup></p>

                                                
                                            }
                                            <p className="msg-text">To: {messages.receiver.name}</p>
                                            <p className="time">{moment(messages.message[messages.message.length - 1].createdAt).fromNow()}</p>
                                            
                                        </Link>
                                    </div>
                                       
                                )
                            
                            })
                            :
                            <Fragment>Loading...</Fragment>
                    }
                </div>  
               
            </div>
        </Layout>
    )
}

export default ShowMessagePair;


