import api from "./Axios-Instance";

export const getUserStocks = async () => {
    return api.get('/users/getUserStocks');
}