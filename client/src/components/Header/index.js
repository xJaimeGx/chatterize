import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  }
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="flex-row-rev justify-space-between-lg justify-center align-center w-100 p-8">
          <div className='box sb'>
          <Link to="/">
            <h1>Chatterize!</h1>
          </Link>
          </div>

        <nav>
          {Auth.loggedIn() ? (
            <>
            <Link to="/profile">Me</Link>
            <a href="/" onClick={logout}>
              Logout
            </a>
            </>
          ) : (
            <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
