import React, { useState } from "react";
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
import { CompanyProfile, StockData } from "../common/types";

const StockSearch: React.FC = () => {
    const [symbol, setSymbol] = useState<string>("");
    const [stockData, setStockData] = useState<StockData | null>(null);
    const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
    const [companyLogo, setCompanyLogo] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
    const [previousClose, setPreviousClose] = useState<number>(0);

    const truncateText = (text: string, maxLength: number): string => {
        if (!showFullDescription && text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        }
        return text;
    };

    const setStockChange = (stockData: StockData | null): string => {
        if (stockData) {
            const change = stockData.price - previousClose;
            const changePercent = (change / previousClose) * 100;
            return changePercent.toFixed(2);
        }
        return "0";
    }

    const getStockChangeColor = (): string => {
        if (stockData && 'price' in stockData) {
            const change = stockData.price - previousClose;
            if (change > 0) {
                return "green";
            } else if (change < 0) {
                return "red";
            }
        }
        return "black";
    };

    const handleShowMore = (): void => {
        setShowFullDescription(!showFullDescription);
    };

    const handleSearch = async (): Promise<void> => {
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
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("An unknown error occurred");
            }
        }
        setLoading(false);
    };

    function formatMarketCap(marketCap: number) {
        if (marketCap >= 1.0e+12) {
            return (marketCap / 1.0e+12).toFixed(2) + " Trillion";
        } else if (marketCap >= 1.0e+9) {
            return (marketCap / 1.0e+9).toFixed(2) + " Billion";
        } else if (marketCap >= 1.0e+6) {
            return (marketCap / 1.0e+6).toFixed(2) + " Million";
        } else {
            return marketCap.toString();
        }
    }

    const handleClear = (): void => {
        setStockData(null);
        setSymbol("");
    };

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" gutterBottom>
                    Stock Analyzer
                </Typography>
                <hr />
                <Typography variant="body1"> Enter a stock symbol to get the latest stock price and information about the company.</Typography>
                <TextField
                    variant="outlined"
                    label="Stock Symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Enter a stock symbol"
                    fullWidth
                    margin="normal"
                    sx={{ marginTop: '20px', width: '33%' }}
                />
                <br />
                <Button
                    variant="contained"
                    onClick={handleSearch}
                    disabled={loading}
                    sx={{ width: '15%', alignSelf: 'flex-end', marginTop: '20px' }} // Adjust marginLeft value
                >
                    {loading ? <CircularProgress size={24} /> : "Search"}
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleClear}
                    disabled={loading}
                    sx={{ width: '15%', alignSelf: 'flex-end', marginTop: '20px', marginLeft: '10px' }}
                >
                    Clear
                </Button>

                {error && <p>{error}</p>}
            </Paper>
            {stockData && (
                <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-data-container">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Typography variant="h5">{companyProfile?.results?.name}</Typography>
                            <div className="photo-container">
                                <img src={companyLogo} alt="Company Logo" />
                            </div>
                        </div>
                        <Typography sx={{ marginTop: '30px', marginBottom: '30px' }} variant="h2" style={{ color: getStockChangeColor() }}>
                            {`$${Math.round((stockData.price ?? 0) * 100) / 100}`}
                            {(stockData?.price ?? 0) - previousClose > 0 && <span>&#9650;</span>}
                            {(stockData?.price ?? 0) - previousClose < 0 && <span>&#9660;</span>}
                        </Typography>                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Daily Change $</Typography>
                                <b>
                                    <p style={{ color: getStockChangeColor() }}>
                                        ${Math.round(((stockData?.price ?? 0) - previousClose) * 100) / 100}
                                        {(stockData?.price ?? 0) - previousClose > 0 && <span>&#9650;</span>}
                                        {(stockData?.price ?? 0) - previousClose < 0 && <span>&#9660;</span>}
                                    </p>
                                </b>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Daily Change %</Typography>
                                <b>
                                    <p style={{ color: getStockChangeColor() }}>
                                        {setStockChange(stockData)}%
                                        {parseFloat(setStockChange(stockData)) > 0 && <span>&#9650;</span>}
                                        {parseFloat(setStockChange(stockData)) < 0 && <span>&#9660;</span>}
                                    </p>
                                </b>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Previous Close</Typography>
                                <b><p>${Math.round((previousClose) * 100) / 100}</p></b>
                            </div>
                        </div>
                        <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
                        <Typography variant="h6">About {companyProfile?.results?.name}</Typography>
                        <p>{truncateText(companyProfile?.results?.description ?? "", 500)}</p>
                        {companyProfile?.results?.description && (
                            <Button variant="outlined" onClick={handleShowMore} sx={{ width: '15%', alignSelf: 'flex-start' }}>
                                {showFullDescription ? "Show Less" : "Show More"}
                            </Button>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '50px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Market Cap</Typography>
                                <b><p>{formatMarketCap(companyProfile?.results?.market_cap)}</p></b>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Sector</Typography>
                                <b><p>{companyProfile?.results?.sic_description}</p></b>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Number of Employees</Typography>
                                <b><p>{companyProfile?.results?.total_employees.toLocaleString()}</p></b>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Website</Typography>
                                <a href={companyProfile?.results?.homepage_url} target="_blank" rel="noreferrer">
                                    {companyProfile?.results?.homepage_url}
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
