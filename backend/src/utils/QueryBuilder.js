class QueryBuilder {
  constructor(model, query) {
    this.model = model;
    this.query = query;
    this.modelQuery = null;
    this.searchConditions = null;
    this.filterConditions = {};
  }

  search(searchableFields) {
    const searchTerm = this?.query?.searchTerm;

    if (searchTerm) {
      this.searchConditions = {
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      };
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    this.filterConditions = queryObj;

    return this;
  }

  _buildQuery() {
    // If query already built, return it
    if (this.modelQuery) {
      return this.modelQuery;
    }

    // Combine search and filter conditions
    let conditions = {};

    const hasSearch =
      this.searchConditions && Object.keys(this.searchConditions).length > 0;
    const hasFilter =
      this.filterConditions && Object.keys(this.filterConditions).length > 0;

    if (hasSearch && hasFilter) {
      // If we have both search and filter, combine them with $and
      conditions = {
        $and: [this.searchConditions, this.filterConditions],
      };
    } else if (hasSearch) {
      // Only search conditions
      conditions = this.searchConditions;
    } else if (hasFilter) {
      // Only filter conditions
      conditions = this.filterConditions;
    }

    // Build the query
    this.modelQuery = this.model.find(conditions);
    return this.modelQuery;
  }

  sort() {
    const sort = this?.query?.sort?.split(',')?.join(' ') || '-createdAt';

    const query = this._buildQuery();
    this.modelQuery = query.sort(sort);

    return this;
  }

  paginate() {
    this.page = Number(this?.query?.page) || 1;
    this.limit = Number(this?.query?.limit) || 10;
    this.skip = (this.page - 1) * this.limit;

    const query = this._buildQuery();
    this.modelQuery = query.skip(this.skip).limit(this.limit);

    return this;
  }

  async countTotal() {
    const conditions = this._getConditions();
    return await this.model.countDocuments(conditions);
  }

  _getConditions() {
    // Get conditions without building the full query (for count)
    let conditions = {};

    const hasSearch =
      this.searchConditions && Object.keys(this.searchConditions).length > 0;
    const hasFilter =
      this.filterConditions && Object.keys(this.filterConditions).length > 0;

    if (hasSearch && hasFilter) {
      conditions = {
        $and: [this.searchConditions, this.filterConditions],
      };
    } else if (hasSearch) {
      conditions = this.searchConditions;
    } else if (hasFilter) {
      conditions = this.filterConditions;
    }

    return conditions;
  }

  fields() {
    const fields = this?.query?.fields?.split(',')?.join(' ') || '-__v';

    const query = this._buildQuery();
    this.modelQuery = query.select(fields);

    return this;
  }

  populate(populateOptions) {
    if (populateOptions) {
      const query = this._buildQuery();
      this.modelQuery = query.populate(populateOptions);
    }

    return this;
  }
}

export default QueryBuilder;
