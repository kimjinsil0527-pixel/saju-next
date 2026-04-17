'use client'
import { useRouter } from 'next/navigation'
import styles from './Hero.module.css'

const HOUR_OPTIONS = [
  { label: 'Unknown birth hour', value: '' },
  { label: 'Rat Hour · 11 PM – 1 AM', value: 'rat' },
  { label: 'Ox Hour · 1 AM – 3 AM', value: 'ox' },
  { label: 'Tiger Hour · 3 AM – 5 AM', value: 'tiger' },
  { label: 'Rabbit Hour · 5 AM – 7 AM', value: 'rabbit' },
  { label: 'Dragon Hour · 7 AM – 9 AM', value: 'dragon' },
  { label: 'Snake Hour · 9 AM – 11 AM', value: 'snake' },
  { label: 'Horse Hour · 11 AM – 1 PM', value: 'horse' },
  { label: 'Goat Hour · 1 PM – 3 PM', value: 'goat' },
  { label: 'Monkey Hour · 3 PM – 5 PM', value: 'monkey' },
  { label: 'Rooster Hour · 5 PM – 7 PM', value: 'rooster' },
  { label: 'Dog Hour · 7 PM – 9 PM', value: 'dog' },
  { label: 'Pig Hour · 9 PM – 11 PM', value: 'pig' },
]

export default function Hero() {
  const router = useRouter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const date = data.get('date') as string
    const gender = data.get('gender') as string
    const calendar = data.get('calendar') as string
    const hour = data.get('hour') as string

    if (!date) {
      alert('Please enter your birth date.')
      return
    }

    const params = new URLSearchParams({ date, gender, calendar, hour })
    router.push(`/fortune?${params.toString()}`)
  }

  return (
    <section className={styles.hero}>
      <p className={styles.eyebrow}>Four Pillars of Destiny · Precision Analysis</p>
      <h1 className={styles.title}>
        <span className={styles.thin}>Discover your </span>
        <span className={styles.gold}>destiny</span><br />in the stars
      </h1>
      <p className={styles.sub}>Your birth chart decoded — true nature, life trajectory, and the timing that matters most</p>

      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.cardTopLine} />
        <p className={styles.cardTitle}>✦ Free Birth Chart Reading ✦</p>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender">
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="calendar">Calendar</label>
            <select id="calendar" name="calendar">
              <option value="Solar">Solar (Gregorian)</option>
              <option value="Lunar">Lunar</option>
            </select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="date">Date of Birth</label>
            <input type="date" id="date" name="date" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="hour">Birth Hour</label>
            <select id="hour" name="hour">
              {HOUR_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className={styles.submit}>
          Reveal My Chart — Free →
        </button>
        <p className={styles.note}>
          Core reading is <span>completely free</span>. No sign-up required.
        </p>
      </form>

      <div className={styles.socialProof}>
        <span className={styles.proofText}>Free to use · No sign-up required · No ads</span>
      </div>
    </section>
  )
}
