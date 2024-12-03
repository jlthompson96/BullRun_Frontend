import { useState, useEffect } from 'react';
import { Button, Container, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getUserStocks } from "../service/UserServices";
import AddStockModal from '../components/AddStockModal';

const Portfolio = () => {
    const [rows, setRows] = useState([]);

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

    const handleAddStock = (stock: Stock) => {
        console.log('Stock added:', stock);
        // Add stock to your state or send it to the backend
    };
    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" gutterBottom>
                    Portfolio
                </Typography>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} />
                </div>

                <div>
                    <Button variant="contained" onClick={() => setModalOpen(true)}>
                        Add Stock
                    </Button>
                    <AddStockModal
                        open={isModalOpen}
                        handleClose={() => setModalOpen(false)}
                        handleAddStock={handleAddStock}
                    />
                </div>

            </Paper>
        </Container>
    );
};

export default Portfolio;