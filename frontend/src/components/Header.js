import logo from '../images/header-logo.svg';
import { Link, Switch, Route } from 'react-router-dom';
import { useHistory } from "react-router";

function Header({ email }) {
  const history = useHistory();
  function signOut(){
    localStorage.removeItem('jwt');
    history.push('/login');
  }

    return(
      <header className="header">
        <img src={logo} alt="логотип" className="header__logo" />
        <Switch>
          <Route path="/signin">
            <Link to='signup' className="header__login-link">Регистрация</Link>
          </Route>
          <Route path="/signup">
            <Link to='signin' className="header__login-link">Войти</Link>
          </Route>
          <Route path="/">
            <div className="header__user-info">
              <span className="header__email">{email}</span>
              <Link to='signin' onClick={signOut} className="header__login-link">
                Выход
              </Link>
            </div>
          </Route>
        </Switch>
    </header>
    )
}

export default Header;
