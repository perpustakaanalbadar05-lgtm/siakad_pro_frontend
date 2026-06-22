import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, Filter } from 'lucide-react'
import { studentBillingApi, studentApi, academicYearApi, billingTypeApi } from '@/api'
import { formatRupiah } from '@/utils'

export default function BillingsPage() {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['student-billings', filterStatus, page],
    queryFn: () => studentBillingApi.list({ status: filterStatus, page, per_page: 20 }),
  })

  // Queries for form
  const { data: studentsData } = useQuery({ queryKey: ['students'], queryFn: () => studentApi.list({ per_page: 100 }) })
  const { data: academicYearsData } = useQuery({ queryKey: ['academic-years'], queryFn: () => academicYearApi.list() })
  const { data: billingTypesData } = useQuery({ queryKey: ['billing-types'], queryFn: () => billingTypeApi.list() })

  const createMutation = useMutation({
    mutationFn: (data: any) => studentBillingApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-billings'] })
      setShowForm(false)
    },
  })

  const billings = data?.data?.data || []

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tagihan Mahasiswa</h1>
          <p className="page-subtitle">Kelola tagihan biaya pendidikan mahasiswa</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus className="w-4 h-4" />
          Buat Tagihan
        </button>
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-50 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input placeholder="Cari tagihan atau NIM..." className="form-input pl-9" />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              className="form-input py-1.5 text-sm" 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Semua Status</option>
              <option value="unpaid">Belum Dibayar</option>
              <option value="partial">Cicilan (Sebagian)</option>
              <option value="paid">Lunas</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>No. Invoice</th>
                <th>Mahasiswa</th>
                <th>Jenis Tagihan</th>
                <th>Nominal</th>
                <th>Tenggat Waktu</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-4">Memuat data...</td></tr>
              ) : billings.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-4 text-gray-400">Tidak ada data tagihan.</td></tr>
              ) : (
                billings.map((billing: any) => (
                  <tr key={billing.id}>
                    <td className="font-mono text-sm">{billing.invoice_number}</td>
                    <td>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{billing.student?.full_name}</p>
                        <p className="text-xs text-gray-500">{billing.student?.nim}</p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p>{billing.billingType?.name}</p>
                        <p className="text-xs text-gray-500">SMT {billing.academicYear?.name}</p>
                      </div>
                    </td>
                    <td className="font-mono font-medium">{formatRupiah(billing.amount)}</td>
                    <td className="text-sm">{new Date(billing.due_date).toLocaleDateString('id-ID')}</td>
                    <td>
                      <span className={`badge ${
                        billing.status === 'paid' ? 'badge-green' :
                        billing.status === 'partial' ? 'badge-yellow' :
                        billing.status === 'expired' ? 'badge-red' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {billing.status === 'paid' ? 'Lunas' : billing.status === 'partial' ? 'Sebagian' : billing.status === 'expired' ? 'Kedaluwarsa' : 'Belum Dibayar'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Buat Tagihan Baru</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              const fd = new FormData(e.currentTarget)
              createMutation.mutate(Object.fromEntries(fd.entries()))
            }} className="space-y-4">
              <div>
                <label className="form-label">Mahasiswa</label>
                <select name="student_id" required className="form-input">
                  <option value="">Pilih Mahasiswa</option>
                  {studentsData?.data?.data?.map((s: any) => (
                    <option key={s.id} value={s.id}>{s.nim} - {s.full_name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Jenis Tagihan</label>
                  <select name="billing_type_id" required className="form-input" onChange={(e) => {
                    const type = billingTypesData?.data?.data?.find((t: any) => t.id == e.target.value);
                    if(type) {
                      const input = document.querySelector('input[name="amount"]') as HTMLInputElement;
                      if(input) input.value = type.default_amount;
                    }
                  }}>
                    <option value="">Pilih Jenis</option>
                    {billingTypesData?.data?.data?.filter((t:any) => t.is_active).map((t: any) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Tahun Akademik</label>
                  <select name="academic_year_id" required className="form-input">
                    <option value="">Pilih Tahun</option>
                    {academicYearsData?.data?.data?.map((y: any) => (
                      <option key={y.id} value={y.id}>{y.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Nominal (Rp)</label>
                  <input type="number" name="amount" required className="form-input" />
                </div>
                <div>
                  <label className="form-label">Batas Waktu</label>
                  <input type="date" name="due_date" required className="form-input" />
                </div>
              </div>
              <div>
                <label className="form-label">Catatan (Opsional)</label>
                <textarea name="notes" className="form-input h-20"></textarea>
              </div>

              {createMutation.isError && (
                <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
                  {createMutation.error?.response?.data?.message || 'Terjadi kesalahan'}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">Batal</button>
                <button type="submit" disabled={createMutation.isPending} className="btn-primary flex-1">
                  {createMutation.isPending ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
