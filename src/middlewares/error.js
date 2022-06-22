const httpStatus = require('http-status');
const { ValidationError } = require('express-validation');
const { Error } = require('../utils/api-response');
const { env } = require('../config');

const handler = (err, req, res, next) => {
  const response = {
    code: err.status,
    errors: err.errors,
    message: err.message || httpStatus[err.status],
    stack: err.stack,
  };

  if (env !== 'development') {
    delete response.stack;
  }
  if (err.status) {
    res.status(err.status);
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
  res.json(response);
};

exports.handler = handler;

exports.converter = (err, req, res, next) => {
  let convertedError = err;

  if (err instanceof ValidationError) {
    convertedError = new Error({
      errors: err.details.body || err.details.headers,
      message: 'Bad Request',
      stack: err.stack,
      status: 400,
    });
  } else if (!(err instanceof Error)) {
    convertedError = new Error({
      message: err.message,
      stack: err.stack,
      status: err.status,
    });
  }

  return handler(convertedError, req, res);
};


exports.notFound = (req, res) => {
  const err = new Error({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });

  return handler(err, req, res);
};
