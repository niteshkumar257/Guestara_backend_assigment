const errorHandler = (error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
    error: error.error,
  });
};
export default errorHandler;
