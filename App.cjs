function sendTextMessage(code) {

    var phoneNumber = "+262692468721";
  
    var accountSid = 'ACc0bf7b31d06eac5ec11dfc46ccf4a8bb';
    var authToken = '3d776f598193a82d58da3a4bd89d4df5';
  
    var client = require('twilio')(accountSid, authToken);
  
    client.messages.create({ 
      to: phoneNumber,
      from: "+13469107080",
      body: "Your verification code for your Euclide Online Services Account is : " + code,
    }, function(err, message) {
      console.log(message);
    });
  
}

function code() {
    var code = "";
    for (let i = 0 ; i < 6 ; i++) {
        code = code + Math.floor(Math.random() * 10);
    }
    return code;
}

const { createServer } = require("http");

const hostname = '0.0.0.0';
const port = 8080;

const server = createServer((request,response)=>{
    response.writeHead(200,{"Content-Type" : "text/html"});
    const targetCode = code();
    sendTextMessage(targetCode);
    response.write(targetCode);
    return response.end();
});

server.listen(port,hostname,()=>{
  console.log(`Running server at http://${hostname}:${port}`);
});