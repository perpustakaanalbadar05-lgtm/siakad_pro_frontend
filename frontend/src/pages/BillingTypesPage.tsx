import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { billingTypeApi } from '@/api'
import { formatRupiah } from '@/utils'

export default function BillingTypesPage() {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [editingData, setEditingData] = useState<any>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['billing-types'],
    queryFn: () => billingTypeApi.list(),
  })

  const createMutation = useMutation({
    mutationFn: (data: any) => billingTypeApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing-types'] })
      setShowForm(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => billingTypeApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing-types'] })
      setShowForm(false)
      setEditingData(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => billingTypeApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing-types'] })
      setDeleteConfirm(null)
    },
  })

  const billingTypes = data?.data?.data || []

  const handleEdit = (type: any) => {
    setEditingData(type)
    setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: fd.get('name'),
      default_amount: fd.get('default_amount'),
      is_active: fd.get('is_active') === 'true',
    }

    if (editingData) {
      updateMutation.mutate({ id: editingData.id, data: payload })
    } else {
      createMutation.mutate(payload)
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Jenis Tagihan</h1>
          <p className="page-subtitle">Kelola komponen biaya perkuliahan</p>
        </div>
        <button onClick={() => { setEditingData(null); setShowForm(true) }} className="btn-primary">
          <Plus className="w-4 h-4" />
          Tambah Jenis
        </button>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th className="w-16">No</th>
                <th>Nama Tagihan</th>
                <th>Nominal Default</th>
                <th>Status</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="text-center py-4">Memuat data...</td></tr>
              ) : billingTypes.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-4 text-gray-400">Belum ada data.</td></tr>
              ) : (
                billingTypes.map((type: any, idx: number) => (
                  <tr key={type.id}>
                    <td>{idx + 1}</td>
                    <td className="font-medium text-gray-900 dark:text-white">{type.name}</td>
                    <td className="font-mono">{formatRupiah(type.default_amount)}</td>
                    <td>
                      <span className={`badge ${type.is_active ? 'badge-green' : 'badge-red'}`}>
                        {type.is_active ? 'Aktif' : 'Non-Aktif'}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(type)} className="p-2 text-gray-400 hover:text-brand-500 rounded-lg hover:bg-brand-50">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteConfirm(type)} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingData ? 'Edit Jenis Tagihan' : 'Tambah Jenis Tagihan'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="form-label">Nama Tagihan</label>
                <input name="name" defaultValue={editingData?.name} required className="form-input" placeholder="Contoh: SPP / UKT" />
              </div>
              <div>
                <label className="form-label">Nominal Default (Rp)</label>
                <input type="number" name="default_amount" defaultValue={editingData?.default_amount} required min="0" className="form-input" />
              </div>
              <div>
                <label className="form-label">Status</label>
                <select name="is_active" defaultValue={editingData ? (editingData.is_active ? 'true' : 'false') : 'true'} className="form-input">
                  <option value="true">Aktif</option>
                  <option value="false">Non-Aktif</option>
                </select>
              </div>

              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">Batal</button>
                <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="btn-primary flex-1">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Hapus Data?</h3>
            <p className="text-sm text-gray-500">Yakin ingin menghapus tagihan <strong>{deleteConfirm.name}</strong>?</p>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary flex-1">Batal</button>
              <button onClick={() => deleteMutation.mutate(deleteConfirm.id)} className="btn-danger flex-1">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
