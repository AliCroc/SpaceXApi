"use strict";
exports.__esModule = true;
var express = require("express");
var express_graphql_1 = require("express-graphql");

var schema_1 = require("./schema");

var app = express();
var cors = require('cors');
//PORT
var PORT = 5011; 

app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.use(cors());
//graphql playground setup code
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.RootSchema,
    graphiql: true
}));
//localhost setup
// app.listen(PORT, function () {
    // console.log("Graphql server now up at port 4000")
// });
