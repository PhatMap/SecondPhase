import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const history = useNavigate();

  return (
    <div className="hero-container">
      <div className="hero-container-left">
        <h1>Vita Thời Trang Là Không Gian Sáng Tạo Của Bạn</h1>
        <p>
          Khám phá những bộ sưu tập độc đáo, phong cách và phù hợp với cá tính
          của bạn.
        </p>
        <p>Cập nhật xu hướng mới nhất và tự tin tỏa sáng mỗi ngày!</p>
        <button onClick={() => history("/shop")}>Bắt Đầu Ngay</button>
      </div>
      <div className="hero-container-right">
        <div className="hero-container-right-row2">
          <div className="hero-container-right-child-two">
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDRkbjExbW5veHR6bnV2ajN1MGhqNG5sZHhheHQxaG9rNWN2MWlhMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o85xz8JTqWzfoi3FS/giphy.webp"></img>
          </div>
          <div className="hero-container-right-child-two">
            <img src="https://i.giphy.com/Zd65b3ip4xF58L1w5C.webp"></img>
          </div>
        </div>
        <div className="hero-container-right-row1">
          <div className="hero-container-right-child">
            {" "}
            <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExejM2Y3BkeWo1dXZ1Z2ZuajAyYjJoNXE0ZWJveGV0dTdjZGdhemVvdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9Xelwd9mYPbRx8XCn2/giphy.webp"></img>
          </div>
          <div className="hero-container-right-child">
            {" "}
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExazhkYW85YWFyeTZvcXZybXU1enh2NXB4OHE3bWc2dXo0MjhrYmp0cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Gu13dC880a9P0bxuCN/giphy.webp"></img>
          </div>
          <div className="hero-container-right-child">
            {" "}
            <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW50a3NkMDMzcGZvNzU0Ym95anY2NHljaTJmMmN1eXEwODZpd2RmcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0cgvxzEf7TFuAdRAkM/giphy.webp"></img>
          </div>
        </div>
        <div className="hero-container-right-row2">
          <div className="hero-container-right-child-two">
            {" "}
            <img src="https://i.giphy.com/nRTNEdfV9YVSU.webp"></img>
          </div>
          <div className="hero-container-right-child-two">
            {" "}
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd21wdWV0cGd2djJjeTJ3NzF1cWw3ZnJtZTlpbm0wd2plMDlwcmN1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FW9uJVY81rGHS/giphy.webp"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
