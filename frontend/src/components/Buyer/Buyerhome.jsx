import { useState, useEffect } from 'react';
import { Grid, TextField, Box, Pagination } from '@mui/material';
import RecipeReviewCard from './SingleCard';

const YourComponent = () => {
    const [allProperties, setAllProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Adjust the number of items per page as needed

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
        setCurrentPage(1); // Reset to the first page on search
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const getPaginatedProperties = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredProperties.slice(startIndex, endIndex);
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
                {getPaginatedProperties().map((property) => (
                    <Grid item key={property._id} xs={12} sm={6} md={4} lg={3}>
                        <RecipeReviewCard property={property} />
                    </Grid>
                ))}
            </Grid>
            <Box display="flex" justifyContent="center" alignItems="center" mt={9}>
                <Pagination
                    count={Math.ceil(filteredProperties.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </div>
    );
};

export default YourComponent;
