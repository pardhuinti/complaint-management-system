const jwt = require('jsonwebtoken');

/**
 * Generate a JSON Web Token for authenticated users
 * @param {string} id User ID
 * @param {string} role User role (student / admin)
 * @returns {string} Signed JWT Token
 */
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'fallback_secret_key_12345',
    {
      expiresIn: process.env.JWT_EXPIRE || '30d',
    }
  );
};

module.exports = generateToken;
