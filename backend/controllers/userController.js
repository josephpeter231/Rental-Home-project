const User = require('../models/user');
const bcrypt = require('bcrypt');


exports.signup = async (req, res) => {
    try {
      const { firstName, lastName, email, password, role,phoneNumber } = req.body;
      if (!email || typeof email !== 'string' || !email.trim()) {
        return res.status(400).json({ error: 'Email is required' });
      }
      if (!password || typeof password !== 'string' || password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({ firstName, lastName, email, password: hashedPassword, role ,phoneNumber});
      await user.save();
      res.status(200).json({ message: 'User created successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Password is valid, login successful
      res.json({ message: 'Login successful',userdetails:user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };