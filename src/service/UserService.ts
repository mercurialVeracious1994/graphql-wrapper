import {IPost, IUser, PostUpdateInput, UserInput} from "../interface/Blog";
import {API_URL} from "../../config";
import axios from "axios";

interface IUserService {
    getUserById(id: string): Promise<IUser>,
    getAllUsers(): Promise<IUser[]>,
    updateUser(input: UserInput,id: string):Promise<IUser>,
    createUser(input: UserInput): Promise<IUser>,
}

const baseURL = API_URL;

export const UserService: IUserService = {
    getAllUsers: async(): Promise<IUser[]> => {
        const response =
            await axios.get(`${baseURL}/users`) as { data: { users: IUser[] } }
        return response.data.users as IUser[];
    },
    getUserById: async(id: string): Promise<IUser> => {
        const response =
            await axios.get(`${baseURL}/users/${id}`) as { data: { user: IUser } }
        return response.data.user as IUser;
    },
    createUser: async (userInput: UserInput): Promise<IUser> =>{
        const response =
            await axios.post(`${baseURL}/users`, {...userInput}) ;
        return response.data.user as IUser;
    },
    updateUser: async (userUpdateInput: UserInput, id: string): Promise<IUser> => {
        const response =
            await axios.patch(`${baseURL}/users?id=${id}`, {...userUpdateInput}) ;
        return response.data.user as IUser;
    }
}