// frontend/js/auth.js - MASTER PROTECTION FOR ALL PAGES
class AuthManager {
  constructor() {
    this.API_BASE = 'http://localhost:5000/api';
    this.init();
  }

  init() {
    // AUTO-PROTECT ALL DASHBOARDS
    this.protectDashboards();
    
    if (this.isLoggedIn()) {
      this.protectCurrentPage();
    }
  }

  // PROTECT ALL DASHBOARD PAGES AUTOMATICALLY
  protectDashboards() {
    const path = window.location.pathname;
    const dashboardPaths = [
      'student-dashboard.html', 'staff-dashboard.html', 
      'hr-dashboard.html', 'admin-dashboard.html',
      'student.html', 'staff.html', 'hr.html', 'admin.html'
    ];

    if (dashboardPaths.some(p => path.includes(p))) {
      if (!this.isLoggedIn()) {
        this.redirectToLogin();
        return;
      }
      
      const role = this.getUserRole();
      const roleMap = {
        student: ['student', 'Student'],
        staff: ['staff', 'Staff'],
        hr: ['hr', 'HR'],
        admin: ['admin', 'Admin']
      };
      
      // Check if correct role for page
      const currentRole = Object.keys(roleMap).find(r => 
        path.includes(r) || path.includes(r.toUpperCase())
      );
      
      if (currentRole && currentRole !== role) {
        window.location.href = `${role}-dashboard.html`;
      }
    }
  }

  // REDIRECT TO LOGIN WITH RETURN URL
  redirectToLogin() {
    const returnUrl = encodeURIComponent(window.location.href);
    window.location.href = `index.html?return=${returnUrl}`;
  }

  // CHECK LOGIN STATUS
  isLoggedIn() {
    const token = localStorage.getItem('authToken');
    const expiry = localStorage.getItem('tokenExpiry');
    return token && expiry && Date.now() < parseInt(expiry);
  }

  getUserRole() {
    return localStorage.getItem('userRole') || 'student';
  }

  // COMPLETE LOGIN FUNCTION (Connected to backend)
  async login(email, password, role) {
    try {
      const response = await fetch(`${this.API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store session
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('authUser', JSON.stringify(data.user));
      localStorage.setItem('tokenExpiry', data.expiry);
      localStorage.setItem('isLoggedIn', 'true');

      // Redirect to role dashboard
      window.location.href = `${role}-dashboard.html`;
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  }
}

// GLOBAL INIT
const auth = new AuthManager();

// Make global for HTML onclick
window.auth = auth;
window.login = async (email, password, role) => {
  await auth.login(email, password, role);
};
window.logout = () => {
  localStorage.clear();
  window.location.href = 'index.html';
};
