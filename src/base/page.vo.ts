export interface IPageVO<T> {
    page: number;
    size: number;
    total: number;
    data: T[];
}