import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, Edit2, Trash2, Filter } from 'lucide-react'
import { courseApi, studyProgramApi } from '@/api'

interface StudyProgram {
  id: number
  name: string
  code: string
}

interface Course {
  id: number
  code: string
  name: string
  credits: number
  semester: number
  type: string
  is_active: boolean
  study_program: StudyProgram
}

export default function CoursesPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [studyProgramFilter, setStudyProgramFilter] = useState('')
  const [page, setPage] = useState(1)

  const { data: studyProgramsData } = useQuery({
    queryKey: ['study-programs'],
    queryFn: () => studyProgramApi.list(),
  })

  const { data, isLoading } = useQuery({
    queryKey: ['courses', search, studyProgramFilter, page],
    queryFn: () => courseApi.list({ search: search || undefined, study_program_id: studyProgramFilter || undefined, page, per_page: 20 }),
  })

  const courses: Course[] = data?.data?.data || []
  const meta = data?.data?.meta || {}
  const studyPrograms: StudyProgram[] = studyProgramsData?.data?.data || []

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Mata Kuliah</h1>
          <p className="page-subtitle">Kelola kurikulum dan mata kuliah prodi</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4" /> Tambah Mata Kuliah
        </button>
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-50 dark:border-gray-700 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              placeholder="Cari kode atau nama mata kuliah..."
              className="form-input pl-9"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={studyProgramFilter}
              onChange={(e) => { setStudyProgramFilter(e.target.value); setPage(1) }}
              className="form-input pl-9 pr-8 min-w-36"
            >
              <option value="">Semua Program Studi</option>
              {studyPrograms.map((p) => (
                <option key={p.id} value={p.id}>{p.code} - {p.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-wrapper rounded-none">
          <table className="table">
            <thead>
              <tr>
                <th>Kode</th>
                <th>Mata Kuliah</th>
                <th>Program Studi</th>
                <th>SKS</th>
                <th>Semester</th>
                <th>Sifat</th>
                <th>Status</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 8 }).map((_, j) => (
                        <td key={j}><div className="shimmer h-4 rounded" /></td>
                      ))}
                    </tr>
                  ))
                : courses.length === 0
                ? (
                    <tr>
                      <td colSpan={8} className="text-center py-10 text-gray-400">Tidak ada data mata kuliah</td>
                    </tr>
                  )
                : courses.map((c) => (
                    <tr key={c.id}>
                      <td><span className="font-mono text-sm">{c.code}</span></td>
                      <td className="font-medium text-gray-900 dark:text-white">{c.name}</td>
                      <td className="text-sm text-gray-600">{c.study_program?.code}</td>
                      <td>
                        <div className="w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold">
                          {c.credits}
                        </div>
                      </td>
                      <td>Semester {c.semester}</td>
                      <td>
                        <span className={`badge ${c.type === 'wajib' ? 'badge-blue' : 'badge-gray'}`}>
                          {c.type === 'wajib' ? 'Wajib' : 'Pilihan'}
                        </span>
                      </td>
                      <td>
                        {c.is_active ? (
                          <span className="badge badge-green">Aktif</span>
                        ) : (
                          <span className="badge badge-gray">Non-Aktif</span>
                        )}
                      </td>
                      <td>
                        <div className="flex items-center justify-end gap-1">
                          <button className="btn-ghost w-8 h-8 rounded-lg text-gray-500 hover:text-brand-600">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button className="btn-ghost w-8 h-8 rounded-lg text-gray-500 hover:text-red-600">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

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
    </div>
  )
}
