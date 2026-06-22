import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  GraduationCap, LayoutDashboard, Users, UserCheck, Building2,
  BookOpen, BookMarked, ChevronLeft, ChevronRight, Bell,
  Moon, Sun, LogOut, User, Menu, X, ChevronDown, Calendar,
  CalendarRange, CheckSquare, ClipboardList, PenTool,
  Wallet, Receipt, CheckCircle, CreditCard
} from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { authApi } from '@/api'
import { cn, getInitials } from '@/utils'

const navItems = [
  {
    section: 'Utama',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    section: 'Akademik',
    items: [
      { to: '/students', icon: Users, label: 'Mahasiswa' },
      { to: '/lecturers', icon: UserCheck, label: 'Dosen' },
    ],
  },
  {
    section: 'Perkuliahan',
    items: [
      { to: '/class-schedules', icon: CalendarRange, label: 'Jadwal Kuliah' },
      { to: '/krs', icon: CheckSquare, label: 'KRS Mahasiswa' },
      { to: '/krs-approval', icon: CheckSquare, label: 'Persetujuan KRS' },
      { to: '/grades', icon: PenTool, label: 'Input Nilai' },
      { to: '/khs', icon: ClipboardList, label: 'KHS Mahasiswa' },
    ],
  },
  {
    section: 'Keuangan',
    items: [
      { to: '/billing-types', icon: Receipt, label: 'Jenis Tagihan' },
      { to: '/billings', icon: Wallet, label: 'Data Tagihan' },
      { to: '/payment-verification', icon: CheckCircle, label: 'Verifikasi Bayar' },
      { to: '/my-finance', icon: CreditCard, label: 'Keuangan Saya' },
    ],
  },
  {
    section: 'Master Data',
    items: [
      { to: '/faculties', icon: Building2, label: 'Fakultas' },
      { to: '/study-programs', icon: BookOpen, label: 'Program Studi' },
      { to: '/courses', icon: BookMarked, label: 'Mata Kuliah' },
      { to: '/academic-years', icon: Calendar, label: 'Tahun Akademik' },
    ],
  },
]

export default function DashboardLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const toggleDark = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } catch (_) {}
    logout()
    navigate('/login')
  }

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-3 px-4 py-4 border-b border-gray-100 dark:border-gray-700',
        collapsed && 'px-3 justify-center'
      )}>
        <div className="w-9 h-9 rounded-xl bg-brand-700 flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="font-bold text-sm text-brand-800 dark:text-brand-300 leading-tight">SIAKAD IAIMU</div>
            <div className="text-[10px] text-gray-400 leading-tight">Akademik Terpadu</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((section) => (
          <div key={section.section}>
            {!collapsed && (
              <p className="sidebar-section">{section.section}</p>
            )}
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn('sidebar-link', isActive && 'active', collapsed && 'justify-center px-2')
                }
                title={collapsed ? item.label : undefined}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-700">
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
          <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-xs font-bold text-brand-700 dark:text-brand-300 flex-shrink-0">
            {getInitials(user?.full_name || user?.name || 'User')}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.full_name || user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.roles[0]?.replace('_', ' ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 lg:hidden',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="w-4 h-4" />
        </button>
        <SidebarContent />
      </div>

      {/* Sidebar - Desktop */}
      <div className={cn(
        'hidden lg:flex flex-col bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 transition-all duration-300 relative flex-shrink-0',
        collapsed ? 'w-16' : 'w-64'
      )}>
        <SidebarContent />

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-16 w-6 h-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center shadow-sm hover:shadow transition-all text-gray-500 hover:text-brand-700"
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center px-4 gap-3 flex-shrink-0">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden btn-ghost w-9 h-9 rounded-lg"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="flex-1" />

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              className="btn-ghost w-9 h-9 rounded-lg"
              title="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications */}
            <button className="btn-ghost w-9 h-9 rounded-lg relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 ml-1 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-xs font-bold text-brand-700 dark:text-brand-300">
                  {getInitials(user?.full_name || user?.name || 'U')}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block max-w-28 truncate">
                  {user?.full_name || user?.name}
                </span>
                <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:block" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden z-50 animate-fade-in">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {user?.full_name || user?.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <div className="p-1">
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <User className="w-4 h-4" />
                      Profil Saya
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-screen-xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
