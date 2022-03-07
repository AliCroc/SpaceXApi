import { Request, Response } from "express";
const express = require("express")
import { graphqlHTTP } from "express-graphql";

import { RootSchema } from "./schema";
//express initialization
const app = express();
const cors = require('cors')
//PORT
const PORT = 5011; //|| process.env.PORT


app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use(cors())

//graphql playground setup code
app.use(
  "/graphql",
  graphqlHTTP({
    schema: RootSchema,
    graphiql: true
  })
);



//localhost setup
// app.listen(PORT, () => {
  // console.log("Graphql server now up at port 4000")
// });
