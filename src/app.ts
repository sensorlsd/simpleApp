import * as fs from "fs";
import * as xlsx from "xlsx";
import {Sheet, WorkBook} from "xlsx";
import * as path from "path";


// Set path to the file and correct sheet
const workBook: WorkBook = xlsx.readFile(
    "D:\\Programs\\Frameworks\\simpleApp\\supportFiles\\xlsxFiles\\FuFarmHelpPage.xlsx");
const sheet: Sheet = workBook.Sheets[workBook.SheetNames[0]];
const line: number = 3;


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


function readColumn(sheet: Sheet, column: string): string[] {
    const configKey: string[] = Object.keys(sheet);

    return readColumnKeys(sheet, column).map((key:string) => {
        return sheet[key].v;
    });
}


function readColumnKeys(sheet: Sheet, column: string): string[] {
    const snakeConfigKeys: string[] = Object.keys(sheet);

    return snakeConfigKeys.filter((value: string) => {
        return value.search(new RegExp(`${column}\\d+$`)) !== -1;
    });
}

 let multiTranslation: string[][] = readColumnKeys(sheet, "A").map((key: string) => {
    const matchArr: RegExpMatchArray | null  = key.match(/\D+(\d+)/);
    return matchArr ? matchArr[1] : "";
}).slice(1).map((key: string) => {
    return parseInt(key);
}).map((lineIndex: number) => {
    return readLine(sheet, lineIndex).slice(1);
});

let lang: string[] = readLine(sheet, line);
let translation: string[] = readColumn(sheet, "B").slice(2);

let fullTranslation: any = {};

for(let i=0; i < multiTranslation.length; i++){
    for (let j = 0; j < lang.length; j++) {
        fullTranslation[lang[j]] = [multiTranslation[0][j]]

    }
}
// console.log(translation);
// console.log(lang.length);
// console.log(multiTranslation[0].length);

console.log(fullTranslation);
