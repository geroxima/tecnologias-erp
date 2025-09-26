import './style.css'
import { Login } from './components/Login.js'
import { Dashboard } from './components/Dashboard.js'
import { authAPI } from './services/api.js'

class App {
  constructor() {
    this.app = document.getElementById('app')
    this.login = new Login()
    this.dashboard = new Dashboard()
    
    this.init()
  }

  init() {
    // Check if user is already logged in
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (token && user) {
      try {
        const userData = JSON.parse(user)
        this.showDashboard(userData)
      } catch (error) {
        console.error('Error parsing user data:', error)
        this.showLogin()
      }
    } else {
      this.showLogin()
    }
  }

  showLogin() {
    this.login.onLoginSuccess = (user) => {
      this.showDashboard(user)
    }
    this.login.render(this.app)
  }

  showDashboard(user) {
    this.dashboard.render(this.app, user)
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new App()
})
