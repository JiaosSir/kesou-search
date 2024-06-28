import Axios from "@/utils/request"

export const login = (phone, password) => {
    return Axios({
        url: 'user/login',
        method: 'POST',
        data: {
            phone,
            password
        }
    })
}
export const register = (nicName, phone, password) => {
    return Axios({
        url: 'user/register',
        method: 'POST',
        data: {
            nicName,
            phone,
            password
        }
    })
}
export const getUserInfo = () => {
    return Axios({
        url: 'user/info',
    })
}