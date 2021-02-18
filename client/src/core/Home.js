import React, { useState, useEffect, Fragment } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import { getCategories } from './apiCore';
import ShowTopups from '../admin/topup/ShowTopups';
import HomeSLider from './slider/HomeSlider';
import { Link } from 'react-router-dom';
import ShowThumb from './ShowThumb';
import PopularCategory from '../common/PopularCategory';
import CategorySkeleton from '../common/CategorySkeleton';
import HomeAppliance from '../common/HomeAppliance';

import './home.css';
import { Button, Typography } from '@material-ui/core';
import SkeletonPost from '../utils/skeletonPost/SkeletonPost';
import DigitalGoods from './DigitalGoods';
import VisitShop from './VisitShop';


const Home = () => {
    const [categories, setCategories] = useState([]);
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const init = async () => {
        try {
            const cats = await getCategories();
            const datas = await getProducts('sold');
            const data = await getProducts('createdAt');

            setCategories(cats);
            setProductsBySell(datas);
            setProductsByArrival(data);

        } catch {
            setError('Error');
        }

    };

    useEffect(() => {
        init();
    }, []);

    const skeletonPosts = (
        <>
            <div className="col-md-4 mb-3">
                <SkeletonPost />
            </div>
            <div className="col-md-4 mb-3">
                <SkeletonPost />
            </div>
            <div className="col-md-4 mb-3">
                <SkeletonPost />
            </div>
        </>
    )




    return (
        <Layout
            title="Selften ecommerce"
            description="Buy gaming products"
            className="container-fluid"
        >

            <HomeSLider />
            <div >
              
                <div style={{ margin: '0 auto', textAlign: 'center', backgroundColor: "#F4F5F7", padding: "40px 15px" }}>
                    <Typography variant="h5"style={{marginBottom: "10px"}} >Top Categories</Typography>

                    {
                        categories.length > 0 ?
                            <>
                                <PopularCategory height={160} item={categories} />
                                <Button style={{ marginTop: "20px" }} variant="outlined" color="primary">View All Popular Category</Button>
                            </>
                            :
                            <Fragment>
                                    <CategorySkeleton height={160} item = {[1,2,3,4,5]} />
                            </Fragment>
                    }
                </div>

                <div style={{ textAlign: 'center',  padding: "40px 35px" }}>
                    <Typography variant="h5" style={{textAlign: 'left'}} >New Games</Typography>
                    <ShowTopups />
                </div>

                <div style={{backgroundColor: "#F4F5F7", padding: "40px 35px" }}>
                    <HomeAppliance   />
                </div>

               


                {/* <h2 className="mb-4">New Arrivals</h2> */}
                <div style={{ textAlign: 'center', marginBottom: "40px" }}>
                    <Typography variant="h5" style={{ marginTop: '40px', marginBottom: "10px", textAlign: 'left' }}>Products By Arrival</Typography>
                    <div className="row" style={{ display: "flex", justifyContent: 'center' }}>

                        {productsByArrival.length > 0 ? productsBySell.map((product, i) => (
                            <div key={i} className="col-md-4 mb-3">
                                <Card product={product} />
                            </div>
                        )) : 
                            skeletonPosts
                        }
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginBottom: "20px" }}>
                    <Typography variant="h5" style={{ marginTop: '40px', marginBottom: "10px" }}>Products By Sell</Typography>
                    {/* <h2 className="mb-4">Best Sellers</h2> */}
                    <div className="row" style={{ display: "flex", justifyContent: 'center' }}>
                        {productsBySell.length > 0 ? productsBySell.map((product, i) => (
                            <div key={i} className="col-md-4 mb-3">
                                <Card product={product} />
                            </div>
                        )) : skeletonPosts}
                    </div>
                </div>

                <div style={{  marginBottom: "20px" }}>
                    <DigitalGoods />
                </div>

                {/* <div style={{  marginBottom: "20px" }}>
                    <VisitShop />
                </div> */}
                
            </div>
        </Layout>
    );
};

export default Home;
















// import React, { useState, useEffect, Fragment } from 'react';
// import Layout from './Layout';
// import { getProducts } from './apiCore';
// import Card from './Card';
// import { getCategories } from './apiCore';
// import ShowTopups from '../admin/topup/ShowTopups';
// import HomeSLider from './slider/HomeSlider';
// import { Link } from 'react-router-dom';
// import ShowThumb from './ShowThumb';
// import PopularCategory from '../common/PopularCategory';
// import CategorySkeleton from '../common/CategorySkeleton';

// import './home.css';
// import { Button, Typography } from '@material-ui/core';
// import SkeletonPost from '../utils/skeletonPost/SkeletonPost';


// const Home = () => {
//     const [categories, setCategories] = useState([]);
//     const [productsBySell, setProductsBySell] = useState([]);
//     const [productsByArrival, setProductsByArrival] = useState([]);
//     const [error, setError] = useState(false);

//     const init = async () => {
//         try {
//             const cats = await getCategories();
//             const datas = await getProducts('sold');
//             const data = await getProducts('createdAt');

//             setCategories(cats);
//             setProductsBySell(datas);
//             setProductsByArrival(data);

//         } catch {
//             setError('Error');
//         }

//     };

//     useEffect(() => {
//         init();
//     }, []);

//     const skeletonPosts = (
//         <>
//             <div className="col-md-4 mb-3">
//                 <SkeletonPost />
//             </div>
//             <div className="col-md-4 mb-3">
//                 <SkeletonPost />
//             </div>
//             <div className="col-md-4 mb-3">
//                 <SkeletonPost />
//             </div>
//         </>
//     )




//     return (
//         <Layout
//             title="Selften ecommerce"
//             description="Buy gaming products"
//             className="container-fluid"
//         >

//             <HomeSLider />
//             <div className="wrapper">
//                 {/* <div className="row">
//                             <div className="col-md-6 col-6">
//                             <h5 className="site-name-footer">Popular Category</h5>

//                             </div>
//                             <div  className="col-md-6 col-6">
                                
//                                 <div className="row view-all"><Link exact to="/topups">View All Categories</Link></div>
                            
                                
//                             </div>
                    
//             </div> */}
//                 <div className="row center-flex" style={{ margin: '0 auto' }}>

//                     <Typography variant="h5" style={{ marginTop: '40px' }}>Popular Category</Typography>

//                     {
//                         categories.length > 0 ?
//                             <>
//                                 <PopularCategory height={160} item={categories} />
//                                 <Button style={{ marginTop: "15px" }} variant="outlined" color="primary">View All Popular Category</Button>
//                             </>
//                             :
//                             <Fragment>
//                                     <CategorySkeleton height={160} item = {[1,2,3,4,5]} />
//                             </Fragment>

//                     }


//                 </div>
//                 <div style={{ textAlign: 'center', marginBottom: "40px" }}>
//                     <Typography variant="h5" style={{ marginTop: '40px' }}>Top Category</Typography>
//                     <ShowTopups />
//                     <Button style={{ marginTop: "15px" }} variant="outlined" color="primary">View All Top Category</Button>
//                 </div>



//                 {/* <h2 className="mb-4">New Arrivals</h2> */}
//                 <div style={{ textAlign: 'center', marginBottom: "40px" }}>
//                     <Typography variant="h5" style={{ marginTop: '40px', marginBottom: "10px" }}>Products By Arrival</Typography>
//                     <div className="row" style={{ display: "flex", justifyContent: 'center' }}>

//                         {productsByArrival.length > 0 ? productsBySell.map((product, i) => (
//                             <div key={i} className="col-md-4 mb-3">
//                                 <Card product={product} />
//                             </div>
//                         )) : 
//                             skeletonPosts
//                         }
//                     </div>
//                 </div>

//                 <div style={{ textAlign: 'center', marginBottom: "40px" }}>
//                     <Typography variant="h5" style={{ marginTop: '40px', marginBottom: "10px" }}>Products By Sell</Typography>
//                     {/* <h2 className="mb-4">Best Sellers</h2> */}
//                     <div className="row" style={{ display: "flex", justifyContent: 'center' }}>
//                         {productsBySell.length > 0 ? productsBySell.map((product, i) => (
//                             <div key={i} className="col-md-4 mb-3">
//                                 <Card product={product} />
//                             </div>
//                         )) : skeletonPosts}
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default Home;
