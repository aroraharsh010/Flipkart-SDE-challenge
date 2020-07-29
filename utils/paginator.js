'use strict';
const paginator = ({ query: { page, pageSize } }) => {

    const pagePagination = page ? (Number(page) - 1) : 0;
    const pageSizePagination = pageSize ? Number(pageSize) : 10;
    const limit = pageSizePagination;
    const offset = pagePagination * pageSizePagination;
    return {
        offset,
        limit,
        __FROM__: offset === 0 ? 1 : offset,
        __TO__: offset + limit
    };
};

exports.paginateQuery = paginator;

exports.paginateInfo = (paginationQuery) => {
    return {
        page: { from: paginationQuery.__FROM__, to: paginationQuery.__TO__ }
    };
}
