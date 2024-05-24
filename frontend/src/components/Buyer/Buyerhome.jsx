import { useState, useEffect } from 'react';
import { Grid, TextField, Box } from '@mui/material';
import RecipeReviewCard from './SingleCard';

const YourComponent = () => {
    const [allProperties, setAllProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await fetch('http://localhost:5000/wholeproperties');
            const data = await response.json();
            setAllProperties(data);
            setFilteredProperties(data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    const handleSearch = (e) => {
        const lowercasedSearchTerm = e.target.value.toLowerCase();
        setSearchTerm(lowercasedSearchTerm);

        const filtered = allProperties.filter((property) => {
            return (
                property.title.toLowerCase().includes(lowercasedSearchTerm) ||
                property.location.toLowerCase().includes(lowercasedSearchTerm) ||
                property.area.toLowerCase().includes(lowercasedSearchTerm) ||
                property.description.toLowerCase().includes(lowercasedSearchTerm) ||
                property.nearbyHospitals.some(hospital => hospital.toLowerCase().includes(lowercasedSearchTerm)) ||
                property.nearbyColleges.some(college => college.toLowerCase().includes(lowercasedSearchTerm))
            );
        });

        setFilteredProperties(filtered);
    };

    return (
        <div>
            <h2>Properties</h2>
            <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </Box>
            <Grid container spacing={2}>
                {filteredProperties.map((property) => (
                    <Grid item key={property._id} xs={12} sm={6} md={4} lg={3}>
                        <RecipeReviewCard property={property} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default YourComponent;
