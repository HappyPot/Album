const express = require("express");
//引入controller中的route.js进行控制页面
const route = require("./controller/route.js");

const app = express();
//引入模版为ejs
app.set("view engine", "ejs");
//使用中间件进行静态资源托管
app.use(express.static("./public"));
app.use(express.static("./uploads"));
//请求根目录是进行路由配置,该理由是MVC中的C模块进行控制调用哪个页面的显示
app.get("/", route.showIndex);
//利用:的语法可以去到req.params[]的语法去到:后面的属性值
app.get("/:ablum", route.showAblum);
app.get("/up", route.showUp);
app.post("/up",route.ImgUp);
app.use(route.showErr);
//监听3000端口
app.listen(2980);