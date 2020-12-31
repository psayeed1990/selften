import React, { useEffect, useState } from 'react';
import './homeSlider.css';

const HomeSLider = ()=>{
    const [slides, setSlides] = useState([])
    const [count, setCount] = useState(0);

    useEffect(()=>{
        const slideArray = ['hi', 'hello', 'good', 'ruby', 'pearls', 'dino'];

        setSlides(slideArray);
            
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
   
    },[])



 


    



    



    return(

        <div className="slides">
            <p>{slides[(slides.length-1-count)]}</p>
            <p>{slides[count]}</p>
            <p>{slides[count+1]}</p>

        </div>
        
    )
}

export default HomeSLider;