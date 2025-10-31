// Toggle Password Visibility
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const iconId = inputId === 'password' ? 'toggleIcon' : 'toggleIcon2';
    const toggleIcon = document.getElementById(iconId);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Register Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = registerForm.querySelector('input[name="terms"]').checked;
            
            // Basic validation
            if (!fullName || !email || !phone || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (!terms) {
                alert('Please agree to the Terms & Conditions');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long');
                return;
            }
            
            // Simulate registration process
            const registerBtn = registerForm.querySelector('.btn-login');
            registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            registerBtn.disabled = true;
            
            setTimeout(function() {
                alert('Account created successfully! Redirecting to login page...');
                window.location.href = 'login.html';
            }, 1500);
        });
        
        // Social Login Buttons
        const googleBtn = document.querySelector('.social-btn.google');
        const facebookBtn = document.querySelector('.social-btn.facebook');
        
        if (googleBtn) {
            googleBtn.addEventListener('click', function() {
                alert('Google signup clicked!');
            });
        }
        
        if (facebookBtn) {
            facebookBtn.addEventListener('click', function() {
                alert('Facebook signup clicked!');
            });
        }
    }
});

// Add input focus effects
const inputs = document.querySelectorAll('.form-group input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.querySelector('label').style.color = '#3949ab';
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.querySelector('label').style.color = '#333';
        }
    });
});




