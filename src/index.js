"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var schema_1 = require("./graphQL/product/schema");
var resolvers_1 = require("./graphQL/product/resolvers");
var server = new apollo_server_1.ApolloServer({ typeDefs: schema_1.typeDefs, resolvers: resolvers_1.resolvers });
server.listen(4000).then(function (response) {
    console.log("\uD83D\uDE80  Server ready at: ".concat(response.url));
});
