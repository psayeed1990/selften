import React, { Fragment, useEffect, useState } from 'react';
import './homeSlider.css';
import { sliderImages } from './../apiCore';
import ShowSlider from './../ShowSlider';
import MobileSlider from './MobileHomeSLider';

const HomeSLider = () => {
    const [slides, setSlides] = useState(null)
    const [count, setCount] = useState(0);

    const init = async () => {
        try {
            const slideArray = await sliderImages();
            setSlides(slideArray);
        } catch (err) {

        }
    }

    useEffect(() => {
        init();
    }, []);

    const slideAnim = () => {
        let middleSlide = document.getElementById("middle-slide");
        let leftSlide = document.getElementById("left-slide");
        let rightSlide = document.getElementById("right-slide");
        if (document.getElementById("middle-slide")) {
            middleSlide.style.animation = "slide 0.3s";
            rightSlide.style.animation = "right-slide 0.3s";
            leftSlide.style.animation = "left-slide 0.3s";
            setTimeout(() => {

                middleSlide.style.removeProperty('animation')
                leftSlide.style.removeProperty('animation')
                rightSlide.style.removeProperty('animation')


            }, 1000);
        }
    }

    useEffect(() => {

        const slider = () => {

            if (slides) {
                if (count < slides.length - 1) {
                    slideAnim();
                    setCount(count + 1);

                } else {
                    slideAnim();
                    setCount(0)

                }
            }
        }
        const slideShow = setInterval(slider, 2000);

        return () => {
            clearInterval(slideShow);
        }

    })

    console.log(slides);

    return (

        <Fragment>
            <div className="slides">

                {slides && slides.length > 0 ?
                    <Fragment>


                        {count === 0 ?

                            <ShowSlider item={slides[(slides.length - 1) - count]._id} url="slider" idenClass="left-slide" idenId="left-slide" />
                            :
                            <ShowSlider item={slides[count - 1]._id} url="slider" idenClass="left-slide" idenId="left-slide" />

                        }

                        <ShowSlider item={slides[count]._id} url="slider" idenClass="middle-slide" idenId="middle-slide" />


                        {count === (slides.length - 1) ?
                            <ShowSlider item={slides[0]._id} url="slider" idenClass="right-slide" idenId="right-slide" />
                            :
                            <ShowSlider item={slides[count + 1]._id} url="slider" idenClass="right-slide" idenId="right-slide" />

                        }



                    </Fragment>
                    :
                    <Fragment></Fragment>
                }



            </div>
            <div className="slide-icons">
                {slides && slides.map((s, index) => {
                    return (
                        <div key={index}>
                            { count === index ?
                                <p className="slide-btn-selected"></p>
                                :
                                <p className="slide-btn cursor-pointer" onClick={() => { slideAnim(); setCount(index); }}></p>

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





// import React, { Fragment, useEffect, useState } from 'react';
// import './homeSlider.css';
// import {sliderImages} from './../apiCore';
// import ShowSlider from './../ShowSlider';

// const HomeSLider = ()=>{
//     const [slides, setSlides] = useState([])
//     const [count, setCount] = useState(0);

//     const init = async ()=> {
//         try{
//             const slideArray = await sliderImages();
//             setSlides(slideArray);
//         }catch(err){

//         }


//     }

//     useEffect(()=>{


//         init(); 

//         let middleSlide = document.getElementById("middle-slide");
//         let leftSlide = document.getElementById("left-slide");
//         let rightSlide = document.getElementById("right-slide");
//         let slideSection = document.getElementById("slideSection");

//         if(slides.length > 0){
//             slideSection.classList.add('animationOpening');
//             slideSection.classList.remove('slideOpenStart');

//             middleSlide.style.width = '100%';
//             leftSlide.style.width = '100%';
//             rightSlide.style.width = '100%';
//         }
//         else {
//             slideSection.classList.add('slideOpenStart');
//            middleSlide.style.width = '0%';
//            leftSlide.style.width = '0%';
//            rightSlide.style.width = '0%';
//         }

//     },[slides]);

//     useEffect(()=>{
//         init(); 

//     },[]);

//     const slideAnim = ()=>{
//         let middleSlide = document.getElementById("middle-slide");
//         let leftSlide = document.getElementById("left-slide");
//         let rightSlide = document.getElementById("right-slide");
//         if(document.getElementById("middle-slide")){
//                     middleSlide.style.animation = "slide 0.3s";   
//                     rightSlide.style.animation = "right-slide 0.3s"; 
//                     leftSlide.style.animation = "left-slide 0.3s";
//                     setTimeout(() => {  

//                                 middleSlide.style.removeProperty('animation') 
//                                 leftSlide.style.removeProperty('animation') 
//                                 rightSlide.style.removeProperty('animation') 


//                     }, 1000);   
//         }
//     }

//     useEffect(()=>{

//         const slider = ()=>{


//             if(count < slides.length - 1){
//                 slideAnim();
//                 setCount(count + 1);

//             }else{
//                 slideAnim();
//                 setCount(0)

//             }

//         }
//         const slideShow = setInterval(slider, 3000);

//         return()=>{
//             clearInterval(slideShow);
//         }

//     })




//     return(

//         <Fragment>
//             <div id="slideSection">
//             <div className="slides">

//             {slides.length > 0 ? 
//             <Fragment>


//                     {count === 0 ?

//                         <ShowSlider item={slides[(slides.length-1)-count]._id} url="slider" idenClass="left-slide" idenId="left-slide" />
//                         :
//                         <ShowSlider item={slides[count-1]._id} url="slider" idenClass="left-slide" idenId="left-slide" />

//                     }

//                     <ShowSlider item={slides[count]._id} url="slider" idenClass="middle-slide" idenId="middle-slide" />


//                     { count === (slides.length - 1) ?
//                         <ShowSlider item={slides[0]._id} url="slider" idenClass="right-slide" idenId="right-slide" />
//                         :
//                         <ShowSlider item={slides[count+1]._id} url="slider" idenClass="right-slide" idenId="right-slide"/>

//                     }



//                 </Fragment>
//                 :
//                 <Fragment></Fragment>
//                 }



//             </div>
//             <div className="slide-icons">
//                 {slides.map((s, index)=>{
//                     return(
//                         <div key={index}>
//                             { count === index  ?
//                                 <p className="slide-btn-selected"></p>
//                                 :
//                                 <p className="slide-btn cursor-pointer" onClick={()=>{ slideAnim();setCount(index);}}></p>

//                             }
//                          </div>

//                     )
//                 })

//                 }
//             </div>
//             </div>
//         </Fragment>

//     )
// }

// export default HomeSLider;