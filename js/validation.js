// Validation Functions

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Object containing isValid and strength level
 */
function validatePassword(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    return {
        isValid: password.length >= 8,
        strength: strength <= 2 ? 'weak' : strength === 3 ? 'medium' : 'strong'
    };
}

/**
 * Set error or success state on input field
 * @param {string} inputId - ID of the input element
 * @param {boolean} showError - Whether to show error state
 */
function setError(inputId, showError = true) {
    const group = document.getElementById(inputId).closest('.input-group');
    if (showError) {
        group.classList.add('error');
        group.classList.remove('success');
    } else {
        group.classList.remove('error');
        group.classList.add('success');
    }
}

/**
 * Clear all validation states from a form
 * @param {string} formId - ID of the form element
 */
function clearValidationStates(formId) {
    const form = document.getElementById(formId);
    const inputGroups = form.querySelectorAll('.input-group');
    inputGroups.forEach(group => {
        group.classList.remove('error', 'success');
    });
}

/**
 * Update password strength indicator
 * @param {string} password - Password to check
 */
function updatePasswordStrength(password) {
    const strengthBar = document.querySelector('.password-strength');
    const strengthBarInner = document.querySelector('.password-strength-bar');

    if (password.length === 0) {
        strengthBar.classList.remove('show');
        return;
    }

    strengthBar.classList.add('show');
    
    const validation = validatePassword(password);
    
    strengthBarInner.className = 'password-strength-bar';
    strengthBarInner.classList.add(`strength-${validation.strength}`);
}