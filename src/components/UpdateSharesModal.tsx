import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { StockData } from '../common/types';

interface UpdateSharesModalProps {
    open: boolean;
    stock: StockData | null;
    handleClose: () => void;
    handleUpdateShares: (updatedStock: StockData) => void;
}

const UpdateSharesModal: React.FC<UpdateSharesModalProps> = ({ open, stock, handleClose, handleUpdateShares }) => {
    const [shares, setShares] = useState<number | ''>(stock?.sharesOwned ?? '');

    const handleSave = () => {
        if (stock && shares !== '' && shares >= 1) {
            handleUpdateShares({ ...stock, sharesOwned: shares });
            handleClose();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            setShares(value);
        } else {
            setShares('');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Shares for {stock?.symbol}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Shares Owned"
                    type="number"
                    fullWidth
                    value={shares}
                    onChange={handleChange}
                    slotProps={{ htmlInput: { min: 1 } }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave} disabled={shares === ''}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateSharesModal;
