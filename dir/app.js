"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx = __importStar(require("xlsx"));
// Set path to the file and correct sheet
const workBook = xlsx.readFile("D:\\Programs\\Frameworks\\simpleApp\\supportFiles\\xlsxFiles\\FuFarmHelpPage.xlsx");
const sheet = workBook.Sheets[workBook.SheetNames[0]];
const line = 3;
function readLine(sheet, line) {
    const snakeConfigKeys = Object.keys(sheet);
    return readLineKeys(sheet, line).map((key) => {
        return sheet[key].v;
    });
}
function readLineKeys(sheet, line) {
    const snakeConfigKeys = Object.keys(sheet);
    return snakeConfigKeys.filter((value) => {
        return value.search(new RegExp(`\\D+${line}$`)) !== -1;
    });
}
function readColumn(sheet, column) {
    const configKey = Object.keys(sheet);
    return readColumnKeys(sheet, column).map((key) => {
        return sheet[key].v;
    });
}
function readColumnKeys(sheet, column) {
    const snakeConfigKeys = Object.keys(sheet);
    return snakeConfigKeys.filter((value) => {
        return value.search(new RegExp(`${column}\\d+$`)) !== -1;
    });
}
let multiTranslation = readColumnKeys(sheet, "A").map((key) => {
    const matchArr = key.match(/\D+(\d+)/);
    return matchArr ? matchArr[1] : "";
}).slice(1).map((key) => {
    return parseInt(key);
}).map((lineIndex) => {
    return readLine(sheet, lineIndex).slice(1);
});
let lang = readLine(sheet, line);
let translation = readColumn(sheet, "B").slice(2);
let fullTranslation = {};
for (let i = 0; i < multiTranslation.length; i++) {
    for (let j = 0; j < lang.length; j++) {
        fullTranslation[lang[j]] = [multiTranslation[0][j]];
    }
}
// console.log(translation);
// console.log(lang.length);
// console.log(multiTranslation[0].length);
console.log(fullTranslation);
//# sourceMappingURL=app.js.map