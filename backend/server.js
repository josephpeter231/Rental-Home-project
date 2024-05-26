const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const propertyRoutes = require('./routes/propertyRoutes.js');
const Property = require('./models/property.js')
const app = express();
const User = require('./models/user.js')
const Interested = require('./models/interested.js')
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://josephpeterjece2021:AJ9Hg6xTtQBUCoGr@cluster1.xaacunv.mongodb.net/PresidioTest?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/user', userRoutes); 
app.use('/', propertyRoutes);
app.get('/allproperties/seller/:sellerId', async (req, res) => {
  const { sellerId } = req.params;

  try {
    const properties = await Property.find({ sellerid: sellerId });
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.put('/property/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    location,
    area,
    bedrooms,
    bathrooms,
    price,
    nearbyHospitals,
    nearbyColleges,
    description,
    image,
    sellerid,
  } = req.body;

  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      {
        title,
        location,
        area,
        bedrooms,
        bathrooms,
        price,
        nearbyHospitals,
        nearbyColleges,
        description,
        image,
        sellerid,
      },
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error('Error updating property:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/property/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/addprop',async (req, res) => {
  try {
    
    const { title, location, area, bedrooms, bathrooms, price, image, nearbyHospitals, nearbyColleges, description ,sellerid} = req.body;
    console.log(sellerid)
    const property = new Property({
      title,
      location,
      area,
      bedrooms,
      bathrooms,
      price,
      image,
      nearbyHospitals,
      nearbyColleges,
      description,
      sellerid,
    });
    await property.save();
    res.status(201).json({ message: 'Property saved successfully', property });
  } catch (err) {
    console.error('Error saving property:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//to retrieve all properties

app.get('/wholeproperties', async (req, res) => {
  try {
    // Fetch all properties from the database
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//getspecific seller data
app.get('/seller/:sellerId', async (req, res) => {
  const { sellerId } = req.params;
  try {
    const seller = await User.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    res.status(200).json(seller);
  } catch (error) {
    console.error('Error fetching seller details:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/add-to-favorites', async (req, res) => {
  const { propertyId, sellerId, buyerId } = req.body;

  try {
    // Check if the item is already in favorites
    const existingFavorite = await Interested.findOne({ propertyId, buyerId });

    if (existingFavorite) {
      return res.status(400).json({ error: 'Item already in favorites' });
    }

    // Create a new favorite item
    const newFavorite = new Interested({
      propertyId,
      sellerId,
      buyerId,
    });

    // Save the new favorite item to the database
    await newFavorite.save();

    res.status(201).json({ message: 'Item added to favorites' });
  } catch (error) {
    console.error('Error adding item to favorites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//search functionality
app.get('/wholeproperties', async (req, res) => {
  const searchQuery = req.query.search || '';

  try {
      let properties;
      if (searchQuery) {
          // Perform a simple case-insensitive text search on relevant fields
          properties = await Property.find({
              $or: [
                  { title: { $regex: searchQuery, $options: 'i' } },
                  { location: { $regex: searchQuery, $options: 'i' } },
                  { description: { $regex: searchQuery, $options: 'i' } },
              ],
          });
      } else {
          properties = await Property.find();
      }

      res.json(properties);
  } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/interested-properties', async (req, res) => {
  try {
      const interestedProperties = await Interested.find();
      res.json(interestedProperties);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch interested properties' });
  }
});

app.get('/singleproperty/:id', async (req, res) => {
  try {
      const property = await Property.findById(req.params.id);
      if (!property) {
          return res.status(404).json({ message: 'Property not found' });
      }
      res.json(property);
  } catch (error) {
      console.error('Error fetching property by ID:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

//interested users in sellers page
app.get('/api/interested/:sellerId', async (req, res) => {
  try {
    const { sellerId } = req.params;
    const interestedProperties = await Interested.find({ sellerId });
    res.json(interestedProperties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interested properties', error });
  }
});

//get specific users
app.get('/api/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details', error });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
