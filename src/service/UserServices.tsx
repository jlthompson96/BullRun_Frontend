import api from "./Axios-Instance";

export const getUserStocks = async () => {
    return api.get('/users/getUserStocks');
}

export const deleteUserStock = async (stockTicker: string) => {
    return api.delete(`/stockData/deleteStock?stockTicker=${stockTicker}`);
}