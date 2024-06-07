export interface IProduct {
    name: string,
    price: string,
    id: string,
    createdAt: string,
    updatedAt: string
}

export interface IProductEdge {
    node: IProduct
    cursor: String
}
export interface IPageInfo {
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage?: boolean
    startCursor: string
}
export interface IProductConnection {
    totalCount: number
    pageInfo: IPageInfo
    edges: IProductEdge[]
}