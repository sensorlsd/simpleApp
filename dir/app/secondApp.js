"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const URL = "http://jsonplaceholder.typicode.com/posts/1";
axios_1.default.get(URL)
    .then(response => {
    // Response data has properties of:
    // id
    // name
    // email
    const todo = response.data;
    const id = todo.id;
    const name = todo.name;
    const title = todo.title;
    const body = todo.body;
    logTodo(id, name, title, body);
});
const logTodo = (id, name, title, body) => {
    console.log(`
            The comment with ID: ${id}
            Has name: ${name}
            Has title: ${title}
            And body: ${body}
        `);
};
//# sourceMappingURL=secondApp.js.map