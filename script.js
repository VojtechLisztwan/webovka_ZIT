// Widget pro počasí na hlavní stránce
document.addEventListener("DOMContentLoaded", function() {
    const weatherWidget = document.getElementById('weather-widget');
    if (!weatherWidget) return;
    // Nastavte město a API klíč
    const city = 'Ostrava'; // Změňte dle potřeby
        const apiKey = '94a6f82135614915b52164645251011'; // WeatherAPI.com API klíč
    function showWeather(data) {
        if (!data || typeof data.current === 'undefined' || typeof data.location === 'undefined') {
            weatherWidget.innerHTML = `<div class='text-danger'>Počasí se nepodařilo načíst.</div>`;
            return;
        }
            const icon = data.current.condition.icon;
            const desc = data.current.condition.text;
            const temp = Math.round(data.current.temp_c);
            const feels = Math.round(data.current.feelslike_c);
            const humidity = data.current.humidity;
            const wind = Math.round(data.current.wind_kph);
            weatherWidget.innerHTML = `
                <div class="d-flex flex-column align-items-center justify-content-center">
                    <img src="${icon}" alt="${desc}" style="width:64px;height:64px;">
                    <div class="fs-3 fw-bold">${temp}°C</div>
                    <div class="text-secondary mb-2">${desc}</div>
                    <div class="small">Pocitově: ${feels}°C &nbsp;|&nbsp; Vlhkost: ${humidity}% &nbsp;|&nbsp; Vítr: ${wind} km/h</div>
                </div>
            `;
    }
    function fetchWeatherByCoords(lat, lon) {
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&lang=cs`;
            console.log('WeatherAPI.com URL (coords):', url);
        fetch(url)
            .then(response => response.json())
            .then(showWeather)
            .catch(() => {
                weatherWidget.innerHTML = `<div class='text-danger'>Počasí se nepodařilo načíst.</div>`;
            });
    }
    function fetchWeatherByCity(city) {
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=cs`;
            console.log('WeatherAPI.com URL (city):', url);
        fetch(url)
            .then(response => response.json())
            .then(showWeather)
            .catch(() => {
                weatherWidget.innerHTML = `<div class='text-danger'>Počasí se nepodařilo načíst.</div>`;
            });
    }
    if (navigator.geolocation) {
        weatherWidget.innerHTML = `<div class='mb-2'>Zjišťuji polohu pro počasí...</div><div class="spinner-border text-info" role="status"><span class="visually-hidden">Načítám počasí...</span></div>`;
        navigator.geolocation.getCurrentPosition(
            pos => {
                fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
            },
            err => {
                // Pokud uživatel odmítne nebo nastane chyba, použij defaultní město
                fetchWeatherByCity('Ostrava');
            },
            {timeout: 10000}
        );
    } else {
        fetchWeatherByCity('Ostrava');
    }
});


function highlightActiveNav() {
    const path = window.location.pathname.split("/").pop();
    if (path === "index.html" || path === "") {
        document.getElementById("nav-home")?.classList.add("active");
    } else if (path === "about_me.html") {
        document.getElementById("nav-about")?.classList.add("active");
    } else if (path === "projekty.html") {
        document.getElementById("nav-projects")?.classList.add("active");
    } else if (path === "kontakt.html") {
        document.getElementById("nav-contact")?.classList.add("active");
    }
}

// Načtení headeru a footeru
document.addEventListener("DOMContentLoaded", function() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            highlightActiveNav();
            initPalette();
        });
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});

// Carousel zoom efekt
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

// Barevné palety
function initPalette() {
    const body = document.body;
    const paletteSelect = document.getElementById('palette-select');

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
            '--bs-body-bg': '#e7f0fd',
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
            '--bs-body-bg': '#e6f9ef',
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
            '--bs-body-bg': '#fdeaea',
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
            '--bs-body-bg': '#f7eafd',
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
}