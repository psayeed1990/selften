import React from "react";
import { API } from "../config";

const ShowSlider = ({ item, url, idenClass }) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/photo/${item}`}
            alt={item.name}
            className={`mb-3 ${idenClass}`}
            style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
    </div>
);

export default ShowSlider;
