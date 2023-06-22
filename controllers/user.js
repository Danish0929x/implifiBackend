const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// User registration
registerUser = async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    // Generate and return a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// User login
loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    console.log(email,password)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate and return a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};


module.exports = {
    registerUser,
    loginUser
  };