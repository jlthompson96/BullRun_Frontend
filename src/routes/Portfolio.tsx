import { useState, useEffect } from 'react';
import { Button, Container, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getUserStocks } from "../service/UserServices";
import AddStockModal from '../components/AddStockModal';

const Portfolio = () => {
    const [rows, setRows] = useState<Stock[]>([]);

    const cleanCompanyName = (name: string) => {
        return name.replace(/(Common Stock|Class A)/g, '').trim();
    };

    const columns: GridColDef[] = [
        {
            field: 'symbol',
            headerName: 'Symbol',
            width: 150,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={`data:image/png;base64,${params.row.logoImage}`}
                        alt="Logo"
                        style={{
                            width: 24,
                            height: 24,
                            marginRight: 8,
                            borderRadius: '50%'
                        }}
                    />
                    {params.value}
                </div>
            ),
        },
        {
            field: 'name',
            headerName: 'Company Name',
            width: 150,
            valueGetter: (params: { row: { name?: string } }) => {
                const name = params;
                console.log('Company Name:', name);
                return typeof name === 'string' ? cleanCompanyName(name) : '';
            },
        },
        { field: 'closePrice', headerName: 'Close Price', type: 'number', width: 150 },
        { field: 'sharesOwned', headerName: 'Shares Owned', type: 'number', width: 150 },
        {
            field: 'currentValue',
            headerName: 'Current Value',
            type: 'number',
            width: 150,
        },
    ];

    useEffect(() => {
        getUserStocks().then((response) => {
            console.log(response.data);
            setRows(response.data);
        });
    }, []);

    const [isModalOpen, setModalOpen] = useState(false);

    interface Stock {
        symbol: string;
        closePrice: number;
        sharesOwned: number;
        currentValue: number;
        logoImage: string;
    }

    interface StockOption {
        ticker: string;
        name: string;
    }

    const handleAddStock = (stock: StockOption, shares: string) => {
        const newStock: Stock = {
            symbol: stock.ticker, // Use `ticker` from StockOption
            closePrice: 0, // Replace with actual value if available
            sharesOwned: parseFloat(shares), // Convert shares from string to number
            currentValue: 0, // Replace with actual value if available
            logoImage: '', // Replace with actual image source if available
        };

        console.log('Stock added:', newStock);

        // Optionally, update the state to reflect the new stock
        setRows((prevRows) => [...prevRows, newStock]);
    };

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" gutterBottom>
                    Portfolio
                </Typography>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                        pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]} />
                </div>

                <div>
                    <br />
                    <Button variant="contained" onClick={() => setModalOpen(true)}>
                        Add Stock
                    </Button>
                    <AddStockModal
                        open={isModalOpen}
                        handleClose={() => {
                            setModalOpen(false);
                            getUserStocks().then((response) => {
                                setRows(response.data);
                            });
                        }}
                        handleAddStock={handleAddStock}
                    />

                </div>
            </Paper>
        </Container>
    );
};

export default Portfolio;