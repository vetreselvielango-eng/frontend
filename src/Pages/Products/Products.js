import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";

function Products() {                        //main function for the Products page                                                   
  const [products, setProducts] = useState([]);                     //create a box called products to hold the list of products, start with an empty list

  useEffect(() => {                                               //when this page first opens, run the code inside here.
    axios                                                       
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/products`)  //make a GET request to this address to get the list of products
      .then((res) => setProducts(res.data))                       //when the response comes back, put the data (the list of products from Mongo DB) into the products box
      .catch((err) => console.log(err));                       //if there is an error, log it to the console
  }, []); //the empty box [] means run this only once when the page opens

  const addToCart = (product) => {                       //function to add a product to the cart                         
    let cart = JSON.parse(localStorage.getItem("cart")) || [];  //get the cart from local storage, or create an empty array if it doesn't exist

    const existingProduct = cart.find(                                                                                                                                     
      (item) => item._id === product._id                //check if the product is already in the cart 
    );

    if (existingProduct) {                             //if it is, increase the quantity by 1       
      existingProduct.qty += 1;                                                                  
    } else {                                                                              //if it isn't, add it to the cart with a quantity of 1                  
      cart.push({ ...product, qty: 1 });                                                                    
    }

    localStorage.setItem("cart", JSON.stringify(cart));               //save the updated cart back to local storage
    alert("Added to Cart ✅");                          //show an alert to the user     
  };

  return (
    <div className="products-container">                                          
      <h2 className="products-title">VR Products</h2>                                         

      <div className="products-grid">
        {products.map((product) => (                  //for each product in the Mongo DB products list, create a product card                                        
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
