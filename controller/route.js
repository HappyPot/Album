
const file = require("../models/file.js");
const path = require("path");

exports.showIndex = (req,res)=>{
   
    file.showAllAblum((ablumArray)=>{
      
        res.render("index",{
            "ablums":ablumArray
        });
    })

}
//向外暴露shwoAblum函数,仅供测试使用
exports.showAblum = (req,res,next)=>{
   
     var ablum = req.params.ablum;
    
    if(ablum == "favicon.ico"){
        return;
    }
    console.log(ablum);
   
    file.getAllImg(ablum,(err,AllImage)=>{
       
        if(err){
          
            next();
            return;
        }
       
         res.render("ablum",{
        "ablumName":req.params.ablum,
        "ablumAllImg":AllImage
        });
    })
   
}

exports.showUp = (req,res)=>{
    file.showAllAblum((ablumArray)=>{
       
        res.render("up",{
            "ablums":ablumArray
        });
    })

}
//将图片上传到temp文件中
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
