const Card = require('../models/card');
const { NotFound } = require('../errors/index');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .orFail(() => {
      throw new NotFound('Карточки не найдены');
    })
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(404).send({ message: `Введены некорректные данные ${err}` });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => Card.findByIdAndDelete(req.params._id)
  .then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Нет карточки с таким id' });
      return;
    }
    res.status(200).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(404).send({ message: 'Нет карточки с таким id' });
    }
    return res.status(500).send({ message: err.message });
  });

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Нет карточки с таким id' });
      return;
    }
    res.status(200).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(404).send({ message: 'Нет карточки с таким id' });
    }
    return res.status(500).send({ message: err.message });
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Нет карточки с таким id' });
      return;
    }
    res.status(200).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(404).send({ message: 'Нет карточки с таким id' });
    }
    return res.status(500).send({ message: err.message });
  });
