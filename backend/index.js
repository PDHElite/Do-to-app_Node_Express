const express = require ("express");
const mongoose = require("mongoose");
const cors = require ("cors");

const PORT = 3030;
const app = express();
const todoRouters = require("./routes/todoRoutes");
const connectionOptions = {useUnifiedTopology: true, useNewUrlParser:true};

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost/todolist", connectionOptions)
        .then(() => console.log("Connected Successfully"))
        .catch((err) => console.error(err));

app.use("/todos", todoRouters);

app.listen(PORT, () => {
    console.log("The server is listening on port" + PORT);
});