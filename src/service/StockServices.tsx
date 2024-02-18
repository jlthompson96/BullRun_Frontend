/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./Axios-Instance";

export const getStockPrice = async (symbol: any) => {
    return api.post('/stockData/getStockPrice?symbol=' + symbol)
};