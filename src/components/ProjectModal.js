import React from 'react';

const ProjectModal = ({ project, onClose, currentLang, toggleLanguage }) => {
  if (!project) return null;

  return (
    <div className="project-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{currentLang === 'pt' ? project.title : project.titleEn}</h2>
          <div className="modal-actions">
            <button className="modal-translate-btn translate-btn" onClick={toggleLanguage}>
              {currentLang === 'pt' ? 'EN/PT' : 'PT/EN'}
            </button>
            <span className="close-modal" onClick={onClose}>&times;</span>
          </div>
        </div>
        <div className="project-images">
          {project.videos && project.videos.map((video, index) => (
            <div key={index} className="modal-video-container">
              <video className="modal-video" controls autoPlay loop muted playsInline>
                <source src={video} type="video/mp4" />
              </video>
            </div>
          ))}
          {project.images.map((image, index) => (
            <img key={index} src={image} alt={`Project ${index}`} />
          ))}
        </div>
        <div className="project-description">
          {currentLang === 'pt' ? project.description : project.descriptionEn}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;