const ComingSoon = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center mb-4">
      <span className="text-2xl">🚧</span>
    </div>
    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{title}</h2>
    <p className="text-sm text-gray-400">Modul ini sedang dalam pengembangan.</p>
  </div>
)

export const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <p className="text-8xl font-black text-brand-100 dark:text-brand-900">404</p>
    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-2">Halaman tidak ditemukan</h2>
    <a href="/dashboard" className="btn-primary mt-6">← Kembali ke Dashboard</a>
  </div>
)
