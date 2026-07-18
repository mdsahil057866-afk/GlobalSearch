require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const { Server } = require('socket.io');

const privacyMiddleware = require('./middleware/privacyMiddleware');
const antiHackMiddleware = require('./middleware/antiHackMiddleware');
const apiRoutes = require('./routes/api');
const socialRoutes = require('./routes/socialRoutes');
const videoRoutes = require('./routes/videoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST']
  }
});


app.use((req, res, next) => {
  req.io = io;
  next();
});


io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  
  socket.on('join_room', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their notification room`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', 
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('public/uploads'));

// Anti-Hack Shield
app.use(antiHackMiddleware);

app.use(privacyMiddleware);


app.use('/api', apiRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/videos', videoRoutes);


app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', privacy: 'enabled' });
});

const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});



const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/globalsearch';
const seedDatabase = require('./seedData');

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB safely');
    await seedDatabase();
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
