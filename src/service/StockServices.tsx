/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./Axios-Instance";

export const getStockPrice = async (symbol: any) => {
    return api.post('/stockData/getStockPrice?symbol=' + symbol)
};

export const getCompanyProfile = async (symbol: any) => {
    return api.post('/stockData/getCompanyProfile?symbol=' + symbol)
}

export const getCompanyLogo = async (symbol: any) => {
    return api.post('/stockData/getCompanyLogo?symbol=' + symbol)
}