import { Link } from 'react-router-dom';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="flex-row justify-space-between-lg justify-center align-center w-100 p-10">
          <Link to="/">
            <h1>Chatterize!</h1>
          </Link>

        <nav>
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
