import Axios from "@/utils/request"

export const login = (phone, password) => {
    return Axios({
        url: '/login',
        method: 'POST',
        data: {
            phone,
            password
        }
    })
}
export const register = (nicName, phone, password) => {
    return Axios({
        url: '/register',
        method: 'POST',
        data: {
            nicName,
            phone,
            password
        }
    })
}