export const parseDate = (date: Date) =>
    `${date.getDate() < 10 ? "0" : ""}${date.getDate()}/${
        date.getMonth() < 10 ? "0" : ""
    }${date.getMonth() + 1}/${date.getFullYear()}`;

export const caps = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
