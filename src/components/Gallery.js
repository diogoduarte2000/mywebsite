import React from 'react';

const Gallery = ({ projects, openProjectModal, currentLang }) => {
  return (
    <section id="galeria" className="section gallery">
      <h2 className="gallery-title">
        {currentLang === 'pt' ? 'GALERIA' : 'GALLERY'}
      </h2>
      <div className="gallery-grid">
        {projects.map(project => (
          <div 
            key={project.id} 
            className="gallery-item" 
            onClick={() => openProjectModal(project)}
          >
            {project.images.length > 0 ? (
              <img src={project.images[0]} alt={currentLang === 'pt' ? project.title : project.titleEn} />
            ) : (
              <video width="100%" height="200" muted loop playsinline>
                <source src={project.video || project.videos[0]} type="video/mp4" />
              </video>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;