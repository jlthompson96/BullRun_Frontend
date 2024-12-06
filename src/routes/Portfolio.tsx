import { useState, useEffect } from 'react';
import { Button, Container, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { getUserStocks } from "../service/UserServices";
import AddStockModal from '../components/AddStockModal';
import axios from 'axios';

const Portfolio = () => {
    const [rows, setRows] = useState<Stock[]>([]);
    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]); // State for selected rows

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
            valueFormatter: (params) => {
                return `$${(params as number).toLocaleString()}`;
            }
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
        id: string; // Add a unique id field to your data model
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
            id: `${Date.now()}`, // Temporary unique ID
            symbol: stock.ticker,
            closePrice: 0,
            sharesOwned: parseFloat(shares),
            currentValue: 0,
            logoImage: '',
        };

        console.log('Stock added:', newStock);

        setRows((prevRows) => [...prevRows, newStock]);
    };

    const handleDeleteStock = () => {
        if (selectionModel.length === 0) {
            alert('Please select a stock to delete.');
            return;
        }

        const stockId = selectionModel[0];
        axios.delete('/stockData/deleteStock', { data: stockId }) // Pass the stockId in the request body
            .then(() => {
                setRows((prevRows) => prevRows.filter((row) => row.id !== stockId));
                setSelectionModel([]); // Clear the selection
            })
            .catch((error) => {
                console.error('Failed to delete stock:', error);
                alert('Failed to delete the stock. Please try again.');
            });
    };

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" gutterBottom>
                    Portfolio
                </Typography>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } },
                        }}
                        pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}
                        checkboxSelection
                        disableMultipleRowSelection
                        onRowSelectionModelChange={(newSelection) => setSelectionModel(newSelection)}
                    />
                </div>

                <div>
                    <br />
                    <Button variant="contained" onClick={() => setModalOpen(true)} sx={{ marginRight: '10px' }}>
                        Add Stock
                    </Button>
                    {selectionModel.length === 1 && ( // Show delete button only for single selection
                        <Button variant="contained" color="error" onClick={handleDeleteStock}>
                            Delete Stock
                        </Button>
                    )}
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
