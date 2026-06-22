import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | null | undefined, style: 'long' | 'short' | 'relative' = 'short'): string {
  if (!date) return '-'
  const d = new Date(date)
  if (style === 'long') {
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  }
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount)
}

export function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

export function getStatusBadge(status: string): { label: string; class: string } {
  const map: Record<string, { label: string; class: string }> = {
    aktif: { label: 'Aktif', class: 'badge-green' },
    active: { label: 'Aktif', class: 'badge-green' },
    lulus: { label: 'Lulus', class: 'badge-blue' },
    cuti: { label: 'Cuti', class: 'badge-yellow' },
    nonaktif: { label: 'Non-Aktif', class: 'badge-gray' },
    inactive: { label: 'Non-Aktif', class: 'badge-gray' },
    drop_out: { label: 'Drop Out', class: 'badge-red' },
    mengundurkan_diri: { label: 'Mengundurkan Diri', class: 'badge-red' },
  }
  return map[status] ?? { label: status, class: 'badge-gray' }
}

export function getGenderLabel(gender: string): string {
  return gender === 'L' ? 'Laki-laki' : 'Perempuan'
}

export function formatRupiah(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(amount))
}

export function formatTime(time: string | null | undefined): string {
  if (!time) return '-'
  return time.substring(0, 5)
}
