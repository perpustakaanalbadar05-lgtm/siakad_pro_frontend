import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProtectedRoute from '@/components/ProtectedRoute'
import DashboardLayout from '@/layouts/DashboardLayout'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import FacultiesPage from '@/pages/FacultiesPage'
import StudentsPage from '@/pages/StudentsPage'
import LecturersPage from '@/pages/LecturersPage'
import StudyProgramsPage from '@/pages/StudyProgramsPage'
import AcademicYearsPage from '@/pages/AcademicYearsPage'
import CoursesPage from '@/pages/CoursesPage'
import { NotFoundPage } from '@/pages/PlaceholderPages'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Protected dashboard routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="lecturers" element={<LecturersPage />} />
            <Route path="faculties" element={<FacultiesPage />} />
            <Route path="study-programs" element={<StudyProgramsPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="academic-years" element={<AcademicYearsPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
