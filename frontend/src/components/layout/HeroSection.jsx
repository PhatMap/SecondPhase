import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      <div className="hero-img">
        <img
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            position: "relative",
          }}
          src="https://i.pinimg.com/564x/ec/8a/9f/ec8a9f65aba5508166d4597ff73335ec.jpg"
        ></img>
        <p>Chào mừng đến với cửa hàng bán quần áo online Vita</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div className="hero-content">
          <div className="hero-content-1">
            <img
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              src="https://t4.ftcdn.net/jpg/02/15/56/11/240_F_215561126_V3wRxN02qeveaTVIdFO3B38V7KcvugWG.jpg"
            ></img>
            <p>Vita bán quần áo dành cho cả nam lẫn nữ</p>
          </div>
          <div className="hero-content-2">
            <img
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              src="https://t4.ftcdn.net/jpg/01/25/20/69/240_F_125206974_j27EqUh2nNbMSbUR5hpJkWVoC2xA47Hd.jpg"
            ></img>
            <p>Mẫu mã phồn đa và chất lượng</p>
          </div>
        </div>
        <div className="hero-access">
          <div className="hero-content-5">
            <img
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              src="https://t4.ftcdn.net/jpg/02/25/72/09/240_F_225720925_zm8laVfcBujP7SX3FTLYOoUYFqgZcCoS.jpg"
            ></img>
            <p>Nếu bạn đã là một thành viên, thì mắt đầu mua hàng thôi!</p>
            <button onClick={() => navigate("/shop")} className="home-text-btn">
              Mua Ngay
            </button>
          </div>
          <div className="hero-content-3">
            <img
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              src="https://t4.ftcdn.net/jpg/01/14/15/15/240_F_114151562_Xr9UxHAObjum6Rfm340DyvikJ4rsZdZw.jpg"
            ></img>
            <p>Chấp nhận thanh toán cả tiền mặt và chuyển khoản</p>
          </div>
          <div className="hero-content-4">
            <img
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              src="https://t3.ftcdn.net/jpg/01/02/21/86/240_F_102218652_SD8qEM2nAExy44ysvhHy8njlnOvHFkTY.jpg"
            ></img>
            <p>
              Nếu chưa, hãy tạo tài khoản trở thành một thành viên của Vita để mua hàng
            </p>
            <button onClick={() => navigate("/register")} className="home-text-btn">
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
