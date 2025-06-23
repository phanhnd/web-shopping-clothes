import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5; 

  //Lay chi so dau va cuoi cua san pham trong trang hien tai
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; 
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  //Tong so trang 
  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) =>{
    setCurrentPage(pageNumber);
  }

  const fetchInfo = async () => {
    try {
      const res = await fetch('http://localhost:5000/products/allproducts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!res.ok) {
        console.error("Status:", res.status)
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const remove_product = async (id) => {
    try {
      await fetch('http://localhost:5000/products/removeproduct', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
      fetchInfo(); // Cập nhật danh sách sản phẩm sau khi xóa
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []); // Chỉ gọi một lần khi component được mount


  useEffect(() => {
    if(search.trim() === "") return; 

    fetch(`http://localhost:5000/products/search?term=${search}`, {
      headers: {
         'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((err) => console.error("Search error:", err));
  }, [search]);

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="listproduct-search" />
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Quantity</p>
        <p>Remove</p>
        <p>Revenue</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {currentProducts.map((product, index) => (
          <div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} className="listproduct-product-icon" alt={product.name} />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <p>{product.amount}</p>
            <img
              onClick={() => remove_product(product._id)} 
              className="listproduct-remove-icon"
              src={cross_icon}
              alt="Remove"
            />
            <p>{/*revenue value here */}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? "active-page" : ""}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
