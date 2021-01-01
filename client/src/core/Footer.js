import React from 'react'
import { Link } from 'react-router-dom'

const Footer = ()=>{
    return (
        <div id="footer">
            <div>
                <p>Selften 2020 All right reserved</p>
                <img src="/images/ssl-payment-banner.webp" width="300" />
                <p>Payment Verified by SSL commerce</p>
            </div>

            <div>
                <Link exact to="/terms-condition">Terms and Condition</Link>
                <Link exact to="/privacy-policy">Privacy Policy</Link>
                <Link exact to="/shipment-info">Shipment info</Link>
                <Link exact to="/refund-return-policy">Refund and Return Policy</Link>
                <Link exact to="/about-us">About Us</Link>

            </div>
            
            
        </div>
    )
}

export default Footer;