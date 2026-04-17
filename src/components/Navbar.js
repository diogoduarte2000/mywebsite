import React from 'react';

const Navbar = ({ toggleMenu, toggleLanguage, currentLang }) => {
  return (
    <nav className="navbar">
      <button className="menu-btn" aria-label="Abrir menu" onClick={toggleMenu}>
        <span className="menu-icon"></span>
        <span className="menu-icon"></span>
        <span className="menu-icon"></span>
      </button>
      <button className="translate-btn" onClick={toggleLanguage}>
        {currentLang === 'pt' ? 'EN/PT' : 'PT/EN'}
      </button>
    </nav>
  );
};

export default Navbar;