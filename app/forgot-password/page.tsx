import Link from 'next/link'
import ForgotPasswordForm from './ForgotPasswordForm'
import styles from '@/app/signin/signin.module.css'

export default function ForgotPasswordPage() {
  return (
    <main className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.wrap}>
        <Link href="/" className={styles.logo}>
          UNMYUNG <span>FOUR PILLARS</span>
        </Link>
        <section className={styles.card}>
          <div className={styles.topLine} />
          <h1 className={styles.title}>Reset Password</h1>
          <p className={styles.sub}>We will email you a secure reset link.</p>
          <ForgotPasswordForm />
          <p className={styles.switch}>
            <Link href="/signin">Back to sign in</Link>
          </p>
        </section>
      </div>
    </main>
  )
}
