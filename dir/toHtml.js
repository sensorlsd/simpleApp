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
const workBook = xlsx.readFile("./supportFiles/xlsxFiles/FuFarmHelpPage.xlsx");
const sheet = workBook.Sheets[workBook.SheetNames[0]];
const line = 3;
function readLine(sheet, line) {
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
const phrases = readColumnKeys(sheet, "A").map((key) => {
    const matchArr = key.match(/\D+(\d+)/);
    return matchArr ? matchArr[1] : "";
}).slice(1).map((key) => {
    return parseInt(key);
}).map((lineIndex) => {
    const cells = readLine(sheet, lineIndex).slice(1);
    const phrase = {
        tags: [cells[0], cells[cells.length - 1]], texts: cells.slice(1, -1)
    };
    return phrase;
});
const langCodes = readLine(sheet, line).slice(1, -1);
const allL8n = langCodes.map((lang, index) => {
    const data = phrases.reduce((text, phrase) => {
        return text + `${phrase.tags[0]}${phrase.texts[index]}${phrase.tags[1]}\n`;
    }, "");
    const l8n = {
        lang,
        data
    };
    return l8n;
});
console.log(allL8n);
// TODO: save to html files in respective folders
// TODO: add parameter to separate mobile / desktop logic (save with different name)
//# sourceMappingURL=toHtml.js.map