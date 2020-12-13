export const getTime = (date) => {
    const dt = new Date(date)
    const hoursAndMinutes = `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`
    const dayAndMonth = `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth()+1).toString().padStart(2, '0')}`
    return `${hoursAndMinutes} ${dayAndMonth}`
}
