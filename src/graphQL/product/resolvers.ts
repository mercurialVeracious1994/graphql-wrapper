import {ProductService} from "../../service/ProductService";

export const resolvers = {
    Query:{
        getAllProducts: async () => {
            return await ProductService.getAllProducts();
        },
        getById: async (_, args) => {
            console.log(args.id,"----------------id>");
            return await ProductService.getById(args.id);
        }
    }
}