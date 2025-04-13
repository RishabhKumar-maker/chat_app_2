
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import connectToMongodb from './db/mongo.connect.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import cors from 'cors';
import { app } from './socket/socket.js';
dotenv.config();
// const app = express();
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use(cors({
  origin: "http://localhost:5000",
  credentials: true // 👈 this is required to accept cookies
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)


const port = process.env.PORT || 5000;
app.listen(port , () => {
  connectToMongodb()
  console.log(`Server is running on port ${port}`);
});