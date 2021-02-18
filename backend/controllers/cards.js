const Card = require('../models/card');

module.exports.getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch((err) => res.status(500).send({ message: err.message }));

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
