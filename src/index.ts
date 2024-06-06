import {ApolloServer} from "apollo-server";
import {typeDefs} from "./graphQL/schema";
import {resolvers} from "./graphQL/resolvers";
import {PostServiceCache} from "./service/PostService";

let postAPIInstance: PostServiceCache;
if (!postAPIInstance) {
    postAPIInstance = new PostServiceCache();
}
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources:() => {
        return {
            postAPI: postAPIInstance,
        };
    },
})
server.listen(4000).then(response => {
    console.log(`🚀  Server ready at: ${response.url}`);
});
