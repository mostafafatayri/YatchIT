import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log('verify the token:', token);

  if (!token) return next(createError(401, 'You are not authenticated!'));

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        // Handle token expiration
        return res.status(401).json({ message: 'Token has expired. Please log in again.' });
      } else {
        // Handle other token verification errors
        return next(createError(403, 'Token is not valid!'));
      }
    }
    req.userId = payload.id;
    req.isSeller = payload.IsSeller;
    req.isAdmin = payload.IsAdmin;
    console.log('the userID:', payload.id);
    console.log('the role:', payload.IsSeller);
    console.log('the is he admin:', payload.IsAdmin);
    next();
  });
};



/*import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log('verify the token:', token);

  if (!token) return next(createError(401, 'You are not authenticated!'));

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    req.isAdmin = payload.IsAdmin
    console.log('the userID:', payload.id);
    next();
  });
};
*/