import {gql} from 'apollo-server-express';
export const typeDefs = gql`
    type Product{
        name: String,
        id: String,
        price: Float
    }

    type ProductEdge {
        node: Product
        cursor: String
    }
    type PageInfo {
        endCursor: String!
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
        startCursor: String
    }
    type ProductConnection {
        totalCount: Int!
        pageInfo: PageInfo!
        edges: [ProductEdge]
    }
    type Query {
        users: [User!]!
        user(id: ID!): User
        posts: [Post!]!
        postsPagination(limit: Int!, page: Int!): [Post!]!
        post(id: ID!): Post
        products: [Product]
        productPagination(cursor: String!, first: Int!): ProductConnection
        product(id: ID!): Product
    }

    type User {
        id: ID!
        name: String!
        posts: [Post!]
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        isPublished: Boolean!
        user: User
    }
    
#    @cacheControl(maxAge: 3600, scope: PUBLIC)
    
    input PostInput {
        title: String
        content: String
        isPublished: Boolean
        authorId: String
    }
    input UserInput {
        name: String
    }
    type Mutation {
        addPost(input: PostInput!): Post!
        addUser(input: UserInput!): User!
        updateUser(input: UserInput,id: ID!): User!
        updatePost(input:PostInput, id: ID!): Post!
    }
#    enum CacheControlScope {
#        PUBLIC
#        PRIVATE
#    }

#    directive @cacheControl(
#        maxAge: Int
#        scope: CacheControlScope
#        inheritMaxAge: Boolean
#    ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
`