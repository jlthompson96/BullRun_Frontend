/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Paper, Typography, Link, Button, TextField, Stack, Divider } from "@mui/material";
import { useState } from "react";
import { getStockNews } from "../service/StockServices";

const StockNews = () => {
    const [news, setNews] = useState<unknown[]>([]);
    const [symbol, setSymbol] = useState<string>(""); // State for the stock symbol
    const [loading, setLoading] = useState<boolean>(false); // State to indicate loading status

    const getNews = () => {
        if (!symbol.trim()) {
            alert("Please enter a valid stock ticker symbol.");
            return;
        }
        setLoading(true);
        getStockNews(symbol)
            .then(response => {
                setNews(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching stock news:", error);
                setLoading(false);
            });
    };

    const clearData = () => {
        setSymbol("");
        setNews([]);
    };

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h4" align="center" gutterBottom>
                    Stock News
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>
                    Stay up-to-date with the latest news on your favorite stocks.
                </Typography>
            </Paper>
            <Divider sx={{ marginY: '20px' }} />
            <Paper elevation={3} sx={{ padding: "20px", marginTop: "50px" }} className="stock-search-container">
                <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
                    Search for Stock News
                </Typography>
                <Stack direction="row" spacing={2} sx={{ marginBottom: "20px" }}>
                    <TextField
                        label="Enter Stock Ticker"
                        variant="outlined"
                        fullWidth
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    />
                    {news.length > 0 && (
                        <Button variant="outlined" color="secondary" onClick={clearData}>
                            Clear
                        </Button>
                    )}
                </Stack>
                <Button variant="contained" onClick={getNews} disabled={loading}>
                    {loading ? "Loading..." : "Load News"}
                </Button>
                {news.length > 0 && (
                    <div style={{ marginTop: "20px" }}>
                        <Typography variant="h6">Latest News for {symbol}</Typography>
                        {news.map((item: any, index) => (
                            <div key={index} style={{ padding: "10px" }}>
                                <Link href={item.link} target="_blank" rel="noopener">
                                    <Typography variant="h6">{item.title}</Typography>
                                </Link>
                                <Typography variant="body2">{item.description}</Typography>
                                <Typography variant="body2">{new Date(item.pubDate).toLocaleString()}</Typography>
                                <hr />
                            </div>
                        ))}
                    </div>
                )}
            </Paper>
        </Container>
    );
};

export default StockNews;
