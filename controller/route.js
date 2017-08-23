//因为数据字典需要数据,所以就要调用M模块的中的file.js
const file = require("../models/file.js");
const path = require("path");
//向外暴露函数
exports.showIndex = (req,res)=>{
    //利用回调函数解决nodejs的异步问题
    file.showAllAblum((ablumArray)=>{
        //render是渲染模版的方法,并且后面跟一个数据字典供ejs模版使用
        res.render("index",{
            "ablums":ablumArray
        });
    })

}
//向外暴露shwoAblum函数,仅供测试使用
exports.showAblum = (req,res,next)=>{
    //得到请求头中的ablum的值
     var ablum = req.params.ablum;
     //判断如果是这个路径就要停止执行
    if(ablum == "favicon.ico"){
        return;
    }
    console.log(ablum);
    //获得所有的图片通过回调函数将异步改为同步
    file.getAllImg(ablum,(err,AllImage)=>{
        //传递一个错误的参数用来接受错误到错误页面
        if(err){
            //就是让错误跑到错误页面去
            next();
            return;
        }
        //返回到页面的select的option中
         res.render("ablum",{
        "ablumName":req.params.ablum,
        "ablumAllImg":AllImage
        });
    })
   
}
//上传页面功能一:向select中传入相册的值
exports.showUp = (req,res)=>{
    file.showAllAblum((ablumArray)=>{
        //render是渲染模版的方法,并且后面跟一个数据字典供ejs模版使用
        res.render("up",{
            "ablums":ablumArray
        });
    })

}
//上传页面功能二:将图片上传到temp文件中
exports.ImgUp = (req,res)=>{
    file.UpFile(req,(success,reurl)=>{
        if (success) {
            res.redirect(reurl);
        }else{
            res.send("false");
        }
    });
}
exports.showErr = (req,res)=>{
    res.render("err");
}
