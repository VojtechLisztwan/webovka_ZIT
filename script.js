// Dynamický zoom pro carousel obrázky na stránce about_me.html
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carouselAutoplay');
    if (!carousel) return;
    function applyZoom() {
        const active = carousel.querySelector('.carousel-item.active img.carousel-zoom');
        carousel.querySelectorAll('img.carousel-zoom').forEach(img => img.classList.remove('zooming'));
        if (active) {
            setTimeout(() => active.classList.add('zooming'), 10);
        }
    }
    carousel.addEventListener('slid.bs.carousel', applyZoom);
    applyZoom();
});
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const paletteSelect = document.getElementById('palette-select');

    // Definovaní barevných palet
    const paletteVars = {
        default: {
            '--bs-primary': '#0d6efd',
            '--bs-primary-rgb': '13,110,253',
            '--bs-body-bg': '#fff',
            '--bs-body-color': '#212529',
            '--bs-card-bg': '#fff',
            '--bs-navbar-bg': '#0d6efd',
            '--bs-navbar-color': '#fff',
            '--bs-footer-bg': '#f8f9fa',
            '--bs-footer-color': '#6c757d',
        },
        blue: {
            '--bs-primary': '#2563eb',
            '--bs-primary-rgb': '37,99,235',
            '--bs-body-bg': '#e7f0fd', // světle modrá
            '--bs-body-color': '#212529',
            '--bs-card-bg': '#f8fbff',
            '--bs-navbar-bg': '#2563eb',
            '--bs-navbar-color': '#fff',
            '--bs-footer-bg': '#e7f0fd',
            '--bs-footer-color': '#2563eb',
        },
        green: {
            '--bs-primary': '#22c55e',
            '--bs-primary-rgb': '34,197,94',
            '--bs-body-bg': '#e6f9ef', // světle zelená
            '--bs-body-color': '#212529',
            '--bs-card-bg': '#f6fdf9',
            '--bs-navbar-bg': '#22c55e',
            '--bs-navbar-color': '#fff',
            '--bs-footer-bg': '#e6f9ef',
            '--bs-footer-color': '#22c55e',
        },
        red: {
            '--bs-primary': '#ef4444',
            '--bs-primary-rgb': '239,68,68',
            '--bs-body-bg': '#fdeaea', // světle červená
            '--bs-body-color': '#212529',
            '--bs-card-bg': '#fff6f6',
            '--bs-navbar-bg': '#ef4444',
            '--bs-navbar-color': '#fff',
            '--bs-footer-bg': '#fdeaea',
            '--bs-footer-color': '#ef4444',
        },
        purple: {
            '--bs-primary': '#a21caf',
            '--bs-primary-rgb': '162,28,175',
            '--bs-body-bg': '#f7eafd', // světle fialová
            '--bs-body-color': '#212529',
            '--bs-card-bg': '#fcf7ff',
            '--bs-navbar-bg': '#a21caf',
            '--bs-navbar-color': '#fff',
            '--bs-footer-bg': '#f7eafd',
            '--bs-footer-color': '#a21caf',
        },
        dark: {
            '--bs-primary': '#343a40',
            '--bs-primary-rgb': '52,58,64',
            '--bs-body-bg': '#181a1b',
            '--bs-body-color': '#f8f9fa',
            '--bs-card-bg': '#23272b',
            '--bs-navbar-bg': '#23272b',
            '--bs-navbar-color': '#f8f9fa',
            '--bs-footer-bg': '#23272b',
            '--bs-footer-color': '#adb5bd',
        }
    };

    function setPalette(palette) {
        const vars = paletteVars[palette] || paletteVars.default;
        for (const key in vars) {
            document.documentElement.style.setProperty(key, vars[key]);
        }
        if (palette === 'dark') {
            body.classList.add('palette-dark');
        } else {
            body.classList.remove('palette-dark');
        }
    }

    const savedPalette = localStorage.getItem('colorPalette') || 'default';
    setPalette(savedPalette);
    if (paletteSelect) {
        paletteSelect.value = savedPalette;
        paletteSelect.addEventListener('change', () => {
            setPalette(paletteSelect.value);
            localStorage.setItem('colorPalette', paletteSelect.value);
        });
    }
});