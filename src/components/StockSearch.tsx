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
import { getCompanyLogo, getCompanyProfile, getStockPrice } from "../service/StockServices";

const StockSearch = () => {
    const [symbol, setSymbol] = useState("");
    const [stockData, setStockData] = useState(null);
    const [companyProfile, setCompanyProfile] = useState(null);
    const [companyLogo, setCompanyLogo] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showFullDescription, setShowFullDescription] = useState(false);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + "...";
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
                    fullWidth
                >
                    {loading ? <CircularProgress size={24} /> : "Search"}
                </Button>
                {error && <p>{error}</p>}
            </Paper>
            {stockData && (
                <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-data-container">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <p>{companyProfile?.name}</p>
                            <div className="photo-container">
                                <img src={companyLogo} alt="Company Logo" />
                            </div>
                        </div>
                        <Typography sx={{ marginTop: '30px', marginBottom: '30px' }} variant="h2">${Math.round(stockData.price * 100) / 100}</Typography>
                        <Typography variant="h6">About {companyProfile?.name}</Typography>
                        <p>{truncateText(companyProfile?.description, 500)}</p>
                        {companyProfile?.description && (
                            <Button variant="contained" onClick={handleShowMore} sx={{ width: '15%', alignSelf: 'flex-start' }}>
                                {showFullDescription ? "Show Less" : "Show More"}
                            </Button>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '50px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">CEO</Typography>
                                <p>{companyProfile?.CEO}</p>
                            </div>
                            <Divider sx={{ marginY: 2 }} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Sector</Typography>
                                <p>{companyProfile?.sector}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Industry</Typography>
                                <p>{companyProfile?.industry}</p>
                            </div>
                        </div>
                    </div>
                </Paper>
            )}
        </Container>
    );
};

export default StockSearch;
