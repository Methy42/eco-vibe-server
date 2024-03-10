import { BaseQuery } from "./base.query";

export class PageQuery<T extends BaseQuery> {
    page?: number;
    size?: number;
    sort?: string;
    order?: string;
    query?: T;

    constructor(page?: number, size?: number, sort?: string, order?: string, query?: T) {
        this.page = page;
        this.size = size;
        this.sort = sort;
        this.order = order;
        this.query = query;
    }
}
