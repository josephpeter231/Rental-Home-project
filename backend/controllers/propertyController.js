
const Property = require('../models/property');

exports.addProperty = async (req, res) => {
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
};