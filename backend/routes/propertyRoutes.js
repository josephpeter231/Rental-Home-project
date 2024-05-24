
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController.js');

router.post('/properties', propertyController.addProperty);

module.exports = router;
