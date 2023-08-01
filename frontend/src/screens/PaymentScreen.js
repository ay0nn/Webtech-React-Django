import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Checkout from '../components/Checkout';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = () => {
  const dispatch = useDispatch()
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart
  if (!shippingAddress.address){
    navigate('/shipping')
  }

  const submitHandler = (e) => {
    e.preventDefault();
    // Save the selected payment method to the backend or Redux store (if needed)
    // For demonstration purposes, we'll just log the selected method to the console
    dispatch(savePaymentMethod(paymentMethod))
    // Navigate to the next screen (e.g., Place Order screen)
    navigate('/placeorder');
  };

  return (
    <FormContainer>
        <Checkout step1 step2 step3/>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Payment Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/* Add more payment methods as needed */}
            {/* For example:
            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              checked={paymentMethod === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
