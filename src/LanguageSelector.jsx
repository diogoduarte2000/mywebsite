import { useEffect } from 'react';

export const LanguageSelector = ({ language, onChange }) => {
  useEffect(() => {
    const playClickSound = () => {
      const clickSound = document.getElementById('click-sound');
      if (clickSound) clickSound.play();
    };

    const selector = document.getElementById('language-selector');
    if (selector) {
      selector.addEventListener('change', playClickSound);
      return () => selector.removeEventListener('change', playClickSound);
    }
  }, []);

  return (
    <div className="language-selector-container">
      <select 
        id="language-selector" 
        className="language-selector"
        value={language}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="pt">PT</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
};