import { useQuery } from '@tanstack/react-query'
import { Download, Printer, Award } from 'lucide-react'
import { gradeApi, academicYearApi } from '@/api'
import useAuthStore from '@/store/authStore'

export default function KhsPage() {
  const { user } = useAuthStore()

  const { data: activeYearData } = useQuery({
    queryKey: ['academic-years'],
    queryFn: () => academicYearApi.list(),
  })
  
  const activeYear = activeYearData?.data?.data?.find((y: any) => y.is_active)

  const { data: gradesData, isLoading } = useQuery({
    queryKey: ['grades', user?.profile?.id, activeYear?.id],
    queryFn: () => gradeApi.getByStudent({ student_id: user?.profile?.id, academic_year_id: activeYear?.id }),
    enabled: !!user?.profile?.id && !!activeYear,
  })

  const grades = gradesData?.data?.data || []

  const calculateIPS = () => {
    if (grades.length === 0) return { ips: 0, totalSks: 0 }
    
    let totalBobot = 0
    let totalSks = 0

    const mutuMap: Record<string, number> = {
      'A': 4.0, 'AB': 3.5, 'B': 3.0, 'BC': 2.5, 'C': 2.0, 'D': 1.0, 'E': 0
    }

    grades.forEach((g: any) => {
      const sks = g.classSchedule?.course?.credits || 0
      const mutu = mutuMap[g.final_grade_letter] || 0
      totalBobot += (mutu * sks)
      totalSks += sks
    })

    const ips = totalSks > 0 ? (totalBobot / totalSks).toFixed(2) : '0.00'
    return { ips, totalSks }
  }

  const { ips, totalSks } = calculateIPS()

  return (
    <div className="max-w-5xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title">Kartu Hasil Studi (KHS)</h1>
          <p className="page-subtitle">Semester {activeYear?.name || '-'}</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            <Printer className="w-4 h-4" /> Cetak
          </button>
          <button className="btn-primary">
            <Download className="w-4 h-4" /> PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Indeks Prestasi Semester (IPS)</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{ips}</h3>
          </div>
        </div>
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center">
            <span className="font-bold text-lg">SKS</span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total SKS Diambil</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalSks}</h3>
          </div>
        </div>
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
            <span className="font-bold text-lg">IPK</span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Indeks Prestasi Kumulatif</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">3.75</h3>
            <p className="text-xs text-green-600">Sangat Memuaskan</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="p-5 border-b border-gray-50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div>
              <span className="text-gray-500 w-24 inline-block">Nama</span>
              <span className="font-medium text-gray-900 dark:text-white">: {user?.profile?.full_name}</span>
            </div>
            <div>
              <span className="text-gray-500 w-24 inline-block">NIM</span>
              <span className="font-medium text-gray-900 dark:text-white">: {user?.profile?.nim}</span>
            </div>
            <div>
              <span className="text-gray-500 w-24 inline-block">Prodi</span>
              <span className="font-medium text-gray-900 dark:text-white">: Pendidikan Agama Islam</span>
            </div>
          </div>
        </div>

        <div className="table-wrapper rounded-none">
          <table className="table">
            <thead>
              <tr>
                <th className="w-12 text-center">No</th>
                <th>Kode MK</th>
                <th>Mata Kuliah</th>
                <th className="text-center">SKS (K)</th>
                <th className="text-center">Nilai (N)</th>
                <th className="text-center">Mutu (M)</th>
                <th className="text-center">K x M</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8">Memuat data...</td>
                </tr>
              ) : grades.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    Belum ada nilai yang dipublikasikan pada semester ini.
                  </td>
                </tr>
              ) : (
                grades.map((g: any, index: number) => {
                  const sks = g.classSchedule?.course?.credits || 0
                  
                  const mutuMap: Record<string, number> = {
                    'A': 4.0, 'AB': 3.5, 'B': 3.0, 'BC': 2.5, 'C': 2.0, 'D': 1.0, 'E': 0
                  }
                  
                  const mutu = mutuMap[g.final_grade_letter] || 0
                  const total = sks * mutu

                  return (
                    <tr key={g.id}>
                      <td className="text-center">{index + 1}</td>
                      <td className="font-mono text-sm text-gray-500">{g.classSchedule?.course?.code}</td>
                      <td className="font-medium text-gray-900 dark:text-white">{g.classSchedule?.course?.name}</td>
                      <td className="text-center">{sks}</td>
                      <td className="text-center font-bold">{g.final_grade_letter || '-'}</td>
                      <td className="text-center">{mutu.toFixed(2)}</td>
                      <td className="text-center">{total.toFixed(2)}</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
