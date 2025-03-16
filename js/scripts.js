// Core functionality for Makin A Brand platform

// Authentication Functions
const auth = {
    login: async (email, password) => {
        // Simulate API call
        console.log('Logging in:', email);
        if (email && password) {
            localStorage.setItem('user', JSON.stringify({
                name: 'John Doe',
                email: email,
                role: 'Brand Strategist'
            }));
            window.location.href = '/pages/dashboard/index.html';
        }
    },

    register: async (userData) => {
        // Simulate API call
        console.log('Registering:', userData);
        if (userData) {
            localStorage.setItem('user', JSON.stringify({
                name: `${userData.firstName} ${userData.lastName}`,
                email: userData.email,
                role: 'Brand Strategist'
            }));
            window.location.href = '/pages/dashboard/index.html';
        }
    },

    logout: () => {
        localStorage.removeItem('user');
        window.location.href = '/index.html';
    },

    resetPassword: async (email) => {
        // Simulate password reset
        console.log('Password reset requested for:', email);
        return true;
    },

    checkAuth: () => {
        const user = localStorage.getItem('user');
        if (!user && !window.location.pathname.includes('/auth/')) {
            window.location.href = '/pages/auth/login.html';
        }
        return JSON.parse(user);
    }
};

// Dashboard Functions
const dashboard = {
    init: () => {
        const user = auth.checkAuth();
        if (user) {
            // Update user info in header
            const userNameElements = document.querySelectorAll('.user-name');
            userNameElements.forEach(el => {
                if (el) el.textContent = user.name;
            });

            // Initialize notifications
            dashboard.initNotifications();
        }
    },

    initNotifications: () => {
        const notificationBtn = document.querySelector('.notification-btn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => {
                console.log('Fetching notifications...');
            });
        }
    },

    updateStats: (stats) => {
        // Update dashboard statistics
        Object.keys(stats).forEach(key => {
            const element = document.getElementById(`stat-${key}`);
            if (element) {
                element.textContent = stats[key];
            }
        });
    }
};

// Content Management Functions
const content = {
    uploadFile: async (file) => {
        // Simulate file upload
        console.log('Uploading file:', file.name);
        return {
            success: true,
            url: URL.createObjectURL(file)
        };
    },

    deleteContent: async (contentId) => {
        // Simulate content deletion
        console.log('Deleting content:', contentId);
        return true;
    },

    updateContent: async (contentId, data) => {
        // Simulate content update
        console.log('Updating content:', contentId, data);
        return true;
    }
};

// Profile Management Functions
const profile = {
    update: async (profileData) => {
        // Simulate profile update
        console.log('Updating profile:', profileData);
        const user = JSON.parse(localStorage.getItem('user'));
        const updatedUser = { ...user, ...profileData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return true;
    },

    updatePassword: async (currentPassword, newPassword) => {
        // Simulate password update
        console.log('Updating password');
        return true;
    }
};

// Settings Management
const settings = {
    update: async (settingsData) => {
        // Simulate settings update
        console.log('Updating settings:', settingsData);
        localStorage.setItem('settings', JSON.stringify(settingsData));
        return true;
    },

    getSettings: () => {
        return JSON.parse(localStorage.getItem('settings')) || {};
    }
};

// Form Handling
const forms = {
    handleSubmit: (form, callback) => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            await callback(data);
        });
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check current page
    const path = window.location.pathname;
    
    // Initialize based on current page
    if (path.includes('/dashboard/')) {
        dashboard.init();
    }

    // Handle login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        forms.handleSubmit(loginForm, async (data) => {
            await auth.login(data.email, data.password);
        });
    }

    // Handle registration form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        forms.handleSubmit(registerForm, async (data) => {
            await auth.register(data);
        });
    }

    // Handle profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        forms.handleSubmit(profileForm, async (data) => {
            await profile.update(data);
        });
    }

    // Handle settings form
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        forms.handleSubmit(settingsForm, async (data) => {
            await settings.update(data);
        });
    }

    // Handle logout
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            auth.logout();
        });
    }

    // Handle file uploads
    const uploadZone = document.querySelector('.upload-zone');
    if (uploadZone) {
        uploadZone.addEventListener('drop', async (e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            for (let file of files) {
                await content.uploadFile(file);
            }
        });

        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('border-electric-aqua');
        });

        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('border-electric-aqua');
        });
    }
});

// Export functions for use in other scripts
window.makinABrand = {
    auth,
    dashboard,
    content,
    profile,
    settings,
    forms
};
