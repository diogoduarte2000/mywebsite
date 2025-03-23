document.addEventListener("DOMContentLoaded", function() {
    // Configura o ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animação para cada seção com a classe .fade-in
    gsap.utils.toArray(".fade-in").forEach((section) => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%", // Inicia a animação quando a seção está a 80% da parte superior da tela
                toggleActions: "play none none none", // Play quando entra, nenhuma ação ao sair
            }
        });
    });
});