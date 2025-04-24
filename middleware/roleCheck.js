module.exports = function checkRole(requiredRoles) {
     
    return function (req, res, next) {
      if (!req.user || !req.user.roles) {
        return res.status(403).json({ error: 'Access denied. No roles found.' });
      }
  
      const userRoles = req.user.roles.map(role => role.toLowerCase());
      const allowedRoles = requiredRoles.map(role => role.toLowerCase());
  
      const hasAccess = userRoles.some(role => allowedRoles.includes(role));
  
      if (!hasAccess) {
        return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
      }
  
      next();
    };
  };