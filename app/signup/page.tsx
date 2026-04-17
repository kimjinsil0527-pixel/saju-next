'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './signup.module.css'

export default function SignUp() {
  const router = useRouter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    router.push('/dashboard')
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.wrap}>
        <Link href="/" className={styles.logo}>MINGYUN</Link>

        <div className={styles.card}>
          <div className={styles.topLine} />
          <h1 className={styles.title}>Create your account</h1>
          <p className={styles.sub}>Free forever — unlock premium whenever you're ready</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" name="firstName" placeholder="Jane" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" name="lastName" placeholder="Doe" required />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" placeholder="you@example.com" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" placeholder="At least 8 characters" required />
            </div>
            <div className={styles.terms}>
              <input type="checkbox" id="agree" required />
              <label htmlFor="agree">
                I agree to the <Link href="/terms">Terms of Use</Link> and <Link href="/privacy">Privacy Policy</Link>
              </label>
            </div>
            <button type="submit" className={styles.submit}>Create Account — Free →</button>
          </form>

          <div className={styles.dividerWrap}>
            <span className={styles.divider}>or sign up with</span>
          </div>

          <div className={styles.socials}>
            <button className={styles.social}>
              <span>G</span> Google
            </button>
            <button className={styles.social}>
              <span>A</span> Apple
            </button>
          </div>

          <p className={styles.switch}>
            Already have an account? <Link href="/signin">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
