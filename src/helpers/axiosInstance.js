import axios from 'axios'


export default axios.create({
    baseURL: process.env["REACT_APP_API_URL"],
    headers: {
        "x-rapidapi-key" : process.env["REACT_APP_API_KEY"],
        "x-rapidapi-host": process.env["REACT_APP_API_HOST"],
        "useQueryString": true
    },
})
