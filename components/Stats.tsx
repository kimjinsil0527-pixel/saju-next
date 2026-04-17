import styles from './Stats.module.css'

const items = [
  { num: '25+', label: 'Reading Types' },
  { num: '100%', label: 'Free to Start' },
  { num: '0', label: 'Ads or Spam' },
  { num: '24/7', label: 'Always Available' },
]

export default function Stats() {
  return (
    <div className={styles.bar}>
      {items.map((item) => (
        <div key={item.label} className={styles.item}>
          <div className={styles.num}>{item.num}</div>
          <div className={styles.label}>{item.label}</div>
        </div>
      ))}
    </div>
  )
}
