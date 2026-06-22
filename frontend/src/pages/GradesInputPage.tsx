import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Search, Save, CheckCircle } from 'lucide-react'
import { classScheduleApi, gradeApi, academicYearApi } from '@/api'
import useAuthStore from '@/stores/authStore'

export default function GradesInputPage() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | ''>('')
  const [gradesInput, setGradesInput] = useState<Record<number, any>>({})
  const [savedSuccess, setSavedSuccess] = useState(false)

  const { data: activeYearData } = useQuery({
    queryKey: ['academic-years'],
    queryFn: () => academicYearApi.list(),
  })
  
  const activeYear = activeYearData?.data?.data?.find((y: any) => y.is_active)

  // Fetch classes taught by this lecturer
  const { data: schedulesData } = useQuery({
    queryKey: ['lecturer-schedules', user?.profile?.id, activeYear?.id],
    queryFn: () => classScheduleApi.list({ lecturer_id: user?.profile?.id, academic_year_id: activeYear?.id }),
    enabled: !!user?.profile?.id && !!activeYear,
  })

  // In real app, we should fetch students enrolled in the selected schedule.
  // For demo purposes, we will mock the students list or fetch grades.
  const { data: gradesData, isLoading: isLoadingGrades } = useQuery({
    queryKey: ['grades', selectedScheduleId],
    queryFn: () => gradeApi.getByStudent({ class_schedule_id: selectedScheduleId }), // Mock endpoint to get enrolled students/grades
    enabled: !!selectedScheduleId,
  })

  const saveMutation = useMutation({
    mutationFn: (data: any) => gradeApi.update(data),
    onSuccess: () => {
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 3000)
      queryClient.invalidateQueries({ queryKey: ['grades', selectedScheduleId] })
    },
  })

  const schedules = schedulesData?.data?.data || []
  
  // MOCK DATA for enrolled students if gradesData is empty
  const enrolledStudents = gradesData?.data?.data?.length > 0 ? gradesData.data.data : [
    { student_id: 1, student: { nim: '2023001', full_name: 'Ahmad Fauzi' }, presence_score: 0, assignment_score: 0, mid_exam_score: 0, final_exam_score: 0 },
    { student_id: 2, student: { nim: '2023002', full_name: 'Budi Santoso' }, presence_score: 0, assignment_score: 0, mid_exam_score: 0, final_exam_score: 0 },
    { student_id: 3, student: { nim: '2023003', full_name: 'Citra Kirana' }, presence_score: 0, assignment_score: 0, mid_exam_score: 0, final_exam_score: 0 },
  ]

  const handleGradeChange = (studentId: number, field: string, value: string) => {
    const numValue = Math.min(100, Math.max(0, Number(value) || 0))
    setGradesInput((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {}),
        [field]: numValue
      }
    }))
  }

  const calculateFinalGrade = (studentId: number, initialData: any) => {
    const input = gradesInput[studentId] || {}
    const p = input.presence_score ?? initialData.presence_score ?? 0
    const a = input.assignment_score ?? initialData.assignment_score ?? 0
    const m = input.mid_exam_score ?? initialData.mid_exam_score ?? 0
    const f = input.final_exam_score ?? initialData.final_exam_score ?? 0

    const total = (p * 0.1) + (a * 0.2) + (m * 0.3) + (f * 0.4)
    
    let letter = 'E'
    if (total >= 85) letter = 'A'
    else if (total >= 80) letter = 'AB'
    else if (total >= 75) letter = 'B'
    else if (total >= 70) letter = 'BC'
    else if (total >= 65) letter = 'C'
    else if (total >= 50) letter = 'D'

    return { total: total.toFixed(2), letter }
  }

  const handleSave = () => {
    const gradesArray = enrolledStudents.map((s: any) => {
      const input = gradesInput[s.student_id] || {}
      return {
        student_id: s.student_id,
        presence_score: input.presence_score ?? s.presence_score ?? 0,
        assignment_score: input.assignment_score ?? s.assignment_score ?? 0,
        mid_exam_score: input.mid_exam_score ?? s.mid_exam_score ?? 0,
        final_exam_score: input.final_exam_score ?? s.final_exam_score ?? 0,
      }
    })

    saveMutation.mutate({
      class_schedule_id: selectedScheduleId,
      grades: gradesArray
    })
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Input Nilai Akademik</h1>
          <p className="page-subtitle">Kelola nilai mahasiswa untuk kelas Anda</p>
        </div>
        {savedSuccess && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg font-medium">
            <CheckCircle className="w-5 h-5" />
            Nilai berhasil disimpan!
          </div>
        )}
      </div>

      <div className="card mb-6">
        <div className="p-5 flex gap-4 items-end">
          <div className="flex-1">
            <label className="form-label">Pilih Kelas / Mata Kuliah</label>
            <select 
              className="form-input"
              value={selectedScheduleId}
              onChange={(e) => setSelectedScheduleId(Number(e.target.value))}
            >
              <option value="">-- Pilih Kelas --</option>
              {schedules.map((s: any) => (
                <option key={s.id} value={s.id}>
                  {s.course?.name} - Kelas {s.room?.name} ({s.day_of_week})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {selectedScheduleId && (
        <div className="card">
          <div className="p-4 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900 dark:text-white">Daftar Mahasiswa</h3>
            <button 
              onClick={handleSave} 
              disabled={saveMutation.isPending}
              className="btn-primary"
            >
              <Save className="w-4 h-4 mr-2" />
              {saveMutation.isPending ? 'Menyimpan...' : 'Simpan Nilai'}
            </button>
          </div>

          <div className="table-wrapper">
            <table className="table text-sm">
              <thead>
                <tr>
                  <th className="w-10">No</th>
                  <th>NIM</th>
                  <th>Nama Mahasiswa</th>
                  <th className="w-24 text-center">Kehadiran (10%)</th>
                  <th className="w-24 text-center">Tugas (20%)</th>
                  <th className="w-24 text-center">UTS (30%)</th>
                  <th className="w-24 text-center">UAS (40%)</th>
                  <th className="w-20 text-center">Nilai Akhir</th>
                  <th className="w-20 text-center">Grade</th>
                </tr>
              </thead>
              <tbody>
                {isLoadingGrades ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8">Memuat data...</td>
                  </tr>
                ) : enrolledStudents.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-gray-400">Belum ada mahasiswa terdaftar.</td>
                  </tr>
                ) : (
                  enrolledStudents.map((s: any, index: number) => {
                    const final = calculateFinalGrade(s.student_id, s)
                    const input = gradesInput[s.student_id] || {}

                    return (
                      <tr key={s.student_id}>
                        <td>{index + 1}</td>
                        <td className="font-mono text-gray-500">{s.student?.nim}</td>
                        <td className="font-medium text-gray-900 dark:text-white">{s.student?.full_name}</td>
                        <td>
                          <input 
                            type="number" 
                            min="0" max="100"
                            className="form-input py-1 px-2 text-center"
                            value={input.presence_score ?? s.presence_score ?? 0}
                            onChange={(e) => handleGradeChange(s.student_id, 'presence_score', e.target.value)}
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            min="0" max="100"
                            className="form-input py-1 px-2 text-center"
                            value={input.assignment_score ?? s.assignment_score ?? 0}
                            onChange={(e) => handleGradeChange(s.student_id, 'assignment_score', e.target.value)}
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            min="0" max="100"
                            className="form-input py-1 px-2 text-center"
                            value={input.mid_exam_score ?? s.mid_exam_score ?? 0}
                            onChange={(e) => handleGradeChange(s.student_id, 'mid_exam_score', e.target.value)}
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            min="0" max="100"
                            className="form-input py-1 px-2 text-center"
                            value={input.final_exam_score ?? s.final_exam_score ?? 0}
                            onChange={(e) => handleGradeChange(s.student_id, 'final_exam_score', e.target.value)}
                          />
                        </td>
                        <td className="text-center font-bold text-gray-700 dark:text-gray-300">
                          {final.total}
                        </td>
                        <td className="text-center">
                          <span className={`font-bold text-lg ${
                            ['A', 'AB'].includes(final.letter) ? 'text-green-600' : 
                            ['B', 'BC'].includes(final.letter) ? 'text-blue-600' : 
                            final.letter === 'C' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {final.letter}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
