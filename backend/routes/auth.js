const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  addUserAddress,
  getUserAddress,
  updateUserAddress,
  deleteUserAddress,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  googleLoginUser,
  googleLogout,
  NewUser,
  getUsers,
} = require("../controllers/authController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/googleLogin").post(googleLoginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/logout").get(logout);
router.route("/googleLogout").get(googleLogout);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.post("/me/add-address", isAuthenticatedUser, addUserAddress);
router
  .route("/me/update-address/:addressId")
  .put(isAuthenticatedUser, updateUserAddress);
router.delete("/me/address/:addressId", isAuthenticatedUser, deleteUserAddress);

router.get("/me/address", isAuthenticatedUser, getUserAddress);

router.route("/shop/users/new").post(NewUser);
router
  .route("/shop/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allUsers);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUsers);
router
  .route("/shop/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
