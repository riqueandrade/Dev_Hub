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
        const response = await fetch('/api/courses');
        const courses = await response.json();
        
        const featuredCoursesElement = document.getElementById('featuredCourses');
        if (!featuredCoursesElement) return;

        featuredCoursesElement.innerHTML = courses
            .slice(0, 3)
            .map(course => `
                <div class="col-md-4 mb-4">
                    <div class="card course-card fade-in">
                        <img src="${course.image || '/images/course-default.jpg'}" class="card-img-top" alt="${course.title}">
                        <div class="card-body">
                            <h5 class="card-title">${course.title}</h5>
                            <p class="card-text">${course.description}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="badge bg-primary">${course.level}</span>
                                <a href="/curso.html?id=${course.id}" class="btn btn-outline-primary">Ver Curso</a>
                            </div>
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

// Executar funções relevantes ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedCourses();
    loadUserCourses();
}); 