import { reportsAPI, productsAPI } from '../services/api.js'

export class Dashboard {
  constructor() {
    this.container = null
    this.user = null
  }

  render(container, user) {
    this.container = container
    this.user = user
    this.container.innerHTML = `
      <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <header class="bg-white shadow">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-6">
              <div class="flex items-center">
                <h1 class="text-3xl font-bold text-gray-900">Mini ERP</h1>
              </div>
              <div class="flex items-center space-x-4">
                <span class="text-sm text-gray-700">Hola, ${user.first_name || user.email}</span>
                <button 
                  id="logoutBtn"
                  class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!-- Stats Cards -->
          <div class="px-4 py-6 sm:px-0">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Total Productos</dt>
                        <dd class="text-lg font-medium text-gray-900" id="totalProducts">-</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Órdenes del Mes</dt>
                        <dd class="text-lg font-medium text-gray-900" id="monthlyOrders">-</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Bajo Stock</dt>
                        <dd class="text-lg font-medium text-gray-900" id="lowStock">-</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Ventas del Mes</dt>
                        <dd class="text-lg font-medium text-gray-900" id="monthlySales">-</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Products -->
            <div class="bg-white shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Productos Recientes</h3>
                <div class="overflow-hidden">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                      </tr>
                    </thead>
                    <tbody id="productsTableBody" class="bg-white divide-y divide-gray-200">
                      <tr>
                        <td colspan="4" class="px-6 py-4 text-center text-gray-500">Cargando productos...</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    `

    this.attachEventListeners()
    this.loadDashboardData()
  }

  attachEventListeners() {
    const logoutBtn = this.container.querySelector('#logoutBtn')
    
    logoutBtn.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        this.logout()
      }
    })
  }

  async loadDashboardData() {
    try {
      // Load dashboard summary
      const dashboardData = await reportsAPI.getDashboardSummary()
      this.updateStats(dashboardData)

      // Load products
      const products = await productsAPI.getAll()
      this.updateProductsTable(products.results || products)

    } catch (error) {
      console.error('Error loading dashboard data:', error)
      this.showError('Error al cargar los datos del dashboard')
    }
  }

  updateStats(data) {
    // Update stats cards with dashboard data
    const totalProductsEl = this.container.querySelector('#totalProducts')
    const monthlyOrdersEl = this.container.querySelector('#monthlyOrders')
    const lowStockEl = this.container.querySelector('#lowStock')
    const monthlySalesEl = this.container.querySelector('#monthlySales')

    if (totalProductsEl) totalProductsEl.textContent = data.total_products || '-'
    if (monthlyOrdersEl) monthlyOrdersEl.textContent = data.monthly_orders || '-'
    if (lowStockEl) lowStockEl.textContent = data.low_stock_products || '-'
    if (monthlySalesEl) monthlySalesEl.textContent = data.monthly_sales || '-'
  }

  updateProductsTable(products) {
    const tbody = this.container.querySelector('#productsTableBody')
    
    if (!products || products.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" class="px-6 py-4 text-center text-gray-500">No hay productos disponibles</td>
        </tr>
      `
      return
    }

    tbody.innerHTML = products.slice(0, 5).map(product => `
      <tr>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          ${product.name}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${product.category?.name || 'Sin categoría'}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            product.stock_quantity <= product.min_stock_level 
              ? 'bg-red-100 text-red-800' 
              : 'bg-green-100 text-green-800'
          }">
            ${product.stock_quantity}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          $${product.sale_price || '0.00'}
        </td>
      </tr>
    `).join('')
  }

  showError(message) {
    // Simple error display
    const errorDiv = document.createElement('div')
    errorDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50'
    errorDiv.textContent = message
    document.body.appendChild(errorDiv)
    
    setTimeout(() => {
      document.body.removeChild(errorDiv)
    }, 5000)
  }

  logout() {
    // Clear localStorage and redirect to login
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.reload()
  }
}
