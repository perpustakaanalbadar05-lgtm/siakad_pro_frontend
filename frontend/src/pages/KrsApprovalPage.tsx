import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Check, X, Search, FileText } from 'lucide-react'
import { studyPlanApi, academicYearApi } from '@/api'

export default function KrsApprovalPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')

  const { data: activeYearData } = useQuery({
    queryKey: ['academic-years'],
    queryFn: () => academicYearApi.list(),
  })
  
  const activeYear = activeYearData?.data?.data?.find((y: any) => y.is_active)

  // Fetch pending study plans. In real app, maybe filter by lecturer's advisees
  const { data: studyPlansData, isLoading } = useQuery({
    queryKey: ['study-plans-approval', activeYear?.id],
    queryFn: () => studyPlanApi.list({ academic_year_id: activeYear?.id }),
    enabled: !!activeYear,
  })

  const approveMutation = useMutation({
    mutationFn: (id: number) => studyPlanApi.approve(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study-plans-approval'] })
    },
  })

  const plans = studyPlansData?.data?.data || []
  
  // Hanya ambil yang statusnya pending_approval untuk review, tapi tampilkan semua
  const filteredPlans = plans.filter((p: any) => 
    p.student?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    p.student?.nim?.includes(search)
  )

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Persetujuan KRS</h1>
          <p className="page-subtitle">Persetujuan rencana studi mahasiswa perwalian</p>
        </div>
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-50 dark:border-gray-700">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari NIM atau nama mahasiswa..."
              className="form-input pl-9"
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Mahasiswa</th>
                <th>SKS Diambil</th>
                <th>Status</th>
                <th>Tanggal Pengajuan</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j}><div className="shimmer h-4 rounded"></div></td>
                    ))}
                  </tr>
                ))
              ) : filteredPlans.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">
                    Tidak ada pengajuan KRS yang perlu ditinjau.
                  </td>
                </tr>
              ) : (
                filteredPlans.map((plan: any) => (
                  <tr key={plan.id}>
                    <td>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{plan.student?.full_name}</p>
                        <p className="text-xs text-gray-500 font-mono">{plan.student?.nim}</p>
                      </div>
                    </td>
                    <td className="font-semibold text-gray-700 dark:text-gray-300">{plan.total_credits} SKS</td>
                    <td>
                      <span className={`badge ${
                        plan.status === 'approved' ? 'badge-green' : 
                        plan.status === 'rejected' ? 'badge-red' : 
                        'badge-yellow'
                      }`}>
                        {plan.status === 'approved' ? 'Disetujui' : plan.status === 'rejected' ? 'Ditolak' : 'Menunggu'}
                      </span>
                    </td>
                    <td className="text-gray-500 text-sm">
                      {new Date(plan.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        <button className="btn-secondary text-xs py-1.5 px-3" title="Lihat Detail">
                          <FileText className="w-3.5 h-3.5 mr-1" /> Detail
                        </button>
                        {plan.status === 'pending_approval' && (
                          <>
                            <button 
                              onClick={() => approveMutation.mutate(plan.id)}
                              disabled={approveMutation.isPending}
                              className="bg-green-100 hover:bg-green-200 text-green-700 p-1.5 rounded-lg transition-colors"
                              title="Setujui"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              className="bg-red-100 hover:bg-red-200 text-red-700 p-1.5 rounded-lg transition-colors"
                              title="Tolak"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
