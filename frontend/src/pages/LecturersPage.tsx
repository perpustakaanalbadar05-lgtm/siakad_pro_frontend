import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, Edit2, Trash2, Filter } from 'lucide-react'
import { lecturerApi } from '@/api'
import { getStatusBadge, getGenderLabel } from '@/utils'

interface Lecturer {
  id: number
  nidn: string
  full_name: string
  front_title: string
  back_title: string
  gender: string
  email: string
  phone: string
  status: string
  employment_status: string
  study_program: { id: number; name: string; code: string }
  faculty: { id: number; name: string; short_name: string }
}

export default function LecturersPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState<Lecturer | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<Lecturer | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['lecturers', search, statusFilter, page],
    queryFn: () =>
      lecturerApi.list({
        search: search || undefined,
        status: statusFilter || undefined,
        page,
        per_page: 20,
      }),
    staleTime: 30000,
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => lecturerApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lecturers'] })
      setDeleteConfirm(null)
    },
  })

  const lecturers: Lecturer[] = data?.data?.data || []
  const meta = data?.data?.meta || {}

  const employmentLabels: Record<string, string> = {
    tetap: 'Tetap',
    luar_biasa: 'Luar Biasa',
    kontrak: 'Kontrak',
  }

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Data Dosen</h1>
          <p className="page-subtitle">
            Kelola data dosen IAIMU Pamekasan
            {meta.total !== undefined && (
              <span className="ml-2 badge badge-blue">{meta.total} dosen</span>
            )}
          </p>
        </div>
        <button onClick={() => { setEditData(null); setShowForm(true); }} className="btn-primary">
          <Plus className="w-4 h-4" />
          Tambah Dosen
        </button>
      </div>

      {/* Card */}
      <div className="card">
        {/* Filters */}
        <div className="p-4 border-b border-gray-50 dark:border-gray-700 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              placeholder="Cari NIDN atau nama..."
              className="form-input pl-9"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
              className="form-input pl-9 pr-8 min-w-36"
            >
              <option value="">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="cuti">Cuti</option>
              <option value="tugas_belajar">Tugas Belajar</option>
              <option value="inactive">Non-Aktif</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper rounded-none">
          <table className="table">
            <thead>
              <tr>
                <th>NIDN</th>
                <th>Nama Dosen</th>
                <th>Program Studi</th>
                <th>Fakultas</th>
                <th>Status Kepegawaian</th>
                <th>Status</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j}><div className="shimmer h-4 rounded" /></td>
                      ))}
                    </tr>
                  ))
                : lecturers.length === 0
                ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-3xl">👨‍🏫</span>
                          <span>Tidak ada data dosen</span>
                        </div>
                      </td>
                    </tr>
                  )
                : lecturers.map((l) => {
                    const badge = getStatusBadge(l.status)
                    const fullTitle = [l.front_title, l.full_name].filter(Boolean).join(' ') + (l.back_title ? ', ' + l.back_title : '')
                    return (
                      <tr key={l.id}>
                        <td>
                          <span className="font-mono text-xs font-medium text-gray-700 dark:text-gray-300">
                            {l.nidn || '-'}
                          </span>
                        </td>
                        <td>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white text-sm leading-tight">
                              {fullTitle}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {getGenderLabel(l.gender)} · {l.email || '-'}
                            </p>
                          </div>
                        </td>
                        <td className="text-sm text-gray-600 dark:text-gray-400">
                          {l.study_program?.code || '-'}
                        </td>
                        <td className="text-sm text-gray-600 dark:text-gray-400">
                          {l.faculty?.short_name || l.faculty?.name || '-'}
                        </td>
                        <td>
                          <span className="badge badge-blue">
                            {employmentLabels[l.employment_status] || l.employment_status}
                          </span>
                        </td>
                        <td>
                          <span className={badge.class}>{badge.label}</span>
                        </td>
                        <td>
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => { setEditData(l); setShowForm(true); }} className="btn-ghost w-8 h-8 rounded-lg text-gray-500 hover:text-brand-600">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(l)}
                              className="btn-ghost w-8 h-8 rounded-lg text-gray-500 hover:text-red-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta.last_page > 1 && (
          <div className="p-4 border-t border-gray-50 dark:border-gray-700 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Halaman {meta.current_page} dari {meta.last_page} · {meta.total} data
            </p>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="btn-secondary text-xs py-1.5 px-3">← Prev</button>
              <button onClick={() => setPage((p) => Math.min(meta.last_page, p + 1))} disabled={page === meta.last_page} className="btn-secondary text-xs py-1.5 px-3">Next →</button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-slide-up">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Hapus Dosen?</h3>
            <p className="text-sm text-gray-500">
              Yakin hapus data <strong>{deleteConfirm.full_name}</strong>?
            </p>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary flex-1">Batal</button>
              <button onClick={() => deleteMutation.mutate(deleteConfirm.id)} disabled={deleteMutation.isPending} className="btn-danger flex-1">
                {deleteMutation.isPending ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editData ? 'Edit Dosen' : 'Tambah Dosen'}
              </h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const fd = new FormData(e.currentTarget)
                const payload = Object.fromEntries(fd.entries())
                if (editData) {
                  // updateMutation.mutate({ id: editData.id, ...payload })
                } else {
                  // createMutation.mutate(payload)
                }
              }}
              className="p-5 space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">NIDN *</label>
                  <input name="nidn" defaultValue={editData?.nidn} required className="form-input" />
                </div>
                <div>
                  <label className="form-label">Nama Lengkap *</label>
                  <input name="full_name" defaultValue={editData?.full_name} required className="form-input" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Email *</label>
                  <input type="email" name="email" defaultValue={editData?.email} required className="form-input" />
                </div>
                <div>
                  <label className="form-label">Nomor Telepon</label>
                  <input name="phone" defaultValue={editData?.phone} className="form-input" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Gelar Depan</label>
                  <input name="front_title" defaultValue={editData?.front_title} placeholder="Dr." className="form-input" />
                </div>
                <div>
                  <label className="form-label">Gelar Belakang *</label>
                  <input name="back_title" defaultValue={editData?.back_title} required placeholder="M.Pd." className="form-input" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Jenis Kelamin</label>
                  <select name="gender" defaultValue={editData?.gender || 'L'} className="form-input">
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Status Kepegawaian *</label>
                  <select name="employment_status" defaultValue={editData?.employment_status || 'tetap'} className="form-input">
                    <option value="tetap">Dosen Tetap</option>
                    <option value="luar_biasa">Dosen Luar Biasa (LB)</option>
                    <option value="kontrak">Dosen Kontrak</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">
                  Batal
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
