import React, { useState, useEffect, Fragment, useRef } from 'react';
import Layout from '../core/Layout';
import io from "socket.io-client";
import { isAuthenticated } from '../auth';
import { useParams } from 'react-router-dom';
import { messageByPairId, sendMessage } from '../core/apiCore';
import { adminLinks } from '../user/AdminDashboard';
import { userLinks } from '../user/UserDashboard';

const ShowChat = () => {
    const socketRef = useRef();
    const { pairId } = useParams();
    const [values, setValues] = useState({
        receiverId: '',
        messages: [],
        message: '',
        loading: false,
        error: '',
        createdMessage: '',
        redirectToProfile: false,
        formData: ''
    });

    //connect socket
    socketRef.current = io.connect('/');

    const { user, token } = isAuthenticated();
    const {
        receiverId,
        messages,
        message,
        loading,
        error,
        createdMessage,
        redirectToProfile,
        formData
    } = values;

    // load categories and set form data
    const init = () => {
        messageByPairId(user._id, token, pairId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                let realReciever = '';
                if (data.user._id === user._id) {
                    realReciever = data.receiver._id;
                } else {
                    realReciever = data.user._id;
                }
                setValues({
                    ...values,
                    receiverId: realReciever,
                    messages: data.message,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });
        const newMsgDetails = {};
        newMsgDetails.userId = user;
        newMsgDetails.receiverId = receiverId;
        newMsgDetails.pairId = pairId;
        newMsgDetails.message = message;
        
        
        socketRef.current.emit('sendMessage', newMsgDetails);

        socketRef.current.on('newMessage', msg => {
            
            setValues({
                ...values,
                messages: [...messages, msg],
                message: '',
                loading: false,
                createdMessage: 'Message loaded'
            });
            
        });

        

        // sendMessage(token, user._id, receiverId, pairId, formData).then(data => {
        //     if (data.error) {
        //         setValues({ ...values, error: data.error });
        //     } else {
        //         setValues({
        //             ...values,
        //             message: '',
        //             loading: false,
        //             createdMessage: data.message
        //         });
        //         console.log('message sent')
        //     }
        // });
    };

    //get messages
    useEffect(() => {
        socketRef.current.on('newMessage', msg => {
            
            setValues({
                ...values,
                messages: [...messages, msg],
                message: '',
                createdMessage: 'Message loaded'
            });
            
        });
    }, [])

    const newPostForm = () => (
        <Fragment>
            <div className="messages">
                {
                    messages.map(msg => {
                        return (
                            <p className="border message">{msg.message}</p>
                        )
                        
                    })
                }
            </div>
            <form className="mb-3" onSubmit={clickSubmit}>
                <div className="form-group">
                    
                    <input placeholder="type" onChange={handleChange('message')} type="text" className="form-control" value={message} />
                </div>

                <button className="btn btn-outline-primary">Send Message</button>
            </form>
        </Fragment>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdMessage ? '' : 'none' }}>
            <h2>{`${createdMessage}`}!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );
    
    
    return (
        <Layout title="messages">
            <div className="row">
                {user.role === 1 ?
                    <div className="col-md-3">{adminLinks()}</div>
                    :
                    <div className="col-md-3">{userLinks()}</div>
                }
            
                <div className="col-md-6 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default ShowChat;
