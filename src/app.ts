import * as fs from "fs";
import * as http from "http";
import * as xlsx from "xlsx";
import {Sheet, WorkBook} from "xlsx";
import * as path from "path";
import {setInterval} from "timers";

// http.createServer((req, res) => {
//    fs.readFile("./supportFiles/htmlFiles/help.html", (err, data) => {
//        console.log("Server was started");
//        res.writeHead(200,'{Content-Type: text/html}');
//        res.write(data);
//        res.end();
//    });
// }).listen(8080);

//Comments


let startCell: string = "A3";
let translation = xlsx.readFile(
     "C:\\Users\\Dmitry.Nahliuk\\WebstormProjects\\Jasmin\\supportFiles\\xlsxFiles\\FuFarmHelpPage.xlsx");

const workBook: WorkBook = xlsx.readFile(
    "C:\\Users\\Dmitry.Nahliuk\\WebstormProjects\\Jasmin\\supportFiles\\xlsxFiles\\FuFarmHelpPage.xlsx");
const sheet: Sheet = workBook.Sheets[workBook.SheetNames[0]];

// console.log(readLine(sheet, 3).slice(1));
// console.log(readLine(sheet, 4).slice(2));

function readLine(sheet: Sheet, line: number): any[] {
    const snakeConfigKeys: string[] = Object.keys(sheet);

    return readLineKeys(sheet, line).map((key: string) => {
        return sheet[key].v;
    });
}

function readLineKeys(sheet: Sheet, line: number): any[] {
    const snakeConfigKeys: string[] = Object.keys(sheet);

    return snakeConfigKeys.filter((value: string) => {
        return value.search(new RegExp(`\\D+${line}$`)) !== -1;
    })
}

console.log(readColumnKeys(sheet, "B").map((key: string) => {
    const matchArr: RegExpMatchArray | null  = key.match(/\D+(\d+)/);
    return matchArr ? matchArr[1] : "";
}).slice(1).map((key: string) => {
    return parseInt(key);
}).map((lineIndex: number) => {
    return readLine(sheet, lineIndex).slice(1);
}));

function readColumnKeys(sheet: Sheet, column: string): string[] {
    const snakeConfigKeys: string[] = Object.keys(sheet);

    return snakeConfigKeys.filter((value: string) => {
        return value.search(new RegExp(`${column}\\d+$`)) !== -1;
    });
}