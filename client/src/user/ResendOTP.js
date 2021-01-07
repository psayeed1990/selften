import React, { useState, useEffect } from 'react';
import { resendOTPCode } from '../auth';
import './resendOTP.css';

const ResendOTP = ({phone})=>{
    const [error, setError] = useState('');
    const [counter, setCounter] = useState(0);

    const resendOTP = async ()=> {


        const code = await resendOTPCode(phone);
        if(code.error){
            return setError(code.error);
        }else{
            setCounter(0);
            return setError(`A new OTP code sent to your phone`);
        }


    }

    useEffect(()=>{
      const clock = ()=>{  
            if(counter === 120){
                clearInterval(iv);
            }else{
                setCounter(counter + 1);
            }
        }
        const iv = setInterval(clock, 1000);
        return () => {
            clearInterval(iv)
        }
    })
    

    return(
        <div className="row">
            <h2 className="pl-5">{counter}</h2>
            <p>{error}</p>
            {
                counter === 120?
                    <p className="otp-resend-btn cursor-pointer pl-5" onClick={resendOTP}>Didn't receive? Resend code</p>
                :
                <p className="down-color pl-5">If you don't receive OTP in 2 minutes, please resend</p>
            }
        </div>
    )
}

export default ResendOTP;