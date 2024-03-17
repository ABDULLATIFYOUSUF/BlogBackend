const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require('dotenv');
const connectDB = require("./db");
const PORT = process.env.PORT || 8080

// dotenv config
dotenv.config();

//routes
const userRoutes = require('./models/routes/userRoutes')
const blogRoutes = require('./models/routes/blogRoutes')

//mongoDB connection
connectDB();


// rest object
const app = express();

//middleware

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

//listen
app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode port no ${PORT}` .bgCyan.white)
})