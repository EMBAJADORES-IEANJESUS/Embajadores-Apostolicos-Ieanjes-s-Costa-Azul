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

    // --- Lógica para el Modal de Anuncio de Evento Especial ---
    const eventModal = document.getElementById('event-announcement-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const announcementImageElement = document.getElementById('announcement-image');

    // Fecha y hora del evento: 22 de Junio de 2025 a las 19:00
    const eventTargetDate = new Date('2025-06-22T19:00:00').getTime();
    // Fecha de expiración del anuncio: El anuncio no se mostrará después del 22 de Junio de 2025
    const announcementExpiryDate = new Date('2025-06-23T00:00:00').getTime(); // Medianoche cuando el 22 ha terminado
    const now = new Date().getTime();

    let countdownInterval;

    function showEventModal() {
        if (eventModal) {
            eventModal.style.display = 'flex'; // Cambio directo para evitar conflicto con clase 'active' si se usa para otra cosa
            setTimeout(() => { // Pequeño delay para asegurar que el display:flex se aplique antes de la transición de opacidad/transform
                 eventModal.classList.add('active');
            }, 20);
            startEventCountdown();
        }
    }

    function hideEventModal() {
        if (eventModal) {
            eventModal.classList.remove('active');
             // Esperar que termine la transición antes de ocultar con display:none
            setTimeout(() => {
                eventModal.style.display = 'none';
            }, 300); // Debe coincidir con la duración de la transición en CSS (opacity 0.3s)
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
        }
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideEventModal);
    }

    if (eventModal) {
        eventModal.addEventListener('click', function(e) {
            if (e.target === eventModal) { // Si se hace clic en el overlay (fondo) y no en el contenido del modal
                hideEventModal();
            }
        });
    }
    
    const announcementSessionKey = 'announcementShown_DamasDorcas_Jun2025';

    if (now < announcementExpiryDate) { 
        if (!sessionStorage.getItem(announcementSessionKey)) {
            if (eventModal) { 
                if (announcementImageElement && announcementImageElement.src) {
                    const img = new Image();
                    img.onload = function() {
                        console.log('Imagen del anuncio cargada.');
                        showEventModal();
                    };
                    img.onerror = function() {
                        console.error('Error al cargar la imagen del anuncio. Mostrando modal de todas formas.');
                        showEventModal(); 
                    };
                    img.src = announcementImageElement.src;
                } else {
                    showEventModal();
                }
                sessionStorage.setItem(announcementSessionKey, 'true');
            }
        }
    }

    function startEventCountdown() {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        const countdownTimerContainerEl = document.getElementById('countdown-timer-container');
        const countdownTimerEl = document.getElementById('countdown-timer');


        if (!daysEl || !hoursEl || !minutesEl || !secondsEl || !countdownTimerContainerEl || !countdownTimerEl) {
            console.error('Elementos del contador no encontrados.');
            return;
        }

        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        countdownInterval = setInterval(function() {
            const currentTime = new Date().getTime();
            const distance = eventTargetDate - currentTime;

            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownTimerEl.innerHTML = "<p style='font-weight:bold; color:var(--color-secondary);font-size:1.2em;'>¡El evento ha comenzado o ya pasó!</p>";
                return;
            }

            daysEl.textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
            hoursEl.textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutesEl.textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            secondsEl.textContent = Math.floor((distance % (1000 * 60)) / 1000);
        }, 1000);
    }
});
