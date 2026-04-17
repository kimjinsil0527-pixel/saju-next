'use client'
import Link from 'next/link'
import { useState } from 'react'
import styles from './tarot.module.css'

const MAJOR_ARCANA = [
  { num: 'O', name: 'The Fool', symbol: '🌀', upright: 'New beginnings, spontaneity, a leap of faith. The universe is inviting you to trust the journey.', reversed: 'Recklessness or fear of the unknown. Reconsider before acting — are you truly prepared?', keywords: ['Beginnings', 'Innocence', 'Freedom'], advice: 'Take the leap — but with open eyes.' },
  { num: 'I', name: 'The Magician', symbol: '✦', upright: 'Skill, willpower, and resourcefulness. Everything you need is already within you.', reversed: 'Manipulation or untapped potential. Are you fully applying your abilities?', keywords: ['Power', 'Action', 'Will'], advice: 'You have all the tools. Use them.' },
  { num: 'II', name: 'The High Priestess', symbol: '☽', upright: 'Intuition, mystery, inner knowing. The answer you seek lies within — not outside.', reversed: 'Secrets, disconnection from intuition. You may be ignoring your inner voice.', keywords: ['Intuition', 'Wisdom', 'Mystery'], advice: 'Be still. The answer is already inside you.' },
  { num: 'III', name: 'The Empress', symbol: '♀', upright: 'Fertility, abundance, creativity. Nurture what you love — growth is underway.', reversed: 'Creative block or neglect. Are you taking care of yourself and others?', keywords: ['Abundance', 'Nature', 'Nurturing'], advice: 'Tend to your garden. Growth needs care.' },
  { num: 'IV', name: 'The Emperor', symbol: '♂', upright: 'Authority, structure, stability. Build a solid foundation and lead with clarity.', reversed: 'Rigidity or domination. Is control becoming a cage?', keywords: ['Authority', 'Structure', 'Order'], advice: 'Lead with reason, not rigidity.' },
  { num: 'V', name: 'The Hierophant', symbol: '☩', upright: 'Tradition, guidance, spiritual wisdom. Seek the counsel of those who have walked the path.', reversed: 'Dogma, rebellion, or questioning institutions. What beliefs are truly yours?', keywords: ['Tradition', 'Guidance', 'Belief'], advice: 'Honor the wisdom of the ages — and your own.' },
  { num: 'VI', name: 'The Lovers', symbol: '♡', upright: 'Love, alignment, and meaningful choice. A decision from the heart shapes everything ahead.', reversed: 'Disharmony or avoidance of a difficult choice. What are you afraid to decide?', keywords: ['Love', 'Choice', 'Harmony'], advice: 'Choose with your whole heart.' },
  { num: 'VII', name: 'The Chariot', symbol: '⚔', upright: 'Determination, victory, and controlled willpower. Focus drives you through any obstacle.', reversed: 'Loss of direction or aggression. Are you forcing what should flow?', keywords: ['Victory', 'Focus', 'Drive'], advice: 'Master your inner forces — then move.' },
  { num: 'VIII', name: 'Strength', symbol: '∞', upright: 'Inner courage, patience, compassion. True strength is gentle, not forceful.', reversed: 'Self-doubt or fear masking itself as restraint. Trust yourself.', keywords: ['Courage', 'Patience', 'Grace'], advice: 'Your quiet strength is more powerful than you know.' },
  { num: 'IX', name: 'The Hermit', symbol: '🔦', upright: 'Solitude, introspection, and inner guidance. Step back from noise and find your truth.', reversed: 'Isolation or refusal to seek help. Are you hiding from the world — or from yourself?', keywords: ['Solitude', 'Wisdom', 'Search'], advice: 'The answers you need require silence.' },
  { num: 'X', name: 'Wheel of Fortune', symbol: '☸', upright: 'Change, cycles, destiny. The wheel turns — trust the timing of your life.', reversed: 'Resistance to change or bad luck. Everything that rises must also fall, and rise again.', keywords: ['Change', 'Destiny', 'Cycles'], advice: 'Flow with the turning of the wheel.' },
  { num: 'XI', name: 'Justice', symbol: '⚖', upright: 'Truth, fairness, cause and effect. What you have given returns to you now.', reversed: 'Unfairness or avoidance of responsibility. Honest examination is required.', keywords: ['Truth', 'Fairness', 'Karma'], advice: 'Act with integrity. The scales always balance.' },
  { num: 'XII', name: 'The Hanged Man', symbol: '⧖', upright: 'Pause, surrender, new perspective. What if not acting is the wisest action?', reversed: 'Stalling or sacrifice without purpose. Is your waiting intentional or avoidant?', keywords: ['Pause', 'Surrender', 'Insight'], advice: 'Let go. A new view changes everything.' },
  { num: 'XIII', name: 'Death', symbol: '🌑', upright: 'Transformation, endings that free. What must end so something beautiful can begin?', reversed: 'Resistance to change, stagnation. Clinging to the old prevents the new from arriving.', keywords: ['Change', 'Release', 'Rebirth'], advice: 'Release it. The ending is the beginning.' },
  { num: 'XIV', name: 'Temperance', symbol: '◈', upright: 'Balance, patience, moderation. The middle path brings sustainable harmony.', reversed: 'Imbalance or excess. Where are you overdoing or underdoing?', keywords: ['Balance', 'Patience', 'Flow'], advice: 'Blend with patience. Harmony emerges.' },
  { num: 'XV', name: 'The Devil', symbol: '⛓', upright: 'Bondage, shadow, materialism. What chains you may be of your own making.', reversed: 'Breaking free, reclaiming power. The chains were never locked from the outside.', keywords: ['Bondage', 'Shadow', 'Freedom'], advice: 'Examine what truly holds you.' },
  { num: 'XVI', name: 'The Tower', symbol: '⚡', upright: 'Sudden change, upheaval, revelation. What was built on a false foundation must fall.', reversed: 'Fear of necessary disruption. The storm is coming regardless — face it.', keywords: ['Upheaval', 'Truth', 'Change'], advice: 'What falls was never truly yours.' },
  { num: 'XVII', name: 'The Star', symbol: '★', upright: 'Hope, renewal, inspiration. After the storm, the stars return and guide you home.', reversed: 'Despair or lack of faith. Even in darkness, a single star is enough.', keywords: ['Hope', 'Healing', 'Guidance'], advice: 'You are being guided. Trust the light.' },
  { num: 'XVIII', name: 'The Moon', symbol: '🌙', upright: 'Illusion, the unconscious, hidden truths. Not everything is as it appears — look deeper.', reversed: 'Releasing fear, clarity emerging. The fog is beginning to lift.', keywords: ['Illusion', 'Intuition', 'Depth'], advice: 'Navigate by feeling, not only sight.' },
  { num: 'XIX', name: 'The Sun', symbol: '☀', upright: 'Joy, success, vitality. This is a moment of genuine light — allow yourself to receive it.', reversed: 'Temporary setback or overconfidence. Shine, but stay grounded.', keywords: ['Joy', 'Success', 'Clarity'], advice: 'You are allowed to be happy now.' },
  { num: 'XX', name: 'Judgement', symbol: '🔔', upright: 'Awakening, reckoning, renewal. A calling arrives — will you answer it?', reversed: "Self-doubt blocking transformation. You are ready, even if it doesn't feel that way.", keywords: ['Awakening', 'Purpose', 'Calling'], advice: 'Rise. Your moment of clarity has arrived.' },
  { num: 'XXI', name: 'The World', symbol: '🌍', upright: 'Completion, wholeness, fulfillment. A cycle ends in triumph — you have arrived.', reversed: 'Incomplete journey or loose ends. What final step remains?', keywords: ['Completion', 'Wholeness', 'Achievement'], advice: 'You have come full circle. Honor it.' },
]

export default function TarotPage() {
  const [card, setCard] = useState<typeof MAJOR_ARCANA[0] | null>(null)
  const [reversed, setReversed] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  function drawCard() {
    if (isAnimating) return
    setIsAnimating(true)
    setFlipped(false)
    setTimeout(() => {
      const idx = Math.floor(Math.random() * MAJOR_ARCANA.length)
      const rev = Math.random() > 0.75
      setCard(MAJOR_ARCANA[idx])
      setReversed(rev)
      setFlipped(true)
      setIsAnimating(false)
    }, 400)
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>MINGYUN</Link>
        <Link href="/" className={styles.back}>← Home</Link>
      </nav>

      <div className={styles.hero}>
        <p className={styles.eyebrow}>Daily Tarot</p>
        <div className={styles.ornament}>🃏</div>
        <h1 className={styles.title}>Draw Your <span className={styles.gold}>Card of the Day</span></h1>
        <p className={styles.sub}>Quiet your mind and focus on a question. One card holds your message for today.</p>
      </div>

      <div className={styles.body}>
        {/* Draw Area */}
        <div className={styles.drawArea}>
          <div
            className={`${styles.cardWrap} ${flipped ? styles.cardFlipped : ''} ${isAnimating ? styles.cardAnimating : ''}`}
            onClick={drawCard}
          >
            {/* Card Back */}
            <div className={styles.cardFace + ' ' + styles.cardBack}>
              <div className={styles.cardBackInner}>
                <div className={styles.cardBackSymbol}>命</div>
                <div className={styles.cardBackHint}>{card ? 'Click to draw again' : 'Click to reveal'}</div>
              </div>
            </div>

            {/* Card Front */}
            {card && (
              <div className={`${styles.cardFace} ${styles.cardFront} ${reversed ? styles.cardReversed : ''}`}>
                <div className={styles.cardNum}>{card.num}</div>
                <div className={styles.cardSymbol}>{card.symbol}</div>
                <div className={styles.cardName}>{card.name}</div>
                {reversed && <div className={styles.reversedBadge}>Reversed</div>}
              </div>
            )}
          </div>

          <button className={styles.drawBtn} onClick={drawCard} disabled={isAnimating}>
            {card ? 'Draw Again' : 'Draw Your Card →'}
          </button>
        </div>

        {/* Reading */}
        {card && flipped && (
          <div className={styles.reading}>
            <div className={styles.readingHeader}>
              <div className={styles.readingNum}>{card.num}</div>
              <div>
                <div className={styles.readingName}>{card.name}</div>
                <div className={styles.readingOrientation}>{reversed ? '↕ Reversed' : '↑ Upright'}</div>
              </div>
            </div>

            <div className={styles.keywords}>
              {card.keywords.map(k => (
                <span key={k} className={styles.keyword}>{k}</span>
              ))}
            </div>

            <div className={styles.readingText}>
              <p>{reversed ? card.reversed : card.upright}</p>
            </div>

            <div className={styles.adviceBox}>
              <div className={styles.adviceLabel}>✦ Today's Message</div>
              <p className={styles.adviceText}>{card.advice}</p>
            </div>
          </div>
        )}

        {/* Card List */}
        <div className={styles.deckSection}>
          <h2 className={styles.deckTitle}>Major Arcana — 22 Cards</h2>
          <div className={styles.deckGrid}>
            {MAJOR_ARCANA.map((c) => (
              <button
                key={c.num}
                className={`${styles.deckCard} ${card?.num === c.num ? styles.deckCardActive : ''}`}
                onClick={() => { setCard(c); setReversed(false); setFlipped(true) }}
              >
                <span className={styles.deckSymbol}>{c.symbol}</span>
                <span className={styles.deckNum}>{c.num}</span>
                <span className={styles.deckName}>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
