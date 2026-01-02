// Smooth scrolling for internal navigation
const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href')?.slice(1);
        const target = targetId ? document.getElementById(targetId) : null;
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Close mobile nav after clicking
        const navList = document.querySelector('.nav-list');
        if (navList?.classList.contains('is-open')) {
            navList.classList.remove('is-open');
        }
    });
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navList.classList.toggle('is-open');
    });
}

// Reveal-on-scroll using IntersectionObserver
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
        }
    );

    revealElements.forEach((el) => observer.observe(el));
} else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach((el) => el.classList.add('is-visible'));
}

// Gallery lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

function openLightbox(imgSrc, captionText, altText) {
    if (!lightbox || !lightboxImg || !lightboxCaption) return;

    lightboxImg.src = imgSrc;
    lightboxImg.alt = altText || 'Expanded gallery image';
    lightboxCaption.textContent = captionText || '';
    lightbox.classList.add('is-visible');
    lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove('is-visible');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
}

if (galleryItems && lightbox) {
    galleryItems.forEach((item) => {
        const img = item.querySelector('img');
        const captionEl = item.querySelector('figcaption');

        const handler = () => {
            if (!img) return;
            const src = img.getAttribute('src') || '';
            const alt = img.getAttribute('alt') || '';
            const captionText = captionEl?.textContent?.trim() || alt;
            openLightbox(src, captionText, alt);
        };

        item.addEventListener('click', handler);
        item.addEventListener('keypress', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handler();
            }
        });
    });
}

if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox.classList.contains('is-visible')) {
            closeLightbox();
        }
    });
}

// Dynamic year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
}

// Background video playback speed
// Note: HTML cannot change the actual frame rate (fps) of a file.
// This slows down playback; if you need true 30fps, re‑encode the video.
const bgVideo = document.querySelector('.background-video');
if (bgVideo) {
    // Adjust this value to make the motion slower or faster (1 = normal speed)
    bgVideo.playbackRate = 0.50;
}
