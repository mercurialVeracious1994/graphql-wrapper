import {gql} from 'apollo-server-express';
export const typeDefs = gql`
    type Product{
        name: String,
        id: String,
        price: Float
    }
    type Query {
        users: [User!]!
        user(id: ID!): User
        posts: [Post!]!
        post(id: ID!): Post
        products: [Product]
        product(id: ID!): Product
    }

    type User {
        id: ID!
        name: String!
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        isPublished: Boolean!
        author: User!
    }
    input PostInput {
        title: String!
        content: String!
        isPublished: Boolean!
        authorId: String!
    }
    input UserInput {
        name: String!
        postId: String!
    }
    type Mutation {
        addPost(input: PostInput!): Post!
#        addUser(input: UserInput!): User
        updatePost(input:PostInput, id: ID!): Post!
    }
`