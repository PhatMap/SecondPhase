import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryAll } from "./../../../actions/categoryActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  uploadImages,
  uploadSectionImages,
} from "./../../../actions/productActions";
import {
  getShop,
  updateShop,
  updateShopSection,
} from "./../../../actions/shopActions";
import { UPDATE_SHOP_RESET } from "./../../../constants/shopConstants";

const UpdateSection = ({ setOption, categories, section, index }) => {
  const { isUpdated } = useSelector((state) => state.shop);

  const [form, setForm] = useState({
    name: "",
    images: [],
    categoryId: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setForm({ ...section });
  }, []);

  useEffect(() => {
    if (isUpdated) {
      toast.success("Đã cập nhật mục thành công");
      dispatch(getShop());
      dispatch({ type: UPDATE_SHOP_RESET });
      setOption("choose");
    }
  }, [isUpdated]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setForm((prevForm) => ({
            ...prevForm,
            images: [...prevForm.images, { public_id: "", url: reader.result }],
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

  const handlerImageRemove = (index) => {
    const newImagesFiles = form.images.filter((img, i) => i !== index);
    setForm({ ...form, images: newImagesFiles });
  };

  const handlerUpdateSection = async () => {
    let waitImges = [];

    await Promise.all(
      form.images.map(async (image, index) => {
        if (!image.public_id) {
          const upload = new FormData();
          upload.append("images", image.url);
          const result = await dispatch(uploadSectionImages(upload));
          waitImges.push({
            id: index,
            res: result,
          });
        }
      })
    );

    const finalResult = await Promise.all(waitImges);

    finalResult.forEach((result) => {
      form.images[result.id].public_id = result.res.image.public_id;
      form.images[result.id].url = result.res.image.url;
    });

    const sectionData = {
      name: form.name,
      images: form.images,
      categoryId: form.categoryId,
    };

    dispatch(updateShopSection(index, sectionData));
  };

  return (
    <Fragment>
      <div className="section-form">
        <input
          type="text"
          className={`form-control `}
          placeholder="Tên Mục"
          value={form.name}
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
        />

        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
            }}
          >
            <div>
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
            </div>

            <div style={{ display: "flex", gap: "5px" }}>
              {form.images &&
                form.images.length > 0 &&
                form.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.url}
                      alt="Image Preview"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <i
                      className="fa fa-remove variant-remove-btn"
                      onClick={() => handlerImageRemove(index)}
                    ></i>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div>
          <select
            className={`form-control`}
            id="category_field"
            value={form.categoryId}
            onChange={(e) => {
              if (e.target.value !== "") {
                setForm({ ...form, categoryId: e.target.value });
              }
            }}
          >
            <option value="">Chọn một danh mục</option>
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.vietnameseName}
                </option>
              ))}
          </select>
        </div>
        <div className="section-btns">
          <button
            className="cancel"
            onClick={() => {
              setOption("choose");
            }}
          >
            Hủy
          </button>
          <button className="confirm" onClick={handlerUpdateSection}>
            Cập Nhật
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateSection;
