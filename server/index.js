const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes/index');

const app = express();

// Middleware setup
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// Adjust body parser limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Routes
app.use("/api", router);

const PORT = process.env.PORT || 8080;

// Connect to DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log('Server is running on port', PORT);
    });
});
