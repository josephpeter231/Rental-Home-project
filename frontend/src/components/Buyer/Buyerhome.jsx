import { useState, useEffect } from 'react';
import { Grid, TextField, Box, Pagination, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import RecipeReviewCard from './SingleCard';

const YourComponent = () => {
    const [allProperties, setAllProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await fetch('https://rental-home-project.onrender.com/wholeproperties');
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
        applyFilters(allProperties, locationFilter, priceFilter, lowercasedSearchTerm);
    };

    const applyFilters = (data, location, price, searchTerm) => {
        let filtered = data;

        if (location) {
            filtered = filtered.filter(property => property.location.toLowerCase() === location.toLowerCase());
        }

        if (price) {
            const [minPrice, maxPrice] = price.split('-');
            filtered = filtered.filter(property => property.price >= minPrice && property.price <= maxPrice);
        }

        if (searchTerm) {
            filtered = filtered.filter((property) => {
                return (
                    property.title.toLowerCase().includes(searchTerm) ||
                    property.description.toLowerCase().includes(searchTerm) ||
                    property.nearbyHospitals.some(hospital => hospital.toLowerCase().includes(searchTerm)) ||
                    property.nearbyColleges.some(college => college.toLowerCase().includes(searchTerm))
                );
            });
        }

        setFilteredProperties(filtered);
        setCurrentPage(1); 
    };

    const handleLocationFilterChange = (e) => {
        const location = e.target.value;
        setLocationFilter(location);
        applyFilters(allProperties, location, priceFilter, searchTerm);
    };

    const handlePriceFilterChange = (e) => {
        const price = e.target.value;
        setPriceFilter(price);
        applyFilters(allProperties, locationFilter, price, searchTerm);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const getPaginatedProperties = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredProperties.slice(startIndex, endIndex);
    };

    // Define cities and price ranges
    const cities = ['Chennai', 'Bangalore', 'Pune'];
    const priceRanges = ['1000-25000', '25000-100000'];

    return (
        <div>
            <h2>Properties</h2>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel>Location</InputLabel>
                    <Select
                        value={locationFilter}
                        onChange={handleLocationFilterChange}
                        label="Location"
                    >
                        <MenuItem value="">All</MenuItem>
                        {cities.map((city, index) => (
                            <MenuItem key={index} value={city}>{city}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel>Price Range</InputLabel>
                    <Select
                        value={priceFilter}
                        onChange={handlePriceFilterChange}
                        label="Price Range"
                    >
                        <MenuItem value="">All</MenuItem>
                        {priceRanges.map((range, index) => (
                            <MenuItem key={index} value={range}>{range}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Grid container spacing={2}>
                {getPaginatedProperties().map((property) => (
                    <Grid item key={property._id} xs={12} sm={6} md={4} lg={3}>
                        <RecipeReviewCard property={property} />
                    </Grid>
                ))}
            </Grid>
            <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
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
