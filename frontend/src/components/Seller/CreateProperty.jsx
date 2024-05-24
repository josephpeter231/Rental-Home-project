import { useState } from 'react';
import { TextField, Button, Container, Grid, Typography, Divider, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import BASE_URL from '../../config';

const PropertyForm = () => {
 
  const [property, setProperty] = useState({
    title: '',
    location: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
    image: '', // Add image field to the state
    nearbyHospitals: [''],
    nearbyColleges: [''],
    description: '',
    sellerid :localStorage.getItem('sellerid')
    
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddField = (field) => {
    setProperty((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const handleChangeNearby = (index, field, value) => {
    const updatedNearby = [...property[field]];
    updatedNearby[index] = value;
    setProperty((prev) => ({ ...prev, [field]: updatedNearby }));
  };
  const selleridf = localStorage.getItem('sellerid')
  console.log(selleridf)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/addprop`, property);
      console.log(response.data);
      setProperty({
        title: '',
        location: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        price: '',
        image: '', // Reset image field
        nearbyHospitals: [''],
        nearbyColleges: [''],
        description: '',
        sellerid :  localStorage.getItem('sellerid')
      });
    } catch (error) {
      console.error('Error saving property:', error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Post Property
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {Object.keys(property).map((key) => {
            if (key === 'nearbyHospitals' || key === 'nearbyColleges') {
              return (
                <>
                  <Grid item xs={12}>
                    <Divider variant="middle" />
                    <Typography variant="h6" gutterBottom>
                      {key === 'nearbyHospitals' ? 'Hospitals' : 'Colleges'}
                    </Typography>
                    {property[key].map((value, index) => (
                      <Grid item xs={12} key={`${key}-${index}`}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          label={`${key === 'nearbyHospitals' ? 'Hospital' : 'College'} ${index + 1}`}
                          value={value}
                          onChange={(e) => handleChangeNearby(index, key, e.target.value)}
                          required
                        />
                      </Grid>
                    ))}
                    <Box mt={1}>
                      <Button
                        onClick={() => handleAddField(key)}
                        variant="outlined"
                        startIcon={<AddCircleIcon />}
                      >
                        Add {key === 'nearbyHospitals' ? 'Hospital' : 'College'}
                      </Button>
                    </Box>
                  </Grid>
                </>
              );
            }
            return (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  name={key}
                  value={property[key]}
                  onChange={handleChange}
                  required
                />
              </Grid>
            );
          })}
         
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PropertyForm;
