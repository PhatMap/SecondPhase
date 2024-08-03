class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filterUser() {
    const { keyword, status } = this.queryStr;

    let query = {};

    if (keyword) {
      query.$or = [
        { shopName: { $regex: keyword, $options: "i" } },
        { ownerName: { $regex: keyword, $options: "i" } },
        { primaryPhone: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    this.query = this.query.find(query);
    return this;
  }

  filterApplication() {
    const { keyword, status } = this.queryStr;

    let query = {};

    if (keyword) {
      query.$or = [
        { "shopInfor.shopName": { $regex: keyword, $options: "i" } },
        { "shopInfor.ownerName": { $regex: keyword, $options: "i" } },
        { "shopInfor.email": { $regex: keyword, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    this.query = this.query.find(query);
    return this;
  }

  filterApplication() {
    const { keyword, status } = this.queryStr;

    let query = {};

    if (keyword) {
      query.$or = [
        { "shopInfor.shopName": { $regex: keyword, $options: "i" } },
        { "shopInfor.ownerName": { $regex: keyword, $options: "i" } },
        { "shopInfor.email": { $regex: keyword, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    this.query = this.query.find(query);
    return this;
  }
  filterAdminProducts() {
    const { keyword, approved } = this.queryStr;

    let query = {};

    if (approved) {
      query.approved = approved;
    }

    this.query = this.query.find(query);
    return this;
  }

  filterCategory() {
    const { keyword } = this.queryStr;

    let query = {};

    if (keyword) {
      query.$or = [
        { categoryName: { $regex: keyword, $options: "i" } },
        { vietnameseName: { $regex: keyword, $options: "i" } },
      ];
    }

    this.query = this.query.find(query);
    return this;
  }
  filterCoupon() {
    const { role, creatorId } = this.queryStr;

    let query = {};

    if (role && role === 'shopkeeper' && creatorId) {
      query.creatorId = creatorId;
    }

    this.query = this.query.find(query);
    return this;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    const category = this.queryStr.category
      ? {
          category: {
            $regex: this.queryStr.category,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword }).find({ ...category });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["keyword", "limit", "page", "category"];
    removeFields.forEach((el) => delete queryCopy[el]);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }

  notificationPagination() {
    const page = Number(this.queryStr.page) || 1;
    const limit = Number(this.queryStr.limit) || 5;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  adminPagination() {
    const page = Number(this.queryStr.page) || 1;
    const limit = Number(this.queryStr.resPerPage) || 3;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy + " -createdAt -_id");
    } else {
      this.query = this.query.sort("-createdAt -_id");
    }
    return this;
  }
}

module.exports = APIFeatures;
