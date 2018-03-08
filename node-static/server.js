var http = require('http')
var url = require('url')
var fs = require('fs')
http.createServer(function(req,res){
 
     
 	 pathname = __dirname  + url.parse(req.url).pathname
 	 console.log("__dirname = " + __dirname )
 	 console.log("pathname = " + url.parse(req.url).pathname)
 	 if (url.parse(req.url).pathname === '/') {
 	 	console.log(1)
 	  pathname +="index.html"}
 
	 fs.readFile(pathname,'binary',function(err,fileContent){
	 	if(err){
	 		console.log('404')
	 		res.writeHead(404,'not found')
	 		res.end("<h1>404 not found</h1>")
	 	}else{

	 		res.write(fileContent,'binary')
	 		res.end()
	 	}
	 })
}).listen(8888)
console.log('请监听8888')



