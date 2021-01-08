import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopupThumbs } from '../../core/apiCore';
import ShowThumb from '../../core/ShowThumb';
import './showTopup.css';
 

const ShowTopups = ()=>{
    const [topupThumbnails, setThumbNails] =useState(null);

    const init = async ()=>{
        try{
            const topupThumbs = await getTopupThumbs();

            setThumbNails(topupThumbs);
        }catch(err){
            
        }
        
        
    
    }

    useEffect(()=>{
        init();          
    },[]);

    return(
        <Fragment>
        <h6 className="heading">Topup Your Game Account</h6>
        <div className="row center-flex">
            <div className="col-md-2 thumb-show">
                <h6 className="heading">Popular Mobile Games to topup</h6>
            </div>  
            
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