document.addEventListener('DOMContentLoaded', function() {

    // Actualizar año en el footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');

        if (questionButton && answerDiv) {
            questionButton.addEventListener('click', () => {
                const isActive = questionButton.classList.contains('active');
                
                if (isActive) {
                    questionButton.classList.remove('active');
                    answerDiv.style.maxHeight = null;
                    answerDiv.style.paddingTop = '0';
                    answerDiv.style.paddingBottom = '0';
                } else {
                    questionButton.classList.add('active');
                    answerDiv.style.paddingTop = '15px';
                    answerDiv.style.paddingBottom = '15px';
                    answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
                }
            });
        }
    });

    // Animaciones al hacer scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // entry.target.classList.remove('is-visible'); // Descomenta si quieres que se re-anime
            }
        });
    }, {
        threshold: 0.1 
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scroll para anclas 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            if (hrefAttribute.length > 1 && document.querySelector(hrefAttribute)) {
                e.preventDefault();
                document.querySelector(hrefAttribute).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});