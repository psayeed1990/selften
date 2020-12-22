import React, { Fragment, useEffect, useState } from 'react';
import Layout from '../core/Layout';
import { adminLinks } from '../user/AdminDashboard';
import { isAuthenticated } from './../auth';
import { getMessage } from './../core/apiCore';

const ShowMessage = () => {
    const [messages, setMessages] = useState(null);
    const { user, token } = isAuthenticated();
    let counter = 1;

    useEffect(() => {
        getMessage(user._id, token).then(data => {
            if (!data) {
                console.log('no message')
            } else {
                setMessages(data);
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
                <div className="col-md-6 offset-md-2 m-b-250 mb-5">
                    
                    {
                        messages ?
                            messages.map(message => {
                            return(
                            <Fragment key={message._id}>
                                <p>{counter}</p>
                                <p>{message.message}</p>
                                {counter++}
                            </Fragment>
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

export default ShowMessage;


