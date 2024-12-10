import { useState, useEffect } from 'react';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Snackbar, Alert, Typography, AlertColor, Divider } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { getUserStocks, updateSharesOwned } from "../service/UserServices";
import AddStockModal from '../components/AddStockModal';
import axios from 'axios';
import UpdateSharesModal from '../components/UpdateSharesModal';

const Portfolio = () => {
    const [rows, setRows] = useState<Stock[]>([]);
    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedStockId, setSelectedStockId] = useState<string | null>(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' }); // Snackbar state

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedStockForUpdate, setSelectedStockForUpdate] = useState<Stock | null>(null);

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    interface Stock {
        id: string;
        symbol: string;
        closePrice: number;
        sharesOwned: number;
        currentValue: number;
        logoImage: string;
        price: number;
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
            logoImage: '',
            price: 0,
            currentValue: 0
        };

        setRows((prevRows) => [...prevRows, newStock]);
        setSnackbar({ open: true, message: 'Stock added successfully!', severity: 'success' }); // Show success snackbar
    };

    const handleDeleteStock = () => {
        if (selectionModel.length === 0) {
            alert('Please select a stock to delete.');
            return;
        }

        setSelectedStockId(selectionModel[0] as string);
        setIsConfirmOpen(true);
    };

    const confirmDeleteStock = () => {
        if (!selectedStockId) return;

        axios.delete('/stockData/deleteStock', { data: selectedStock?.symbol })
            .then(() => {
                setRows((prevRows) => prevRows.filter((row) => row.id !== selectedStockId));
                setSelectionModel([]);
                setSnackbar({ open: true, message: 'Stock deleted successfully!', severity: 'success' }); // Show success snackbar
            })
            .catch((error) => {
                console.error('Failed to delete stock:', error);
                setSnackbar({ open: true, message: 'Failed to delete the stock. Please try again.', severity: 'error' }); // Show error snackbar
            })
            .finally(() => setIsConfirmOpen(false));
    };
    const handleOpenUpdateModal = () => {
        if (selectionModel.length !== 1) {
            alert('Please select a single stock to update.');
            return;
        }
        const stockToUpdate = rows.find((row) => row.id === selectionModel[0]);
        if (stockToUpdate) {
            setSelectedStockForUpdate(stockToUpdate);
            setIsUpdateModalOpen(true);
        }
    };

    const handleUpdateShares = async (updatedStock: Stock) => {
        await updateSharesOwned(updatedStock.symbol, updatedStock.sharesOwned)
            .then(() => {
                setRows((prevRows) =>
                    prevRows.map((row) =>
                        row.symbol === updatedStock.symbol
                            ? { ...row, sharesOwned: updatedStock.sharesOwned, currentValue: updatedStock.sharesOwned * row.closePrice }
                            : row
                    )
                );
                setSnackbar({ open: true, message: 'Shares updated successfully!', severity: 'success' });
            })
            .catch((error) => {
                console.error('Failed to update shares:', error);
                setSnackbar({ open: true, message: 'Failed to update shares. Please try again.', severity: 'error' });
            })
            .finally(() => setIsUpdateModalOpen(false));
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const selectedStock = rows.find((row) => row.id === selectedStockId);

    const calculateTotalCurrentValue = () => {
        return rows.reduce((total, stock) => total + stock.currentValue, 0);
    };

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h4" align="center" gutterBottom>
                    Portfolio
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>
                    Manage your stock portfolio here.
                </Typography>
            </Paper>
            <Divider sx={{ marginY: '20px' }} />
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } },
                        }}
                        loading={rows.length === 0}
                        pageSizeOptions={[5, 10, 25]}
                        checkboxSelection
                        disableMultipleRowSelection
                        onRowSelectionModelChange={(newSelection) => setSelectionModel(newSelection)}
                    />
                </div>
                <Typography variant="h6" sx={{ marginTop: '20px' }}>
                    Total Current Value: ${calculateTotalCurrentValue().toLocaleString()}
                </Typography>
                <div>
                    <br />
                    <Button variant="contained" onClick={() => setIsModalOpen(true)} sx={{ marginRight: '10px' }}>
                        Add Stock
                    </Button>
                    {selectionModel.length === 1 && (
                        <>
                            <Button variant="contained" onClick={handleOpenUpdateModal} sx={{ marginRight: '10px' }}>
                                Update Shares
                            </Button>
                            <Button variant="contained" color="error" onClick={handleDeleteStock}>
                                Delete Stock
                            </Button>
                        </>
                    )}
                    <AddStockModal
                        open={isModalOpen}
                        handleClose={() => {
                            setIsModalOpen(false);
                            getUserStocks().then((response) => {
                                setRows(response.data);
                            });
                        }}
                        handleAddStock={handleAddStock}
                    />
                </div>
                <Dialog open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete the stock <strong>{selectedStock?.symbol ?? 'this stock'}</strong>?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsConfirmOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={confirmDeleteStock} color="error">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
                <UpdateSharesModal
                    open={isUpdateModalOpen}
                    stock={selectedStockForUpdate}
                    handleClose={() => setIsUpdateModalOpen(false)}
                    handleUpdateShares={handleUpdateShares}
                />
                {/* Snackbar */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbar.severity as AlertColor} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Paper>
        </Container>
    );
};

export default Portfolio;
