import { useState } from "react";
import { getStockPrice } from "../service/StockServices";
import { Stock } from "../common/types";
import { Button, CircularProgress, TextField } from "@mui/material";

const StockSearch = () => {
    const [symbol, setSymbol] = useState('');
    const [stockData, setStockData] = useState<Stock | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    return (
        <div>
            <TextField
                variant="outlined"
                label="Stock Symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Enter a stock symbol"
            />
            <Button
                variant="contained"
                onClick={async () => {
                    setLoading(true);
                    try {
                        const response = await getStockPrice(symbol);
                        setStockData(response.data);
                    } catch (e) {
                        setError(e.message);
                    }
                    setLoading(false);
                }}
            >
                Search
            </Button>
            {loading && <CircularProgress />}
            {error && <p>{error}</p>}
            {stockData && (
                <div>
                    <p>{Math.round(stockData.price * 100) / 100}</p>
                </div>
            )}
        </div>
    );
}

export default StockSearch;