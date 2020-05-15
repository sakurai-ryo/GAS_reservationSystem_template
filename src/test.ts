import moment from 'moment';
import { URL } from '../config';
//const Moment = { moment: moment };

function test() {
    const spreadSheet = SpreadsheetApp.openByUrl(URL);
    const formSheet = spreadSheet.getSheetByName('フォームの回答');
    const lastRow = formSheet.getLastRow();

    const data = {
        startDate: formSheet.getRange(lastRow, 7).getValue(),
        numOfpeople: formSheet.getRange(lastRow, 8).getValue(),
        useTime: formSheet.getRange(lastRow, 9).getValue()
    }
    let money = 0;
    const startDate = Moment.moment(data.startDate);
    const startDateForAdd = Moment.moment(data.startDate);
    const endDate = startDateForAdd.add(data.useTime, 'hours');
    const noon = Moment.moment(data.startDate).hours(12).minutes(0).toDate();

    if (data.numOfpeople === 1) {
        if (endDate.isBefore(noon) || endDate.isSame(noon))
            money = 1000;
        else {
            var afterMorning = endDate.diff(noon, 'hours', true);
            if (startDate.isBefore(noon)) {
                var morning = Math.abs(startDate.diff(noon, 'hours', true));
                var afterMorning = endDate.diff(noon, 'hours', true);
                money = morning * 500 + afterMorning * 850;
            }
            else {
                var afterNoon = endDate.diff(startDate, 'hours', true);
                money = afterNoon * 850;
            }
        }
    }
    else {
        if (endDate.isBefore(noon) || endDate.isSame(noon))
            money = 2400;
        else {
            var afterMorning = endDate.diff(noon, 'hours', true);
            if (startDate.isBefore(noon)) {
                var morning = Math.abs(startDate.diff(noon, 'hours', true));
                var afterMorning = endDate.diff(noon, 'hours', true);
                console.log(afterMorning);
                money = morning * 1200 + afterMorning * 1500;
            }
            else {
                var afterNoon = endDate.diff(startDate, 'hours', true);
                money = afterNoon * 1500;
            }
        }
    }
    console.log(money);
}