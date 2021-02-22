const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const createCardValidator = require('../middlewares/validators/createCard');
const authRouter = require('../middlewares/auth');

router.get('/cards', authRouter, getCards);
router.post('/cards', authRouter, createCardValidator, createCard);
router.delete('/cards/:_id', authRouter, deleteCard);
router.put('/cards/:cardId/likes', authRouter, likeCard);
router.delete('/cards/:cardId/likes', authRouter, dislikeCard);

module.exports = router;
