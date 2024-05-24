import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import BASE_URL from '../../config';

const YourComponent = () => {
  const [properties, setProperties] = useState([]);
  const [editProperty, setEditProperty] = useState(null); // State to manage the edit form
  const [deleteProperty, setDeleteProperty] = useState(null); // State to manage the delete confirmation dialog
  const sellerid = localStorage.getItem('sellerid');

  useEffect(() => {
    fetch(`http://localhost:5000/allproperties/seller/${sellerid}`)
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
      })
      .catch((error) => {
        console.error('Error fetching properties:', error);
      });
  }, []);

  const handleEdit = (id) => {
    const propertyToEdit = properties.find((property) => property._id === id);
    setEditProperty(propertyToEdit);
  };

  const handleCloseEditForm = () => {
    setEditProperty(null);
  };

  const handleSaveEditForm = (editedProperty) => {
    fetch(`http://localhost:5000/property/${editProperty._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editProperty),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update property');
        }
        return response.json();
      })
      .then((updatedProperty) => {
        // Update the properties state with the updated property
        const updatedProperties = properties.map((property) =>
          property._id === updatedProperty._id ? updatedProperty : property
        );
        setProperties(updatedProperties);
        
        setEditProperty(null);
      })
      .catch((error) => {
        console.error('Error updating property:', error);
      });
  };

  const handleDelete = (id) => {
    const propertyToDelete = properties.find((property) => property._id === id);
    setDeleteProperty(propertyToDelete);
  };

  const handleConfirmDelete = () => {
    // Implement logic to delete property
    const id = deleteProperty._id
    console.log('Deleted property:', deleteProperty);
    fetch(`http://localhost:5000/property/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted property from the state
          setProperties(properties.filter((property) => property._id !== id));
        } else {
          throw new Error('Failed to delete property');
        }
      })
      .catch((error) => {
        console.error('Error deleting property:', error);
      });
  
    // Close the delete confirmation dialog
    setDeleteProperty(null);
  };

  return (
    <div>
      <h2>Properties Table</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Bedrooms</TableCell>
              <TableCell>Bathrooms</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Nearby Hospitals</TableCell>
              <TableCell>Nearby Colleges</TableCell>
              <TableCell>Description</TableCell>
              
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property._id}>
                <TableCell>{property.title}</TableCell>
                <TableCell>{property.location}</TableCell>
                <TableCell>{property.area}</TableCell>
                <TableCell>{property.bedrooms}</TableCell>
                <TableCell>{property.bathrooms}</TableCell>
                <TableCell>{property.price}</TableCell>
                <TableCell>{property.nearbyHospitals.join(', ')}</TableCell>
                <TableCell>{property.nearbyColleges.join(', ')}</TableCell>
                <TableCell>{property.description}</TableCell>
                
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEdit(property._id)}>Edit</Button>
                  <Button variant="outlined" onClick={() => handleDelete(property._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Render the edit form */}
      <Dialog open={Boolean(editProperty)} onClose={handleCloseEditForm}>
        <DialogTitle>Edit Property</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={editProperty ? editProperty.title : ''}
            fullWidth
            margin="normal"
            onChange={(e) => setEditProperty({ ...editProperty, title: e.target.value })}
          />
          <TextField
            label="Location"
            name="location"
            value={editProperty ? editProperty.location : ''}
            fullWidth
            margin="normal"
            onChange={(e) => setEditProperty({ ...editProperty, location: e.target.value })}
          />
          <TextField
            label="Area"
            name="area"
            value={editProperty ? editProperty.area : ''}
            fullWidth
            margin="normal"
            onChange={(e) => setEditProperty({ ...editProperty, area: e.target.value })}
          />
          <TextField
            label="Bedrooms"
            name="bedrooms"
            type="number"
            value={editProperty ? editProperty.bedrooms : ''}
            fullWidth
            margin="normal"
            onChange={(e) => setEditProperty({ ...editProperty, bedrooms: e.target.value })}
          />
          <TextField
            label="Bathrooms"
            name="bathrooms"
            type="number"
            value={editProperty ? editProperty.bathrooms : ''}
            fullWidth
            margin="normal"
            onChange={(e) => setEditProperty({ ...editProperty, bathrooms: e.target.value })}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={editProperty ? editProperty.price : ''}
            fullWidth
            margin="normal"
            onChange={(e) => setEditProperty({ ...editProperty, price: e.target.value })}
          />
          <TextField
            label="Nearby Hospitals"
            name="nearbyHospitals"
            value={editProperty ? editProperty.nearbyHospitals.join(', ') : ''}
            fullWidth
            margin="normal"
            onChange={(e) => setEditProperty({ ...editProperty, nearbyHospitals: e.target.value.split(', ') })}
          />
          <TextField
            label="Nearby Colleges"
            name="nearbyColleges"
            value={editProperty ? editProperty.nearbyColleges.join(', ') : ''}
            fullWidth
            margin="normal"
            onChange={(e) => setEditProperty({ ...editProperty, nearbyColleges: e.target.value.split(', ') })}
          />
          <TextField
            label="Description"
            name="description"
            value={editProperty ? editProperty.description : ''}
            fullWidth
            margin="normal"
            onChange={(e) => setEditProperty({ ...editProperty, description: e.target.value })}
          />
          <TextField
            label="Image"
            name="image"
            value={editProperty ? editProperty.image : ''}
            fullWidth
            margin="normal"
            onChange={(e) => setEditProperty({ ...editProperty, image: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditForm}>Cancel</Button>
          <Button onClick={() => handleSaveEditForm(editProperty)}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* Render the delete confirmation dialog */}
      <Dialog open={Boolean(deleteProperty)} onClose={() => setDeleteProperty(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete the property "{deleteProperty?.title}"?</p>
        </DialogContent>
        <DialogContent>
          <Button onClick={handleConfirmDelete}>Delete</Button>
          <Button onClick={() => setDeleteProperty(null)}>Cancel</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default YourComponent;
