import api from "./Axios-Instance";

export const getUserStocks = async () => {
    return api.get('/users/getUserStocks');
}

export const addUserStock = async (ticker: string, name: string, sharesOwned: number, costBasis: number) => {
    return api.post('/stockData/addStock', {
        symbol: ticker,
        sharesOwned: sharesOwned,
        name: name,
        costBasis: costBasis
    });
}

export const deleteUserStock = async (stockTicker: string) => {
    return api.delete(`/stockData/deleteStock?stockTicker=${stockTicker}`);
}

export const updateSharesOwned = async (stockTicker: string, sharesOwned: number) => {
    return api.put('/stockData/updateSharesOwned', {
        symbol: stockTicker,
        sharesOwned: sharesOwned,
    });
}