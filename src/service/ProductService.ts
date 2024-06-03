import axios from 'axios';
// @ts-ignore
import {API_URL} from "../../config";
import {IProduct} from "../interface/Product";

const baseURL = API_URL;
interface IProductService {
    getById(id: string): Promise<IProduct>
    getAllProducts(): Promise<IProduct[]>
   }

export const ProductService: IProductService = {
    getById : async (id:string): Promise<IProduct> => {
        const response =
            await axios.get(`${baseURL}/products/${id}`) as {data: { product: IProduct}}
        return response.data.product as IProduct;
    },
    getAllProducts : async (): Promise<IProduct[]> => {
        const response =
            await axios.get(`${baseURL}/products`) as {data: { products: IProduct[] }}
        return response.data.products as IProduct[];
    },
}