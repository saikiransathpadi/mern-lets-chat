export const getIstTime = (date = null) => {
    let dateUTC: any = date ? new Date(date) : new Date();
    dateUTC = dateUTC.getTime();
    const dateIST = new Date(dateUTC);
    // date shifting for IST timezone (+5 hours and 30 minutes)
    dateIST.setHours(dateIST.getHours() + 5);
    dateIST.setMinutes(dateIST.getMinutes() + 30);
    return dateIST;
};

export const addMinutes = (date: Date, minutes: number) => {
    return new Date(date.getTime() + minutes * 60000);
};
