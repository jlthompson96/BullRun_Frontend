import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { StockData } from '../common/types';

interface UpdateSharesModalProps {
    open: boolean;
    stock: StockData | null;
    handleClose: () => void;
    handleUpdateShares: (updatedStock: Stock) => void;
}

const UpdateSharesModal: React.FC<UpdateSharesModalProps> = ({ open, stock, handleClose, handleUpdateShares }) => {
    const [shares, setShares] = useState<number | ''>(stock?.sharesOwned ?? '');

    const handleSave = () => {
        if (stock && shares !== '') {
            handleUpdateShares({ ...stock, sharesOwned: shares });
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Shares for {stock?.symbol}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Number of Shares"
                    type="number"
                    fullWidth
                    value={shares}
                    onChange={(e) => setShares(Number(e.target.value))}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateSharesModal;
