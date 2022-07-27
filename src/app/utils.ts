export function dateForDateTimeInputValue(date: Date): string {
    if(date) {
        return new Date(date?.getTime() + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 19)
    }
    return ""
} 