import api from '@/api/axios'

export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  profile: () => api.get('/auth/profile'),
  updateProfile: (data: object) => api.put('/auth/profile', data),
  changePassword: (data: object) => api.put('/auth/change-password', data),
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
}

export const facultyApi = {
  list: (params?: object) => api.get('/faculties', { params }),
  get: (id: number) => api.get(`/faculties/${id}`),
  create: (data: object) => api.post('/faculties', data),
  update: (id: number, data: object) => api.put(`/faculties/${id}`, data),
  delete: (id: number) => api.delete(`/faculties/${id}`),
}

export const studyProgramApi = {
  list: (params?: object) => api.get('/study-programs', { params }),
  get: (id: number) => api.get(`/study-programs/${id}`),
  create: (data: object) => api.post('/study-programs', data),
  update: (id: number, data: object) => api.put(`/study-programs/${id}`, data),
  delete: (id: number) => api.delete(`/study-programs/${id}`),
}

export const studentApi = {
  list: (params?: object) => api.get('/students', { params }),
  get: (id: number) => api.get(`/students/${id}`),
  create: (data: object) => api.post('/students', data),
  update: (id: number, data: object) => api.put(`/students/${id}`, data),
  delete: (id: number) => api.delete(`/students/${id}`),
}

export const lecturerApi = {
  list: (params?: object) => api.get('/lecturers', { params }),
  get: (id: number) => api.get(`/lecturers/${id}`),
  create: (data: object) => api.post('/lecturers', data),
  update: (id: number, data: object) => api.put(`/lecturers/${id}`, data),
  delete: (id: number) => api.delete(`/lecturers/${id}`),
}

export const academicYearApi = {
  list: (params?: object) => api.get('/academic-years', { params }),
  get: (id: number) => api.get(`/academic-years/${id}`),
  create: (data: object) => api.post('/academic-years', data),
  update: (id: number, data: object) => api.put(`/academic-years/${id}`, data),
  delete: (id: number) => api.delete(`/academic-years/${id}`),
  activate: (id: number) => api.patch(`/academic-years/${id}/activate`),
}

export const courseApi = {
  list: (params?: object) => api.get('/courses', { params }),
  get: (id: number) => api.get(`/courses/${id}`),
  create: (data: object) => api.post('/courses', data),
  update: (id: number, data: object) => api.put(`/courses/${id}`, data),
  delete: (id: number) => api.delete(`/courses/${id}`),
}

export const dashboardApi = {
  admin: () => api.get('/dashboard/admin'),
  student: () => api.get('/dashboard/student'),
  lecturer: () => api.get('/dashboard/lecturer'),
}

// =====================================================================
// PHASE 2: MANAJEMEN AKADEMIK
// =====================================================================

export const academicCalendarApi = {
  list: (params?: object) => api.get('/academic-calendars', { params }),
  get: (id: number) => api.get(`/academic-calendars/${id}`),
  create: (data: object) => api.post('/academic-calendars', data),
  update: (id: number, data: object) => api.put(`/academic-calendars/${id}`, data),
  delete: (id: number) => api.delete(`/academic-calendars/${id}`),
}

export const classScheduleApi = {
  list: (params?: object) => api.get('/class-schedules', { params }),
  get: (id: number) => api.get(`/class-schedules/${id}`),
  create: (data: object) => api.post('/class-schedules', data),
  update: (id: number, data: object) => api.put(`/class-schedules/${id}`, data),
  delete: (id: number) => api.delete(`/class-schedules/${id}`),
}

export const studyPlanApi = {
  list: (params?: object) => api.get('/study-plans', { params }),
  get: (id: number) => api.get(`/study-plans/${id}`),
  create: (data: object) => api.post('/study-plans', data),
  approve: (id: number) => api.post(`/study-plans/${id}/approve`),
}

export const gradeApi = {
  getByStudent: (params?: object) => api.get('/grades', { params }),
  update: (data: object) => api.post('/grades/update', data),
}

export const presenceApi = {
  store: (data: object) => api.post('/presences', data),
}

// =====================================================================
// PHASE 3: MANAJEMEN KEUANGAN
// =====================================================================

export const billingTypeApi = {
  list: (params?: object) => api.get('/billing-types', { params }),
  get: (id: number) => api.get(`/billing-types/${id}`),
  create: (data: object) => api.post('/billing-types', data),
  update: (id: number, data: object) => api.put(`/billing-types/${id}`, data),
  delete: (id: number) => api.delete(`/billing-types/${id}`),
}

export const studentBillingApi = {
  list: (params?: object) => api.get('/student-billings', { params }),
  get: (id: number) => api.get(`/student-billings/${id}`),
  create: (data: object) => api.post('/student-billings', data),
  delete: (id: number) => api.delete(`/student-billings/${id}`),
}

export const paymentApi = {
  list: (params?: object) => api.get('/payments', { params }),
  get: (id: number) => api.get(`/payments/${id}`),
  store: (data: FormData) => api.post('/payments', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  verify: (id: number, data: object) => api.post(`/payments/${id}/verify`, data),
}

