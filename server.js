// external and built-in modules
require('dotenv').config();
const http = require('http');

// local modules
const app = require('./src/app');

const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})
