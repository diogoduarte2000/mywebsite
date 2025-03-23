document.addEventListener("DOMContentLoaded", function() {
    gsap.from(".sticky-header", { duration: 1, y: -100, opacity: 0, ease: "bounce" });

    gsap.utils.toArray(".fade-in").forEach((section) => {
        gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
});

