import {gql} from 'apollo-server-express';
export const typeDefs = gql`
    type Product{
        name: String,
        id: String,
        price: Float
    }

    type Query{
        getById(id:String!): Product,
        getAllProducts: [Product]
    }
`