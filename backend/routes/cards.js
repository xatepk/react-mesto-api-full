const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const createCardValidator = require('../middlewares/validators/createCard');

router.get('/cards', getCards);
router.post('/cards', createCardValidator, createCard);
router.delete('/cards/:_id', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
