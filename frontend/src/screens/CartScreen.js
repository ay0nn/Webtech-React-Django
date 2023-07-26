import React, { useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import Message from '../components/Message'; // Correct import statement
import { addToCart } from '../actions/cartActions';

// Rest of your component code...

export default function CartScreens() {
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
  
  
  return (
    <Row>
      <Col md={8}><h1>SHOPPING CART</h1></Col>
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

                <Col md={3}>
                  €{item.price}
                </Col>
                
                </Row>
            </ListGroup.Item>
            )}

        </ListGroup>

      )}
      
      <Col md={4}></Col>
    </Row>
  );
}




