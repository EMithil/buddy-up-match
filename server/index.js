require('dotenv').config();
require('./db');

const express = require('express');
const cors = require('cors');

const healthRouter = require('./routes/health');
const testDbRouter = require('./routes/testDb');

const usersRouter = require('./routes/users');

const roomsRouter = require('./routes/rooms');

const preferencesRouter = require('./routes/preferences');
const userAmenitiesRouter = require('./routes/userAmenities');

const app = express();

const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

const db = require('./db');

// Middleware
app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
}));
app.use(express.json());

// Routes

app.use('/api/health', healthRouter);
app.use('/api/test-db', testDbRouter);

app.use('/api/users', usersRouter);

app.use('/api/rooms', roomsRouter);

app.use('/api/preferences', preferencesRouter);
app.use('/api/user-amenities', userAmenitiesRouter);

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

db.pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connection successful:', res.rows[0]);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
