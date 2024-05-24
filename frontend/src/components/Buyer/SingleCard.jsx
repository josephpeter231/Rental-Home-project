import React, { useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { green } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Sellerdet from './SellerDetails';

const RecipeReviewCard = ({ property }) => {
    const { title, location, area, bedrooms, bathrooms, price, nearbyHospitals, nearbyColleges, description, image, sellerid } = property;
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleInterestedClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddToFavorites = async () => {
        const buyerId = localStorage.getItem('buyerid'); // Assuming buyerid is stored in localStorage

        try {
            const response = await fetch('http://localhost:5000/add-to-favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    buyerId,
                    propertyId: property._id,
                    sellerId: sellerid
                })
            });

            if (response.ok) {
                setIsAddedToFavorites(true);
            } else {
                console.error('Failed to add to favorites');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={title}
                subheader={location}
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt={title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
                    <FavoriteIcon />
                </IconButton>
                <Button
                    onClick={handleInterestedClick}
                    style={{ color: 'white', backgroundColor: green[500] }}
                >
                    I'm Interested
                </Button>
            </CardActions>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Location: {location}</Typography>
                    <Typography variant="body1">Area: {area}</Typography>
                    <Typography variant="body1">Bedrooms: {bedrooms}</Typography>
                    <Typography variant="body1">Bathrooms: {bathrooms}</Typography>
                    <Typography variant="body1">Price: {price}</Typography>
                    <Typography variant="body1">Nearby Hospitals: {nearbyHospitals.join(', ')}</Typography>
                    <Typography variant="body1">Nearby Colleges: {nearbyColleges.join(', ')}</Typography>
                    <Typography variant="body1">Description: {description}</Typography>
                    <Typography variant="body1"><Sellerdet sellerId={sellerid} /></Typography>
                    {/* Add more property details as needed */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
            {isAddedToFavorites && <Typography variant="body2" color="primary">Item added to favorites!</Typography>}
        </Card>
    );
};

export default RecipeReviewCard;
