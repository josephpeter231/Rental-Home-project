import  { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import RecipeReviewCard from './SingleCard'
const YourComponent = () => {
    const [interestedProperties, setInterestedProperties] = useState([]);
    const [newprop,setNewProp] = useState([]);

    useEffect(() => {
        fetchInterestedProperties();
    }, []);

    const fetchInterestedProperties = async () => {
        try {
            const response = await fetch('https://rental-home-project.onrender.com/interested-properties');
            const data = await response.json();
            setInterestedProperties(data);
            console.log(data);
            fetchPropertiesByIds(data);
        } catch (error) {
            console.error('Error fetching interested properties:', error);
        }
    };

    const fetchPropertiesByIds = async (properties) => {
        try {
            const propertyIds = properties.map((property) => property.propertyId);
            const propertyData = [];
            for (const id of propertyIds) {
                const response = await fetch(`https://rental-home-project.onrender.com/singleproperty/${id}`);
                const property = await response.json();
                propertyData.push(property);
            }
            console.log(propertyData);
            setNewProp(propertyData);
        } catch (error) {
            console.error('Error fetching properties by IDs:', error);
        }
    };

    return (
        <div>
                <Grid container spacing={2}>
                {newprop.map((property) => (
                    <Grid item key={property._id} xs={12} sm={6} md={4} lg={3}>
                        <RecipeReviewCard property={property} />
                    </Grid>
                ))}
            </Grid>
            {/* Render content here */}
        </div>
    );
};

export default YourComponent;
