import {IProduct} from "../interface/Product";
import {IPost, IUser, PostInput, PostUpdateInput, UserInput} from "../interface/Blog";
import axios from "axios";
import {API_URL} from "../../config";

interface IPostService {
    getPostById(id: string): Promise<IPost>,
    getAllPosts(): Promise<IPost[]>,
    createPost(input: PostInput): Promise<IPost>,
    updatePost(input: PostUpdateInput, id: string): Promise<IPost>,
}
const baseURL = API_URL;
export const PostService: IPostService = {
    getAllPosts: async (): Promise<IPost[]> => {
        const response =
            await axios.get(`${baseURL}/posts`) as { data: { posts: IPost[] } }
        return response.data.posts as IPost[];
    },
     getPostById: async(id: string): Promise<IPost> => {
        const response =
            await axios.get(`${baseURL}/posts/${id}`) as { data: { post: IPost } }
        return response.data.post as IPost;
    },
    createPost: async (postInput: PostInput): Promise<IPost> =>{
        const response =
            await axios.post(`${baseURL}/posts`, {...postInput}) ;
        return response.data.post as IPost;
    },
    updatePost: async (postUpdateInput: PostUpdateInput, id: string): Promise<IPost> => {
        const response =
            await axios.patch(`${baseURL}/posts?id=${id}`, {...postUpdateInput}) ;
        return response.data.post as IPost;
    }
}