import { Link } from 'react-router-dom';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
    <nav className= "navbar">
      <a href="#" class="logo">Chatterize</a>
      <input type="checkbox" id="toggler"></input>
      <label for="toggler"><i class="r1-menu-line"></i></label>
      <div class="menu">
        <ul class="list">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </nav>
      <a href="#" className="button">
  <span>Chatterize</span>
</a>
    </header>
  );
};

export default Header;
