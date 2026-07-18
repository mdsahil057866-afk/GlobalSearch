const privacyMiddleware = (req, res, next) => {
  
  
  req.ip = '127.0.0.1';
  req.ips = ['127.0.0.1'];
  req.headers['x-forwarded-for'] = '127.0.0.1';
  req.connection.remoteAddress = '127.0.0.1';

  
  req.headers['user-agent'] = 'GlobalSearch-Incognito';

  
  
  
  delete req.headers['cookie'];

  
  res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  
  

  next();
};

module.exports = privacyMiddleware;
