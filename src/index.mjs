import express from "express";
import routes from "./routes/index.mjs"

// creates an instance of the Express application
const app = express();
app.use(express.json());
app.use(routes)

const PORT = process.env.PORT || 3000;

// handle  route
app.get("/", (req, res, next) => {
  console.log("Base url");
  next();
},
  (req, res) => {
    res.status(201).send({ msg: "HEllo" });
  }
);

// listen on the specified PORT
app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
