import { useState } from "react";
import {
    Button,
    CircularProgress,
    Container,
    Divider,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import "./StockSearch.scss"; // Assuming you have a custom CSS file
import { getCompanyLogo, getCompanyProfile, getPreviousClose, getStockPrice } from "../service/StockServices";

const StockSearch = () => {
    const [symbol, setSymbol] = useState("");
    const [stockData, setStockData] = useState(null);
    const [companyProfile, setCompanyProfile] = useState(null);
    const [companyLogo, setCompanyLogo] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [previousClose, setPreviousClose] = useState(0);

    const truncateText = (text, maxLength) => {
        if (!showFullDescription && text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        }
        return text;
    };

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

    const handleShowMore = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await getStockPrice(symbol);
            const companyProfileResponse = await getCompanyProfile(symbol);
            const companyLogoResponse = await getCompanyLogo(symbol);
            const previousCloseResponse = await getPreviousClose(symbol);
            setPreviousClose(previousCloseResponse.data.close);
            setStockData(response.data);
            setCompanyProfile(companyProfileResponse.data);
            const companyLogo = { url: companyLogoResponse.data.url };
            const logoString = `${companyLogo?.url}`;
            setCompanyLogo(logoString);
        } catch (e) {
            setError(e.message);
        }
        setLoading(false);
    };

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: '20px' }} className="stock-search-container">
                <Typography variant="h5" gutterBottom>
                    Stock Search
                </Typography>
                <TextField
                    variant="outlined"
                    label="Stock Symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Enter a stock symbol"
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    onClick={handleSearch}
                    disabled={loading}
                    sx={{ width: '15%', alignSelf: 'flex-end', marginTop: '20px', marginLeft: '85' }}
                >
                    {loading ? <CircularProgress size={24} /> : "Search"}
                </Button>
                {error && <p>{error}</p>}
            </Paper>
            {stockData && (
                <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-data-container">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Typography variant="h5">{companyProfile?.name}</Typography>
                            <div className="photo-container">
                                <img src={companyLogo} alt="Company Logo" />
                            </div>
                        </div>
                        <Typography sx={{ marginTop: '30px', marginBottom: '30px' }} variant="h2" style={{ color: getStockChangeColor() }}>
                            {`$${Math.round(stockData.price * 100) / 100}`}
                            {stockData.price - previousClose > 0 && <span>&#9650;</span>}
                            {stockData.price - previousClose < 0 && <span>&#9660;</span>}
                        </Typography>                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Daily Change $</Typography>
                                <b><p style={{ color: getStockChangeColor() }}>${Math.round((stockData.price - previousClose) * 100) / 100}</p></b>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Daily Change %</Typography>
                                <b><p style={{ color: getStockChangeColor() }}>{setStockChange(stockData)}%</p></b>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Previous Close</Typography>
                                <b><p>${Math.round((previousClose) * 100) / 100}</p></b>
                            </div>
                        </div>
                        <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
                        <Typography variant="h6">About {companyProfile?.name}</Typography>
                        <p>{truncateText(companyProfile?.description, 500)}</p>
                        {companyProfile?.description && (
                            <Button variant="outlined" onClick={handleShowMore} sx={{ width: '15%', alignSelf: 'flex-start' }}>
                                {showFullDescription ? "Show Less" : "Show More"}
                            </Button>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '50px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">CEO</Typography>
                                <b><p>{companyProfile?.CEO}</p></b>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Sector</Typography>
                                <b><p>{companyProfile?.sector}</p></b>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Industry</Typography>
                                <b><p>{companyProfile?.industry}</p></b>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Website</Typography>
                                <a href={companyProfile?.website} target="_blank" rel="noreferrer">
                                    {companyProfile?.website}
                                </a>
                            </div>
                        </div>
                    </div>
                </Paper>
            )
            }
        </Container >
    );
};

export default StockSearch;
