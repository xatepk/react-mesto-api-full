import PopupWithForm from './PopupWithForm';
import React from 'react';

function ConfirmationPopup() {
  return (
    <PopupWithForm name="del" title="Вы уверены?">
      <input type="submit" value= "Да" className="popup__confirmation-button" />
    </PopupWithForm>
  )
}

export default ConfirmationPopup;
