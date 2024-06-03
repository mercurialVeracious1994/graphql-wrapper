export interface IUser{

    id: string,
    name: string,
    posts: IPost[]
}

export interface IPost {
    id: string,
    title: string,
    content: string,
    isPublished: string,
    author: IUser
}

export interface PostInput extends Omit<IPost, 'id' | 'author'> {
    authorId: string;
}

export type PostUpdateInput = Partial<PostInput>

