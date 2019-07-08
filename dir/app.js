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
// Read xlsx file and set correct Sheet
const workBook = xlsx.readFile("C:\\Users\\Dmitry.Nahliuk\\WebstormProjects\\Jasmin\\supportFiles\\xlsxFiles\\FuFarmHelpPage.xlsx");
const sheet = workBook.Sheets[workBook.SheetNames[0]];
// console.log(readLine(sheet, 3).slice(1));
// console.log(readLine(sheet, 4).slice(2));
/**
 * Reading and return line data from data precondition
 * @param sheet
 * @param line
 */
function readLine(sheet, line) {
    const snakeConfigKeys = Object.keys(sheet);
    return readLineKeys(sheet, line).map((key) => {
        return sheet[key].v;
    });
}
/**
 * Reading and return line key from data precondition
 * @param sheet
 * @param line
 */
function readLineKeys(sheet, line) {
    const snakeConfigKeys = Object.keys(sheet);
    return snakeConfigKeys.filter((value) => {
        return value.search(new RegExp(`\\D+${line}$`)) !== -1;
    });
}
/**
 * Reading and return column data from data precondition
 * @param sheet
 * @param column
 */
function readColumn(sheet, column) {
    const configKeys = Object.keys(sheet);
    return readColumnKeys(sheet, column).map((key) => {
        return sheet[key].v;
    });
}
/**
 * Reading and return column key where present data from data precondition
 * @param sheet
 * @param column
 */
function readColumnKeys(sheet, column) {
    const snakeConfigKeys = Object.keys(sheet);
    return snakeConfigKeys.filter((value) => {
        return value.search(new RegExp(`${column}\\d+$`)) !== -1;
    });
}
readColumnKeys(sheet, "B").map((key) => {
    const matchArr = key.match(/\D+(\d+)/);
    return matchArr ? matchArr[1] : "";
}).slice(1).map((key) => {
    return parseInt(key);
}).map((lineIndex) => {
    return readLine(sheet, lineIndex).slice(1);
});
//# sourceMappingURL=app.js.map