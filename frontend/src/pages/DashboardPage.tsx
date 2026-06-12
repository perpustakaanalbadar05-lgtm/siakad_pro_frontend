import { useQuery } from '@tanstack/react-query'
import {
  Users, UserCheck, Building2, BookOpen,
  TrendingUp, Award, GraduationCap, BarChart3
} from 'lucide-react'
import { dashboardApi } from '@/api'
import { useAuthStore } from '@/stores/authStore'

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: string | number
  color: string
  sub?: string
}

function StatCard({ icon: Icon, label, value, color, sub }: StatCardProps) {
  return (
    <div className="stat-card animate-fade-in">
      <div className={`stat-icon ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {value.toLocaleString('id-ID')}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="stat-card">
      <div className="shimmer w-12 h-12 rounded-xl" />
      <div className="flex-1">
        <div className="shimmer h-7 w-20 rounded mb-2" />
        <div className="shimmer h-4 w-28 rounded" />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user } = useAuthStore()
  const isAdmin = user?.roles.some((r) =>
    ['super_admin', 'admin_akademik', 'rektor', 'wakil_rektor'].includes(r)
  )

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', isAdmin ? 'admin' : 'student'],
    queryFn: () => isAdmin ? dashboardApi.admin() : dashboardApi.student(),
    staleTime: 5 * 60 * 1000,
  })

  const stats = data?.data?.data?.stats

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 11) return 'Selamat Pagi'
    if (hour < 15) return 'Selamat Siang'
    if (hour < 18) return 'Selamat Sore'
    return 'Selamat Malam'
  }

  return (
    <div>
      {/* Welcome header */}
      <div className="mb-8 animate-slide-up">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {greeting()}, {user?.full_name?.split(' ')[0] || user?.name} 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Stat Cards */}
      {isAdmin ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            ) : (
              <>
                <StatCard
                  icon={Users}
                  label="Total Mahasiswa"
                  value={stats?.total_students ?? 0}
                  color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  sub={`${stats?.active_students ?? 0} aktif`}
                />
                <StatCard
                  icon={UserCheck}
                  label="Total Dosen"
                  value={stats?.total_lecturers ?? 0}
                  color="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                  sub={`${stats?.active_lecturers ?? 0} aktif`}
                />
                <StatCard
                  icon={Building2}
                  label="Fakultas"
                  value={stats?.total_faculties ?? 0}
                  color="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                />
                <StatCard
                  icon={BookOpen}
                  label="Program Studi"
                  value={stats?.total_study_programs ?? 0}
                  color="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                />
              </>
            )}
          </div>

          {/* Program distribution */}
          {!isLoading && data?.data?.data?.students_by_program && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* By Program */}
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-4 h-4 text-brand-600" />
                  <h3 className="font-semibold text-gray-800 dark:text-white text-sm">Mahasiswa per Program Studi</h3>
                </div>
                <div className="space-y-3">
                  {data.data.data.students_by_program.slice(0, 6).map((item: {name: string, count: number, faculty: string}, idx: number) => {
                    const max = Math.max(...data.data.data.students_by_program.map((i: {count: number}) => i.count))
                    const pct = max > 0 ? (item.count / max) * 100 : 0
                    return (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600 dark:text-gray-400 truncate flex-1">{item.name}</span>
                          <span className="text-xs font-semibold text-gray-800 dark:text-white ml-2">{item.count}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 rounded-full transition-all duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* By Status */}
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-4 h-4 text-brand-600" />
                  <h3 className="font-semibold text-gray-800 dark:text-white text-sm">Status Mahasiswa</h3>
                </div>
                <div className="space-y-2">
                  {data.data.data.students_by_status?.map((item: {status: string, total: number}, idx: number) => {
                    const colors: Record<string, string> = {
                      aktif: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                      lulus: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                      cuti: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
                      drop_out: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                    }
                    return (
                      <div key={idx} className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                        <span className={`badge ${colors[item.status] || 'badge-gray'}`}>
                          {item.status.replace('_', ' ')}
                        </span>
                        <span className="text-sm font-semibold text-gray-800 dark:text-white">
                          {item.total} mahasiswa
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Student dashboard */
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={TrendingUp}
            label="IPK"
            value={stats?.gpa ?? '0.00'}
            color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
          />
          <StatCard
            icon={BookOpen}
            label="Semester"
            value={stats?.semester ?? 1}
            color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          />
          <StatCard
            icon={Award}
            label="SKS Lulus"
            value={stats?.total_credits_passed ?? 0}
            color="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
          />
        </div>
      )}
    </div>
  )
}
