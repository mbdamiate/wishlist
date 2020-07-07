class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Conflict';
    this.code = 409;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Not Found';
    this.code = 404;
  }
}

class SQLError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SQL Error';
    this.code = 500;
  }
}

class RequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Request Error';
    this.code = 500;
  }
}

module.exports = {
  ConflictError,
  NotFoundError,
  SQLError,
  RequestError
};
