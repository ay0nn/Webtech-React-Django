import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import '../Product.css'

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {  loading, products } = productList;

  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    dispatch(listProducts(keyword, page, 'createdAt_desc')); // Sort by creation date in descending order
  }, [dispatch, keyword, page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset page when performing a new search
    dispatch(listProducts(keyword, 1));
  };

  return (
    <div className="container">
      <h1 className="main-heading">Latest Products</h1>
      <form className="search-container" onSubmit={handleSearch}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search by title..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="product-list">
        {products && products.length > 0 ? (
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      {products && products.length > 0 && !loading && (
        <button onClick={loadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
}

export default HomeScreen;
