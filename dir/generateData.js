"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const req = http_1.request({
    host: 'jsonplaceholder.typicode.com',
    path: '/todos/1',
    method: 'GET',
}, response => {
    console.log(response.statusCode);
    console.log(response.headers);
    console.log(response.statusMessage);
});
req.end();
//# sourceMappingURL=generateData.js.map