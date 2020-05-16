import { Data } from './createData';
import moment from 'moment';
//const Moment = { moment: moment };

export function calculatePrice(data: Data): number {
    let money = 0;
    const startDate = Moment.moment(data.startDate);
    const startDateForAdd = Moment.moment(data.startDate);
    const endDate = startDateForAdd.add(data.useTime, 'hours');
    const noon = Moment.moment(data.startDate).hours(12).minutes(0).toDate();

    if (data.numOfpeople === 1) {
        if (endDate.isBefore(noon) || endDate.isSame(noon))
            money = 1000;
        else {
            const afterMorning = endDate.diff(noon, 'hours', true);
            if (startDate.isBefore(noon)) {
                const morning = Math.abs(startDate.diff(noon, 'hours', true));
                const afterMorning = endDate.diff(noon, 'hours', true);
                money = morning * 500 + afterMorning * 850;
            }
            else {
                const afterNoon = endDate.diff(startDate, 'hours', true);
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
                const morning = Math.abs(startDate.diff(noon, 'hours', true));
                const afterMorning = endDate.diff(noon, 'hours', true);
                console.log(afterMorning);
                money = morning * 1200 + afterMorning * 1500;
            }
            else {
                const afterNoon = endDate.diff(startDate, 'hours', true);
                money = afterNoon * 1500;
            }
        }
    }
    return Math.floor(money);
}