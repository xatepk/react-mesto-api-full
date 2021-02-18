import cn from 'classnames';

function ImagePopup(props) {
  return (
  <div className={cn("popup popup_el_card", { "popup_opened" : props.card.isOpen})}>
    <div className="popup__container popup__container_transparent">
      <img className="popup__card-image" alt={props.card.img.alt} src={props.card.img.src} />
      <p className="popup__card-heading">{props.card.img.alt}</p>
      <button type="button" aria-label="close" className="popup__close" onClick={props.onClose} />
    </div>
  </div>
  );
}

export default ImagePopup;
