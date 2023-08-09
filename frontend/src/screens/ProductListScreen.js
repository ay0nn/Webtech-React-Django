import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts, createProduct, deleteProduct } from '../actions/productActions';
import { PRODUCT_ADD_RESET } from '../constants/productConstants';

function ProductListScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector(state => state.productCreate);
  const { loading: loadingA, error: errorA, success: successA, product: productA } = productCreate;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: loadingD, error: errorD } = productDelete;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_ADD_RESET });

    if (!userInfo.isAdmin) {
      navigate('/login');
    }

    if (successA) {
      navigate(`/admin/product/${productA._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, navigate, userInfo, successA, productA]);

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  const addProductHandler = () => {
    dispatch(createProduct());
  };

  const loadMoreProducts = () => {
    const nextPage = currentPage + 1;
    dispatch(listProducts(null, nextPage));
    setCurrentPage(nextPage);
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={addProductHandler}>
            Add Product <i className="fas fa-plus"></i>
          </Button>
        </Col>
      </Row>
      {loadingD || loadingA ? (
        <Loader />
      ) : (
        <>
          {errorD && <Message variant="danger">{errorD}</Message>}
          {errorA && <Message variant="danger">{errorA}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>€ {product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit" style={{ color: 'black' }}></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="text-center">
                <Button
                  variant="primary"
                  onClick={loadMoreProducts}
                  disabled={loading}
                >
                  Load More
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ProductListScreen;
