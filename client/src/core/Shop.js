import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import { Container, Grid } from "@material-ui/core";

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        // <>
            // <Container>
            //     <Grid container md={12} spacing={3}>
            //         <Grid item md={4}>
            //             {/* <Card>

            //             </Card> */}
            //         </Grid>
            //         <Grid container item md={8}>
            //             {filteredResults.map((product, i) => (
            //                  <Grid key={i} md={4} item>
            //                      <Card product={product} />
            //                  </Grid>
            //              ))}
            //         </Grid>
            //     </Grid>
            // </Container>
        // </>
        <Layout
            title="Shop Page"
            description="Search and find books of your choice"
            // className="container-fluid"
        >

            <>
                <Grid container md={12} spacing={3} style={{padding: '0'}}>
                    <Grid item md={4}>
                            <div style={{backgroundColor : "#F5F5F5" , padding : '20px', borderRadius : "15px"}}>
                                <h4>Filter by categories</h4>
                                <ul>
                                    <Checkbox
                                        categories={categories}
                                        handleFilters={filters =>
                                            handleFilters(filters, "category")
                                        }
                                    />
                                </ul>

                                <h4>Filter by price range</h4>
                                <div>
                                    <RadioBox
                                        prices={prices}
                                        handleFilters={filters =>
                                            handleFilters(filters, "price")
                                        }
                                    />
                                </div>
                            </div>
                    </Grid>
                    <Grid item md={8}>
                        <Grid container item md={12} spacing={2} style={{backgroundColor : "#F5F5F5", padding : '15px', margin : '0' , borderRadius : '15px'}}> 
                            {filteredResults.map((product, i) => (
                             <Grid key={i} md={4} item>
                                 <Card product={product} />
                             </Grid>
                         ))}
                        </Grid>
                    </Grid>
                </Grid>
            </>
            {/* <div className="row">
                <div className="col-md-4">
                    <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox
                            categories={categories}
                            handleFilters={filters =>
                                handleFilters(filters, "category")
                            }
                        />
                    </ul>

                    <h4>Filter by price range</h4>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            }
                        />
                    </div>
                </div>

                <div className="col-md-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <div key={i} className="col-md-4 mb-3">
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div> */}
        </Layout>
    );
};

export default Shop;
