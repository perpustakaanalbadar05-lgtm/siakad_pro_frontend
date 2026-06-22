import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Wallet, Upload, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react'
import { studentBillingApi, paymentApi } from '@/api'
import useAuthStore from '@/stores/authStore'
import { formatRupiah } from '@/utils'

export default function MyFinancePage() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  const [payModal, setPayModal] = useState<any>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['my-billings', user?.profile?.id],
    queryFn: () => studentBillingApi.list({ student_id: user?.profile?.id, per_page: 50 }),
    enabled: !!user?.profile?.id,
  })

  const submitPaymentMutation = useMutation({
    mutationFn: (data: FormData) => paymentApi.store(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-billings'] })
      setPayModal(null)
      setPreviewUrl(null)
    },
  })

  const billings = data?.data?.data || []

  // Hitung total tunggakan
  const totalTunggakan = billings
    .filter((b: any) => b.status === 'unpaid' || b.status === 'partial')
    .reduce((sum: number, b: any) => {
      const paid = b.payments?.filter((p: any) => p.status === 'verified').reduce((s: number, p: any) => s + Number(p.amount_paid), 0) || 0
      return sum + (Number(b.amount) - paid)
    }, 0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleSubmitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement
    const file = fileInput.files?.[0]
    
    if (!file) return alert('Silakan upload bukti pembayaran')

    const formData = new FormData()
    formData.append('student_billing_id', payModal.id)
    formData.append('amount_paid', (form.querySelector('input[name="amount_paid"]') as HTMLInputElement).value)
    formData.append('payment_date', new Date().toISOString().split('T')[0])
    formData.append('payment_method', 'bank_transfer')
    formData.append('proof', file)

    submitPaymentMutation.mutate(formData)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title">Keuangan Saya</h1>
          <p className="page-subtitle">Informasi tagihan dan riwayat pembayaran</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card p-6 bg-gradient-to-br from-brand-600 to-brand-800 text-white md:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Wallet className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <p className="text-brand-100 font-medium mb-1">Total Tunggakan</p>
            <h2 className="text-4xl font-bold mb-4">{formatRupiah(totalTunggakan)}</h2>
            <p className="text-sm text-brand-200">Harap segera lunasi tagihan Anda sebelum batas waktu untuk menghindari pemblokiran KRS.</p>
          </div>
        </div>
        
        <div className="card p-6 flex flex-col justify-center">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Informasi Rekening</h3>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Bank BNI</p>
            <p className="font-mono font-bold text-lg text-gray-900 dark:text-white">0987654321</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">a.n IAIMU Pamekasan</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="p-5 border-b border-gray-50 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Daftar Tagihan</h3>
        </div>
        <div className="table-wrapper rounded-none">
          <table className="table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Jenis Tagihan</th>
                <th>Nominal</th>
                <th>Tenggat</th>
                <th>Status</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-8">Memuat data...</td></tr>
              ) : billings.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">Tidak ada tagihan saat ini.</td></tr>
              ) : (
                billings.map((billing: any) => {
                  const isPaid = billing.status === 'paid'
                  const totalPaid = billing.payments?.filter((p: any) => p.status === 'verified').reduce((s: number, p: any) => s + Number(p.amount_paid), 0) || 0
                  const remaining = Number(billing.amount) - totalPaid
                  const pendingPayments = billing.payments?.filter((p: any) => p.status === 'pending').length > 0

                  return (
                    <tr key={billing.id}>
                      <td className="font-mono text-sm">{billing.invoice_number}</td>
                      <td>
                        <p className="font-medium text-gray-900 dark:text-white">{billing.billingType?.name}</p>
                        <p className="text-xs text-gray-500">Smt {billing.academicYear?.name}</p>
                      </td>
                      <td>
                        <p className="font-medium">{formatRupiah(billing.amount)}</p>
                        {billing.status === 'partial' && (
                          <p className="text-xs text-red-500">Sisa: {formatRupiah(remaining)}</p>
                        )}
                      </td>
                      <td className="text-sm">{new Date(billing.due_date).toLocaleDateString('id-ID')}</td>
                      <td>
                        <span className={`badge ${
                          isPaid ? 'badge-green' :
                          billing.status === 'partial' ? 'badge-yellow' :
                          billing.status === 'expired' ? 'badge-red' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {isPaid ? 'Lunas' : billing.status === 'partial' ? 'Cicilan' : 'Belum Bayar'}
                        </span>
                      </td>
                      <td className="text-right">
                        {isPaid ? (
                          <button className="btn-secondary text-xs px-2 py-1">
                            <FileText className="w-3.5 h-3.5 mr-1" /> Kuitansi
                          </button>
                        ) : pendingPayments ? (
                          <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md flex items-center justify-end gap-1 w-max ml-auto">
                            <Clock className="w-3 h-3" /> Verifikasi
                          </span>
                        ) : (
                          <button onClick={() => setPayModal({ ...billing, remaining })} className="btn-primary text-xs px-3 py-1.5">
                            Bayar
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pay Modal */}
      {payModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Konfirmasi Pembayaran</h3>
              <p className="text-sm text-gray-500">{payModal.billingType?.name}</p>
            </div>
            
            <form onSubmit={handleSubmitPayment} className="p-5 space-y-4">
              <div className="flex justify-between items-center p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg text-brand-700 dark:text-brand-300">
                <span className="text-sm font-medium">Sisa Tagihan</span>
                <span className="font-bold text-lg">{formatRupiah(payModal.remaining)}</span>
              </div>

              <div>
                <label className="form-label">Nominal Transfer (Rp)</label>
                <input 
                  type="number" 
                  name="amount_paid" 
                  defaultValue={payModal.remaining} 
                  max={payModal.remaining}
                  required 
                  className="form-input font-mono text-lg" 
                />
                <p className="text-xs text-gray-500 mt-1">Sesuaikan nominal jika Anda membayar secara mencicil.</p>
              </div>

              <div>
                <label className="form-label">Upload Bukti Transfer</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-xl relative group">
                  <div className="space-y-1 text-center">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="mx-auto h-32 object-contain rounded" />
                    ) : (
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center mt-2">
                      <label className="relative cursor-pointer rounded-md font-medium text-brand-600 hover:text-brand-500 focus-within:outline-none">
                        <span>Pilih File Gambar</span>
                        <input type="file" accept="image/*" className="sr-only" onChange={handleFileChange} required />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </div>

              {submitPaymentMutation.isError && (
                <div className="p-2 bg-red-50 text-red-600 text-sm rounded flex items-start gap-1">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{submitPaymentMutation.error?.response?.data?.message || 'Gagal mengirim bukti pembayaran.'}</span>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button type="button" onClick={() => {setPayModal(null); setPreviewUrl(null)}} className="btn-secondary flex-1">Batal</button>
                <button type="submit" disabled={submitPaymentMutation.isPending} className="btn-primary flex-1">
                  {submitPaymentMutation.isPending ? 'Mengirim...' : 'Kirim Bukti'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
