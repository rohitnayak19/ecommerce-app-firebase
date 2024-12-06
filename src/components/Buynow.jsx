import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";
import { toast } from "react-toastify";

const BuyNow = ({ addressInfo, setAddressInfo, BuyNowFunc }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlesubmit = () => {
        handleClose()
        BuyNowFunc()
    }


    return (
        <div>
            <button
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
                onClick={handleOpen}
            >
                Proceed to Checkout
            </button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className="text-zinc-600 font-semibold">Buy Now</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        name="name"
                        fullWidth
                        margin="dense"
                        value={addressInfo.name}
                        onChange={(e) => {
                            setAddressInfo({
                                ...addressInfo,
                                name: e.target.value
                            })
                        }}
                    />
                    <TextField
                        label="Address"
                        name="address"
                        fullWidth
                        margin="dense"
                        multiline
                        rows={3}
                        value={addressInfo.address}
                        onChange={(e) => {
                            setAddressInfo({
                                ...addressInfo,
                                address: e.target.value
                            })
                        }}
                    />
                    <TextField
                        label="Pincode"
                        name="pincode"
                        fullWidth
                        margin="dense"
                        value={addressInfo.pincode}
                        onChange={(e) => {
                            setAddressInfo({
                                ...addressInfo,
                                pincode: e.target.value
                            })
                        }} s
                    />
                    <TextField
                        label="Mobile Number"
                        name="mobile"
                        fullWidth
                        margin="dense"
                        value={addressInfo.mobileNumber}
                        onChange={(e) => {
                            setAddressInfo({
                                ...addressInfo,
                                mobileNumber: e.target.value
                            })
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handlesubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BuyNow;
