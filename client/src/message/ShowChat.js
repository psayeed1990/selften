import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { useParams } from 'react-router-dom';
import { messageByPairId, sendMessage } from '../core/apiCore';
import { adminLinks } from '../user/AdminDashboard';

const ShowChat = () => {
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

        sendMessage(token, user._id, receiverId, pairId, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    message: '',
                    loading: false,
                    createdMessage: data.message
                });
                console.log('message sent')
            }
        });
    };

    const newPostForm = () => (
        <Fragment>
            <div>
                {
                    messages.map(msg => {
                        return (
                            <p className="border">{msg.message}</p>
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
            <h2>{`${createdMessage}`} is created!</h2>
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
            <div className="col-md-3">{adminLinks()}</div>
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
