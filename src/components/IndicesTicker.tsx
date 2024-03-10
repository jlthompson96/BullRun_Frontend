import React, { useState, useEffect } from "react";
import {
    Container,
    Paper,
    Typography,
} from "@mui/material";
import "./StockSearch.scss"; // Assuming you have a custom CSS file
import { getIndicesData } from "../service/StockServices";


const IndiciesTicker: React.FC = () => {
    const [djiPrice, setDjiPrice] = useState<string>("");
    const [sp500Price, setSp500Price] = useState<string>("");
    const [nasdaqPrice, setNasdaqPrice] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchIndexData = async () => {
            try {
                const response = await getIndicesData();
                setDjiPrice(response.data.DJI);
                setSp500Price(response.data.SP500);
                setNasdaqPrice(response.data.NASDAQ);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError("An unknown error occurred");
                }
            }
        };
        fetchIndexData();
    }, []);

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" gutterBottom>
                    Stock Market Indices
                </Typography>
                <div className="error">{error}</div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', columnGap: '50px', textAlign: 'center' }}>
                    <div>
                        <p>Dow Jones Industrial Average (DJI)</p>
                        <b><p>{djiPrice}</p></b>
                    </div>
                    <div>
                        <p>S&amp;P 500</p>
                        <b><p>{sp500Price}</p></b>
                    </div>
                    <div>
                        <p>NASDAQ Composite (NASDAQ)</p>
                        <b><p>{nasdaqPrice}</p></b>
                    </div>
                </div>
            </Paper>
        </Container>
    );
};

export default IndiciesTicker;
