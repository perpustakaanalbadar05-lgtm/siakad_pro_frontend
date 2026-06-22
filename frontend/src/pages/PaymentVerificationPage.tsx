import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Search, Check, X, Eye } from 'lucide-react'
import { paymentApi } from '@/api'
import { formatRupiah } from '@/utils'

export default function PaymentVerificationPage() {
  const queryClient = useQueryClient()
  const [filterStatus, setFilterStatus] = useState('pending')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [rejectModal, setRejectModal] = useState<any>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['payments', filterStatus],
    queryFn: () => paymentApi.list({ status: filterStatus, per_page: 50 }),
  })

  const verifyMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) => paymentApi.verify(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] })
      queryClient.invalidateQueries({ queryKey: ['student-billings'] })
      setRejectModal(null)
    },
  })

  const payments = data?.data?.data || []

  const handleApprove = (id: number) => {
    if (confirm('Verifikasi dan terima pembayaran ini?')) {
      verifyMutation.mutate({ id, payload: { action: 'approve' } })
    }
  }

  const handleReject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    verifyMutation.mutate({ 
      id: rejectModal.id, 
      payload: { action: 'reject', rejection_reason: fd.get('rejection_reason') } 
    })
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Verifikasi Pembayaran</h1>
          <p className="page-subtitle">Tinjau dan verifikasi bukti pembayaran mahasiswa</p>
        </div>
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input placeholder="Cari nama atau invoice..." className="form-input pl-9" />
          </div>
          <select 
            className="form-input w-48"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="pending">Menunggu Verifikasi</option>
            <option value="verified">Telah Diverifikasi</option>
            <option value="rejected">Ditolak</option>
            <option value="">Semua Status</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Mahasiswa / Tagihan</th>
                <th>Nominal Bayar</th>
                <th>Metode</th>
                <th>Bukti</th>
                <th>Status</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={7} className="text-center py-4">Memuat data...</td></tr>
              ) : payments.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">Tidak ada data pembayaran.</td></tr>
              ) : (
                payments.map((payment: any) => (
                  <tr key={payment.id}>
                    <td className="text-sm">{new Date(payment.payment_date).toLocaleDateString('id-ID')}</td>
                    <td>
                      <p className="font-medium text-gray-900 dark:text-white">{payment.studentBilling?.student?.full_name}</p>
                      <p className="text-xs text-gray-500">{payment.studentBilling?.billingType?.name} - {payment.studentBilling?.invoice_number}</p>
                    </td>
                    <td className="font-mono font-medium text-green-600">{formatRupiah(payment.amount_paid)}</td>
                    <td className="uppercase text-xs">{payment.payment_method.replace('_', ' ')}</td>
                    <td>
                      {payment.proof_of_payment ? (
                        <button onClick={() => setSelectedImage(`http://localhost:8000/storage/${payment.proof_of_payment}`)} className="text-brand-600 hover:underline flex items-center gap-1 text-sm">
                          <Eye className="w-3.5 h-3.5" /> Lihat Bukti
                        </button>
                      ) : '-'}
                    </td>
                    <td>
                      <span className={`badge ${
                        payment.status === 'verified' ? 'badge-green' :
                        payment.status === 'rejected' ? 'badge-red' :
                        'badge-yellow'
                      }`}>
                        {payment.status === 'verified' ? 'Terverifikasi' : payment.status === 'rejected' ? 'Ditolak' : 'Pending'}
                      </span>
                    </td>
                    <td>
                      {payment.status === 'pending' ? (
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleApprove(payment.id)} disabled={verifyMutation.isPending} className="bg-green-100 hover:bg-green-200 text-green-700 p-1.5 rounded-lg">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => setRejectModal(payment)} disabled={verifyMutation.isPending} className="bg-red-100 hover:bg-red-200 text-red-700 p-1.5 rounded-lg">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 text-right block">Oleh: {payment.verifiedBy?.name || '-'}</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedImage(null)} className="absolute -top-10 right-0 text-white hover:text-gray-300">
              <X className="w-6 h-6" />
            </button>
            <img src={selectedImage} alt="Bukti Pembayaran" className="w-full rounded-lg shadow-2xl" />
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tolak Pembayaran</h3>
            <p className="text-sm text-gray-500 mb-4">Berikan alasan penolakan agar mahasiswa dapat memperbaiki pembayarannya.</p>
            <form onSubmit={handleReject}>
              <textarea name="rejection_reason" required placeholder="Contoh: Bukti transfer tidak terbaca..." className="form-input h-24 mb-4"></textarea>
              <div className="flex gap-3">
                <button type="button" onClick={() => setRejectModal(null)} className="btn-secondary flex-1">Batal</button>
                <button type="submit" disabled={verifyMutation.isPending} className="btn-danger flex-1">Tolak</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
