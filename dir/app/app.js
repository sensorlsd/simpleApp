"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const http = __importStar(require("http"));
http.createServer((req, res) => {
    fs.readFile("./supportFiles/htmlFiles/help.html", (err, data) => {
        console.log("Server was started");
        res.writeHead(200, '{Content-Type: text/html}');
        res.write(data);
        res.end();
    });
}).listen(8080);
//# sourceMappingURL=app.js.map