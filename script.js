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

    const eventTargetDate = new Date('2025-06-22T19:00:00').getTime();
    const announcementExpiryDate = new Date('2025-06-23T00:00:00').getTime(); 
    const now = new Date().getTime();
    let countdownInterval;

    function showEventModal() {
        if (eventModal) {
            eventModal.style.display = 'flex'; 
            setTimeout(() => { 
                 eventModal.classList.add('active');
            }, 20);
            startEventCountdown();
        }
    }

    function hideEventModal() {
        if (eventModal) {
            eventModal.classList.remove('active');
            setTimeout(() => {
                eventModal.style.display = 'none';
            }, 300); 
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
            if (e.target === eventModal) { 
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
                        showEventModal();
                    };
                    img.onerror = function() {
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
            return;
        }
        if (countdownInterval) clearInterval(countdownInterval);

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

    // --- Lógica para Versículos Bíblicos Diarios en Comité Local ---
    const youthScriptures = [
        { text: "Acuérdate de tu Creador en los días de tu juventud, antes que vengan los días malos, y lleguen los años de los cuales digas: No tengo en ellos contentamiento;", ref: "Eclesiastés 12:1 (RV1960)" },
        { text: "Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza.", ref: "1 Timoteo 4:12 (RV1960)" },
        { text: "¿Con qué limpiará el joven su camino? Con guardar tu palabra.", ref: "Salmos 119:9 (RV1960)" },
        { text: "La gloria de los jóvenes es su fuerza, Y la hermosura de los ancianos es su vejez.", ref: "Proverbios 20:29 (RV1960)" },
        { text: "Bueno le es al hombre llevar el yugo desde su juventud.", ref: "Lamentaciones 3:27 (RV1960)" },
        { text: "Y después de esto derramaré mi Espíritu sobre toda carne, y profetizarán vuestros hijos y vuestras hijas; vuestros ancianos soñarán sueños, y vuestros jóvenes verán visiones.", ref: "Joel 2:28 (RV1960)" },
        { text: "No digas: Soy un niño; porque a todo lo que te envíe irás tú, y dirás todo lo que te mande.", ref: "Jeremías 1:7 (adaptado, RV1960)" },
        { text: "Huye también de las pasiones juveniles, y sigue la justicia, la fe, el amor y la paz, con los que de corazón limpio invocan al Señor.", ref: "2 Timoteo 2:22 (RV1960)" },
        { text: "Alégrate, joven, en tu juventud, y tome placer tu corazón en los días de tu adolescencia; y anda en los caminos de tu corazón y en la vista de tus ojos; pero sabe, que sobre todas estas cosas te juzgará Dios.", ref: "Eclesiastés 11:9 (RV1960)" },
        { text: "Porque tú, oh Señor Jehová, eres mi esperanza, Seguridad mía desde mi juventud.", ref: "Salmo 71:5 (RV1960)" },
        { text: "Os he escrito a vosotros, jóvenes, porque sois fuertes, y la palabra de Dios permanece en vosotros, y habéis vencido al maligno.", ref: "1 Juan 2:14 (RV1960)" },
        { text: "Oye, hijo mío, la instrucción de tu padre, Y no desprecies la dirección de tu madre;", ref: "Proverbios 1:8 (RV1960)" },
        { text: "Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.", ref: "Mateo 18:20 (RV1960)"},
        { text: "Todo lo puedo en Cristo que me fortalece.", ref: "Filipenses 4:13 (RV1960)"},
        { text: "El principio de la sabiduría es el temor de Jehová; Los insensatos desprecian la sabiduría y la enseñanza.", ref: "Proverbios 1:7 (RV1960)"},
        { text: "Instruye al niño en su camino, Y aun cuando fuere viejo no se apartará de él.", ref: "Proverbios 22:6 (RV1960)"}
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function getDailyScriptures(allScriptures, count = 4) {
        const today = new Date().toISOString().split('T')[0];
        const localStorageDateKey = 'comiteScriptureLastDate';
        const localStorageScripturesKey = 'comiteDailyScriptures';

        const lastDate = localStorage.getItem(localStorageDateKey);
        const storedScripturesJson = localStorage.getItem(localStorageScripturesKey);

        if (lastDate === today && storedScripturesJson) {
            try {
                const storedScriptures = JSON.parse(storedScripturesJson);
                if (storedScriptures.length >= count) { // Check if we have enough stored
                    return storedScriptures.slice(0, count); // Return only the needed count
                }
            } catch (e) {
                console.error("Error parsing stored scriptures for comite:", e);
            }
        }

        const shuffled = shuffleArray([...allScriptures]);
        const selectedScriptures = shuffled.slice(0, Math.max(count, allScriptures.length)); // Ensure we don't try to slice more than available

        localStorage.setItem(localStorageDateKey, today);
        localStorage.setItem(localStorageScripturesKey, JSON.stringify(selectedScriptures));
        
        return selectedScriptures.slice(0, count); // Return only the needed count
    }

    function displayComiteScriptures() {
        const scripturePlaceholders = document.querySelectorAll('#comite-local .miembro-perfil .palabras');
        if (scripturePlaceholders.length === 0) {
            return;
        }

        const numPlaceholders = scripturePlaceholders.length;
        // Asegurarse de pedir tantos versículos como placeholders, o todos si hay menos de 4 versículos disponibles.
        const dailyScriptures = getDailyScriptures(youthScriptures, numPlaceholders);


        scripturePlaceholders.forEach((placeholder, index) => {
            if (dailyScriptures[index]) {
                const scripture = dailyScriptures[index];
                placeholder.innerHTML = `
                    <p class="scripture-text">"${scripture.text}"</p>
                    <footer class="scripture-ref"><cite>${scripture.ref}</cite></footer>
                `;
            } else {
                // Fallback si no hay suficientes versículos (no debería pasar con la lógica actual de getDailyScriptures si hay suficientes en youthScriptures)
                placeholder.innerHTML = `<p class="scripture-text">Contenido no disponible.</p>`;
            }
        });
    }

    if (document.getElementById('comite-local')) {
         displayComiteScriptures();
    }

});
