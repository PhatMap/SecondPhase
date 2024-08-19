const Stat = require("../models/stat");

const statsRecord = async (id, role) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const updatePath = `data.${year}.${month}.${day}`;

  let value = null;

  if (role === "shopkeeper") {
    value = { orderOfTheDay : 1 };
  }

  const stats = await Stat.findOneAndUpdate(
    { id },
    {
      $set: { [updatePath]: value },
    },
    { upsert: true, new: true }
  );

  return stats;
};

module.exports = statsRecord;
