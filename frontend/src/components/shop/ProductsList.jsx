import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Pagination from "react-js-pagination";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";

import { getCategoryAll } from "../../actions/categoryActions";

import { useDispatch, useSelector } from "react-redux";
import {
  getShopProducts,
  deleteProduct,
  clearErrors,
  updateProduct,
  updateProductBasic,
} from "../../actions/productActions";
import {
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_RESET,
} from "../../constants/productConstants";
import DeleteNotify from "../layout/DeleteNotify";
import { formatToVNDWithVND } from "../../utils/formatHelper";
import { getShop } from "../../actions/shopActions";

const ProductsList = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  const { loading, error, products, productsCount } = useSelector(
    (state) => state.shopProducts
  );

  const { shop } = useSelector((state) => state.shop);
  const [approved, setApproved] = useState("");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
console.log("shop",shop);
  const {
    error: deleteError,
    isDeleted,
    isUpdated,
  } = useSelector((state) => state.product);
  const { categories: allCategories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getShop());
  }, []);
 

  useEffect(() => {
    console.log("shop._id",shop._id);
    if (shop) {
      dispatch(getShopProducts(shop._id, approved, keyword, currentPage));
      
      dispatch(getCategoryAll());
    }
  }, [shop]);

  useEffect(() => {
    dispatch(getShopProducts(shop._id, approved, keyword, currentPage));
    dispatch(getCategoryAll());

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
      history("/shopkeeper/product");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    if (isUpdated) {
      toast.success("Đã gửi sản phẩm để duyệt");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    error,
    deleteError,
    isDeleted,
    isUpdated,
    history,
    approved,
    keyword,
    currentPage,
  ]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getShopProducts(shop._id, approved, keyword, 1));
  };

  const handleApprovedChange = (e) => {
    setApproved(e.target.value);
    setCurrentPage(1);
    dispatch(
      getShopProducts(SHOP_1723385468288_gf585, e.target.value, keyword, 1)
    );
  };
  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "Danh Mục",
          field: "category",
        },
        {
          label: "Ảnh Sản Phẩm",
          field: "image",
        },
        {
          label: "Tên Sản Phẩm",
          field: "name",
        },
        {
          label: "Giá",
          field: "price",
        },
        {
          label: "Tổng Số Lượng",
          field: "totalStock",
        },
        {
          label: "Duyệt",
          field: "approved",
        },
        {
          label: "Trạng Thái",
          field: "status",
        },
        {
          label: "Tác Vụ",
          field: "actions",
        },
      ],
      rows: [],
    };
    const categoryMap = allCategories.reduce((acc, category) => {
      acc[category._id] = category.vietnameseName;
      return acc;
    }, {});
    if (products && products.length > 0) {
      products.forEach((product) => {
        data.rows.push({
          category: categoryMap[product.category] || "Trống",
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
          approved:
            product.approved === "approved"
              ? "Đã Duyệt"
              : product.approved === "rejected"
              ? "Chưa Duyệt"
              : product.approved === "pending"
              ? "Đang Xử Lý"
              : "Chưa Gửi",
          status: product.status === "active" ? "Hoạt Động" : "Bị Ngưng",
          actions: (
            <Fragment>
              <div className="flex-horizontal">
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
                <button
                  className="btn btn-info py-1 px-2 ml-2"
                  onClick={() => {
                    if (
                      product.approved === "waiting" ||
                      product.approved === "rejected"
                    ) {
                      handleSend(product._id);
                    }
                  }}
                >
                  <i className="fa fa-send"></i>
                </button>
              </div>
            </Fragment>
          ),
        });
      });
    }

    return data;
  };
  const handleSend = (id) => {
    const productData = new FormData();
    productData.set("approved", "pending");
    dispatch(updateProductBasic(id, productData));
  };
  console.log("productsCount", productsCount);
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
          <div>
            <Link
              to="/shopkeeper/product"
              className="product-add-btn-container"
            >
              <i className="fa fa-plus product-add-btn"></i>
              <p>Thêm Sản Phẩm </p>
            </Link>
          </div>
          <div>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginRight: "10px",
              }}
            />
            <select
              value={approved}
              onChange={handleApprovedChange}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              {" "}
              <option value="">Tất cả vai trò</option>
              <option value="waiting">Chưa Gửi</option>
              <option value="pending">Đang Xử Lý</option>
              <option value="approved">Đã Duyệt</option>
              <option value="rejected">Chưa Duyệt</option>
            </select>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      {setProducts().columns.map((column, index) => (
                        <th key={index}>{column.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {setProducts().rows.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value, idx) => (
                          <td key={idx}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                className="d-flex justify-content-center mt-5"
                style={{ marginBottom: "2rem" }}
              >
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={10}
                  totalItemsCount={productsCount}
                  onChange={handlePageChange}
                  nextPageText={"Next"}
                  prevPageText={"Prev"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            </Fragment>
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
