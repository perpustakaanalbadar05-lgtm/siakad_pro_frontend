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
import ClassSchedulesPage from '@/pages/ClassSchedulesPage'
import KrsPage from '@/pages/KrsPage'
import KrsApprovalPage from '@/pages/KrsApprovalPage'
import GradesInputPage from '@/pages/GradesInputPage'
import KhsPage from '@/pages/KhsPage'
import BillingTypesPage from '@/pages/BillingTypesPage'
import BillingsPage from '@/pages/BillingsPage'
import PaymentVerificationPage from '@/pages/PaymentVerificationPage'
import MyFinancePage from '@/pages/MyFinancePage'
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
            
            {/* Phase 2: Akademik */}
            <Route path="class-schedules" element={<ClassSchedulesPage />} />
            <Route path="krs" element={<KrsPage />} />
            <Route path="krs-approval" element={<KrsApprovalPage />} />
            <Route path="grades" element={<GradesInputPage />} />
            <Route path="khs" element={<KhsPage />} />

            {/* Phase 3: Keuangan */}
            <Route path="billing-types" element={<BillingTypesPage />} />
            <Route path="billings" element={<BillingsPage />} />
            <Route path="payment-verification" element={<PaymentVerificationPage />} />
            <Route path="my-finance" element={<MyFinancePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
