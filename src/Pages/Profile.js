
import Navbar from '../compontens/Navbar'
import ProductList from '../compontens/product/ProductList';
// import List from '../compontens/List'
// import ProductList from '../compontens/ProductList'
import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { getProducts } from "../redux/features/product/productSlice";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ProductDetail from '../compontens/ProductDetail';

// import Addtb from '../compontens/Addtb'
// import Tball from '../compontens/Tball'


const Profile = () => {
  // useRedirectLoggedOutUser("/");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  
  return (
    <div >  
     <Navbar />
      {/* <List products={products} isLoading={isLoading} /> */}
      <ProductList products={products} isLoading={isLoading} />
      {/* <ProductDetail /> */}
      {/* <Tball />  */}
    </div>
  )
}

export default Profile