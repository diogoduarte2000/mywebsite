import React, { useEffect, useRef } from 'react';
import { projects } from '../data/projects';
import { translations } from '../data/translations';
import Gallery from './Gallery';
import Skills from './Skills';

const MainContent = ({ currentLang, openProjectModal }) => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="main-content">
      <div className="name-line" style={{ animationDelay: '0.09s' }}>DIOGO</div>
      <div className="name-line" style={{ animationDelay: '1s' }}>DUARTE</div>
      <div className="title" data-translate="titulo">
        {translations[currentLang].titulo}
      </div>

      {/* Seções do conteúdo */}
      <section id="downloads" className="section downloads-section" ref={addToRefs}>
        <h2 className="section-title">{translations[currentLang].downloads}</h2>
        <div className="download-links">
          <a href="https://drive.google.com/uc?export=download&id=1-Qxj8nScjs9hfzQpkMtO2ZIM0ep5720j" className="download-btn" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-file-pdf"></i>
            <span>{translations[currentLang].downloadCV}</span>
          </a>
          <a href="https://drive.google.com/uc?export=download&id=1ONiWYP3zuz4WTdBUzhc38hcJ2kWQsCis" className="download-btn" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-images"></i>
            <span>{translations[currentLang].downloadPortfolio}</span>
          </a>
        </div>
      </section>

      {/* Adicione as outras seções seguindo o mesmo padrão */}
      
      <Gallery projects={projects} openProjectModal={openProjectModal} currentLang={currentLang} />
      <Skills translations={translations} currentLang={currentLang} />
      
      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Diogo Duarte. {translations[currentLang].direitosReservados}</p>
      </footer>
    </div>
  );
};

export default MainContent;