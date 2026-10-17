document.addEventListener('DOMContentLoaded', function () {

    const elementos = document.querySelectorAll('.animar-scroll');
    if (elementos.length === 0) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elementos.forEach(function (el) {
        observer.observe(el);
    });
});
