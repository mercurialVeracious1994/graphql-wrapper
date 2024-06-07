import {ProductService} from "../service/ProductService";
import {PostInput, PostUpdateInput, UserInput} from "../interface/Blog";
import {UserService} from "../service/UserService";

export const resolvers = {
    Query:{
        products: async () => {
            return await ProductService.getAllProducts();
        },
        product: async (_, args) => {
            return await ProductService.getById(args.id);
        },
        user:async (_, args) => {
            return await UserService.getUserById(args.id);
        },
        users: async() =>{
            return await UserService.getAllUsers();
        },
        post:async (_, {id},{dataSources}) => {
            return await dataSources.postAPI.getPostById(id);
        },
        postsPagination:async (_,args, {dataSources}) =>{
            const {page, limit} = args;
            return await dataSources.postAPI.getPostsPagination(page, limit);
        },
        posts: async(_,__,{dataSources}) =>{
            return await dataSources.postAPI.getAllPosts();
        }
    },
    Mutation:{
        addPost: async (_, args:{input: PostInput},{dataSources}) => {
            return await dataSources.postAPI.createPost({...args.input})
        },
        updatePost: async (_, args: {input: PostUpdateInput, id: string}, {dataSources}) =>{
            return await dataSources.postAPI.updatePost({...args.input},args.id);
        },
        addUser: async (_, args:{input: UserInput}) => {
            return await UserService.createUser({...args.input})
        },
        updateUser: async (_, args: {input: UserInput, id: string}) =>{
            return await UserService.updateUser({...args.input},args.id);
        },
    }
}