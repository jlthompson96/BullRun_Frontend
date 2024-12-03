import { useState, useEffect } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Alert,
} from '@mui/material';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
};

interface StockOption {
    ticker: string;
    name: string;
}

interface AddStockModalProps {
    open: boolean;
    handleClose: () => void;
    handleAddStock: (stock: StockOption, shares: string) => void;
}

const AddStockModal = ({ open, handleClose, handleAddStock }: AddStockModalProps) => {
    const [tickerInput, setTickerInput] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [selectedStock, setSelectedStock] = useState<StockOption | null>(null);
    const [sharesOwned, setSharesOwned] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (tickerInput.trim().length < 1) {
            setCompanyName('');
            return;
        }

        const debounceTimeout = setTimeout(async () => {
            setSearchLoading(true);
            setError(null);

            try {
                const response = await axios.get(`/stockData/companyProfile?symbol=${tickerInput.toUpperCase()}`);
                const result = response.data.results;

                if (result?.name) {
                    setCompanyName(result.name);
                    setSelectedStock({ ticker: result.ticker, name: result.name });
                } else {
                    setCompanyName('');
                    setSelectedStock(null);
                }
            } catch (err) {
                console.error('Error fetching stock data:', err);
                setError('There was an issue fetching the stock data. Please try again.');
                setCompanyName('');
                setSelectedStock(null);
            } finally {
                setSearchLoading(false);
            }
        }, 500); // 500ms debounce duration

        return () => clearTimeout(debounceTimeout); // Cleanup on tickerInput change
    }, [tickerInput]);

    const handleSubmit = async () => {
        if (selectedStock && sharesOwned) {
            setLoading(true);
            try {
                // Sending data to the addStock endpoint
                const response = await axios.post('/stockData/addStock', {
                    symbol: selectedStock.ticker,
                    sharesOwned: parseFloat(sharesOwned),
                    name: selectedStock.name,
                });

                // You can handle the response here, for example, show a success message
                console.log(response.data);

                // Close modal and reset states
                handleAddStock(selectedStock, sharesOwned);
                handleClose();
                setSelectedStock(null);
                setSharesOwned('');
                setTickerInput('');
                setCompanyName('');
            } catch (err) {
                console.error('Error submitting stock data:', err);
                setError('Failed to add stock. Please try again.');
            }
        } else {
            setError('Please select a stock and enter the number of shares.');
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!open) {
            setSelectedStock(null);
            setSharesOwned('');
            setTickerInput('');
            setCompanyName('');
            setError(null);
        }
    }, [open]);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6" component="h2" mb={2}>
                    Add New Stock
                </Typography>

                {/* Show error alert if there's an error */}
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <TextField
                    label="Search Stock Ticker"
                    value={tickerInput.toLocaleUpperCase()}
                    onChange={(e) => setTickerInput(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                />
                {searchLoading && (
                    <CircularProgress size={20} sx={{ display: 'block', margin: '10px auto' }} />
                )}
                {!searchLoading && companyName && (
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Add <b>{companyName.replace(/(Common Stock|Class A)/g, '').trim()}</b> to your portfolio?
                    </Typography>
                )}

                <TextField
                    label="Shares Owned"
                    type="number"
                    value={sharesOwned}
                    onChange={(e) => setSharesOwned(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                    disabled={!selectedStock || !sharesOwned || parseFloat(sharesOwned) <= 0 || loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Add Stock'}
                </Button>
                <Button variant="contained" color="secondary" onClick={handleClose} fullWidth>
                    Cancel
                </Button>
            </Box>
        </Modal>
    );
};

export default AddStockModal;
