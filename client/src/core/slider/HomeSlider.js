import React, { useEffect, useState } from 'react';
import './homeSlider.css';
import {sliderImages} from './../apiCore';

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
           
           
            <p>{count === 0 ?
                slides[(slides.length-1)-count]
                :
                slides[count-1]
            }</p>
            <p>{slides[count]}</p>
            <p>{ count === (slides.length - 1) ?
                slides[0]
                :
                slides[count+1]}</p>

        </div>
        
    )
}

export default HomeSLider;