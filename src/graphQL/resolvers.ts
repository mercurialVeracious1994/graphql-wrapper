import {ProductService} from "../service/ProductService";
import {BlogService} from "../service/BlogService";
import {PostInput, PostUpdateInput} from "../interface/Blog";

export const resolvers = {
    Query:{
        products: async () => {
            return await ProductService.getAllProducts();
        },
        product: async (_, args) => {
            return await ProductService.getById(args.id);
        },
        user:async (_, args) => {
            return await BlogService.getUserById(args.id);
        },
        users: async() =>{
            return await BlogService.getAllUsers();
        },
        post:async (_, args) => {
            return await BlogService.getPostById(args.id);
        },
        posts: async() =>{
            return await BlogService.getAllPosts();
        }
    },
    User:{
        posts(user,_, {models}) {
            return models.Post.findMany({user: user.id})
        }
    },
    Mutation:{

        addPost: async (_, args:{input: PostInput}) => {
            return await BlogService.createPost({...args.input})
        },
        updatePost: async (_, args: {input: PostUpdateInput, id: string}) =>{
            return await BlogService.updatePost({...args.input},args.id);
        }
    }
}