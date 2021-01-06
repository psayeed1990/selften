import { API } from "../config";
import queryString from "query-string";


//send messages
export const sendMessage = (token, userId, receiverId, pairId, message) => {
        return fetch(`${API}/user/${userId}/message/${receiverId}/pair/${pairId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: message
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

// read chats for eavh pair
export const messageByPairId = (userId, token, pairId) => {
        return fetch(`${API}/user/${userId}/message-pair/${pairId}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

//show messages list of pair to user
export const getMessage = (userId, token) => {
        return fetch(`${API}/user/messages/${userId}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

//creating topup order
export const createTopupOrder = (userId, token, order, id, withSSLCommerz)=>{

    return fetch(`${API}/topup-orders/${userId}/topup/${id}/${withSSLCommerz}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: order
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

//get wallet
export const getWallet = async (id, token) => {
    try{
        const response = await fetch(`${API}/wallet/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        return response.json();
    }catch(err){console.log(err)};
};

//get topup thumbs
export const getTopupThumbs = async () => {
    try{
        const response = await fetch(`${API}/topup-thumbs`, {
            method: "GET"
        });
            
        return response.json();
    }
    catch(err){console.log(err)};
};

//get Recharge Packages for admin
export const getRechargePackages = () => {
    return fetch(`${API}/recharge-package`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//get recharge packages by game id
export const getRechargePackagesByGameName = (game) => {
    return fetch(`${API}/recharge-package/get-by-game/${game}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getProducts = async (sortBy) => {
    try{
        const response = await fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
            method: "GET"
        });
        return response.json();
    }catch(err ) {console.log(err)};
};

export const getCategories = async () => {
    try{
        const response = await fetch(`${API}/categories`, {
                method: "GET"
            })
        return response.json();
    }catch(err){ console.log(err)};
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    };
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const list = params => {
    const query = queryString.stringify(params);
    console.log("query", query);
    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const read = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = productId => {
    return fetch(`${API}/products/related/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createOrderData })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//search by item for both product and topup
export const getItemsBySearch= async(searchText)=>{
    try{
        const response = await fetch(`${API}/search/${searchText}/`, {
            
            method: 'GET',
            
        });

        return response.json();
    }catch(err){
        console.log(err)
    }

    

}

//slider images
export const sliderImages = async()=>{
    try{
        const response = await fetch(`${API}/slider/`, {
            
            method: 'GET',
            
        });

        return response.json();
    }catch(err){
        console.log(err)
    }

}
