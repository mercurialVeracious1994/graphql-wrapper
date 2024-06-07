import {ApolloServer} from "apollo-server";
import {typeDefs} from "./graphQL/schema";
import {resolvers} from "./graphQL/resolvers";
import {PostServiceCache} from "./service/PostService";
import {ProductServiceCache} from "./service/ProductService";

let postAPIInstance: PostServiceCache;
let productAPIInstance: ProductServiceCache;
if (!postAPIInstance) {
    postAPIInstance = new PostServiceCache();
    productAPIInstance = new ProductServiceCache();
}
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources:() => {
        return {
            postAPI: postAPIInstance,
            productAPI: productAPIInstance
        };
    },
})
server.listen(4000).then(response => {
    console.log(`🚀  Server ready at: ${response.url}`);
});
