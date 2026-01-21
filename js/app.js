// Main Application Logic

/**
 * Show different form sections
 * @param {string} formName - Name of form to show (login, register, forgotPassword)
 */
function showForm(formName) {
    // Hide all forms
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });

    // Form name mapping
    const formMap = {
        'login': 'loginForm',
        'register': 'registerForm',
        'forgotPassword': 'forgotPasswordForm'
    };

    // Show selected form
    const formToShow = document.getElementById(formMap[formName]);
    if (formToShow) {
        formToShow.classList.add('active');
    }

    // Update header based on form
    const headers = {
        'login': { 
            title: 'Welcome Back', 
            subtitle: 'Sign in to continue' 
        },
        'register': { 
            title: 'Create Account', 
            subtitle: 'Join us today' 
        },
        'forgotPassword': { 
            title: 'Reset Password', 
            subtitle: 'Recover your account' 
        }
    };

    document.getElementById('headerTitle').textContent = headers[formName].title;
    document.getElementById('headerSubtitle').textContent = headers[formName].subtitle;

    // Hide success message when switching forms
    hideSuccessMessage();
}

/**
 * Show success message
 * @param {string} message - Message to display
 */
function showSuccessMessage(message) {
    const successDiv = document.getElementById('successMessage');
    successDiv.textContent = message;
    successDiv.classList.add('show');
}

/**
 * Hide success message
 */
function hideSuccessMessage() {
    const successDiv = document.getElementById('successMessage');
    successDiv.classList.remove('show');
}

// ===== Event Listeners =====

// Password Strength Indicator
document.getElementById('registerPassword').addEventListener('input', function(e) {
    updatePasswordStrength(e.target.value);
});

// Login Form Submit
document.getElementById('loginFormElement').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    let isValid = true;

    // Validate email
    if (!validateEmail(email)) {
        setError('loginEmail', true);
        isValid = false;
    } else {
        setError('loginEmail', false);
    }

    // Validate password
    if (password.length === 0) {
        setError('loginPassword', true);
        isValid = false;
    } else {
        setError('loginPassword', false);
    }

    // Attempt login if valid
    if (isValid) {
        const result = loginUser(email, password);
        
        if (result.success) {
            showSuccessMessage(result.message);
            
            // Simulate redirect to dashboard
            setTimeout(() => {
                alert(`Logged in successfully as ${result.user.name}!\n\nIn a real app, you'd be redirected to your dashboard now.`);
                // window.location.href = '/dashboard';
            }, 500);
        } else {
            alert(result.message);
        }
    }
});

// Register Form Submit
document.getElementById('registerFormElement').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    let isValid = true;

    // Validate name
    if (name.trim().length === 0) {
        setError('registerName', true);
        isValid = false;
    } else {
        setError('registerName', false);
    }

    // Validate email
    if (!validateEmail(email)) {
        setError('registerEmail', true);
        isValid = false;
    } else {
        setError('registerEmail', false);
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        setError('registerPassword', true);
        isValid = false;
    } else {
        setError('registerPassword', false);
    }

    // Validate password match
    if (password !== confirmPassword) {
        setError('confirmPassword', true);
        isValid = false;
    } else {
        setError('confirmPassword', false);
    }

    // Check terms agreement
    if (!agreeTerms) {
        alert('Please agree to the Terms & Conditions');
        isValid = false;
    }

    // Register user if valid
    if (isValid) {
        const result = registerUser({ name, email, password });
        
        if (result.success) {
            showSuccessMessage(result.message);
            
            // Switch to login form and pre-fill email
            setTimeout(() => {
                showForm('login');
                document.getElementById('loginEmail').value = email;
            }, 1500);
        } else {
            alert(result.message);
        }
    }
});

// Forgot Password Form Submit
document.getElementById('forgotPasswordFormElement').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('forgotEmail').value;
    
    // Validate email
    if (!validateEmail(email)) {
        setError('forgotEmail', true);
    } else {
        setError('forgotEmail', false);
        
        const result = sendPasswordReset(email);
        showSuccessMessage(result.message);
        
        // Return to login after delay
        setTimeout(() => {
            showForm('login');
        }, 2000);
    }
});

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Authentication system initialized');
    console.log('Ready to handle user authentication');
});