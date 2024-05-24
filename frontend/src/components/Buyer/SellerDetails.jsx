import  { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

const ViewSellerDetails = ({ sellerId }) => {
    console.log(sellerId)
  const [open, setOpen] = useState(false);
  const [sellerDetails, setSellerDetails] = useState(null);
  
  const handleOpen = () => {
    setOpen(true);
    fetch(`http://localhost:5000/seller/${sellerId}`)
      .then((response) => response.json())
      .then((data) => {
        setSellerDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching seller details:', error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>View Seller Details</Button>
      {sellerDetails && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Seller Details</DialogTitle>
          <DialogContent>
            <Typography variant="body1">First Name: {}</Typography>
            <Typography variant="body1">Last Name: {sellerDetails.lastName}</Typography>
            <Typography variant="body1">Email: {sellerDetails.email}</Typography>
            <Typography variant="body1">Phone Number: {sellerDetails.phoneNumber}</Typography>
            {/* Add more seller details as needed */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ViewSellerDetails;
