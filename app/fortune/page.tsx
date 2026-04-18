import { Suspense } from 'react'
import { cookies } from 'next/headers'
import FortuneClient from './FortuneClient'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import StarCanvas from '@/components/StarCanvas'

export default async function FortunePage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  const isAdmin = !!token && token === process.env.AUTH_SECRET

  return (
    <>
      <StarCanvas />
      <Nav />
      <Suspense fallback={<LoadingScreen />}>
        <FortuneClient isAdmin={isAdmin} />
      </Suspense>
      <Footer />
    </>
  )
}

function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      position: 'relative',
      zIndex: 1,
    }}>
      <div style={{ fontSize: '40px', animation: 'spin 3s linear infinite' }}>☯</div>
      <p style={{ fontFamily: 'Noto Serif KR, serif', fontSize: '16px', color: 'var(--text-mid)', letterSpacing: '0.2em' }}>
        사주를 분석하고 있습니다...
      </p>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
