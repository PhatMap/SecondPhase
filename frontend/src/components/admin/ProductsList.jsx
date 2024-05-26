import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProducts,
  deleteProduct,
  clearErrors,
} from "../../actions/productActions";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import DeleteNotify from "../layout/DeleteNotify";
import variant from "./Variant";

const ProductsList = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  const { loading, error, products } = useSelector((state) => state.products);
  const {
    error: deleteError,
    isDeleted,
    success,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.error("Product deleted successfully");
      history("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, history]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "Category",
          field: "category",
          sort: "asc",
        },
        {
          label: "Image",
          field: "image",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Total Stock",
          field: "totalStock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      const imageURL =
        product.variants.length > 0 && product.variants[0].images.length > 0
          ? product.variants[0].images[0].url
          : "";
      data.rows.push({
        category: product.category,
        image: (
          <img
            src={imageURL}
            alt={product.name}
            style={{ width: "50px", height: "50px" }}
          />
        ),
        name: product.name,
        price: `$${product.price}`,
        totalStock: product.totalStock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => {
                setShow(true);
                setId(product._id);
              }}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Fragment>
      <MetaData title={"All Products"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="manage-product-container">
          <Fragment>
            <h1>All Products</h1>
            <Link to="/admin/product" className="product-add-btn-container">
              <i className="fa fa-plus product-add-btn"></i>
              <p>Add New Product</p>
            </Link>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className="product-list-table"
                bordered
                striped
                hover
                noBottomColumns
              />
            )}
          </Fragment>
        </div>
        {show && (
          <DeleteNotify
            func={deleteProductHandler}
            paras={[id]}
            show={setShow}
          />
        )}
      </div>
    </Fragment>
  );
};

export default ProductsList;
