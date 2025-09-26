import axios from 'axios'
import { API_CONFIG } from '../config/api.js'

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.LOGIN, {
      email,
      password
    })
    return response.data
  },

  getProfile: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.PROFILE)
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}

// Products API
export const productsAPI = {
  getAll: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.PRODUCTS)
    return response.data
  },

  getLowStock: async () => {
    const response = await api.get(`${API_CONFIG.ENDPOINTS.PRODUCTS}low_stock/`)
    return response.data
  },

  create: async (productData) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.PRODUCTS, productData)
    return response.data
  }
}

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.CATEGORIES)
    return response.data
  }
}

// Customers API
export const customersAPI = {
  getAll: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.CUSTOMERS)
    return response.data
  },

  create: async (customerData) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.CUSTOMERS, customerData)
    return response.data
  }
}

// Orders API
export const ordersAPI = {
  getAll: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.ORDERS)
    return response.data
  },

  create: async (orderData) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.ORDERS, orderData)
    return response.data
  },

  confirm: async (orderId) => {
    const response = await api.post(`${API_CONFIG.ENDPOINTS.ORDERS}${orderId}/confirm/`)
    return response.data
  }
}

// Reports API
export const reportsAPI = {
  getDashboardSummary: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.DASHBOARD)
    return response.data
  },

  getSalesReport: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.SALES_REPORT)
    return response.data
  },

  getInventoryReport: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.INVENTORY_REPORT)
    return response.data
  }
}

export default api
