import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import ShowTopups from '../admin/topup/ShowTopups';
import HomeSLider from './slider/HomeSlider';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = async () => {
        try{
            const data = await getProducts('sold');
            if(data.error){
                return setError(data.error);
            }
        
            setProductsBySell(data);
        }
        
        catch(err){
            
        }
            
        
    };

    const loadProductsByArrival = async () => {

        try{
            const data = await getProducts('createdAt');
            if(data.error){
                return setError(data.error);
            }
        
            setProductsByArrival(data);
        }
        
        catch(err){
            
        }
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title="Selften ecommerce"
            description="Buy gaming products"
            className="container-fluid"
        >

        <HomeSLider />
           
            <ShowTopups />
            
             <Search />
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;
