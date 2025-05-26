


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const app = express();
const PORT =  process.env.PORT || 3000;

// Middlewares
// app.use(cors({
//   origin: 'http://localhost:5173',  // your frontend port
//   credentials: true
// }));
const allowedOrigins = [
  "http://localhost:5173",              // local dev
  "https://bookechoes.onrender.com"     // production frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());

app.use(express.json());
// app.use(session({
//   secret: 'your-secret-key',  // change to a secure secret
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 1000 * 60 * 60 // 1 hour
//   }
// }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: process.env.NODE_ENV === 'production',    // true if deployed
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));



// MongoDB Connection
mongoose.connect("mongodb+srv://yogeeshhegde778:gMSpJ27U4c8ExbG6@cluster0.dvpfiyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Schemas
const User = require('./models/User');
const Book = require('./models/Book');
const Review = require('./models/Review');






// --- New: Middleware to protect routes ---
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized: Please login first" });
  }
}

// --- New: Auth routes ---

// Register
app.post('/register', async (req, res) => {
  try {
    const { username, email, password, bio } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: "Missing required fields" });

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, bio, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Login
app.post('/login', async (req, res) => {
  console.log('Login route hit'); 
  try {
    const { email, password } = req.body;
    
    console.log(email, password);
    if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    req.session.userId = user._id;
    res.json({ message: "Login successful" });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Logout
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
});

// Check auth status
app.get('/check-auth', (req, res) => {
  if (req.session.userId) {
    res.json({ loggedIn: true, userId: req.session.userId });
  } else {
    res.json({ loggedIn: false });
  }
});

// ========== API ROUTES ==========

// GET all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add new book
app.post('/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const saved = await newBook.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



app.get('/reviews/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





// POST add review
app.post('/reviews', async (req, res) => {
  try {
    const { bookId, userId, reviewerName, comment, rating } = req.body;

    if (!bookId || !reviewerName || !comment) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newReview = new Review({ bookId, userId, reviewerName, comment, rating });
    const saved = await newReview.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// GET user profile
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update user profile
app.put('/users/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Run server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
