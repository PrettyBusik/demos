export class DateHelper {

    static formatDate(timeStamp: number): string {
        // @ts-ignore
        let date = new Date(timeStamp * 1000);

        let day = date.getDay().toString();
        let month = date.getMonth().toString();
        let year = date.getFullYear().toString();

        return day.padStart(2, "0") + "." + month.padStart(2, "0") + "." + year;
    }

    static getTimeStampForToday(): number {
        // @ts-ignore
        let today = new Date();
        today.setHours(0,0,0);

        return Math.round(today.getTime()/ 1000);
    }

    static getNextDate(timestamp: number, numberOfDays: number): number {
        // @ts-ignore
        let dateFromTimestamp: number = new Date(timestamp * 1000);
        let amountSec = numberOfDays * 86400;

        return timestamp + amountSec
    }

    static areDatesEqual(timestamp1: number, timestamp2: number) {
        if (timestamp1 === timestamp2) {
            return true
        }
        return false;
    }

    static isDateLessOrEqual(timestamp1:number, timestamp2:number):boolean {
        if (timestamp1 < timestamp2) {
            return true
        }
        return false;
    }
}