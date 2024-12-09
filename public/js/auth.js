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

        localStorage.setItem('devhub_token', data.token);
        window.location.href = '/';
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

        localStorage.setItem('devhub_token', data.token);
        window.location.href = '/';
    } catch (error) {
        throw error;
    }
}

// Funções de UI da página de autenticação
function setupAuthPage() {
    // Verificar se estamos na página de autenticação
    if (!document.querySelector('.auth-container')) {
        return;
    }

    setupTabs();
    setupPasswordToggles();
    setupPasswordStrength();
    setupForms();
}

// Gerenciamento de Tabs
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.auth-form');
    const headerTitle = document.querySelector('.auth-header h1');
    const headerSubtitle = document.querySelector('.auth-header p');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            
            // Atualizar botões
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Atualizar texto do cabeçalho
            if (tab === 'register') {
                headerTitle.textContent = 'Criar Conta';
                headerSubtitle.textContent = 'Junte-se à nossa comunidade de desenvolvedores';
            } else {
                headerTitle.textContent = 'Bem-vindo';
                headerSubtitle.textContent = 'Entre na sua conta ou crie uma nova';
            }
            
            // Atualizar formulários
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${tab}Form`) {
                    form.classList.add('active');
                }
            });
        });
    });
}

// Toggle de senha
function setupPasswordToggles() {
    const toggleBtns = document.querySelectorAll('.toggle-password');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            const icon = btn.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            }
        });
    });
}

// Força da senha
function setupPasswordStrength() {
    const passwordInput = document.getElementById('registerPassword');
    const strengthBar = document.querySelector('.strength-progress');
    const strengthText = document.querySelector('.strength-text');
    
    const strengthLevels = [
        { label: 'Muito fraca', color: '#EF4444', width: '20%' },
        { label: 'Fraca', color: '#F59E0B', width: '40%' },
        { label: 'Média', color: '#10B981', width: '60%' },
        { label: 'Forte', color: '#2563EB', width: '80%' },
        { label: 'Muito forte', color: '#7C3AED', width: '100%' }
    ];

    function calculatePasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/)) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        
        return strength;
    }

    passwordInput.addEventListener('input', () => {
        const strength = calculatePasswordStrength(passwordInput.value);
        const level = strengthLevels[strength - 1] || strengthLevels[0];
        
        strengthBar.style.width = level.width;
        strengthBar.style.background = level.color;
        strengthText.textContent = level.label;
    });
}

// Manipulação dos formulários
function setupForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            await login(email, password);
        } catch (error) {
            alert(error.message);
        }
    });

    registerForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;

            if (password !== confirmPassword) {
                throw new Error('As senhas não coincidem');
            }
            
            await register(name, email, password);
        } catch (error) {
            alert(error.message);
        }
    });
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
                <a class="nav-link" href="/auth.html">Entrar</a>
            </li>
        `;
    }
}

function logout() {
    removeToken();
    window.location.href = '/';
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    setupAuthPage();
}); 