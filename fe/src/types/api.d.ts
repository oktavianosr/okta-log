export interface ApiResponse<TData, TMeta = null> {
    data: TData;
    message: string;
    meta?: TMeta;
    success: boolean;
}
export interface ApiPagination {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
}
