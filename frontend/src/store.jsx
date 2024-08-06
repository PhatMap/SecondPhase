import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productsReducer,
  newProductReducer,
  productReducer,
  productDetailsReducer,
  newReviewReducer,
  productReviewsReducer,
  reviewReducer,
  reviewsInProductReducer,
  productCategoriesReducer
} from "./reducers/productReducers";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
  getUsersReducer,
  banUserReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  orderReducer,
  momoReducer,
} from "./reducers/orderReducers";
import {
  applicationReducer,
  applicationsReducer,
  newApplicationReducer,
} from "./reducers/applicationReducers";
import { categoryReducer } from "./reducers/categoryReducers";
import { notificationsReducer } from "./reducers/notificationsReducers";
import { couponReducer } from "./reducers/couponReducer";

const reducer = combineReducers({
  momo: momoReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  product: productReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  auth: authReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  getUsers: getUsersReducer,
  userDetails: userDetailsReducer,
  banUser: banUserReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  order: orderReducer,
  newReview: newReviewReducer,
  newApplication: newApplicationReducer,
  category: categoryReducer,
  applications: applicationsReducer,
  application: applicationReducer,
  notifications: notificationsReducer,
  reviewsInProduct: reviewsInProductReducer,
  coupon: couponReducer,
  productCategories:productCategoriesReducer
  
});

const middlware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
