import React from "react";
import { API } from "../config";
import logo from '../images/logo/pubg.jpg'

const ShowImage = ({ item, url , height}) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/photo/${item._id}`}
            // src={logo}
            alt={item.name}
            // className="mb-3"
            style={{ maxHeight: "100%", maxWidth: "100%" , width: '100%' , height : height}}
        />
    </div>
);

export default ShowImage;
