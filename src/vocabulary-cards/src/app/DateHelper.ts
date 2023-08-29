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
        return today.getTime() * 1000;
    }

    static getNextDate(timestamp: number, numberOfDays: number): number {
        // @ts-ignore
        let dateFromTimestamp: number = new Date(timestamp * 1000);
        let amountSec = numberOfDays * 86400;

        return timestamp + amountSec
    }

    static compareDates(timestamp1: number, timestamp2: number) {
        //@ts-ignore
        let date1 = new Date(timestamp1 * 1000);

        //@ts-ignore
        let date2 = new Date(timestamp2 * 1000);

        if (date1.getDay() === date2.getDay() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()) {
            return true;
        }
        return false;
    }
}