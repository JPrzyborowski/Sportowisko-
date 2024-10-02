// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Ładowanie zmiennych środowiskowych
dotenv.config();

// Połączenie z bazą danych
connectDB();

const app = express();

// Middleware do parsowania JSON
app.use(express.json());

// Trasy użytkowników
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
