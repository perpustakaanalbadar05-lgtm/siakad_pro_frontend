import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, Edit2, Trash2, Eye, Users, UserCheck } from 'lucide-react'
import { facultyApi } from '@/api'
import { getStatusBadge, cn } from '@/utils'

interface Faculty {
  id: number
  code: string
  name: string
  short_name: string
  dean_name: string
  phone: string
  email: string
  status: string
  study_programs_count: number
  lecturers_count: number
  students_count: number
}

interface FacultyFormProps {
  data?: Partial<Faculty>
  onSubmit: (data: object) => void
  isLoading: boolean
  onCancel: () => void
}

function FacultyForm({ data, onSubmit, isLoading, onCancel }: FacultyFormProps) {
  const [form, setForm] = useState({
    code: data?.code || '',
    name: data?.name || '',
    short_name: data?.short_name || '',
    dean_name: data?.dean_name || '',
    phone: data?.phone || '',
    email: data?.email || '',
    status: data?.status || 'active',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md animate-slide-up">
        <div className="p-5 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {data?.id ? 'Edit Fakultas' : 'Tambah Fakultas Baru'}
          </h2>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); onSubmit(form) }}
          className="p-5 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Kode Fakultas *</label>
              <input name="code" value={form.code} onChange={handleChange} required maxLength={10}
                className="form-input" placeholder="FT" />
            </div>
            <div>
              <label className="form-label">Singkatan</label>
              <input name="short_name" value={form.short_name} onChange={handleChange} maxLength={20}
                className="form-input" placeholder="TARBIYAH" />
            </div>
          </div>
          <div>
            <label className="form-label">Nama Fakultas *</label>
            <input name="name" value={form.name} onChange={handleChange} required
              className="form-input" placeholder="Fakultas Tarbiyah" />
          </div>
          <div>
            <label className="form-label">Nama Dekan</label>
            <input name="dean_name" value={form.dean_name} onChange={handleChange}
              className="form-input" placeholder="Prof. Dr. ..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Telepon</label>
              <input name="phone" value={form.phone} onChange={handleChange}
                className="form-input" placeholder="08..." />
            </div>
            <div>
              <label className="form-label">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="form-input">
                <option value="active">Aktif</option>
                <option value="inactive">Non-Aktif</option>
              </select>
            </div>
          </div>
          <div>
            <label className="form-label">Email</label>
            <input name="email" value={form.email} onChange={handleChange} type="email"
              className="form-input" placeholder="fakultas@iaimu.ac.id" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onCancel} className="btn-secondary flex-1">
              Batal
            </button>
            <button type="submit" disabled={isLoading} className="btn-primary flex-1">
              {isLoading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function FacultiesPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState<Faculty | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<Faculty | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['faculties', search],
    queryFn: () => facultyApi.list({ search: search || undefined }),
    staleTime: 30000,
  })

  const createMutation = useMutation({
    mutationFn: (d: object) => facultyApi.create(d),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['faculties'] }); setShowForm(false) },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, ...d }: { id: number } & object) => facultyApi.update(id, d),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['faculties'] }); setEditData(null) },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => facultyApi.delete(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['faculties'] }); setDeleteConfirm(null) },
  })

  const faculties: Faculty[] = data?.data?.data || []

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Fakultas</h1>
          <p className="page-subtitle">Kelola data fakultas IAIMU Pamekasan</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus className="w-4 h-4" />
          Tambah Fakultas
        </button>
      </div>

      {/* Card */}
      <div className="card">
        {/* Search bar */}
        <div className="p-4 border-b border-gray-50 dark:border-gray-700">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari fakultas..."
              className="form-input pl-9"
            />
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper rounded-none rounded-b-xl">
          <table className="table">
            <thead>
              <tr>
                <th>Kode</th>
                <th>Nama Fakultas</th>
                <th>Dekan</th>
                <th>Program Studi</th>
                <th>Mahasiswa</th>
                <th>Status</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j}><div className="shimmer h-4 rounded" /></td>
                      ))}
                    </tr>
                  ))
                : faculties.length === 0
                ? (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-gray-400">
                        Tidak ada data fakultas
                      </td>
                    </tr>
                  )
                : faculties.map((fac) => {
                    const badge = getStatusBadge(fac.status)
                    return (
                      <tr key={fac.id}>
                        <td>
                          <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                            {fac.code}
                          </span>
                        </td>
                        <td>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{fac.name}</p>
                            {fac.short_name && (
                              <p className="text-xs text-gray-400">{fac.short_name}</p>
                            )}
                          </div>
                        </td>
                        <td className="text-gray-500 dark:text-gray-400">{fac.dean_name || '-'}</td>
                        <td>
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <Eye className="w-3.5 h-3.5" />
                            <span>{fac.study_programs_count}</span>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <Users className="w-3.5 h-3.5" />
                            <span>{fac.students_count}</span>
                          </div>
                        </td>
                        <td>
                          <span className={badge.class}>{badge.label}</span>
                        </td>
                        <td>
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setEditData(fac)}
                              className="btn-ghost w-8 h-8 rounded-lg text-gray-500 hover:text-brand-600"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(fac)}
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
      </div>

      {/* Forms */}
      {showForm && (
        <FacultyForm
          onSubmit={(d) => createMutation.mutate(d)}
          isLoading={createMutation.isPending}
          onCancel={() => setShowForm(false)}
        />
      )}
      {editData && (
        <FacultyForm
          data={editData}
          onSubmit={(d) => updateMutation.mutate({ id: editData.id, ...d } as { id: number } & object)}
          isLoading={updateMutation.isPending}
          onCancel={() => setEditData(null)}
        />
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-slide-up">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Hapus Fakultas?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Yakin ingin menghapus <strong>{deleteConfirm.name}</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary flex-1">
                Batal
              </button>
              <button
                onClick={() => deleteMutation.mutate(deleteConfirm.id)}
                disabled={deleteMutation.isPending}
                className="btn-danger flex-1"
              >
                {deleteMutation.isPending ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
