import * as xlsx from "xlsx";
import {Sheet, WorkBook} from "xlsx";
import {L8n, Phrase} from "./definitions";

// Set path to the file and correct sheet
const workBook: WorkBook = xlsx.readFile(
    "./supportFiles/xlsxFiles/FuFarmHelpPage.xlsx");
const sheet: Sheet = workBook.Sheets[workBook.SheetNames[0]];
const line: number = 3;

function readLine(sheet: Sheet, line: number): string[] {
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
    return readColumnKeys(sheet, column).map((key: string) => {
        return sheet[key].v;
    });
}

function readColumnKeys(sheet: Sheet, column: string): string[] {
    const snakeConfigKeys: string[] = Object.keys(sheet);

    return snakeConfigKeys.filter((value: string) => {
        return value.search(new RegExp(`${column}\\d+$`)) !== -1;
    });
}

const phrases: Phrase[] = readColumnKeys(sheet, "A").map((key: string) => {
    const matchArr: RegExpMatchArray | null = key.match(/\D+(\d+)/);
    return matchArr ? matchArr[1] : "";
}).slice(1).map((key: string) => {
    return parseInt(key);
}).map((lineIndex: number) => {
    const cells: string[] = readLine(sheet, lineIndex).slice(1);
    const phrase: Phrase = {
        tags: [cells[0], cells[cells.length - 1]],        texts: cells.slice(1, -1)
    };
    return phrase;
});

const langCodes: string[] = readLine(sheet, line).slice(1, -1);
const allL8n: L8n[] = langCodes.map((lang: string, index: number) => {
    const data: string = phrases.reduce((text: string, phrase: Phrase) => {
        return text + `${phrase.tags[0]}${phrase.texts[index]}${phrase.tags[1]}\n`
    }, "");
    const l8n: L8n = {
        lang,
        data
    };
    return l8n;
});

console.log(allL8n);

// TODO: save to html files in respective folders
// TODO: add parameter to separate mobile / desktop logic (save with different name)
