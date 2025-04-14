// AuthController.js
import jwt from 'jsonwebtoken';
import HttpStatus from '../../constants/http-status.constants.js';
import { sendSuccess, sendError } from '../../utils/response.util.js';
import authService from './auth.service.js';

class AuthController {
  signup = async (req, res, next) => {
    try {
      const user = await authService.registerUser(req.body);
      return sendSuccess(res, 'Signup successful!', user, 201);
    } catch (err) {
      return sendError(res, err);
    }
  };

  login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await authService.authenticateUser(username, password);

      const payload = {
        id: user._id,
        username: user.username,
      };

      // Generate JWT token
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' });

      // Set token as HttpOnly cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 10 * 60 * 60 * 1000,
        sameSite: 'None',
      });

      return sendSuccess(res, 'Login successful!', { id: user._id, token: token });
    } catch (err) {
      return sendError(res, err);
    }
  };

  getProfile = async (req, res) => {
    try {
      const user = req.user;
      return sendSuccess(res, 'User profile fetched successfully', {
        id: user._id,
        username: user.username,
        email: user.email,
      });
    } catch (err) {
      return sendError(res, err);
    }
  };

  logout = async (req, res) => {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
      });
  
      return sendSuccess(res, 'Logout successful');
    } catch (err) {
      return sendError(res, err);
    }
  };  
}

export default new AuthController();
