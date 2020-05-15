import { URL } from '../config';

const spreadSheet = SpreadsheetApp.openByUrl(URL);
const formSheet = spreadSheet.getSheetByName('フォームの回答');
const lastRow = formSheet.getLastRow();

export class Data {

    //型定義
    price: number;
    timeStamp: Date;
    name: string;
    mailAddress: string;
    phoneNumber: string;
    numOftimes: string;
    howToUse: string;
    startDate: Date;
    numOfpeople: number;
    useTime: number;
    text: string | null;

    //データ作成
    constructor() {
        this.price = 0;
        this.timeStamp = formSheet.getRange(lastRow, 1).getValue();
        this.name = formSheet.getRange(lastRow, 2).getValue();
        this.mailAddress = formSheet.getRange(lastRow, 3).getValue();
        this.phoneNumber = formSheet.getRange(lastRow, 4).getValue();
        this.numOftimes = formSheet.getRange(lastRow, 5).getValue();
        this.howToUse = formSheet.getRange(lastRow, 6).getValue();
        this.startDate = formSheet.getRange(lastRow, 7).getValue();
        this.numOfpeople = formSheet.getRange(lastRow, 8).getValue();
        this.useTime = formSheet.getRange(lastRow, 9).getValue();
        this.text = formSheet.getRange(lastRow, 10).getValue() ?? null;
    }
}

