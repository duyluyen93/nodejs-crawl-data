var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var http = require("http");
var app = express();
app.use(express.static("public"));
app.set("views", "./views");
http.createServer(app).listen(8080)
console.log("Connected!")
var obj = JSON.parse(`{"list": []}`)

app.get("/", function (req, res) {
  request("https://www.thegioididong.com/dtdd-samsung", function (error, response, body) {
    if (error) {
      console.log(error)
    }
    else {
      var $ = cheerio.load(body)
      var tendt = $(".homeproduct li h3")
      var giadt = $(".homeproduct li strong")
      var mota = $(".filter-cate li .bginfo")
      var anh = $(".homeproduct li a").children("img:nth-child(1)")

      for (var i = 0; i < tendt.length; i++) {
        var image = ""
        if (i < 4) {
          image = "src"
        }
        else {
          image = "data-original"
        }
        obj.list[i] = {
          "ten": $(tendt[i]).text().toString(),
          "gia": $(giadt[i]).text().toString(),
          "manhinh": $(mota[i]).children("span:nth-child(1)").text().toString(),
          "hdh": $(mota[i]).children("span:nth-child(2)").text().toString(),
          "bonho": $(mota[i]).children("span:nth-child(4)").text().toString(),
          "anh": $(anh[i]).attr(image),
          "gia_format": parseInt($(giadt[i]).text().replace(/\D/g, "")),
        }
      };
      res.send(obj)
    }
  })
});