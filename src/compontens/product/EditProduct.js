import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";
import ProductForm from "../product/ProductForm";
import Navbar from "../Navbar";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);

    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }

    console.log(...formData);

    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());
    navigate("/pr");
  };

  return (
    <div >
    <Navbar />
      <div className='ree'>
        
        <div className="re-ll">
            
          <form onSubmit={saveProduct}>
            <div className='re-he'>
                <h1>Edit Pinkama</h1>
              </div>
           <div className='ree-in'>
           <label> Image</label>
            <code className="code-color">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
               
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
           </div>

           <div className='ree-in'>
           <label>Name</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
            
          />

           </div>


           <div className='ree-in'>
           <label>Date</label>
          <input
              type="text"
              placeholder="Product Price"
              name="price"
              value={product?.date}
              onChange={handleInputChange}
           
          />
           </div>

          

           <div className='re-inn'>
           <label>Description</label>
          <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  modules={ProductForm.modules}
                  formats={ProductForm.formats}
         
          />
           </div>

           <div className='re-bu'>
           <button className="bu" onClick={()=>navigate('/pr')}> home</button>
           <button className="bu" type="submit" >
              Save Updade
            </button>
           </div>
           

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
