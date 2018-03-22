const server = require('./app');

// write your code here
const portNo = 8484;

server.listen(portNo, () => {
    console.log("Server started at " + portNo);
});
