const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:_id', deleteCard);
router.put('/cards/likes/:cardId', likeCard);
router.delete('/cards/likes/:cardId', dislikeCard);

module.exports = router;
