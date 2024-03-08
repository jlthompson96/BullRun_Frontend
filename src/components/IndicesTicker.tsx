import { Container, Paper } from "@mui/material";
import { getPreviousClose, getStockPrice } from "../service/StockServices";
import { useState, useEffect } from "react";
import { Padding } from "@mui/icons-material";

const IndicesTicker = () => {
    const [dji, setDji] = useState(0);
    const [djiPreviousClose, setDjiPreviousClose] = useState(0);
    const [sp500PreviousClose, setSp500PreviousClose] = useState(0);
    const [nasdaqPreviousClose, setNasdaqPreviousClose] = useState(0);
    const [sp500, setSp500] = useState(0);
    const [nasdaq, setNasdaq] = useState(0);
    const [error, setError] = useState(null); // Define error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all stock prices concurrently
                const [djiData, sp500Data, nasdaqData] = await Promise.all([
                    getStockPrice('DJI'),
                    getPreviousClose('DJI'),
                    getStockPrice('GSPC'),
                    getPreviousClose('GSPC'),
                    getStockPrice('IXIC'),
                    getPreviousClose('IXIC')
                ]);
                // Set the state for each stock price
                setDji(djiData.data.price);
                setDjiPreviousClose(djiData.data.previousClose);
                setSp500(sp500Data.data.price);
                setSp500PreviousClose(sp500Data.data.previousClose);
                setNasdaq(nasdaqData.data.price);
                setNasdaqPreviousClose(nasdaqData.data.previousClose);
            } catch (e) {
                setError(e.message); // Set error if fetch fails
            }
        };
        fetchData();
    }, []);


    const setStockChange = (stockData) => {
        if (stockData) {
            const change = stockData.price - previousClose;
            const changePercent = (change / previousClose) * 100;
            return changePercent.toFixed(2);
        }
        return 0;
    }

    const getStockChangeColor = () => {
        if (stockData) {
            const change = stockData.price - previousClose;
            if (change > 0) {
                return "green";
            } else if (change < 0) {
                return "red";
            }
        }
        return "black";
    };

    return (

        <Container maxWidth='lg' sx={{ marginBottom: '50px' }}>
            <Paper elevation={3} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <div style={{ padding: '10px' }}>
                    <h3>DJI</h3>
                    <b><p style={{ color: getStockChangeColor() }}>{`${Number(dji).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })} (${setStockChange(dji, djiPreviousClose)}%)`}</p></b>
                </div>
                <div style={{ padding: '10px' }}>
                    <h3>S&amp;P 500</h3>
                    <b><p style={{ color: getStockChangeColor() }}>{`${Number(sp500).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })} (${setStockChange(sp500, sp500PreviousClose)}%)`}</p></b>
                </div>
                <div style={{ padding: '10px' }}>
                    <h3>NASDAQ</h3>
                    <b><p style={{ color: getStockChangeColor() }}>{`${Number(nasdaq).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })} (${setStockChange(nasdaq)}%)`}</p></b>
                </div>
            </Paper>
        </Container>

    )
}

export default IndicesTicker;
