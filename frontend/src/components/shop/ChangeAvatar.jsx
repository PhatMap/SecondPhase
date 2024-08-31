import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getShop, updateShop } from "../../actions/shopActions";
import { UPDATE_SHOP_RESET } from "../../constants/shopConstants";

const ChangeAvatar = ({ avatar, onClose }) => {
  const { isUpdated } = useSelector((state) => state.shop);

  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const handleOverlayClick = (event) => {
    if (event.target.className === "section-overlay") {
      onClose();
    }
  };

  useEffect(() => {
    if (isUpdated) {
      toast.success("Đổi Ảnh Đại Diện Thành Công");
      dispatch(getShop());
      dispatch({ type: UPDATE_SHOP_RESET });
      onClose();
    }
  }, [isUpdated]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage((prev) => ({
            ...prev,
            public_id: "",
            url: reader.result,
          }));
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("hover");
    const files = e.dataTransfer.files;
    onChange({ target: { files } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("hover");
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("hover");
  };

  const AvatarHandler = () => {
    dispatch(updateShop(image, "avatar"));
  };

  return (
    <div className="section-overlay" onClick={handleOverlayClick}>
      <div className="shop-avatar-form ">
        <img src={image ? image.url : avatar.url} alt="Avatar" />
        <label
          className={`upload-form `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            name="images"
            onChange={onChange}
            multiple
            hidden
          />
          <i
            className="fa fa-cloud-upload"
            aria-hidden="true"
            style={{ fontSize: "30px" }}
          ></i>
          <p>
            <strong>Kéo Thả </strong>hoặc <strong>Nhấn </strong>
            để đưa ảnh lên
          </p>
        </label>
        <div className="section-btns">
          <button className="cancel" onClick={onClose}>
            Hủy
          </button>
          <button className="change" onClick={() => AvatarHandler()}>
            Đổi Ảnh Đại Diện
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeAvatar;
