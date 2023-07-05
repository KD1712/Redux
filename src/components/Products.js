import React from "react";
import { useEffect } from "react";

import { add } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES, fetchProducts } from "../store/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { data:products, status } = useSelector((state) => state.product);
  // const [products, setProducts] = useState([]);
  
  useEffect(() => {
    dispatch(fetchProducts());
    // const fetchProducts = async () => {
    //   const rest = await fetch("https://fakestoreapi.com/products");
    //   const data = await rest.json();
    //   console.log(data);
    //   setProducts(data);
    // };
    // fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleAdd = (product) => {
    dispatch(add(product));
  };
  if(status===STATUSES.LOADING){
    return <h2>Loading...</h2>
  }
  if(status===STATUSES.ERROR){
    return <h2>ERROR! :(</h2>
  }
  return (
    <div className="productsWrapper">
      {products.map((product) => (
        <div className="card" key={product.id}>
          <img src={product.image} alt="productimg" />
          <h4>{product.title}</h4>
          <h5>{product.price}</h5>
          <button onClick={() => handleAdd(product)} className="btn">
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
