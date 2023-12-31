import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message'; // Correct import statement
import { addToCart, removeFromCart } from '../actions/cartActions';

// Rest of your component code...

export default function CartScreens() {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { id } = useParams(); // Use useParams to get the parameters
  const location = useLocation(); // Use useLocation to get the search query
  const qty = new URLSearchParams(location.search).get('qty');
  //console.log('qty::',qty)

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id,qty));
    }
  }, [dispatch, id,qty]);

  //item remove handler
  const removeFromCartHandler =(id)=>{
    dispatch(removeFromCart(id))
  }
  //checkout handler
  const checkoutHandler = () => {
    // Check if the user is logged in by accessing the userInfo from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
    if (userInfo && userInfo.token) {
      // User is logged in, so navigate to the shipping page directly
      navigate('/shipping');
    } else {
      // User is not logged in, so redirect to the login page with the redirect query parameter
      navigate('/login?redirect=shipping');
    }
  };
  
  
  
  return (
    <Row>
    
    <Col md={8}><h1>SHOPPING CART</h1>
    
      {cartItems.length === 0 ?(
        <Message variant='info'>Your cart is empty <Link to='/' style={{ textDecoration: 'none', color: 'yellow'}}> Go Back</Link></Message>
      ):(
        <ListGroup variant='flush'>
          {cartItems.map(item =>
            <ListGroup.Item key={item.product}>
              <Row><Col md={2}>
                <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={3}>
                <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>{item.name}</Link>
                </Col>

                <Col md={2}>
                  €{item.price}
                </Col>
                <Col md={3}>
                <Form.Control as="select" 
                            value= {item.qty}
                            onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}>
                                {
                                    [...Array(item.countInStock).keys()].map((x)=>(
                                        <option key={x+1} value={x+1}>
                                            {x+1}
                                        </option>
                                    ))
                                }
                            </Form.Control>
                </Col>
                <Col md={1}>
                  <Button type='Button' variant='danger' onClick={()=> removeFromCartHandler(item.product)}>
                    <i className='fas fa-trash'></i>

                  </Button>
                </Col>

                
                
                </Row>
            </ListGroup.Item>
            )}

        </ListGroup>

      )}
      </Col>
      <Col md={4}>
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <h2>SUBTOTAL ({cartItems.reduce((acc,item) => acc+ item.qty, 0)}) ITEMS</h2>
                        €{cartItems.reduce((acc,item) => acc+ item.qty* item.price, 0).toFixed(2)}
                      </ListGroup.Item>
                    </ListGroup>
                    <ListGroup.Item>
                      <Button type='button' className='btn-block' disabled={cartItems.length===0}
                      onClick={checkoutHandler}>
                        Proceed To Checkout</Button>
                    </ListGroup.Item>
                  </Card>
                </Col>
    </Row>
  );
}




