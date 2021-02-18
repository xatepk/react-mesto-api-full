class NotFound extends Error {
  constructor(message) {
    super();

    this.message = message;
    this.status = ('401');
  }
}

module.exports = NotFound;
