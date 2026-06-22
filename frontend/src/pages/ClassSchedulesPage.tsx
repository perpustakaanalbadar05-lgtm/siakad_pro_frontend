import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, Trash2, Calendar as CalendarIcon, Clock, MapPin, Users } from 'lucide-react'
import { classScheduleApi, academicYearApi, courseApi, lecturerApi, roomApi } from '@/api'
import { formatTime } from '@/utils'

interface ClassSchedule {
  id: number
  academic_year_id: number
  course_id: number
  lecturer_id: number
  room_id: number
  day_of_week: string
  start_time: string
  end_time: string
  quota: number
  course?: { id: number; code: string; name: string; credits: number }
  lecturer?: { id: number; full_name: string; front_title: string; back_title: string }
  room?: { id: number; code: string; name: string }
}

export default function ClassSchedulesPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<ClassSchedule | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['class-schedules', page],
    queryFn: () => classScheduleApi.list({ page, per_page: 20 }),
  })

  // Queries for form options
  const { data: yearsData } = useQuery({ queryKey: ['academic-years'], queryFn: () => academicYearApi.list() })
  const { data: coursesData } = useQuery({ queryKey: ['courses'], queryFn: () => courseApi.list({ per_page: 100 }) })
  const { data: lecturersData } = useQuery({ queryKey: ['lecturers'], queryFn: () => lecturerApi.list({ per_page: 100 }) })
  const { data: roomsData } = useQuery({ queryKey: ['rooms'], queryFn: () => roomApi.list() })

  const createMutation = useMutation({
    mutationFn: (data: any) => classScheduleApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['class-schedules'] })
      setShowForm(false)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => classScheduleApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['class-schedules'] })
      setDeleteConfirm(null)
    },
  })

  const schedules: ClassSchedule[] = data?.data?.data || []
  const meta = data?.data?.meta || {}

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Jadwal Kuliah</h1>
          <p className="page-subtitle">Kelola jadwal perkuliahan kelas</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus className="w-4 h-4" />
          Buat Jadwal
        </button>
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-50 dark:border-gray-700">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari mata kuliah atau dosen..."
              className="form-input pl-9"
            />
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 shimmer h-40"></div>
            ))
          ) : schedules.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-400">
              Belum ada jadwal kuliah yang dibuat.
            </div>
          ) : (
            schedules.map((schedule) => {
              const fullTitle = [schedule.lecturer?.front_title, schedule.lecturer?.full_name].filter(Boolean).join(' ') + (schedule.lecturer?.back_title ? ', ' + schedule.lecturer?.back_title : '')
              
              return (
                <div key={schedule.id} className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="badge badge-blue mb-2 inline-block capitalize">{schedule.day_of_week}</span>
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{schedule.course?.name}</h3>
                      <p className="text-sm text-gray-500">{schedule.course?.code} • {schedule.course?.credits} SKS</p>
                    </div>
                    <button onClick={() => setDeleteConfirm(schedule)} className="text-gray-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="line-clamp-1">{fullTitle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{schedule.start_time.substring(0, 5)} - {schedule.end_time.substring(0, 5)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{schedule.room?.name} ({schedule.room?.code})</span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Hapus Jadwal?</h3>
            <p className="text-sm text-gray-500">
              Yakin ingin menghapus jadwal <strong>{deleteConfirm.course?.name}</strong>?
            </p>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary flex-1">Batal</button>
              <button onClick={() => deleteMutation.mutate(deleteConfirm.id)} disabled={deleteMutation.isPending} className="btn-danger flex-1">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Buat Jadwal Kuliah</h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const fd = new FormData(e.currentTarget)
                createMutation.mutate(Object.fromEntries(fd.entries()))
              }}
              className="p-5 space-y-4"
            >
              <div>
                <label className="form-label">Tahun Akademik</label>
                <select name="academic_year_id" required className="form-input">
                  <option value="">Pilih Tahun Akademik</option>
                  {yearsData?.data?.data?.map((y: any) => (
                    <option key={y.id} value={y.id}>{y.name} {y.is_active ? '(Aktif)' : ''}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="form-label">Mata Kuliah</label>
                <select name="course_id" required className="form-input">
                  <option value="">Pilih Mata Kuliah</option>
                  {coursesData?.data?.data?.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Dosen Pengampu</label>
                <select name="lecturer_id" required className="form-input">
                  <option value="">Pilih Dosen</option>
                  {lecturersData?.data?.data?.map((l: any) => (
                    <option key={l.id} value={l.id}>{l.full_name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Ruangan</label>
                  <select name="room_id" required className="form-input">
                    <option value="">Pilih Ruangan</option>
                    {roomsData?.data?.data?.map((r: any) => (
                      <option key={r.id} value={r.id}>{r.name} (Kap: {r.capacity})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Hari</label>
                  <select name="day_of_week" required className="form-input">
                    <option value="senin">Senin</option>
                    <option value="selasa">Selasa</option>
                    <option value="rabu">Rabu</option>
                    <option value="kamis">Kamis</option>
                    <option value="jumat">Jumat</option>
                    <option value="sabtu">Sabtu</option>
                    <option value="minggu">Minggu</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Jam Mulai</label>
                  <input type="time" name="start_time" required className="form-input" />
                </div>
                <div>
                  <label className="form-label">Jam Selesai</label>
                  <input type="time" name="end_time" required className="form-input" />
                </div>
                <div>
                  <label className="form-label">Kuota</label>
                  <input type="number" name="quota" defaultValue={40} required className="form-input" />
                </div>
              </div>

              {createMutation.isError && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                  {createMutation.error?.response?.data?.message || 'Terjadi kesalahan.'}
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">
                  Batal
                </button>
                <button type="submit" disabled={createMutation.isPending} className="btn-primary flex-1">
                  {createMutation.isPending ? 'Menyimpan...' : 'Simpan Jadwal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
