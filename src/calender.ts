import { Data } from './createData';
import { calculatePrice } from './calculatePrice';
import { MASTER_ADDRESS } from '../config';

const calender = CalendarApp.getCalendarById(MASTER_ADDRESS);

const createEndDate = (startDate: Date, useTime: number): Date => {
    let endDate = new Date(startDate);
    if (useTime === Math.floor(useTime)) {
        endDate.setHours(endDate.getHours() + useTime);
    }
    else {
        endDate.setHours(endDate.getHours() + Math.floor(useTime));
        endDate.setMinutes(endDate.getMinutes() + (useTime - Math.floor(useTime)) * 60);
    }
    return endDate;
}

export function createDescription(data: Data): string {

    const columns: { [key: string]: string; } = {
        "price": "値段",
        "timeStamp": "タイムスタンプ",
        "name": "名前",
        "mailAddress": "メールアドレス",
        "phoneNumber": "電話番号",
        "numOftimes": "使用回数",
        "howToUse": "使用用途",
        "startDate": "開始日時",
        "numOfpeople": "人数",
        "useTime": "使用時間(h)",
        "text": "備考欄"
    }

    let description = "";
    Object.keys(data).forEach((key) => {
        if (key === "startDate" || key === "timeStamp") {
            description += `【${columns[key]}】\n${Utilities.formatDate(data[key], 'JST', 'yyyy-MM-dd HH:mm')}\n\n`;
        }
        else if (key === "price") {
            description += `【${columns[key]}】\n${calculatePrice(data)}\n\n`;
        }
        else description += `【${columns[key]}】\n${data[key]}\n\n`;

    });
    return description;
}

export function isAvailableTime(data: Data): boolean {
    const today = new Date();
    const endDate = createEndDate(data.startDate, data.useTime);
    //利用日が前ならダメ
    if (data.startDate.getTime() < today.getTime()) return false;

    if (10 <= data.startDate.getHours() && endDate.getHours() <= 20) return true;
    else return false;
}

//すでに予約が無いかチェック
export function checkDoubleBooking(data: Data): boolean {
    const endDate = createEndDate(data.startDate, data.useTime);
    const checkBefore = new Date(data.startDate);
    checkBefore.setMinutes(checkBefore.getMinutes() - 15);
    const checkAfter = new Date(endDate);
    checkAfter.setMinutes(checkAfter.getMinutes() + 15);
    const existingEvents = calender.getEvents(checkBefore, checkAfter);
    if (existingEvents[0]) return false;
    else return true;
}

//カレンダーに送信
export function sendToCalender(data: Data) {
    const endDate = createEndDate(data.startDate, data.useTime);
    const title = `キャンペーン予約【${data.name}様】`;
    const event = calender.createEvent(title, data.startDate, endDate);
    const description = createDescription(data);
    console.log(description);
    event.setDescription(description);
}
