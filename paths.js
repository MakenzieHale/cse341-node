const fs = require('fs');

const requestHandler = (req,res) =>{
    const url = req.url;
    const method = req.method


if(url === '/'){
    res.write('<html>');
    res.write('<head><title>Welcome page</title></head>');
    res.write('<body><form action="users" method="POST"><input type="text" name="create-user"><button type="submit">Send</button></form></body>');
    res.write('</html>');

}
if (url === '/users' && method === 'POST'){
    const body =[];
    req.on('data',(chunk) =>{
        console.log(chunk);
        body.push(chunk);
    });
    req.on('end', () =>{
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        fs.writeFile('users.txt',message,(err)=>{
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    });

}

    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>User Page</title></head>');
    res.write('<body><h1>Welcome new user!</h1></body>');
    res.write('</html>');
    res.end();

};

module.exports = requestHandler;