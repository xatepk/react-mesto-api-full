import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup(props) {
  const placeRef = React.useRef();
  const urlRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: placeRef.current.value,
      link: urlRef.current.value
    });
  }

  return (
    <PopupWithForm name="add" title="Новое место" {...props} onSubmit={handleSubmit} >
      <input  ref={placeRef}
              name="place"
              className="popup__item popup__item_el_name popup__input"
              placeholder="Название" id="place-input" required minLength="2" maxLength="30" autoComplete="off" type="text" />
      <span className='popup__input-error' id='place-input-error'></span>
      <input  ref={urlRef}
              name="place-url"
              className="popup__item popup__item_el_url popup__input"
              placeholder="Ссылка на картинку" id="place-url-input" required autoComplete="off" type="url" />
      <span className='popup__input-error' id='place-url-input-error'></span>
      <input className="popup__button" type="submit" value= "Создать" />
    </PopupWithForm>
  )
}

export default AddPlacePopup;
