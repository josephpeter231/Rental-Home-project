import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, Divider, List, ListItem, ListItemText } from '@mui/material';
import { green } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Sellerdet from './SellerDetails'
const RecipeReviewCard = ({ property }) => {
    console.log(localStorage.getItem('buyerid'))
    const { title, location, area, bedrooms, bathrooms, price, nearbyHospitals, nearbyColleges, description, image, sellerid } = property;
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleInterestedClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <Button
                    onClick={handleInterestedClick}
                    style={{ color: 'white', backgroundColor: green[500] }}
                >
                    I'm Interested
                </Button>
                <IconButton
                    aria-expanded={expanded}
                    onClick={handleExpandClick}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
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
                    <Typography variant="body1">  <Sellerdet sellerId={sellerid} /></Typography>

                    {/* Add more property details as needed */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default RecipeReviewCard;