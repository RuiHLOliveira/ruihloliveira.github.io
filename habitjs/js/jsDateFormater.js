export default {

    systemDate(dateObject) {
        let year = dateObject.getFullYear();
        let month = dateObject.getMonth() + 1
        let date = dateObject.getDate()
        return `${year}-${month}-${date}`
    },

    fullHour (dateObject) {
        let string = this.commonHour(dateObject)
        let second = dateObject.getSeconds()
        return `${string}:${second}`
    },

    commonHour(dateObject) {
        let hour = dateObject.getHours();
        let minute = dateObject.getMinutes()
        return `${hour}:${minute}`
    },
    
}