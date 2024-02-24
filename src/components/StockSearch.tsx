import { useState } from "react";
import { getCompanyLogo, getCompanyProfile, getStockPrice } from "../service/StockServices";
import { CompanyLogo, CompanyProfile, Stock } from "../common/types";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";

const StockSearch = () => {
    const [symbol, setSymbol] = useState('');
    const [stockData, setStockData] = useState<Stock | null>(null);
    const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
    const [companyLogo, setCompanyLogo] = useState('');
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
                }}
            >
                Search
            </Button>
            {loading && <CircularProgress />}
            {error && <p>{error}</p>}
            {stockData && (
                <div>
                    <p>${Math.round(stockData.price * 100) / 100}</p>
                    <Typography variant="h6">Company Profile</Typography>
                    <p>{companyProfile?.name}</p>
                    <p>{companyProfile?.description}</p>
                    <p>{companyProfile?.CEO}</p>
                    <p>{companyProfile?.sectory}</p>
                    <p>{companyProfile?.industry}</p>
                    <img src={companyLogo} alt="Company Logo" />
                </div>
            )}
        </div>
    );
}

export default StockSearch;