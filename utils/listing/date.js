

class KrDate {

    now = () => {
        const now = new Date();
        return this.toISODate(now);
    }

    autzNow = () => {
        const date = this.setTime(9);
        return this.toISODate(date);
    }

    lastSevenDays = () => {
        const date = this.setTime(-24*7);
        return this.toISODate(date);
    }

    lastThirtyDays = () => {
        const date = this.setTime(-24*30);
        return this.toISODate(date);
    }

    lastOneHour = () => {
        const date = this.setTime(-1);
        return this.toISODate(date);
    }

    setTime = (hours) => {
        const date = new Date();
        date.setTime(date.getTime() + 1000*60*60*hours);

        return date;
    }

    toISODate = (date) => {
        const d = {
            year: date.getFullYear(),
            month: ('00' + (date.getMonth()+1)).slice(-2),
            day: ('00' + date.getDate()).slice(-2),
            hour: ('00' + date.getHours()).slice(-2),
            minute: ('00' + date.getMinutes()).slice(-2),
            second: ('00' + date.getSeconds()).slice(-2),
        }
    
        return `${d.year}-${d.month}-${d.day} ${d.hour}:${d.minute}:${d.second}`;
    }
}

module.exports = new KrDate();