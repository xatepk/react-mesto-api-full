import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" {...props} onSubmit={handleSubmit}>
      <input  ref={avatarRef}
              name="avatar-url"
              className="popup__item popup__item_el_url popup__input"
              placeholder="Ссылка на картинку" id="avatar-url-input" required autoComplete="off" type="url" />
      <span className='popup__input-error' id='avatar-url-input-error'></span>
      <input  className="popup__button" type="submit" value= "Сохранить" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
