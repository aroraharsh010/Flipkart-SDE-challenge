const paginator = ({ query: { page, pageSize } }) => {
  const pagePagination = page ? Number(page) - 1 : 0;
  const pageSizePagination = pageSize ? Number(pageSize) : 10;
  const limit = pageSizePagination;
  const offset = pagePagination * pageSizePagination;
  return {
    offset,
    limit,
    FROM: offset === 0 ? 1 : offset,
    TO: offset + limit,
  };
};

exports.paginateQuery = paginator;

exports.paginateInfo = (paginationQuery) => {
  return {
    page: { from: paginationQuery.FROM, to: paginationQuery.TO },
  };
};
