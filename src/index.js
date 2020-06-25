var http = require('http');
var {info,error} = require('./modules/my-log')
var {countries} = require('countries-list')
var url = require('url')
var querystring = require('querystring')
var server = http.createServer(function(request,response){
    var parsed = url.parse(request.url)
    var pathname = parsed.pathname; 
    console.log('parsed :',parsed)
    var query = querystring.parse(parsed.query)
    console.log('query:', query)  
    if (pathname === '/'){
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write('<html><body><p>HOME PAGE</p></body></html>');
        response.end();
    } else if (pathname === '/exit'){
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write('<html><body><p>EXIT PAGE</p></body></html>');
        response.end();
    } else if(pathname === '/info'){
        var result = info(pathname)
        response.writeHead(202,{'Content-Type':'text/html'});
        response.write(result);
        response.end();
    }
    else if (pathname === '/error'){
        var result = error(pathname)
        response.writeHead(202,{'Content-Type':'text/html'});
        response.write(result);
        response.end();
    }
    else if (pathname === '/country'){
        var result = error(pathname)
        response.writeHead(202,{'Content-Type':'application/json'});
        response.write(JSON.stringify(countries[query['code']]));            
        response.end();
    } else{
        response.writeHead(404,{'Content-Type':'text/html'});
        response.write('<html><body><p>NOT FOUND</p></body></html>');
        response.end();
    }


})

server.listen(4000);
console.log('running on 4000')