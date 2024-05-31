const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body); // Kiểm tra tất cả dữ liệu đầu vào

  if (!req.body.avatar) {
    return res.status(400).json({
      success: false,
      message: "Avatar is required",
    });
  }

  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const address = [
    {
      province: req.body["address[0][province]"],
      district: req.body["address[0][district]"],
      town: req.body["address[0][town]"],
      location: req.body["address[0][location]"],
      phone: req.body["address[0][phone]"],
    },
  ];

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Email already exists.",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    address,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  sendToken(user, 200, res);
});

exports.loginUser = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Vui Lòng Nhập Tài Khoản Mật Khẩu",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Tài Khoản Hoặc Mật Khẩu Không Chính Xác",
    });
  }
  if (user.role === "banned") {
    return res.status(403).json({
      success: false,
      message:
        "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên để biết thêm thông tin.",
    });
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(401).json({
      success: false,
      message: "Tài Khoản Hoặc Mật Khẩu Không Chính Xác",
    });
  }

  sendToken(user, 200, res);
});

const generateRandomPassword = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
};

exports.googleLoginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, name, avatar, googleId } = req.body;

  let user = await User.findOne({ email });

  const password = generateRandomPassword();

  if (!user) {
    user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: googleId,
        url: avatar,
      },
      address: [],
    });
  }

  sendToken(user, 200, res);
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  console.log("forgotPassword");

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Yout password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "DecoNest  Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler("User not found with this email", 404));
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isMatch = await user.comparePassword(req.body.oldPassword);
  if (!isMatch) {
    return next(new ErrorHandler("Old password is incorrect"));
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

exports.googleLogout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Google logged out",
  });
});

exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  await User.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.addUserAddress = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id; // Assuming the user is authenticated and req.user contains the user data
  const { province, district, town, location, phone } = req.body;

  const newAddress = {
    province,
    district,
    town,
    location,
    phone,
  };

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  user.address.push(newAddress);

  await user.save();

  res.status(200).json({
    success: true,
    message: "Address added successfully",
    address: user.address,
  });
});

exports.getUserAddress = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id; // Giả sử người dùng đã được xác thực và req.user chứa dữ liệu của người dùng
  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const userAddress = user.address;

  res.status(200).json({
    success: true,
    address: userAddress,
  });
});

exports.updateUserAddress = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id; // Giả sử người dùng đã được xác thực và req.user chứa dữ liệu của người dùng
  const addressId = req.params.addressId; // Lấy addressId từ tham số yêu cầu
  const { province, district, town, location, phone } = req.body; // Lấy dữ liệu địa chỉ mới từ phần thân yêu cầu

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const address = user.address.id(addressId);
  if (!address) {
    return next(new ErrorHandler("Address not found", 404));
  }

  // Cập nhật các trường địa chỉ
  if (province) address.province = province;
  if (district) address.district = district;
  if (town) address.town = town;
  if (location) address.location = location;
  if (phone) address.phone = phone;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Address updated successfully",
    address,
  });
});



// userController.js
exports.deleteUserAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.address = user.address.filter(
      (address) => address._id.toString() !== req.params.addressId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
