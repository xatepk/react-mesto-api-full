class Conflict extends Error {
  constructor(message) {
    super();

    this.message = message;
    this.status = ('403');
  }
}

module.exports = Conflict;
