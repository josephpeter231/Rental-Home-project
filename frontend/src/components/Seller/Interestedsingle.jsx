import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import BASE_URL from '../../config';

const YourComponent = () => {
    const [interestedProperties, setInterestedProperties] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const sellerid = localStorage.getItem('sellerid');

    useEffect(() => {
        const fetchInterestedProperties = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/interested/${sellerid}`);
                setInterestedProperties(response.data);
                fetchUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching interested properties:', error);
            }
        };

        const fetchUserDetails = async (properties) => {
            const userIds = properties.flatMap(property => [property.buyerId, property.sellerId]);
            const uniqueUserIds = [...new Set(userIds)];
            const userDetailsMap = {};

            await Promise.all(uniqueUserIds.map(async (userId) => {
                try {
                    const response = await axios.get(`${BASE_URL}/api/user/${userId}`);
                    userDetailsMap[userId] = response.data;
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }));

            setUserDetails(userDetailsMap);
        };

        fetchInterestedProperties();
    }, [sellerid]);

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Interested Properties
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Property ID</TableCell>
                            <TableCell>Seller Name</TableCell>
                            
                            <TableCell>Seller Phone</TableCell>
                            <TableCell>Buyer Name</TableCell>
                            <TableCell>Buyer Email</TableCell>
                            <TableCell>Buyer Phone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {interestedProperties.map((property) => (
                            <TableRow key={property._id}>
                                <TableCell>{property.propertyId}</TableCell>
                                <TableCell>{userDetails[property.sellerId]?.firstName} {userDetails[property.sellerId]?.lastName}</TableCell>
                                
                                <TableCell>{userDetails[property.sellerId]?.phoneNumber}</TableCell>
                                <TableCell>{userDetails[property.buyerId]?.firstName} {userDetails[property.buyerId]?.lastName}</TableCell>
                                <TableCell>{userDetails[property.buyerId]?.email}</TableCell>
                                <TableCell>{userDetails[property.buyerId]?.phoneNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default YourComponent;
