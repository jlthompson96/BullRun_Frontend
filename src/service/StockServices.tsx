/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./Axios-Instance";

export const getStockPrice = async (symbol: any) => {
    return api.get('/stockData/stockPrice?symbol=' + symbol)
};

export const getCompanyProfile = async (symbol: any) => {
    return api.get('/stockData/companyProfile?symbol=' + symbol)
}

export const getCompanyLogo = async (symbol: any) => {
    return api.get('/stockData/companyLogo?symbol=' + symbol)
}

export const getPreviousClose = async (symbol: any) => {
    return api.get('/stockData/previousClose?symbol=' + symbol)
}