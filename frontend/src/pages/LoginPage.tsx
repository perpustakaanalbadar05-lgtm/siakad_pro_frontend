import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Navigate } from 'react-router-dom'
import { Eye, EyeOff, GraduationCap, Lock, Mail, Loader2 } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { authApi } from '@/api'
import { cn } from '@/utils'

const loginSchema = z.object({
  email: z.string().email('Email tidak valid').min(1, 'Email wajib diisi'),
  password: z.string().min(1, 'Password wajib diisi'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { isAuthenticated, setAuth } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError('')
    try {
      const res = await authApi.login(data)
      const { access_token, user } = res.data.data
      setAuth(user, access_token)
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } }
      const errors = e.response?.data?.errors
      if (errors?.email) {
        setError(errors.email[0])
      } else {
        setError(e.response?.data?.message || 'Login gagal. Coba lagi.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-900 via-brand-800 to-emerald-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-700/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        {/* Logo Card */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl mb-4">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">SIAKAD IAIMU</h1>
          <p className="text-brand-200 text-sm mt-1">
            Institut Agama Islam Miftahul Ulum Pamekasan
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">Selamat Datang</h2>
            <p className="text-brand-200 text-sm mt-1">Masuk ke akun Anda untuk melanjutkan</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-brand-100 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-300" />
                <input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  placeholder="nama@iaimu.ac.id"
                  className={cn(
                    'w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white/10 border text-white placeholder-brand-300',
                    'focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all',
                    errors.email
                      ? 'border-red-400/50 bg-red-500/10'
                      : 'border-white/20 hover:border-white/30'
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-red-300 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-brand-100 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-300" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={cn(
                    'w-full pl-10 pr-10 py-2.5 rounded-xl text-sm bg-white/10 border text-white placeholder-brand-300',
                    'focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all',
                    errors.password
                      ? 'border-red-400/50 bg-red-500/10'
                      : 'border-white/20 hover:border-white/30'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-300 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-300 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            {/* Forgot password */}
            <div className="flex justify-end">
              <a href="/forgot-password" className="text-xs text-brand-200 hover:text-white transition-colors">
                Lupa password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-white text-brand-800 font-semibold text-sm hover:bg-brand-50 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                'Masuk'
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-xs text-brand-300">
              © 2026 SIAKAD IAIMU · Sistem Informasi Akademik
            </p>
          </div>
        </div>

        {/* Help text */}
        <p className="text-center text-xs text-brand-300 mt-4">
          Butuh bantuan?{' '}
          <a href="mailto:admin@iaimu.ac.id" className="text-brand-100 hover:text-white underline transition-colors">
            Hubungi Administrator
          </a>
        </p>
      </div>
    </div>
  )
}
