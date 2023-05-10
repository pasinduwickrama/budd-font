import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../redux/features/product/filterSlice";
import {
  deleteProduct,
  getProducts,
} from "../../redux/features/product/productSlice";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DOMPurify from "dompurify";




const ProductList = ({ products,isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredPoducts);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  return (
    <div className='pro-list'>
      <div className='list-body'>
        <div className='list-pro'>
        {!isLoading && products.length === 0 ? (
            <p>-- No Pin kam found, please add a Pin kam...</p>
          ) : (
        <div>
              

              <div className="card-body">
                {currentItems.map((product, index) => {
                  const { _id, name, date, description } = product;
                  return (
                    <div className="card-body1" key={_id}>
                       
                      <div className="card-hader">🏵🏵.Namo Buddhaya.🏵🏵</div>
                      <div className="card-hader">{index + 1}. {shortenText(name, 16)}</div>
                     <div  >
                     {product?.image ? (
                      <img className="img" src={product.image.filePath}
                      alt={product.image.fileName}
                        />
                      ) :(
                        <p>No image set for this product</p>
                        )}
                     </div>
                      

                      
                      {/* <td>{category}</td> */}
                      {/* <td>
                        {"$"}
                        {price}
                      </td> */}
                      <div>{date}</div>
                      {/* <td>
                        {"$"}
                        {price * quantity}
                      </td> */}
                      {/* <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(product.description),
                        }}
                      ></div> */}
                      {/* <div>Created on: {product.createdAt.toLocaleString("en-US")}</div> */}
                      <div className="card-para" >
                        <button>
                          <Link to={`/product-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </button>
                        <button>
                          <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={25} color={"green"} />
                          </Link>
                        </button>
                        <button>
                          <FaTrashAlt
                            size={25}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        
        </div>
       <div className="pagecount">
       <ReactPaginate
        className="prid"
          breakLabel="..."
          nextLabel="Next "
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel=" Prev "
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
       </div>
      </div>
    </div>
  )
}

export default ProductList