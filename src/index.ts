import {ApolloServer} from "apollo-server";
import {typeDefs} from "./graphQL/schema";
import {resolvers} from "./graphQL/resolvers";

const server = new ApolloServer({ typeDefs, resolvers })
server.listen(4000).then(response => {
    console.log(`🚀  Server ready at: ${response.url}`);
});
