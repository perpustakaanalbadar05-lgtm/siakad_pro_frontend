import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, Edit2, Trash2, CheckCircle2, XCircle } from 'lucide-react'
import { academicYearApi } from '@/api'
import { formatDate, cn } from '@/utils'

interface AcademicYear {
  id: number
  year: string
  semester: string
  label: string
  is_active: boolean
  start_date: string
  end_date: string
  krs_start: string
  krs_end: string
}

export default function AcademicYearsPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState<AcademicYear | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<AcademicYear | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['academic-years', search],
    queryFn: () => academicYearApi.list({ search: search || undefined }),
    staleTime: 30000,
  })

  const createMutation = useMutation({
    mutationFn: (d: object) => academicYearApi.create(d),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['academic-years'] }); setShowForm(false) },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, ...d }: { id: number } & object) => academicYearApi.update(id, d),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['academic-years'] }); setEditData(null) },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => academicYearApi.delete(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['academic-years'] }); setDeleteConfirm(null) },
  })

  const activateMutation = useMutation({
    mutationFn: (id: number) => academicYearApi.activate(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['academic-years'] }) },
  })

  const years: AcademicYear[] = data?.data?.data || []

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tahun Akademik</h1>
          <p className="page-subtitle">Kelola masa registrasi dan perkuliahan</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus className="w-4 h-4" /> Tambah Tahun Akademik
        </button>
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-50 dark:border-gray-700">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari tahun akademik..."
              className="form-input pl-9"
            />
          </div>
        </div>

        <div className="table-wrapper rounded-none rounded-b-xl">
          <table className="table">
            <thead>
              <tr>
                <th>Tahun</th>
                <th>Semester</th>
                <th>Label</th>
                <th>Periode Kuliah</th>
                <th>Periode KRS</th>
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
                : years.length === 0
                ? (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-gray-400">Tidak ada data tahun akademik</td>
                    </tr>
                  )
                : years.map((y) => (
                    <tr key={y.id} className={cn(y.is_active && "bg-brand-50/50 dark:bg-brand-900/10")}>
                      <td><span className="font-mono text-sm">{y.year}</span></td>
                      <td className="capitalize">{y.semester}</td>
                      <td className="font-medium text-gray-900 dark:text-white">{y.label}</td>
                      <td className="text-xs text-gray-500">
                        {formatDate(y.start_date)} - {formatDate(y.end_date)}
                      </td>
                      <td className="text-xs text-gray-500">
                        {formatDate(y.krs_start)} - {formatDate(y.krs_end)}
                      </td>
                      <td>
                        {y.is_active ? (
                          <span className="badge badge-green">Aktif</span>
                        ) : (
                          <span className="badge badge-gray">Non-Aktif</span>
                        )}
                      </td>
                      <td>
                        <div className="flex items-center justify-end gap-1">
                          {!y.is_active && (
                            <button
                              onClick={() => activateMutation.mutate(y.id)}
                              className="btn-ghost w-8 h-8 rounded-lg text-gray-500 hover:text-green-600"
                              title="Aktifkan Semester"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => setEditData(y)}
                            className="btn-ghost w-8 h-8 rounded-lg text-gray-500 hover:text-brand-600"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(y)}
                            className="btn-ghost w-8 h-8 rounded-lg text-gray-500 hover:text-red-600"
                            disabled={y.is_active}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Forms and Delete Modal logic similar to Faculties can go here */}
    </div>
  )
}
