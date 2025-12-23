// ===== LOGIN FUNCTIONALITY =====

const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

// Credentials (hardcoded untuk demo)
const validCredentials = {
    username: 'admin',
    password: 'admin123'
};

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Clear messages
    errorMessage.classList.remove('show');
    successMessage.classList.remove('show');
    errorMessage.textContent = '';
    successMessage.textContent = '';

    // Validate inputs
    if (!username || !password) {
        errorMessage.textContent = 'Username dan password tidak boleh kosong!';
        errorMessage.classList.add('show');
        return;
    }

    // Check credentials
    if (username === validCredentials.username && password === validCredentials.password) {
        successMessage.textContent = '✓ Login Berhasil! Redirecting...';
        successMessage.classList.add('show');

        // Redirect to dashboard-main after 1.5 seconds
        setTimeout(() => {
            window.location.href = 'dashboard-main.html';
        }, 1500);
    } else {
        errorMessage.textContent = '✗ Username atau Password salah!';
        errorMessage.classList.add('show');
        passwordInput.value = '';
        passwordInput.focus();
    }
});

// Clear error message when user starts typing
usernameInput.addEventListener('input', function() {
    if (errorMessage.classList.contains('show')) {
        errorMessage.classList.remove('show');
    }
});

passwordInput.addEventListener('input', function() {
    if (errorMessage.classList.contains('show')) {
        errorMessage.classList.remove('show');
    }
});
