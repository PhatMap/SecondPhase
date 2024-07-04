class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filterUser() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [
            { name: { $regex: this.queryStr.keyword, $options: "i" } },
            { email: { $regex: this.queryStr.keyword, $options: "i" } },
            { role: { $regex: this.queryStr.keyword, $options: "i" } },
          ],
        }
      : {};
    const role = this.queryStr.role
      ? {
          role: {
            $regex: this.queryStr.role,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword }).find({ ...role });
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

  adminPagination() {
    const currentPage = Number(this.queryStr.page) || 1;
    const resPerPage = Number(this.queryStr.resPerPage) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort({ createAt: -1 });
    }
    return this;
  }
}

module.exports = APIFeatures;
