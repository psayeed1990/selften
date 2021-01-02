
import { API } from '../config';

//create slider 
export const createSlider = async (userId, token, slider) => {
    try{
        const response =  await fetch(`${API}/slider/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: slider
        })
    
        return response.json();
    }catch(err) {
        console.log(err);
    };
};

// add coupons
export const addCoupon = (userId, token, coupon) => {
    return fetch(`${API}/coupon/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: coupon
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

// show coupons
export const showCoupon = (userId, token, coupon) => {
    return fetch(`${API}/coupon/`, {
        method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

//assign topup order to admin
export const assignTopupOrder = (user, token, adminId, topupOrderId)=>{
        return fetch(`${API}/topup-orders/assigning/${adminId}/${user._id}/${topupOrderId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

//get all admins to assign order
export const getAllAdmins = (user, token) => {
    return fetch(`${API}/user/admins/${user._id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};


// show balance
export const showBalance = ()=> {

    return fetch(`${API}/admin/balance`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

//add balance
export const addBalance = (userId, token, balance) => {
    return fetch(`${API}/admin/balance/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(balance)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}; 
export const addDiamondValue = (userId, token, diamondValue) => {
    return fetch(`${API}/admin/add-diamonds/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(diamondValue)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}; 

//update topup orders
export const updateTopupOrderAdmin = (topupOrderId, userId, token, sentStatus) => {
    console.log(sentStatus);
    return fetch(`${API}/topup-orders/update/${topupOrderId}/${userId}/${sentStatus.status}/${sentStatus.customerId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: sentStatus,
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//get all topup orders
export const getTopupOrdersAdmin = (userId, token) => {
    return fetch(`${API}/topup-orders/admin/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: {}
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//get assigned topup orders for admin
export const getAssignedTopupOrdersAdmin = (userId, token) => {
    return fetch(`${API}/topup-orders/assigned/admin/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: {}
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//create recharge packages
export const createRechargePackage = (userId, token, rechargePackage)=>{
    return fetch(`${API}/recharge-package/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: rechargePackage
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

export const createTopupThumb = (userId, token, topup) => {
    return fetch(`${API}/topup-thumbs/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: topup
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'PUT',
        headers: {
            // content type?
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const getCategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, orderId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

/**
 * to perform crud on product
 * get all products
 * get a single product
 * update single product
 * delete single product
 */

export const getProducts = () => {
    return fetch(`${API}/products?limit=undefined`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
