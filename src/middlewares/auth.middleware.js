import jwt from "jsonwebtoken";
import UserModel from "../modules/users/user.model.js";
import HttpStatus from "../constants/http-status.constants.js";

const checkLogin = async (req, res, next) => {
  try {
    const token = req.cookies.token;  // Retrieve the token from cookies

    if (!token) {
      return res.status(HttpStatus.UNAUTHENTICATED.statusCode).json({ message: 'Unauthorized - Access token required.' });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the decoded token
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(HttpStatus.UNAUTHENTICATED.statusCode).json({ message: 'Unauthorized - User not found' });
    }

    req.user = user;  // Attach the user to the request object
    next();  // Proceed to the next middleware or controller
  } catch (err) {
    console.error(err);
    return res.status(HttpStatus.UNAUTHENTICATED.statusCode).json({ message: 'Unauthorized - Invalid token or session expired' });
  }
};

export default checkLogin;
 