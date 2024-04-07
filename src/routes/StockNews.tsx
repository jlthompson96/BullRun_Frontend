/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Paper, Typography, Link, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { getStockNews } from "../service/StockServices";

const StockNews = () => {
    const [news, setNews] = useState<unknown[]>([]);
    const symbol = "AAPL"; // The stock symbol to fetch news for

    useEffect(() => {
        getStockNews(symbol) // Pass the required argument to the getStockNews function
            .then(response => setNews(response.data)) // Extract the data from the Axios response
            .catch(error => console.error("Error fetching stock news:", error));
    }, []);

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" gutterBottom>
                    News
                </Typography>
                <hr />
                <Typography variant="body1">
                    Welcome to the News section! Here you can read the latest news about the stock market, investing, and more. We have articles, from Yahoo Finance to help you stay up to date with the latest news.
                </Typography>
                <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                    Latest News for {symbol}
                </Typography>
                {news.length === 0 && <><Typography variant="h4">Loading News</Typography><CircularProgress /></>}
                {news.map((item: any, index) => (
                    <div key={index} style={{ padding: '10px' }}>
                        <Link href={item.link} target="_blank" rel="noopener">
                            <Typography variant="h6">{item.title}</Typography>
                        </Link>
                        <Typography variant="body2">{item.description}</Typography>
                        <Typography variant="body2">{new Date(item.pubDate).toLocaleString()}</Typography>
                        <hr />
                    </div>
                ))}
            </Paper>
        </Container>
    );
};

export default StockNews;