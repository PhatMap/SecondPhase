const Order = require("../models/order");
const Product = require("../models/product");
const Stat = require("../models/stat");

const statsRecord = async (id, role) => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  let value = null;

  if (role === "shopkeeper") {
    const orders = await Order.find({
      orderStatus: "Delivered",
      deliverAt: { $exists: true },
    });

    const products = await Product.find({
      shopId: id,
      status: "active",
      approved: "approved",
    });

    const revenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    const outOfStock = products.filter((product) => product.totalStock === 0);

    value = {
      productsCount: products.length,
      ordersCount: orders.length,
      revenue: revenue,
      outOfStock: outOfStock.length,
    };
  }

  let stats = await Stat.findOneAndUpdate(
    { id, "data.date": formattedDate },
    {
      $set: {
        data: {
          date: formattedDate,
          value: value,
        },
      },
    },
    { upsert: true, new: true }
  );

  if (!stats.data.some((data) => data.date === formattedDate)) {
    stats = await Stat.findOneAndUpdate(
      { id },
      {
        $push: {
          data: {
            date: formattedDate,
            value: value,
          },
        },
      },
      { upsert: true, new: true }
    );
  }

  return stats;
};

const getStats = async (id, role) => {
  const stats = await Stat.findOne({ id });

  return stats;
};

module.exports = {
  statsRecord,
  getStats,
};
