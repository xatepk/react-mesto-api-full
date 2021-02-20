import React, { useState, useEffect, useCallback } from 'react';
import '../index.css';
import api from '../utils/api.js';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import statusSuccess from '../images/register-success.png';
import statusFail from '../images/register-fail.png';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import Login from './Login';
import Register from './Register';
import * as auth from '../auth.js';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({isOpen: false, img:{}});
  const [registrationStatus, setRegistrationStatus] = useState({message:'', img:''})
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState('');
  const [cards, setCards] = useState([]);
  const [loggedIn, setloggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const history = useHistory();

  useEffect(() => {
    handleTokenCheck();
  },[]);

  useEffect( () => {
  if (loggedIn) {
    Promise.all([api.getInitialUsers(token), api.getInitialCards(token)])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}, [loggedIn, token]);

  const handleTokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      setToken(jwt);
      auth.getContent(jwt).then((res) => {
        if (res){
          const { email } = res;
          setloggedIn(true);
          setEmail(email);
          if (history) {
            history.push("/");
          }
        }
     });
    }
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (e) => {
    setSelectedCard({...selectedCard, isOpen:true, img: e.target} );
  }

  function handleRegisterStatus(status) {
    const { message, img } = status;
    setIsRegisterPopupOpen(true);
    setRegistrationStatus({...registrationStatus, message:message, img:img})
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsRegisterPopupOpen(false);
    setSelectedCard({isOpen: false, img:{}});
  }

  const handleLogin = ({ email, password }) => {
    auth.authorize(email, password)
    .then((data) => {
    if (data.token){
      setToken(data.token);
      setloggedIn(true);
      handleEmailHeading(email);
      history.push('/');
    }
  })
    .catch(err => console.log(err));
  }

  const handleRegister = ({ email, password }) => {
    auth.register(password, email).then((res) => {
      if(res){
        handleRegisterStatus({
          message: 'Вы успешно зарегистрировались!',
          img: statusSuccess
        });
        history.push('/signin');
      } else {
        handleRegisterStatus({
          message: 'Что-то пошло не так! Попробуйте еще раз.',
          img: statusFail
        })
      }
    });
  }

  function handleUpdateUser(userInfo) {
    api.saveUserInfo(userInfo, token)
    .then((result) => {
      setCurrentUser(result);
      setIsEditProfilePopupOpen(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(avatar) {
    api.saveUserAvatar(avatar, token)
    .then((result) => {
      setCurrentUser(result);
      setIsEditAvatarPopupOpen(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(newCard) {
    api.postNewCard(newCard, token)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      setIsAddPlacePopupOpen(false);
    })
    .catch((err) => {
      console.log(err);
    });

  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked, token)
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.delCard(card._id, token)
    .then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleEmailHeading(email) {
    setEmail(email);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
    <Header email={email} />
    <Switch>
    <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete} />
    <Route path="/signup">
      <Register handleRegister={handleRegister}/>
    </Route>
    <Route path="/signin">
      <Login handleLogin={handleLogin}
             handleEmailHeading={handleEmailHeading}  />
    </Route>
    <Route>
      <Redirect to="/signin" />
    </Route>
    </Switch>
    <EditProfilePopup isOpen={isEditProfilePopupOpen}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser} />
    <AddPlacePopup  isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit} />
    <ConfirmationPopup />
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    <InfoTooltip isOpen={isRegisterPopupOpen} onClose={closeAllPopups} status={registrationStatus} />
    {loggedIn && <Footer />}
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
