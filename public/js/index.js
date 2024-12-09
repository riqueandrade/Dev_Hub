// Funções de API
async function fetchWithAuth(url, options = {}) {
    const token = getToken();
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }
    return fetch(url, options);
}

async function loadFeaturedCourses() {
    try {
        const response = await fetch('/api/courses/featured');
        const courses = await response.json();
        
        const featuredCoursesElement = document.getElementById('featuredCourses');
        if (!featuredCoursesElement) return;

        featuredCoursesElement.innerHTML = courses
            .slice(0, 3)
            .map(course => `
                <div class="col-md-4 mb-4">
                    <div class="course-card">
                        <div class="course-image" style="background-image: url('${course.image}')">
                            <div class="course-overlay">
                                <span class="course-level">${course.level}</span>
                            </div>
                        </div>
                        <div class="course-content">
                            <h3>${course.title}</h3>
                            <p>${course.description}</p>
                            <div class="course-meta">
                                <span><i class="bi bi-clock"></i> ${course.duration}</span>
                                <span><i class="bi bi-people"></i> ${course.students} alunos</span>
                            </div>
                            <a href="/curso.html?id=${course.id}" class="btn btn-primary btn-sm">Ver Curso</a>
                        </div>
                    </div>
                </div>
            `).join('');
    } catch (error) {
        console.error('Erro ao carregar cursos:', error);
    }
}

async function loadUserCourses() {
    if (!isAuthenticated()) return;

    try {
        const response = await fetchWithAuth('/api/users/courses');
        const courses = await response.json();
        
        const userCoursesElement = document.getElementById('userCourses');
        if (!userCoursesElement) return;

        userCoursesElement.innerHTML = courses.map(course => `
            <div class="col-md-4 mb-4">
                <div class="card course-card fade-in">
                    <img src="${course.image || '/images/course-default.jpg'}" class="card-img-top" alt="${course.title}">
                    <div class="card-body">
                        <h5 class="card-title">${course.title}</h5>
                        <p class="card-text">${course.description}</p>
                        <div class="progress mb-3">
                            <div class="progress-bar" role="progressbar" style="width: ${course.progress}%"
                                 aria-valuenow="${course.progress}" aria-valuemin="0" aria-valuemax="100">
                                ${course.progress}%
                            </div>
                        </div>
                        <a href="/curso.html?id=${course.id}" class="btn btn-primary">Continuar</a>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar cursos do usuário:', error);
    }
}

// Animação dos números nas estatísticas
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target') || +counter.innerText;
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

// Animação de fade in para elementos quando ficam visíveis
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.feature-card, .course-card, .stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Efeito de parallax suave no hero
function handleParallax() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// Animação do código no hero
function typeCode() {
    const codeElement = document.querySelector('.code-content code');
    if (!codeElement) return;

    const code = codeElement.innerText;
    codeElement.innerText = '';
    let i = 0;

    function type() {
        if (i < code.length) {
            codeElement.innerText += code.charAt(i);
            i++;
            setTimeout(type, 20);
        }
    }

    type();
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona classes para animações
    document.querySelectorAll('.feature-card, .course-card, .stat-card').forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // Inicializa todas as funcionalidades
    handleScrollAnimation();
    handleParallax();
    loadFeaturedCourses();
    animateCounters();
    typeCode();

    // Adiciona smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Animação do menu mobile
const navbarToggler = document.querySelector('.navbar-toggler');
if (navbarToggler) {
    navbarToggler.addEventListener('click', () => {
        document.querySelector('.navbar-collapse').classList.toggle('show-menu');
    });
}

// Adiciona classe active no menu conforme scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}); 