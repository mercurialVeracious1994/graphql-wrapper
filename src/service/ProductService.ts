import axios from 'axios';
// @ts-ignore
import {API_URL} from "../../config";
import {IProduct, IProductConnection} from "../interface/Product";
import {RESTDataSource} from "apollo-datasource-rest";
import {convertCursorToNodeId, convertNodeIdToCursor} from "../graphQL/utils/pagination";

const baseURL = API_URL;

interface IProductService {
    getById(id: string): Promise<IProduct>

    getAllProducts(): Promise<IProduct[]>

    getProductCursorPagination(cursor: string, first: number): Promise<IProductConnection>
}

export class ProductServiceCache extends RESTDataSource implements IProductService {
    constructor() {
        super();
        this.baseURL = API_URL;
    }

    async getById(id: string): Promise<IProduct> {
        const cachedKey = await this.memoizedResults.get(`${baseURL}/products/${id}`);
        if (cachedKey) {
            console.log("Cache data ");
            return cachedKey.product as IProduct;
        }
        const response =
            await this.get(`${baseURL}/products/${id}`) as { product: IProduct }
        return response.product as IProduct;
    }

    async getAllProducts(): Promise<IProduct[]> {
        const cachedKey = await this.memoizedResults.get(`${baseURL}/products`);
        if (cachedKey) {
            console.log("Cache data ");
            return cachedKey.products as IProduct[];
        }
        const response =
            await this.get(`${baseURL}/products`) as { products: IProduct[] }
        return response.products as IProduct[];
    }

    async getProductCursorPagination(cursor: string, first): Promise<IProductConnection> {
        const cachedKey = await this.memoizedResults.get(`${baseURL}/products`);
        const afterIndex = 0
        if (cachedKey) {
            console.log("Cache data ");
            return getCursorPaginationResponse(cursor, cachedKey.products, afterIndex, first);
        }
        console.log("Real data ");
        const response =
            await this.get(`${baseURL}/products`) as { products: IProduct[] }
        return getCursorPaginationResponse(cursor, response.products, afterIndex, first);
    }
}

const getCursorPaginationResponse =
    (cursor: string, response: IProduct[], afterIndex: number, first: number) => {
        if (typeof cursor === 'string') {
            let nodeId = convertCursorToNodeId(cursor)
            let nodeIndex = response.findIndex(datum => datum.id === nodeId)
            if (nodeIndex >= 0) {
                afterIndex = nodeIndex + 1 // 1 is added to exclude the afterIndex node and include items after it
            }
        }
        const slicedData = response.slice(afterIndex, afterIndex + first);
        const edges = slicedData.map(node => {
            return {
                node,
                cursor: convertNodeIdToCursor(node.id)
            }
        });
        let startCursor, endCursor = null
        if (edges.length > 0) {
            startCursor = convertNodeIdToCursor(edges[0].node.id)
            endCursor = convertNodeIdToCursor(edges[edges.length - 1].node.id)
        }
        const hasNextPage = response.length > afterIndex + first;

        return {
            totalCount: response.length,
            pageInfo: {
                startCursor,
                endCursor,
                hasNextPage
            },
            edges,
        } as IProductConnection
    }
