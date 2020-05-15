/*
Typescriptで記述しているので注意
【システムの流れ】
・顧客データの作成
・料金計算
・カレンダーに予約が無いかチェック
・カレンダーに登録
・予約完了メール送信
・備考欄の情報発信
*/
/*
GASはexport const ~は認識出来ないので注意
参考:https://qiita.com/nazoking@github/items/5689ba7d27d4cdfda8f5
*/
import { URL, SUB_ADDRESS } from '../config'
import { Data } from './createData';
import { isAvailableTime, checkDoubleBooking, sendToCalender } from './calender';
import { sendMailSuccess, sendMailFailure } from './sendMail';

function main() {
    try {
        const reservationData: Data = new Data(); //予約データ
        const isAbleToBook: boolean = checkDoubleBooking(reservationData); //予約可能か
        const betweenOpenTime = isAvailableTime(reservationData); //営業時間外か

        if (isAbleToBook && betweenOpenTime) {
            sendToCalender(reservationData);
            sendMailSuccess(reservationData);
        }
        else {
            sendMailFailure(reservationData);
        }
    }
    catch (e) {
        const spreadSheet = SpreadsheetApp.openByUrl(URL);
        const errorSheet = spreadSheet.getSheetByName('エラーログ');
        const lastRow = errorSheet.getLastRow();
        errorSheet.getRange(lastRow, 1).setValue(e);
        MailApp.sendEmail(SUB_ADDRESS, "コロナキャンペーンエラー", e);
    }
}