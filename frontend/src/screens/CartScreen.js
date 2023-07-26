import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'; // Update imports
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { Message } from '../components/Message';
import { addToCart } from '../actions/cartActions';

export default function CartScreens() {
  const dispatch = useDispatch();
  const { id } = useParams(); // Use useParams to get the parameters
  const location = useLocation(); // Use useLocation to get the search query
  const qty = new URLSearchParams(location.search).get('qty');
  console.log('qty::',qty)

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id,qty));
    }
  }, [dispatch, id,qty]);
  
  
  return (
    <div>
      Cart
    </div>
  );
}




