import React, { useState } from 'react';

function Login({ handleLogin }) {
  const [authUser, setAuthUser] = useState({email: '', password: ''});

  function handleChange(e) {
    const {name, value} = e.target;
    setAuthUser({
      ...authUser,
      [name]: value
    });
  }
  function handleSubmit(e){
    e.preventDefault();
    if (!authUser.email || !authUser.password){
      return;
    }

    handleLogin(authUser);

  }

  return(
    <div className="login">
        <p className="login__heading">Вход</p>
        <form onSubmit={handleSubmit} className="login__form" method="POST" action="#">
          <input className="login__item" required id="username" name="email" type="email" value={authUser.username} onChange={handleChange} placeholder="Email" autoComplete="off" />
          <input className="login__item" required id="password" name="password" type="password" value={authUser.password} onChange={handleChange} placeholder="Пароль" autoComplete="off" />
          <input className="login__button-container" type="submit" value="Войти" />
        </form>
    </div>
  );
}

export default Login;
