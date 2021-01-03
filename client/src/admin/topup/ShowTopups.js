import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopupThumbs } from '../../core/apiCore';
import ShowThumb from '../../core/ShowThumb';
import './showTopup.css';
 

const ShowTopups = ()=>{
    const [topupThumbnails, setThumbNails] =useState(null);

    useEffect(()=>{
        getTopupThumbs().then(thumbs=>{
            setThumbNails(thumbs);
        })
    
    },[])

    return(
        <Fragment>
        <h5 className="heading">Topup Your Game Account</h5>
        <div className="row center-flex">
            
            {
                topupThumbnails ? 
                topupThumbnails.map(thumb=>{
                    return(
                        
                                <div className="col-md-2 thumb-show" key={thumb._id}>
                                    <Link exact to={`/topups/${thumb._id}/type/${thumb.type}`}>
                                    
                                        <ShowThumb item={thumb} url="topup-thumbs" />
                                        <h6>{ thumb.title }</h6>

                                    </Link>
                                </div>          
                       
                    )
                })
                :
                <Fragment>Loading...</Fragment>
            }
        </div>
        </Fragment>
    )
}

export default ShowTopups;