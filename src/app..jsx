import { useState, useEffect } from 'react';
import { translations } from './translations';
import { LanguageSelector } from './components/LanguageSelector';
import { PortfolioItem } from './components/PortfolioItem';

export default function App() {
  const [language, setLanguage] = useState('pt');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Efeito para o botão "Voltar ao Topo"
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Obter traduções atualizadas
  const t = translations[language];

  return (
    <div className="page-wrapper">
      <LanguageSelector language={language} onChange={setLanguage} />
      
      <header className="header-container">
        <img src="/img/head.png" alt="V.Graphiks Corp" className="header-image" />
      </header>

      <div className="image-spacer"></div>

      <main className="main-container">
        <h1>{t.companyName}</h1>

        <section className="text-box tagline-box">
          <p><strong>{t.tagline1}</strong> <span>{t.tagline2}</span></p>
        </section>

        <section className="text-box about-box">
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutText1}</p>
          <p>{t.aboutText2}</p>
        </section>

        <section className="text-box description-box">
          <p>{t.description1}</p>
          <p>{t.description2}</p>
          <p>{t.description3}</p>
          <p>{t.description4}</p>
          <p>{t.description5}</p>
        </section>

        <div className="section-spacer"></div>

        <section className="portfolio portfolio-section" id="portfolio">
          <h2>{t.portfolioTitle}</h2>
          <div className="portfolio-grid">
            <PortfolioItem
              href="portfolio/surfari.html"
              bgColor="#ffb600"
              icon="fas fa-file-invoice-dollar"
              text={t.portfolioItem1}
            />
            <PortfolioItem
              href="portfolio/identidade-visual-corporativa.html"
              bgColor="#6e48aa"
              icon="fas fa-palette"
              text={t.portfolioItem2}
            />
            <PortfolioItem
              href="portfolio/feasy.html"
              bgColor="#4361ee"
              icon="fas fa-film"
              text={t.portfolioItem3}
            />
            <PortfolioItem
              href="portfolio/banner-youtube.html"
              bgColor="#ff0000"
              icon="fab fa-youtube"
              text={t.portfolioItem4}
            />
          </div>
        </section>

        <div className="section-spacer"></div>

        <section className="contact-info contact-section">
          <h2>{t.contactTitle}</h2>
          <div className="text-box">
            <p>
              <i className="fas fa-phone-alt contact-icon"></i> 
              <strong>{t.phoneLabel}</strong> 933 402 201
            </p>
            <p>
              <i className="fas fa-envelope contact-icon"></i> 
              <strong>{t.emailLabel}</strong> v.graphikscorp@gmail.com
            </p>
            <p>
              <i className="fab fa-instagram contact-icon"></i> 
              <strong>{t.instagramLabel}</strong> 
              <a href="https://www.instagram.com/v.graphiks/" target="_blank" rel="noopener noreferrer">
                @v.graphiks
              </a>
            </p>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=v.graphikscorp@gmail.com&su=Pedido%20de%20Informação&body=Olá%20V.Graphiks%2C%0A%0AGostaria%20de%20saber%20mais%20sobre%20os%20vossos%20serviços.%0A%0AObrigado!" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="gmail-btn"
            >
              <i className="fab fa-google"></i>
              <span>{t.gmailBtn}</span>
            </a>
          </div>
        </section>

        <div className="section-spacer"></div>

        <footer>
          <p dangerouslySetInnerHTML={{ __html: t.copyright }}></p>
        </footer>
      </main>

      {showBackToTop && (
        <button 
          id="back-to-top" 
          title={language === 'pt' ? 'Voltar ao topo' : 'Back to top'}
          onClick={scrollToTop}
        >
          ↑
        </button>
      )}
    </div>
  );
}