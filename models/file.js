const fs = require("fs");
const formidable = require('formidable');
const path = require("path");
const sd = require("silly-datetime");
//向外暴露函数
exports.showAllAblum = (callback) => {
    //利用fs.readdir函数读出特定文件夹中的文件,此时向里面传递的路径是相对于app.js来说的路径,"./uploads"路径就是与app.js在同一级路径的,懂?
    fs.readdir("./uploads", (err, files) => {
        //声明一个数组来接受文件夹的名字
        var ablumArray = [];
        if (err) {
            console.log(err);
            return;
        }
        //利用函数的自执行来解决异步的问题
        (function iterator(i) {
            //判断如果i的值等于数组的长度,说明就这些文件夹没有别的了,那么就返回放文件夹的数组
            if (i == files.length) {
                console.log(ablumArray);
                //利用回调函数传上去
                callback(ablumArray);
                return;
            }
            //判断读取的文件
            fs.stat("./uploads/" + files[i], (err, stats) => {
                if (err) {
                    console.log("没有找到文件夹");
                    return;
                }
                //如果是文件夹就将此文件名push到数组中
                if (stats.isDirectory()) {
                    ablumArray.push(files[i]);
                }
                iterator(i + 1);
            })

        })(0);

    })
}
//具体的获得图片的业务交给M层来做
exports.getAllImg = (ablum, callback) => {
    //读取uploads+相册名中的图片
    fs.readdir("./uploads/" + ablum, (err, files) =>{
        console.log("就看这个"+ablum);
        //声明一个数组承接图片名的
        var AllImage = [];
        if(err) {
            //使用带一个错误回调的函数返回错误
            callback(err,null);
            console.log("相册路径好像有问题");
            return;
        }
        //利用自调用解决异步问题
        (function iterator(i){
            if(i == files.length){
                //如果没有错就返回图片数组
                callback(null,AllImage);
                return;
            }
            //注意里面的路径拼接的情况
            fs.stat("./uploads/" + ablum + "/"+files[i],(err,stats)=>{
                if (err) {
                    console.log("文件读取有点问题")
                    return;
                }
                //判断如果是文件那么就要将文件名装进数组
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
//M模块负责数据部分