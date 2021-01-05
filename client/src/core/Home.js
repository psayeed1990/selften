import React, { useState, useEffect, Fragment } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import {getCategories} from './apiCore';
import ShowTopups from '../admin/topup/ShowTopups';
import HomeSLider from './slider/HomeSlider';
import { Link } from 'react-router-dom';
import ShowThumb from './ShowThumb';

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadCategories = async () => {
        try{
            const cats = await getCategories();
            setCategories(cats);
        }catch{
            
        }
        
    };

    useEffect(() => {
        loadCategories();
    }, []);

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

            <h6 className="heading">Top categories</h6>
            {
                categories.length > 0 ?
                <div className="showCategories row">
                    {categories.map(category=>{
                        return(
                        <div className="col-md-2 home-categories">
                            <Link exact path={`/categories/${category._id}`}>
                                <ShowThumb item={category} url="categories" />
                                <h6>{category.name}</h6>
                                
                            </Link>
                        </div>
                        )
                    })}
                </div>

                :
                <Fragment></Fragment>
                
            }
           
            <ShowTopups />
            
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
