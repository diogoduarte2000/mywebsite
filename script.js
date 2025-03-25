document.addEventListener("DOMContentLoaded", function() {
    // Registra o plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Configura as animações para todos os elementos com classe fade-in
    gsap.utils.toArray(".fade-in").forEach((section) => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    // Configura o IntersectionObserver para os elementos reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.reveal').forEach((element) => {
        observer.observe(element);
    });
});