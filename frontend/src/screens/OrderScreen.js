import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails , payOrder, deliverOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';

const OrderScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading} = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {loading:loadingPay, success:successPay} = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {loading:loadingD, success:successD} = orderDeliver;

  const userLogin = useSelector(state=> state.userLogin)
  const {userInfo} = userLogin

  if (!loading && !error){
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  }
//AaVLZAc0JKC0yvmS7u9prrVy87_dC7KRIjAzQsEfPeM2r73t7ojpzYGVpwImXatMNvbiW7yr2RBPyWIo
  useEffect(() => {
    if(!userInfo){
      navigate('/login')
    }
    if(!order || successPay|| order._id !== Number(id) || successD){
      dispatch({type: ORDER_PAY_RESET})
      dispatch({type: ORDER_DELIVER_RESET})
      dispatch(getOrderDetails(id))

    }
    else if(!order.isPaid){
      if(!window.paypal){
        addPaypalScript()
      }
      else{
        setSdkReady(true)
      }

    }
}, [order, dispatch, id, successPay, successD, navigate, userInfo]);

const deliverHandler = () =>{
  dispatch(deliverOrder(order))

}

const addPaypalScript = () =>{
  const script= document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://www.paypal.com/sdk/js?client-id=AaVLZAc0JKC0yvmS7u9prrVy87_dC7KRIjAzQsEfPeM2r73t7ojpzYGVpwImXatMNvbiW7yr2RBPyWIo'
  script.async = true
  script.onload =() =>
  {
    setSdkReady(true)
  }
  document.body.appendChild(script)
}

const successPaymentHandler = (paymentResult) => {
  dispatch(payOrder(id, paymentResult)).then(() => {
    // After successful payment, refresh the page
    window.location.reload();
  });
}

  
  return loading ? (
    <Loader/>
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) :
  (
    <div>
    <h1>Order : {order._id}</h1>
    <Row>
      <Col md={8}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p><strong>Name:</strong>{order.user.name}</p>
            <p>
  <strong>Email:</strong>{' '}
  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
</p> <p>
              <strong>Address:</strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>

            {order.isDelivered ? (
              <Message variant='success'>Order Delivered {order.deliverAt}</Message>
            ):(
              <Message variant='warning'>Not Delivered yet</Message>
            )}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>
              <strong>Method:</strong> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant='success'>Paid on {order.paidAt}</Message>
            ):(
              <Message variant='warning'>Not Paid yet</Message>
            )}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <ListGroup variant='flush'>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x €{item.price} = €{(item.qty * item.price)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>€{order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>€{order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>€{order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>€{order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {!order.isPaid && (
            <ListGroup.Item> {loadingPay && <Loader/>}
            {!sdkReady ? (
              <Loader/>
            ): (
              <PayPalButton
              amount = {order.totalPrice}
              onSuccess = {successPaymentHandler}/>
            ) }

            </ListGroup.Item>
            )}

          </ListGroup>
          {loadingD && <Loader/>}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered &&
          (
            <ListGroup.Item>
              <Button type='button' className='btn btn-block'
              onClick={deliverHandler}
              >Mark as Deliver</Button>
            </ListGroup.Item>
          )}
        </Card>
      </Col>
    </Row>
    </div>
  );
};

export default OrderScreen;
