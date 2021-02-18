import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return(
  <main className="content">
    <section className="profile">
      <div className="profile__view">
        <div style={{ backgroundImage: `url(${currentUser.avatar})`,
                      backgroundSize: 'cover' }}
                      className="profile__avatar" />
        <button className="profile__edit-avatar"
                aria-label="edit"
                type="button"
                onClick={props.onEditAvatar} />
        <div className="profile__info">
          <div className="profile__heading">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button onClick={props.onEditProfile}
                    className="profile__edit-button"
                    aria-label="edit"
                    type="button" />
          </div>
          <p className="profile__about-self">{currentUser.about}</p>
        </div>
      </div>

      <button className="profile__add-button"
              onClick={props.onAddPlace}
              aria-label="add"
              type="button" />
    </section>
    <section className="places">
      <ul className="places__list">
        {props.cards.map((card) => (
        <Card key={card._id}
                                      card={card}
                                      onCardClick={props.onCardClick}
                                      onCardLike={props.onCardLike}
                                      onCardDelete={props.onCardDelete} />)
        )}
      </ul>
    </section>
  </main>
  )
}

export default Main;
