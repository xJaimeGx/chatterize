import { Link } from 'react-router-dom';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="header flex-row justify-space-between-lg justify-center align-center">
          <Link to="/">
            <h1>Chatterize!</h1>
          </Link>

        <nav>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
