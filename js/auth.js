// Authentication Logic

// Store users in memory (replace with API calls when you add backend)
const users = [];

/**
 * Register a new user
 * @param {object} userData - Object containing name, email, password
 * @returns {object} - Object with success status and message
 */
function registerUser(userData) {
    const { name, email, password } = userData;
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return {
            success: false,
            message: 'An account with this email already exists. Please login.'
        };
    }

    // Add new user
    users.push({
        id: Date.now(),
        name: name,
        email: email,
        password: password, // In real app, this should be hashed
        createdAt: new Date().toISOString()
    });

    return {
        success: true,
        message: 'Account created successfully! 🎉'
    };
}

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {object} - Object with success status, message, and user data
 */
function loginUser(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        return {
            success: true,
            message: `Welcome back, ${user.name}! 🎉`,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }

    return {
        success: false,
        message: 'Invalid email or password. Please try again.'
    };
}

/**
 * Send password reset email
 * @param {string} email - User email
 * @returns {object} - Object with success status and message
 */
function sendPasswordReset(email) {
    const user = users.find(u => u.email === email);
    
    // In real app, send actual email here
    if (user) {
        return {
            success: true,
            message: 'Password reset link sent! Check your email 📧'
        };
    }

    // For security, return success even if email not found
    return {
        success: true,
        message: 'If an account exists with this email, a reset link has been sent 📧'
    };
}

/**
 * Social login handler
 * @param {string} provider - OAuth provider (Google, GitHub, etc.)
 */
function socialLogin(provider) {
    // This is where you'll integrate OAuth when you add backend
    alert(`${provider} login would be integrated here.\n\nYou'll connect this to OAuth later when you add the backend!`);
    
    // Example of what this might look like with backend:
    // window.location.href = `/auth/${provider.toLowerCase()}`;
}

/**
 * Toggle password visibility
 * @param {string} inputId - ID of password input field
 */
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}