import cn from 'classnames';

function PopupWithForm(props) {
  return (
    <div className={cn(`popup popup_el_${props.name}`, { "popup_opened": props.isOpen })}>
    <div className="popup__container">
      <form className="popup__form" method="POST" action="#" name={props.name} noValidate onSubmit={props.onSubmit}>
        <h2 className="popup__heading">{props.title}</h2>
        {props.children}
      </form>
      <button type="button" aria-label="close" className="popup__close" onClick={props.onClose}></button>
    </div>
  </div>
  );
}

export default PopupWithForm;
