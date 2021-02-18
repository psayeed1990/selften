import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import SliceText from '../utils/SliceText';
import RatingCount from '../utils/RatingCount';




const Cards = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {

  console.log(product);


  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} style={{marginRight : '12px' , fontSize : '9px'}}>
          <Button variant="contained" color='primary' size='small' style={{ borderRadius : '10px'}} >
              View Product
          </Button>

          {/* <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
          View Product
          </button> */}

        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
          <Button 
            onClick={addToCart} 
            variant="contained" 
            color='primary' 
            style={{backgroundColor : '#E14A73' , borderRadius : '10px' , fontSize : '9px'}}
            size='small'
          >
               Add to cart
          </Button>
        // <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
        //   Add to cart
        // </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <Button 
            variant="contained" 
            color='primary'
            onClick={() => {
              removeItem(product._id);
              setRun(!run); 
            }}
            style={{borderRadius : '10px'}}
        >
              Remove Product
        </Button>

        // <button
        //   onClick={() => {
        //     removeItem(product._id);
        //     setRun(!run); // run useEffect in parent Cart
        //   }}
        //   className="btn btn-outline-danger mt-2 mb-2"
        // >
        //   Remove Product
        // </button>
      )
    );
  };


  return (
      <>
        <Card style={{borderRadius : '15px'}}>
                  <div style={{position:'relative', overflow:'inherit'}}>
                    <ShowImage 
                      item={product} 
                      url="product" 
                      height = '150px'
                    />
                  </div>
                  <CardContent style={{padding : '10px 20px', marginTop : '5px'}}>
                        <Typography 
                          variant="h6"  
                          color="textSecondary" 
                          style={{fontWeight : '600' , fontSize : '14px'}}

                        >
                          <SliceText number={25}>
                              {product.name}
                          </SliceText>
                        </Typography>
                        <div style={{display : 'flex' , }}>
                            <Typography 
                              variant="body1" 
                              component="p" 
                              style={{fontWeight : '500' , marginRight : '10px' , fontSize : '13px'}}
                            >
                              ৳ 1200
                            </Typography>
                            <Typography 
                              variant="body1" 
                              component="p" 
                              style={{fontWeight : '500', color : '#C94A77', fontSize : '13px'}}
                            >
                              ৳ {product.price}
                            </Typography>
                        </div>
                        <Typography variant="body1" component="p" style={{display : 'flex'}}>
                          <RatingCount value={2}/>
                          <span style={{marginLeft : '6px', fontSize : '13px'}}> 2 Reviews </span>
                        </Typography>
                  </CardContent>

              <div style={{border: '8px solid #fff' , width:'80px' , height :'80px' , borderRadius :"50%",overflow: 'hidden', position:'absolute', top : '-15px', left :'-15px'}}>
                  <div style={{width:'100%', height : '100%' , backgroundColor:'#c94a77', display: 'flex' , flexDirection : 'column' , justifyContent : 'center' , alignItems : 'center', color: '#FFF'}}>
                      <Typography variant='body1' style={{fontWeight :'700'}}>
                          %50
                      </Typography>
                      <Typography variant='body1' style={{fontWeight :'700'}}>
                          OFF
                      </Typography>
                  </div>
              </div>
            {/* <CardContent>
              <ShowImage item={product} url="product" />

              <Typography variant="h6"  color="textSecondary" style={{fontWeight : '600'}}>
                  {product.name}
              </Typography>

              <Typography variant="subtitle2" style={{margin : '10px 0'}}>
                  {product.description.substring(0, 100)}
              </Typography>

              <Typography variant="body1" component="p" style={{fontWeight : '500'}}>
                ৳ {product.price}
              </Typography>

              <Typography variant="body1" component="p">
                <span style={{fontWeight : '600', marginRight : '6px'}}>
                  Category: 
                </span>
                {product.category && product.category.name}
              </Typography>
              <Typography variant="body1" component="p">
              <span style={{fontWeight : '600', marginRight : '6px'}}>
                  Added on 
              </span>
                  {moment(product.createdAt).fromNow()}
              </Typography>

              <Typography variant="body1" component="p">
                  {showStock(product.quantity)}
              </Typography>
            </CardContent> */}
            
            {/* <div style={{display:"flex" , justifyContent:'flex-start' , padding :'15px 20px'}}> */}
            <div style={{display:"flex" , justifyContent:'flex-start' , padding :'15px 10px'}}>
              {showViewButton(showViewProductButton)}

              {showAddToCartBtn(showAddToCartButton)}

              {showRemoveButton(showRemoveProductButton)}

              {showCartUpdateOptions(cartUpdate)}
            </div>

            
          
        </Card>
      </>

    // <div className="card ">
    //   <div className="card-header card-header-1 ">{product.name}</div>
    //   <div className="card-body">
    //     {shouldRedirect(redirect)}
    //     <ShowImage item={product} url="product" />
    //     <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
    //     <p className="card-p black-10">৳ {product.price}</p>
    //     <p className="black-9">Category: {product.category && product.category.name}</p>
    //     <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
    //     {showStock(product.quantity)}
    //     <br />

    //     {showViewButton(showViewProductButton)}

    //     {showAddToCartBtn(showAddToCartButton)}

    //     {showRemoveButton(showRemoveProductButton)}

    //     {showCartUpdateOptions(cartUpdate)}
    //   </div>
    // </div>
  );
};

export default Cards;
