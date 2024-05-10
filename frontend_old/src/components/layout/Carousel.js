import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCarousel = () => {
  const products = [
    {
      _id: {
        $oid: "655fd39921ed9b524c6ad680",
      },
      name: "Ghế Sofa Gỗ Tràm Tự Nhiên MOHO KOLDING 701",
      price: 824,
      description:
        "Kích thước: Dài 200cm x Rộng 86cm x Cao 79.5cm\n\nChất liệu:\n\n- Gỗ tràm tự nhiên \n\n- Chân ghế làm bằng sắt sơn tĩnh điện\n\n- Vải bọc sợi tổng hợp có khả năng chống thấm nước và dầu \n\n- Tấm phản: Gỗ công nghiệp Plywood chuẩn CARB-P2 (*) \n\n(*) Tiêu chuẩn California Air Resources Board xuất khẩu Mỹ, đảm bảo gỗ không độc hại, an toàn sức khỏe.",
      ratings: 0,
      images: [
        {
          public_id: "products/hjuxywnjdldjwkxuw5tw",
          url: "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1700778906/products/hjuxywnjdldjwkxuw5tw.jpg",
          _id: {
            $oid: "655fd39921ed9b524c6ad681",
          },
        },
      ],
      category: "Chair",
      seller: "Tran Trung Phat",
      stock: 15,
      numOfReviews: 0,
      user: {
        $oid: "655cde6dfc7ae86a4a8c4951",
      },
      reviews: [],
      createAt: {
        $date: "2023-11-23T22:35:05.061Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "655fd42f21ed9b524c6ad695",
      },
      name: "Giường Ngủ Gỗ Tràm MOHO VLINE 601 Nhiều Kích Thước",
      price: 441,
      description:
        "Kích thước phủ bì: Dài 212cm x Rộng 136/156/176/196cm x Cao đến đầu giường 92cm\n\nChất liệu:\n\n- Thân giường: Gỗ tràm tự nhiên, Veneer gỗ tràm tự nhiên\n\n- Chân giường: Gỗ thông tự nhiên\n\n- Tấm phản: Gỗ plywood chuẩn CARB-P2 (*)\n\n(*) Tiêu chuẩn California Air Resources Board xuất khẩu Mỹ, đảm bảo gỗ không độc hại, an toàn cho sức khỏe",
      ratings: 0,
      images: [
        {
          public_id: "products/kt6ejtjil4rb7grdst8k",
          url: "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1700779056/products/kt6ejtjil4rb7grdst8k.jpg",
          _id: {
            $oid: "655fd42f21ed9b524c6ad696",
          },
        },
      ],
      category: "Bed",
      seller: "Tran Trung Phat",
      stock: 15,
      numOfReviews: 0,
      user: {
        $oid: "655cde6dfc7ae86a4a8c4951",
      },
      reviews: [],
      createAt: {
        $date: "2023-11-23T22:37:35.167Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "655fd4f621ed9b524c6ad6d1",
      },
      name: "Tủ Đầu Giường Gỗ MOHO VLINE 801",
      price: 368,
      description:
        "Kích thước: Dài 55cm x Rộng 41cm x Cao 51,5cm\n\nChất liệu:\n\n- Thân tủ: Gỗ công nghiệp PB, MDF chuẩn CARB-P2 (*), Veneer gỗ tràm tự nhiên\n\n- Chân tủ: Gỗ tràm tự nhiên\n\n(*) Tiêu chuẩn California Air Resources Board xuất khẩu Mỹ, đảm bảo gỗ không độc hại, an toàn cho sức khỏe",
      ratings: 0,
      images: [
        {
          public_id: "products/mczarrqanxbtezwrsdxb",
          url: "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1700779255/products/mczarrqanxbtezwrsdxb.jpg",
          _id: {
            $oid: "655fd4f621ed9b524c6ad6d2",
          },
        },
      ],
      category: "Shelve",
      seller: "Tran Trung Phat",
      stock: 15,
      numOfReviews: 0,
      user: {
        $oid: "655cde6dfc7ae86a4a8c4951",
      },
      reviews: [],
      createAt: {
        $date: "2023-11-23T22:40:54.117Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "655fd5f321ed9b524c6ad727",
      },
      name: "Đèn Trần Tua Rua 02",
      price: 618,
      description:
        "Kích thước: Đường kính 50cm\n\nChất liệu: Dây thừng cotton ,khung sắt\n\nPhí giao hàng:\n\n- Nội thành HCM: khoảng 30,000đ tùy theo địa chỉ giao hàng\n\n- Ngoại thành HCM và các tỉnh thành khác: tùy theo địa chỉ giao hàng\n\n* Sản phẩm không xuất hóa đơn VAT\n\n* Sản phẩm áp dụng đổi trả trong vòng 5 ngày nếu giao sai sản phẩm",
      ratings: 0,
      images: [
        {
          public_id: "products/mau9h5a67n8m1b7moihq",
          url: "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1700779508/products/mau9h5a67n8m1b7moihq.jpg",
          _id: {
            $oid: "655fd5f321ed9b524c6ad728",
          },
        },
      ],
      category: "Light",
      seller: "Tran Trung Phat",
      stock: 15,
      numOfReviews: 0,
      user: {
        $oid: "655cde6dfc7ae86a4a8c4951",
      },
      reviews: [],
      createAt: {
        $date: "2023-11-23T22:45:07.122Z",
      },
      __v: 0,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      style={{
        maxWidth: "600px", // Adjust the value as needed
        maxHeight: "600px",
        margin: "0 auto", // Center the carousel horizontally
      }}
    >
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product._id.$oid}>
            <img
              src={"/images/da.png"}
              alt={product.name}
              style={{ margin: "0 auto" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;