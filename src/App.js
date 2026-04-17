import React from 'react';
import Navbar from './components/Navbar';
import SideMenu from './components/SideMenu';
import MainContent from './components/MainContent';
import ProjectModal from './components/ProjectModal';

function App() {
  const [menuActive, setMenuActive] = React.useState(false);
  const [currentLang, setCurrentLang] = React.useState('pt');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [currentProject, setCurrentProject] = React.useState(null);

  const toggleMenu = () => setMenuActive(!menuActive);
  const toggleLanguage = () => setCurrentLang(currentLang === 'pt' ? 'en' : 'pt');

  const openProjectModal = (project) => {
    setCurrentProject(project);
    setModalOpen(true);
  };

  const closeProjectModal = () => {
    setModalOpen(false);
    setCurrentProject(null);
  };

  return (
    <>
      <Navbar 
        toggleMenu={toggleMenu} 
        toggleLanguage={toggleLanguage} 
        currentLang={currentLang}
      />
      <SideMenu 
        active={menuActive} 
        toggleMenu={toggleMenu} 
        currentLang={currentLang}
      />
      <MainContent 
        currentLang={currentLang} 
        openProjectModal={openProjectModal}
      />
      {modalOpen && (
        <ProjectModal 
          project={currentProject} 
          onClose={closeProjectModal} 
          currentLang={currentLang}
          toggleLanguage={toggleLanguage}
        />
      )}
    </>
  );
}

export default App;