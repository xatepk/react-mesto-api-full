import cn from 'classnames';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="place">
      <img className="place__image" alt={props.card.name} src={props.card.link} onClick={props.onCardClick} />
      <div className="place__description">
        <h2 className="place__name">{props.card.name}</h2>
        <div className="place__likes">
          <button className={cn("place__icon", { "place__icon_is-active" : isLiked })}aria-label="place-icon" type="button" onClick={handleLikeClick}></button>
          <span className="place__likes-count">{props.card.likes.length}</span>
        </div>
      </div>
      <button className={cn("place__delete", { "place__delete_visible" : isOwn })} aria-label="place-del" type="button" onClick={handleDeleteClick}></button>
    </li>
  );
}

export default Card;
