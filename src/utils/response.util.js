// Send a  success response
export const sendSuccess = (res, message = 'Success', data = {}, status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

// Send a error response
export const sendError = (res, error) => {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';

  return res.status(status).json({
    success: false,
    message,
  });
};
