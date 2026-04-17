import React from 'react';
import { translations } from '../data/translations';

const SideMenu = ({ active, toggleMenu, currentLang }) => {
  return (
    <div className={`side-menu ${active ? 'active' : ''}`}>
      <button className="menu-btn close-btn" onClick={toggleMenu}>
        <span className="menu-icon"></span>
        <span className="menu-icon"></span>
        <span className="menu-icon"></span>
      </button>
      <div className="menu-links">
        {Object.keys(translations[currentLang]).filter(key => 
          ['downloads', 'contactos', 'video', 'sobreMim', 'percurso', 'galeria', 'habilidades', 'competencias'].includes(key)
        ).map(key => (
          <a 
            key={key} 
            href={`#${key}`} 
            className="menu-link" 
            data-translate={key}
            onClick={toggleMenu}
          >
            {translations[currentLang][key]}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;