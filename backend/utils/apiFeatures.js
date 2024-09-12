class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filterUser() {
    const { keyword, status, roles } = this.queryStr;

    let query = {};

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
        { role: { $regex: keyword, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (roles) {
      const rolesArray = typeof roles === "string" ? roles.split(",") : roles;

      if (rolesArray && rolesArray.length > 0) {
        query.role = { $in: rolesArray };
      }
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
  filterShopProducts() {
    const { keyword, approved } = this.queryStr;

    let query = {};

    if (approved && approved !== "") {
      query.approved = approved;
    }

    if (keyword) {
      query.name = {
        $regex: keyword,
        $options: "i",
      };
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
  filterReviews() {
    const { keyword } = this.queryStr;

    let query = {};

    if (keyword) {
      query["reviews.comment"] = { $regex: keyword, $options: "i" };
    }

    this.query = this.query.find(query);
    return this;
  }

  filterCoupon() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    if (this.queryStr.status) {
      this.query = this.query.find({ status: this.queryStr.status });
    }
    if (this.queryStr.role) {
      this.query = this.query.find({ role: this.queryStr.role });
    }
    return this;
  }
  filterOrder() {
    const { keyword, orderStatus } = this.queryStr;

    let query = {};
    if (orderStatus) {
      query.orderStatus = orderStatus;
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
          category: this.queryStr.category,
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

  pagination() {
    const currentPage = Number(this.queryStr.page) || 1;
    const resPerPage = Number(this.queryStr.limit) || 10;
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
