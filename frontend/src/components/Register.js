import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegister }) {
  const [authUser, setAuthUser] = useState({email: '', password: '', message: '', img: ''});

  function handleChange(e) {
    const {name, value} = e.target;
    setAuthUser({
      ...authUser,
      [name]: value
    });
  }

  function handleSubmit(e){
    e.preventDefault();

    handleRegister(authUser);
  }


  return(
    <div className="login">
        <p className="login__heading">Регистрация</p>
        <form onSubmit={handleSubmit} className="login__form" method="POST" action="#">
          <input className="login__item" required id="username" name="email" type="email" value={authUser.username} onChange={handleChange} placeholder="Email" autoComplete="off" />
          <input className="login__item" required id="password" name="password" type="password" value={authUser.password} onChange={handleChange} placeholder="Пароль" autoComplete="off" />
          <input className="login__button-container" type="submit" value="Зарегистрироваться" />
        </form>
        <div className="login__signin">
          <p className="login__signin-question">Уже зарегистрированы?</p>
          <Link to="signin" className="login__login-link">Войти</Link>
        </div>
    </div>
  );
}

export default Register;
