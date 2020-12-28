import React, { useState } from 'react';
import './homeSlider.css';

const HomeSLider = ()=>{
    const [slides, setSlides] = useState([])
    const [slider, setSlider] = useState({
        sliderMiddle: '',
        sliderLeft: '',
        sliderRight: '',
    });

    const {sliderMiddle, sliderLeft, sliderRight} = slider;



    return(

        <div id="slider" class="slider">
            <div class="wrapper">
                <div id="slides" class="slides">
                <span class="slide">Slide 1</span>
                <span class="slide">Slide 2</span>
                <span class="slide">Slide 3</span>
                <span class="slide">Slide 4</span>
                <span class="slide">Slide 5</span>
                </div>
            </div>
            <a id="prev" class="control prev"></a>
            <a id="next" class="control next"></a>
        </div>
        
    )
}

export default HomeSLider;