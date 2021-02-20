const Card = require('../models/card');
const { NotFound, Forbidden } = require('../errors/index');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .orFail(() => {
      throw new NotFound('Карточки не найдены');
    })
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточки не найдены');
      }
      res.status(200).send(card);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => Card.findByIdAndDelete(req.params._id)
  .orFail(new NotFound('Карточка не найдена'))
  .then((card) => {
    if (card.owner.toString() !== req.user._id) {
      throw new Forbidden('Нет прав');
    }
    res.status(200).send({ message: 'Карточка удалена!' });
  })
  .catch(next);

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(new NotFound('Нет карточки с таким id'))
  .then((card) => {
    res.status(200).send(card);
  })
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(new NotFound('Нет карточки с таким id'))
  .then((card) => {
    res.status(200).send(card);
  })
  .catch(next);
