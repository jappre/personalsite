document.addEventListener('DOMContentLoaded', () => {
    // --- Typing Effect ---
    const textElement = document.getElementById('typing-text');
    const texts = [
        "Software Engineer",
        "Retro Enthusiast",
        "Pixel Artist",
        "System Architect"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // --- Navigation ---
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show target section
            sections.forEach(section => {
                section.classList.remove('active-section');
                section.classList.add('hidden-section');
                if (section.id === targetId) {
                    section.classList.remove('hidden-section');
                    section.classList.add('active-section');
                }
            });
        });
    });

    // --- Theme Toggle ---
    const toggleBtn = document.getElementById('toggle-theme');
    let isDark = true;

    toggleBtn.addEventListener('click', () => {
        const root = document.documentElement;
        if (isDark) {
            // Switch to Light/Retro
            root.style.setProperty('--bg-color', '#f0f0f0');
            root.style.setProperty('--text-color', '#2d2d2d');
            root.style.setProperty('--secondary-color', '#dcdcdc');
            root.style.setProperty('--accent-color', '#5555ff'); // Retro blue
            root.style.setProperty('--highlight-color', '#ff3333');
            isDark = false;
        } else {
            // Switch to Dark/Cyberpunk
            root.style.setProperty('--bg-color', '#1a1a2e');
            root.style.setProperty('--text-color', '#e0e0e0');
            root.style.setProperty('--secondary-color', '#16213e');
            root.style.setProperty('--accent-color', '#4ecca3');
            root.style.setProperty('--highlight-color', '#e94560');
            isDark = true;
        }
    });

    // --- Konami Code ---
    const konamiCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        const modal = document.getElementById('modal-overlay');
        modal.classList.remove('hidden');
        document.getElementById('modal-overlay').style.display = 'flex'; // Ensure flex display

        // Add confetti or sound effect here in a real app
        console.log("Easter Egg Unlocked!");
    }

    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('modal-overlay').classList.add('hidden');
        document.getElementById('modal-overlay').style.display = 'none';
    });

    // --- Contact Form ---
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.textContent;

        btn.textContent = "SENDING...";
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = "TRANSMISSION SENT";
            btn.style.backgroundColor = "#27c93f";
            form.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.backgroundColor = ""; // Reset to default
            }, 3000);
        }, 1500);
    });
});
