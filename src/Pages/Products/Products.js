import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      existingProduct.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart ✅");
  };

  return (
    <div className="products-container">
      <h2 className="products-title">VR Products</h2>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-img"
            />

            <h4 className="product-name">{product.name}</h4>
            <p className="product-price">${product.price}</p>

            <button
              className="product-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
