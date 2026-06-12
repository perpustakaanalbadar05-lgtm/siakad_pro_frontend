import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, Edit2, Trash2, Filter } from 'lucide-react'
import { studyProgramApi, facultyApi } from '@/api'
import { getStatusBadge } from '@/utils'

interface Faculty {
  id: number
  name: string
  short_name: string
}

interface StudyProgram {
  id: number
  code: string
  name: string
  level: string
  accreditation: string
  status: string
  faculty: Faculty
  head_of_program: string
  students_count: number
  lecturers_count: number
}

export default function StudyProgramsPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [facultyFilter, setFacultyFilter] = useState('')

  const { data: facultiesData } = useQuery({
    queryKey: ['faculties'],
    queryFn: () => facultyApi.list(),
  })

  const { data, isLoading } = useQuery({
    queryKey: ['study-programs', search, facultyFilter],
    queryFn: () => studyProgramApi.list({ search: search || undefined, faculty_id: facultyFilter || undefined }),
  })

  const studyPrograms: StudyProgram[] = data?.data?.data || []
  const faculties: Faculty[] = facultiesData?.data?.data || []

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Program Studi</h1>
          <p className="page-subtitle">Daftar prodi dan akreditasi</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4" /> Tambah Prodi
        </button>
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-50 dark:border-gray-700 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari program studi..."
              className="form-input pl-9"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={facultyFilter}
              onChange={(e) => setFacultyFilter(e.target.value)}
              className="form-input pl-9 pr-8 min-w-36"
            >
              <option value="">Semua Fakultas</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>{f.short_name || f.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-wrapper rounded-none rounded-b-xl">
          <table className="table">
            <thead>
              <tr>
                <th>Kode</th>
                <th>Program Studi</th>
                <th>Fakultas</th>
                <th>Jenjang</th>
                <th>Akreditasi</th>
                <th>Ka. Prodi</th>
                <th>Status</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 8 }).map((_, j) => (
                        <td key={j}><div className="shimmer h-4 rounded" /></td>
                      ))}
                    </tr>
                  ))
                : studyPrograms.length === 0
                ? (
                    <tr>
                      <td colSpan={8} className="text-center py-10 text-gray-400">Tidak ada data prodi</td>
                    </tr>
                  )
                : studyPrograms.map((p) => {
                    const badge = getStatusBadge(p.status)
                    return (
                      <tr key={p.id}>
                        <td><span className="font-mono text-sm">{p.code}</span></td>
                        <td className="font-medium text-gray-900 dark:text-white">{p.name}</td>
                        <td className="text-sm text-gray-600">{p.faculty?.short_name || p.faculty?.name}</td>
                        <td>
                          <span className="badge badge-gray">{p.level}</span>
                        </td>
                        <td>
                          <span className={`font-bold text-sm ${p.accreditation === 'A' || p.accreditation === 'Unggul' ? 'text-green-600' : 'text-blue-600'}`}>
                            {p.accreditation || '-'}
                          </span>
                        </td>
                        <td className="text-sm text-gray-500">{p.head_of_program || '-'}</td>
                        <td><span className={badge.class}>{badge.label}</span></td>
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
                    )
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
