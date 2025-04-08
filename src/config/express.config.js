import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import csrf from 'csurf';
import rateLimit from 'express-rate-limit';
 
import HttpStatus from '../constants/http-status.constants.js';
import './db.config.js';
import router from './router.config.js';

dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

//  Correct CORS - only use once!
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

//  Correct Rate Limiting Middleware (fixed `windowMs`)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 1000, 
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

//  Correct CSRF Protection Setup
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'Lax',
  },
  header: 'CSRF-Token',
});
app.use(csrfProtection);

//  Health Check Route
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: "It's perfectly good.",
  });
});

//  CSRF Token Route
app.get('/api/v1/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

//  Main Routes
app.use('/api/v1', router);

//  404 Handler
app.use((req, res, next) => {
  next({
    statusCode: HttpStatus.NOT_FOUND.statusCode,
    message: HttpStatus.NOT_FOUND.message,
    status: HttpStatus.NOT_FOUND.status,
    data: null,
    options: null,
  });
});

//  Error Handler
app.use((error, req, res, next) => {
  let statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.statusCode;
  let message = error.message || HttpStatus.INTERNAL_SERVER_ERROR.message;
  let status = error.status || HttpStatus.INTERNAL_SERVER_ERROR.status;
  let data = error.detail || null;

  res.status(statusCode).json({
    message,
    status,
    data,
    options: null,
  });
});

export default app;
