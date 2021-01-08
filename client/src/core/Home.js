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

    const init = async () => {
        try{
            const cats = await getCategories();
            const datas = await getProducts('sold');
            const data = await getProducts('createdAt');

            setCategories(cats);
            setProductsBySell(datas);
            setProductsByArrival(data);

        }catch{
            setError('Error');
        }
        
    };

    useEffect(() => {
        init();
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
                    {categories.map((category)=>{
                        return(
                        <div className="col-md-1 home-categories" key={category._id}>
                            <Link exact to={`/categories/${category._id}`}>
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
                    <div key={i} className="col-md-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-md-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;
