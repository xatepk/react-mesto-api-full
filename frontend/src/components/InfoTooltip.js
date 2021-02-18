import React from 'react';
import cn from 'classnames';

function InfoTooltip({ isOpen, onClose, status}) {
  return (
    <div className={cn(`popup`, { "popup_opened": isOpen })}>
    <div className="popup__container">
      <div className="popup__status">
        <img alt="статус регистрации" src={status.img}></img>
         <p className="popup__status-title">{status.message}</p>
      </div>
    <button type="button" aria-label="close" className="popup__close" onClick={onClose}></button>
    </div>
  </div>
  )
}

export default InfoTooltip;
