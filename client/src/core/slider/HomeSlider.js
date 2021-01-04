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
        const slideShow = setInterval(slider, 5000);

        return()=>{
            clearInterval(slideShow);
        }
   
    })

    useEffect(()=>{
        if(document.getElementById("middle-slide")){
            let middleSlide = document.getElementById("middle-slide");
            let leftSlide = document.getElementById("left-slide");
            let rightSlide = document.getElementById("right-slide");

            const slideEventHandler = ()=>{

    
                    middleSlide.style.animation = "slide 0.5s"; 
                    leftSlide.style.animation = "left-slide 0.5s";
                    rightSlide.style.animation = "right-slide 0.5s";;

                    
                    
                    setTimeout(() => {  
                        middleSlide.style.removeProperty('animation') 
                        leftSlide.style.removeProperty('animation') 
                        rightSlide.style.removeProperty('animation') 


                    }, 1000);
            }

            middleSlide.addEventListener('DOMAttrModified', slideEventHandler);

            
            return(()=>{
                 
                 middleSlide.removeEventListener('DOMAttrModified', slideEventHandler);
            })
            
            
        
        }
    }, [count, setCount, slides])


    return(

        <Fragment>
            <div className="slides">
            
            {slides.length > 0? 
            <Fragment>
                
                    {count === 0 ?
                        <ShowSlider item={slides[(slides.length-1)-count]._id} url="slider" idenClass="left-slide" idenId="left-slide" />
                        :
                        <ShowSlider item={slides[count-1]._id} url="slider" idenClass="left-slide" idenId="left-slide" />
                    
                    }
                    
                    <ShowSlider item={slides[count]._id} url="slider" idenClass="middle-slide" idenId="middle-slide" />
                    

                    { count === (slides.length - 1) ?
                        <ShowSlider item={slides[0]._id} url="slider" idenClass="right-slide" idenId="right-slide" />
                        :
                        <ShowSlider item={slides[count+1]._id} url="slider" idenClass="right-slide" idenId="right-slide"/>

                    }

                    

                </Fragment>
                :
                <Fragment></Fragment>
                }

                

            </div>
            <div className="slide-icons">
                {slides.map((s, index)=>{
                    return(
                        <div>
                            { count === index  ?
                                <p className="slide-btn-selected"></p>
                                :
                                <p className="slide-btn cursor-pointer" onClick={()=>{setCount(index)}}></p>
                                
                            }
                         </div>
                                
                    )
                })
                    
                }
            </div>
        </Fragment>
        
    )
}

export default HomeSLider;