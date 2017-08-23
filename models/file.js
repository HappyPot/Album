const fs = require("fs");
const formidable = require('formidable');
const path = require("path");
const sd = require("silly-datetime");
//图片展示
exports.showAllAblum = (callback) => {
   
    fs.readdir("./uploads", (err, files) => {
       
        var ablumArray = [];
        if (err) {
            console.log(err);
            return;
        }
      
        (function iterator(i) {
          
            if (i == files.length) {
                console.log(ablumArray);
              
                callback(ablumArray);
                return;
            }
           
            fs.stat("./uploads/" + files[i], (err, stats) => {
                if (err) {
                    console.log("没有找到文件夹");
                    return;
                }
               
                if (stats.isDirectory()) {
                    ablumArray.push(files[i]);
                }
                iterator(i + 1);
            })

        })(0);

    })
}
//获取图片
exports.getAllImg = (ablum, callback) => {
   
    fs.readdir("./uploads/" + ablum, (err, files) =>{
      
        var AllImage = [];
        if(err) {
            callback(err,null);
            console.log("相册路径好像有问题");
            return;
        }
       
        (function iterator(i){
            if(i == files.length){
               
                callback(null,AllImage);
                return;
            }
           
            fs.stat("./uploads/" + ablum + "/"+files[i],(err,stats)=>{
                if (err) {
                    console.log("文件读取有点问题")
                    return;
                }
               
               if(stats.isFile()){
                   AllImage.push(files[i]);
               }
                iterator(i+1);
            })
        })(0)
        
    })
}
//上传图片
exports.UpFile = (req,callback)=>{
    var form = new formidable.IncomingForm();
    form.uploadDir = "./temp";
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        console.log(files);
         
        var houzhun = path.extname(files.tupian.name);
        var oldpath = files.tupian.path;
        var reurl = fields.wenjianjia;
        var newpath = "./uploads/"+fields.wenjianjia+"/"+tt+ran+houzhun;
        fs.rename(oldpath,newpath,(err)=>{
            if (err) {
                console.log("改名失败");
                return;
            }
            var success = true;
             callback(success,reurl);
        })
        
       
    });
}
