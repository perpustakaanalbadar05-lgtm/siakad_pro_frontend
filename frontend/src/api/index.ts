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
