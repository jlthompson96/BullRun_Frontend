import api from "./Axios-Instance";

export const getUserData = async (username: any) => {
    return api.get('/user/getUserList?username=' + username)
}