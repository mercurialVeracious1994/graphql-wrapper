import {IProduct} from "../interface/Product";
import {IPost, IUser, PostInput, PostUpdateInput} from "../interface/Blog";
import axios from "axios";
import {API_URL} from "../../config";

interface IBlogService {
    getUserById (id: string): Promise<IUser>,
    getAllUsers(): Promise<IUser[]>,
    getPostById(id: string): Promise<IPost>,
    getAllPosts(): Promise<IPost[]>,
    createPost(input: PostInput): Promise<IPost>,
    updatePost(input: PostUpdateInput, id: string): Promise<IPost>
}
const baseURL = API_URL;
export const BlogService: IBlogService = {
    getAllPosts: async (): Promise<IPost[]> => {
        const response =
            await axios.get(`${baseURL}/posts`) as { data: { posts: IPost[] } }
        return response.data.posts as IPost[];
    },
     getAllUsers: async(): Promise<IUser[]> => {
        const response =
            await axios.get(`${baseURL}/users`) as { data: { users: IUser[] } }
        return response.data.users as IUser[];
    },
     getPostById: async(id: string): Promise<IPost> => {
        const response =
            await axios.get(`${baseURL}/posts/${id}`) as { data: { post: IPost } }
        return response.data.post as IPost;
    },
     getUserById: async(id: string): Promise<IUser> => {
        const response =
            await axios.get(`${baseURL}/users/${id}`) as { data: { user: IUser } }
        return response.data.user as IUser;
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