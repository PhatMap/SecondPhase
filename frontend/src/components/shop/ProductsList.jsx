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
import { formatToVNDWithVND } from "../../utils/formatHelper";

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
      history("/shop/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, history]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "Danh Mục",
          field: "category",
          sort: "asc",
        },
        {
          label: "Ảnh Sản Phẩm",
          field: "image",
          sort: "asc",
        },
        {
          label: "Tên Sản Phẩm",
          field: "name",
          sort: "asc",
        },
        {
          label: "Giá",
          field: "price",
          sort: "asc",
        },
        {
          label: "Tổng Số Lượng",
          field: "totalStock",
          sort: "asc",
        },
        {
          label: "Tác vụ",
          field: "actions",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        category: product.category,
        image: (
          <img
            src={product.images[0].url}
            alt={product.name}
            style={{ width: "50px", height: "50px" }}
          />
        ),
        name: product.name,
        price: `${formatToVNDWithVND(product.price)}`,
        totalStock: product.totalStock,
        actions: (
          <div style={{ display: "flex" }}>
            <Link
              to={`/shop/product/${product._id}`}
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
          </div>
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
      <div className="sidebar-content-container">
        <div className="manage-product-container">
          <h1
            className="my-4"
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Tất Cả Sản Phẩm{" "}
          </h1>
          <Link to="/shop/product" className="product-add-btn-container">
            <i className="fa fa-plus product-add-btn"></i>
            <p>Thêm Sản Phẩm </p>
          </Link>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setProducts()}
              bordered
              striped
              hover
              noBottomColumns
            />
          )}
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
