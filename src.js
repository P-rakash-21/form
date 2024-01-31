const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb+srv://kcprakashprakash002:1234qwer@cluster0.fubisd5.mongodb.net/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define User model
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  email: String,
  password: String,
}));

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ username, email, password });

    // Save user to database
    await newUser.save();

    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
