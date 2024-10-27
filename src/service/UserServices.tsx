import api from "./Axios-Instance";

export const getUserStocks = async (u) => {
    return api.get('/users/getUserStocks');
}