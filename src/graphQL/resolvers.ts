import {ProductService} from "../service/ProductService";
import {PostService} from "../service/PostService";
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
        post:async (_, args) => {
            return await PostService.getPostById(args.id);
        },
        posts: async() =>{
            return await PostService.getAllPosts();
        }
    },
    Mutation:{
        addPost: async (_, args:{input: PostInput}) => {
            return await PostService.createPost({...args.input})
        },
        updatePost: async (_, args: {input: PostUpdateInput, id: string}) =>{
            return await PostService.updatePost({...args.input},args.id);
        },
        addUser: async (_, args:{input: UserInput}) => {
            return await UserService.createUser({...args.input})
        },
        updateUser: async (_, args: {input: UserInput, id: string}) =>{
            return await UserService.updateUser({...args.input},args.id);
        },
    }
}