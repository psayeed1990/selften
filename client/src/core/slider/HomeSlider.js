import React, { Fragment, useEffect, useState } from 'react';
import './homeSlider.css';
import {sliderImages} from './../apiCore';
import ShowSlider from './../ShowSlider';

const HomeSLider = ()=>{
    const [slides, setSlides] = useState([])
    const [count, setCount] = useState(0);

    const init = async ()=>{
        const slideArray = await sliderImages();
        
        setSlides(slideArray);
        
    }

    useEffect(()=>{
        init();          
    },[]);

    useEffect(()=>{
        
        const slider = ()=>{
            if(count < slides.length - 1){
                setCount(count + 1);  
            }else{
                setCount(0)
            }
            
        }
        const slideShow = setInterval(slider, 3000);

        return()=>{
            clearInterval(slideShow);
        }
   
    })

    return(

        <div className="slides">
           
           {slides.length > 0? 
           <Fragment>
               
                {count === 0 ?
                    <ShowSlider item={slides[(slides.length-1)-count]._id} url="slider" idenClass="left-slide" />
                    :
                    <ShowSlider item={slides[count-1]._id} url="slider" idenClass="left-slide" />
                  
                }
                
                <ShowSlider item={slides[count]._id} url="slider" idenClass="middle-slide" />
                

                { count === (slides.length - 1) ?
                    <ShowSlider item={slides[0]._id} url="slider" idenClass="right-slide" />
                    :
                    <ShowSlider item={slides[count+1]._id} url="slider" idenClass="right-slide" />

                }
            </Fragment>
            :
            <Fragment></Fragment>
            }

        </div>
        
    )
}

export default HomeSLider;