const express = require("express");

const route = require("./controller/route.js");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("./public"));
app.use(express.static("./uploads"));

app.get("/", route.showIndex);

app.get("/:ablum", route.showAblum);
app.get("/up", route.showUp);
app.post("/up",route.ImgUp);
app.use(route.showErr);

app.listen(2980);