const sendResponse = (res, data) => {
  const response = {
    success: data?.success,
    message: data?.message,
    data: data?.data,
  };

  // Include meta if provided (for pagination)
  if (data?.meta) {
    response.meta = data.meta;
  }

  res.status(data?.statusCode).json(response);
};

export default sendResponse;
