export const titleCase = (text:string) => {
    return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}

export const formatDate = (date: string) => {
    return new Date(Date.parse(date)).toLocaleDateString();
}