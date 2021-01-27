/*SERVER SETUP*/
const http = require("http");
const app = require("./app");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

// start server
server.listen(port, () => {
    console.log("Listening to requests on http://localhost:" + port);
});
/*
server.use(app); // app is imported from app.js
server.listen(8000, () => {
    console.log('App is listening on port 8000!')
});*/
