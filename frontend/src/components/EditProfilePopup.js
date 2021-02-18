import PopupWithForm from './PopupWithForm';
import React, { useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);


  useEffect(() => {
    if (!props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }
  
  return (
  <PopupWithForm name="edit" title="Редактировать профиль" {...props} onSubmit={handleSubmit}>
      <input  name="name" value={name} onChange={handleNameChange}
              className="popup__item popup__item_el_name popup__input"
              placeholder="Ваше Имя" id="name-input" required minLength="2" maxLength="40" autoComplete="off" type="text" />
      <span className='popup__input-error' id='name-input-error'></span>
      <input  name="about-self" value={description} onChange={handleDescriptionChange}
              className="popup__item popup__item_el_about-self popup__input"
              placeholder="О себе" id="about-self-input" required minLength="2" maxLength="200" autoComplete="off" type="text" />
      <span className='popup__input-error' id='about-self-input-error'></span>
      <input className="popup__button" type="submit" value= "Сохранить" />
  </PopupWithForm>
  );
}

export default EditProfilePopup;
