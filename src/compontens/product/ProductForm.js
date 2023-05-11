import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar';
import img1 from '../../asses/logo1.png'


import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";


const initialState = {
  name: "",
  category:"",
  date:"",
};


const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { name, category, date, quantity } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateKSKU(category));
    formData.append("category", category);
    formData.append("quantity", Number(quantity));
    formData.append("date", date);
    formData.append("description", description);
    formData.append("image", productImage);

    console.log(...formData);

    await dispatch(createProduct(formData));

    navigate("/pr");
  };

  return (
  <div className='landingg'>
  <Navbar />
  <div className='ree'>
       {/* <div className='re-r'>
               <img src={img1} alt='' />
       </div>     */}
       <div className='re-ll'>
           <form onSubmit={saveProduct} >
               <div className='re-he'>
                  {/* <img src={img1} alt='' /> */}
                  <h2> {name} Add Merit(පින්කම)</h2>
               </div>
               <div className='ree-in'>
                <label>Image</label>
                  <code className="code-color">
                    Supported Formats:1MB jpg, jpeg, png
                  </code>
                  <input
                    
                    type="file"
                    name="image"
                    onChange={(e) => handleImageChange(e)}
                  />
                </div>
               <div className='ree-in'>
                   <label>Name Merit(පින්කම) </label>
                   <input
                    type="text"
                    placeholder="Merit(පින්කම)"
                    name="name"
                    value={product?.name}
                    onChange={handleInputChange}
                  />
               </div>
               
              
               <div className='ree-in'>
                   <label>Date Merit(පින්කම)</label>
                   <input
                      type="date"
                      placeholder="Date Merit(පින්කම)"
                      name="date"
                      value={product?.date}
                      onChange={handleInputChange}
                    />
               </div>
              
               <div className='re-inn'>
                   <label>Description Merit(පින්කම)</label>
                      <ReactQuill
                      theme="snow"
                      value={description}
                      onChange={setDescription}
                      modules={ProductForm.modules}
                      formats={ProductForm.formats}
                    />
               </div>
             
              
               <div className='re-bu'>
                 <button onClick={()=>navigate('/pr')}> home</button>
                  <button>Save Merit(පින්කම)</button>
               </div>
                       
               
           </form>
       </div>
  </div>
</div>
  );
};
ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];


export default ProductForm