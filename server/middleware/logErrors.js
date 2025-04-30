function logErrors(err, req, res, next) {
  console.error('Error message:', err.message);
  console.error('Stack trace:', err.stack);
  next(err);
}

module.exports = logErrors;
