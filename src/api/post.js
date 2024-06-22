import axios from 'axios'
export const post = () => {
    axios({
        url: 'http://localhost:8080/order',
        method: 'post',
        data: {
            pStart: 0,
            pSize: 3
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(res => {
        console.log(res);
    })
}