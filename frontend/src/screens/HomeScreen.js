
import{Row, Col, Form} from 'react-bootstrap'
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useEffect, useState } from 'react';
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'

import { listProducts } from '../actions/productActions'


function HomeScreen(){

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(()=> {
      dispatch(listProducts())
    
    }, []) 
     // Filter the product list based on the search query
  const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);

    return (
        <div>
          <h1>
            Latest Products..
          </h1>
       <Form.Group controlId='search' className='search-container'>
  <i className='search-icon fas fa-search'></i>
  <Form.Control
    type='text'
    placeholder='Search Products...'
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className='search-input'
  />
</Form.Group>

          {
            loading ? <Loader/>
              : error ? <Message variant='danger'>{error}</Message>
              :
              
              <Row>
              {filteredProducts.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          }
          
        </div>
      )
    }
    
    export default HomeScreen