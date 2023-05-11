import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getProduct } from "../../redux/features/product/productSlice";
import { useNavigate } from 'react-router-dom'


import DOMPurify from "dompurify";
import Navbar from "../Navbar";


const ProductDetail = () => {
  const navigate = useNavigate();
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  // const stockStatus = (quantity) => {
  //   if (quantity > 0) {
  //     return <span className="--color-success">In Stock</span>;
  //   }
  //   return <span className="--color-danger">Out Of Stock</span>;
  // };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <Navbar />
      <div  className="card-body2">
      
      <div >
        
        {product && (
          <div  className="card-body1">
          <h3 className="mt">Merit(පින්කම) Detail</h3>
            <div className="group">
              {product?.image ? (
                <img
                  src={product.image.filePath}
                  alt={product.image.fileName}
                />
              ) : (
                <p>No image set for this product</p>
              )}
            </div>
            {/* <h4>Product Availability: {stockStatus(product.quantity)}</h4> */}
            <hr />
            <h4>
              <span className="badge">Name Merit(පින්කම): </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; Date Merit(පින්කම): </b> {product.date}
            </p>
            {/* <p>
              <b>&rarr; Category : </b> {product.category}
            </p> */}
            {/* <p>
              <b>&rarr; Price : </b> {"$"}
              {product.price}
            </p> */}
            {/* <p>
              <b>&rarr; Quantity in stock : </b> {product.quantity}
            </p> */}
            {/* <p>
              <b>&rarr; Total Value in stock : </b> {"$"}
              {product.price * product.quantity}
            </p> */}
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr />
            <code className="color-dark">
              Created on: {product.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="color-dark">
              Last Updated: {product.updatedAt.toLocaleString("en-US")}
            </code>
            <div><button className="bu" onClick={()=>navigate('/pr')}> home</button></div>

          </div>
          
        )}
      </div>
      </div>
    </div>
  );
};

export default ProductDetail;
