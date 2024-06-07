import {IPost, PostInput, PostUpdateInput, UserInput} from "../interface/Blog";
import {RESTDataSource} from 'apollo-datasource-rest'
import axios from "axios";
import {API_URL} from "../../config";

interface IPostService {
    getPostById(id: string): Promise<IPost>,

    getAllPosts(): Promise<IPost[]>,

    createPost(input: PostInput): Promise<IPost>,

    updatePost(input: PostUpdateInput, id: string): Promise<IPost>,
}

const baseURL = API_URL;

const getPaginatedData = (page: number, limit: number, response:  IPost[] )=> {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return response.slice(startIndex, endIndex) as IPost[];
}

export class PostServiceCache extends RESTDataSource implements IPostService{
    constructor() {
        super();
        this.baseURL = API_URL;
    }

    async getPostById(id: string): Promise<IPost> {
        const cachedKey = await this.memoizedResults.get(`${baseURL}/posts/${id}`);
        if (cachedKey) {
            console.log("Cache data ");
            return cachedKey.post;
        }
        const response =
            await this.get(`${baseURL}/posts/${id}`) as {post: IPost};
        console.log("Real data ");
        return response.post;
    }

    async getAllPosts(): Promise<IPost[]> {
        const cachedKey = await this.memoizedResults.get(`${baseURL}/posts`);
        if (cachedKey) {
            console.log("Cache data ");
            return cachedKey.posts;
        }
        console.log("Real data ");
        const response =
            await this.get(`${baseURL}/posts`) as {posts: IPost[]}
        return response.posts as IPost[];
    }
    async getPostsPagination(page: number, limit: number): Promise<IPost[]> {
        const cachedKey = await this.memoizedResults.get(`${baseURL}/posts`);
        if (cachedKey) {
            console.log("Cache data ");
            return getPaginatedData(page, limit, cachedKey.posts);
        }
        console.log("Real data ");
        const response =
            await this.get(`${baseURL}/posts`) as {posts: IPost[]}
        return getPaginatedData(page, limit, response.posts);
    }

    async createPost (postInput: PostInput):Promise<IPost> {
        const cacheKey = await this.memoizedResults.get(`${baseURL}/posts/`);
        this.memoizedResults.delete(cacheKey);
        const response =
            await this.post(`${baseURL}/posts`, {...postInput});
        return response.data.post as IPost;
    }
    async updatePost (postUpdateInput: PostInput, id: string): Promise<IPost> {
        const cacheKey = await this.memoizedResults.get(`${baseURL}/posts/`);
        this.memoizedResults.delete(cacheKey);
        const response =
            await axios.patch(`${baseURL}/posts?id=${id}`, {...postUpdateInput});
        return response.data.post as IPost;
    }
}