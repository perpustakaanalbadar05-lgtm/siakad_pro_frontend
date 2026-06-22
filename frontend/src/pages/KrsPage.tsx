import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BookOpen, Check, Clock, Info, AlertTriangle } from 'lucide-react'
import { classScheduleApi, studyPlanApi, academicYearApi } from '@/api'
import useAuthStore from '@/store/authStore'

export default function KrsPage() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  const [selectedClasses, setSelectedClasses] = useState<number[]>([])

  const { data: activeYearData } = useQuery({
    queryKey: ['academic-years'],
    queryFn: () => academicYearApi.list(),
  })
  
  const activeYear = activeYearData?.data?.data?.find((y: any) => y.is_active)

  const { data: schedulesData, isLoading: isLoadingSchedules } = useQuery({
    queryKey: ['class-schedules', activeYear?.id],
    queryFn: () => classScheduleApi.list({ academic_year_id: activeYear?.id, per_page: 100 }),
    enabled: !!activeYear,
  })

  // Cek apakah mahasiswa sudah punya KRS di semester aktif
  const { data: myKrsData, isLoading: isLoadingMyKrs } = useQuery({
    queryKey: ['study-plans', user?.profile?.id, activeYear?.id],
    queryFn: () => studyPlanApi.list({ student_id: user?.profile?.id, academic_year_id: activeYear?.id }),
    enabled: !!user?.profile?.id && !!activeYear,
  })

  const submitMutation = useMutation({
    mutationFn: (data: any) => studyPlanApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study-plans'] })
    },
  })

  const schedules = schedulesData?.data?.data || []
  const myKrs = myKrsData?.data?.data?.[0]

  const toggleClass = (id: number) => {
    if (selectedClasses.includes(id)) {
      setSelectedClasses(selectedClasses.filter((c) => c !== id))
    } else {
      setSelectedClasses([...selectedClasses, id])
    }
  }

  const selectedCredits = schedules
    .filter((s: any) => selectedClasses.includes(s.id))
    .reduce((total: number, s: any) => total + (s.course?.credits || 0), 0)

  const maxCredits = 24

  if (!activeYear) {
    return (
      <div className="p-8 text-center bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-xl border border-yellow-200 dark:border-yellow-800">
        <AlertTriangle className="w-8 h-8 mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-1">Tahun Akademik Belum Aktif</h3>
        <p>Hubungi bagian akademik untuk informasi jadwal pengisian KRS.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Kartu Rencana Studi (KRS)</h1>
          <p className="page-subtitle">Pengisian KRS Semester {activeYear.name}</p>
        </div>
        {myKrs && (
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            myKrs.status === 'approved' ? 'bg-green-100 text-green-700' :
            myKrs.status === 'rejected' ? 'bg-red-100 text-red-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            Status: {myKrs.status === 'approved' ? 'Disetujui' : myKrs.status === 'pending_approval' ? 'Menunggu Persetujuan' : 'Ditolak'}
          </div>
        )}
      </div>

      {!myKrs || myKrs.status === 'rejected' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Pilih Kelas yang Ditawarkan</h3>
            
            {isLoadingSchedules ? (
              <div className="shimmer h-32 rounded-xl"></div>
            ) : schedules.length === 0 ? (
              <div className="p-8 text-center border border-dashed rounded-xl border-gray-300 dark:border-gray-700">
                Belum ada jadwal kelas yang ditawarkan pada semester ini.
              </div>
            ) : (
              schedules.map((schedule: any) => {
                const isSelected = selectedClasses.includes(schedule.id)
                return (
                  <div 
                    key={schedule.id}
                    onClick={() => toggleClass(schedule.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-brand-50 border-brand-500 dark:bg-brand-900/20 dark:border-brand-500' 
                        : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:border-brand-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${
                            isSelected ? 'bg-brand-100 text-brand-700 dark:bg-brand-800 dark:text-brand-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {schedule.day_of_week}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {schedule.start_time.substring(0, 5)} - {schedule.end_time.substring(0, 5)}
                          </span>
                        </div>
                        <h4 className={`font-semibold ${isSelected ? 'text-brand-900 dark:text-brand-100' : 'text-gray-900 dark:text-white'}`}>
                          {schedule.course?.name} ({schedule.course?.code})
                        </h4>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {schedule.course?.credits} SKS • Dosen: {schedule.lecturer?.full_name}
                        </p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'bg-brand-500 border-brand-500 text-white' : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <div>
            <div className="card p-5 sticky top-24">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Ringkasan KRS</h3>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">Total SKS Diambil</span>
                <span className={`font-bold text-lg ${selectedCredits > maxCredits ? 'text-red-500' : 'text-brand-600 dark:text-brand-400'}`}>
                  {selectedCredits} / {maxCredits}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6">
                <div 
                  className={`h-2.5 rounded-full ${selectedCredits > maxCredits ? 'bg-red-500' : 'bg-brand-500'}`} 
                  style={{ width: `${Math.min((selectedCredits / maxCredits) * 100, 100)}%` }}
                ></div>
              </div>

              <div className="space-y-3 mb-6">
                {schedules.filter((s: any) => selectedClasses.includes(s.id)).map((s: any) => (
                  <div key={s.id} className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300 truncate pr-2">{s.course?.name}</span>
                    <span className="text-gray-500 font-medium whitespace-nowrap">{s.course?.credits} SKS</span>
                  </div>
                ))}
                {selectedClasses.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-2">Belum ada mata kuliah yang dipilih.</p>
                )}
              </div>

              {submitMutation.isError && (
                <div className="p-3 mb-4 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{submitMutation.error?.response?.data?.message || 'Terjadi kesalahan.'}</span>
                </div>
              )}

              <button 
                onClick={() => submitMutation.mutate({
                  student_id: user?.profile?.id,
                  academic_year_id: activeYear.id,
                  class_schedule_ids: selectedClasses,
                })}
                disabled={selectedClasses.length === 0 || selectedCredits > maxCredits || submitMutation.isPending}
                className="btn-primary w-full justify-center"
              >
                {submitMutation.isPending ? 'Mengajukan...' : 'Ajukan KRS'}
              </button>
              
              {selectedCredits > maxCredits && (
                <p className="text-xs text-red-500 text-center mt-2 flex items-center justify-center gap-1">
                  <Info className="w-3 h-3" /> Melebihi batas SKS
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="p-6 border-b border-gray-50 dark:border-gray-700 text-center">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
              myKrs.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
            }`}>
              <Check className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">KRS Berhasil Diajukan</h2>
            <p className="text-gray-500">
              Total SKS: {myKrs.total_credits}. 
              {myKrs.status === 'pending_approval' ? ' Menunggu persetujuan dari dosen wali Anda.' : ' KRS Anda telah disetujui.'}
            </p>
          </div>
          
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Kode MK</th>
                  <th>Mata Kuliah</th>
                  <th>SKS</th>
                  <th>Jadwal</th>
                  <th>Ruangan</th>
                  <th>Dosen</th>
                </tr>
              </thead>
              <tbody>
                {/* Note: since details are loaded, we map through myKrs.details */}
                {myKrs.details?.map((detail: any) => {
                  const schedule = detail.class_schedule
                  return (
                    <tr key={detail.id}>
                      <td className="font-mono text-sm text-gray-500">{schedule?.course?.code}</td>
                      <td className="font-medium text-gray-900 dark:text-white">{schedule?.course?.name}</td>
                      <td>{schedule?.course?.credits}</td>
                      <td className="capitalize">{schedule?.day_of_week}, {schedule?.start_time.substring(0,5)} - {schedule?.end_time.substring(0,5)}</td>
                      <td>{schedule?.room?.name}</td>
                      <td className="text-sm">{schedule?.lecturer?.full_name}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
