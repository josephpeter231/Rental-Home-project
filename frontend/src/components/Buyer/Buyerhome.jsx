    import { useState, useEffect } from 'react';
    import { Grid } from '@mui/material';
    import RecipeReviewCard from './SingleCard'
    
    const YourComponent = () => {
    const [properties, setProperties] = useState([]);
  

    useEffect(() => {
        fetch('http://localhost:5000/wholeproperties')
        .then((response) => response.json())
        .then((data) => {
            setProperties(data);
        })
        .catch((error) => {
            console.error('Error fetching properties:', error);
        });
    }, []);

    return (
        <div>
        <h2>Properties</h2>
        <Grid container spacing={2}>
            {properties.map((property) => (
            <Grid item key={property._id} xs={12} sm={6} md={4} lg={3}>
                <RecipeReviewCard property={property} />
            </Grid>
            ))}
        </Grid>
        </div>
    );
    };

    export default YourComponent;
