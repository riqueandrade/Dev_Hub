// Gerenciamento de token
const TOKEN_KEY = 'devhub_token';

function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

function isAuthenticated() {
    return getToken() !== null;
}

// Funções de autenticação
async function login(email, password) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message);
        }

        setToken(data.token);
        window.location.href = '/cursos.html';
    } catch (error) {
        throw error;
    }
}

async function register(name, email, password) {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message);
        }

        setToken(data.token);
        window.location.href = '/cursos.html';
    } catch (error) {
        throw error;
    }
}

function logout() {
    removeToken();
    window.location.href = '/';
}

// Atualização da interface baseada no estado de autenticação
function updateAuthUI() {
    const authNav = document.getElementById('authNav');
    if (!authNav) return;

    if (isAuthenticated()) {
        authNav.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="/perfil.html">Meu Perfil</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="logout()">Sair</a>
            </li>
        `;
    } else {
        authNav.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="/login.html">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/registro.html">Registro</a>
            </li>
        `;
    }
}

// Executar ao carregar a página
document.addEventListener('DOMContentLoaded', updateAuthUI); 