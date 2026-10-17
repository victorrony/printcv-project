import AdminPanel from './AdminPanel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — PrintCV',
  robots: 'noindex,nofollow',
}

export default function AdminPage() {
  return <AdminPanel />
}
