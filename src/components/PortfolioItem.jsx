export const PortfolioItem = ({ href, bgColor, icon, text }) => (
  <a href={href} className="portfolio-item">
    <div className="portfolio-placeholder" style={{ backgroundColor: bgColor }}>
      <i className={icon}></i>
    </div>
    <p>{text}</p>
  </a>
);