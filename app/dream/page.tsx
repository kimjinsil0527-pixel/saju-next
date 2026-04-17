'use client'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import styles from './dream.module.css'

const DREAM_LIBRARY = [
  // ── Actions ──
  { symbol: 'Flying', category: 'Actions', meaning: 'Freedom, ambition, and desire to rise above limitations. Often signals a breakthrough period approaching in waking life.', omen: 'auspicious', details: 'If you flew with ease, new opportunities are opening. If struggling to fly, external obstacles may be slowing your progress.' },
  { symbol: 'Falling', category: 'Actions', meaning: 'Loss of control, anxiety, or transition. The dream rarely predicts physical harm — it reflects emotional uncertainty.', omen: 'neutral', details: 'Waking before you land often signals resilience. Completing the fall signals acceptance of necessary change.' },
  { symbol: 'Being Chased', category: 'Actions', meaning: 'Avoidance of a difficult situation, emotion, or decision in waking life. The pursuer represents what you\'re running from.', omen: 'warning', details: 'Ask: what have I been postponing? The dream ends when you face it.' },
  { symbol: 'Stairs', category: 'Actions', meaning: 'Progress, ambition, or regression depending on direction.', omen: 'neutral', details: 'Climbing stairs: upward progress in career or life path. Descending: introspection or retreat. Endless stairs: feeling stuck in an exhausting cycle.' },
  { symbol: 'Running', category: 'Actions', meaning: 'Urgency, pursuit of a goal, or escape. Context determines whether this is hopeful or anxious.', omen: 'neutral', details: 'Running freely: energetic pursuit of a goal. Running in slow motion: feeling blocked despite great effort.' },
  { symbol: 'Swimming', category: 'Actions', meaning: 'Navigation of emotions, resilience, and willingness to dive deep into the unconscious.', omen: 'auspicious', details: 'Swimming easily: emotional fluency. Struggling to swim: overwhelmed by emotional demands. Swimming upstream: working against a strong force.' },
  { symbol: 'Fighting', category: 'Actions', meaning: 'Inner conflict, resistance, or power dynamics needing resolution.', omen: 'warning', details: 'Winning a fight: you have the inner resources to overcome challenges. Losing: a situation needs a different approach — not force.' },
  { symbol: 'Driving', category: 'Actions', meaning: 'Control of your life direction and pace. Who is driving matters deeply.', omen: 'neutral', details: 'Driving confidently: you are in control of your path. Losing control of the vehicle: surrender is needed in an area of life.' },
  { symbol: 'Lost / Cannot Find Way', category: 'Actions', meaning: 'Uncertainty about direction in a key area of life — career, relationship, or purpose.', omen: 'warning', details: 'Finding your way: clarity is coming. Remaining lost: you may need external guidance or to slow down before choosing direction.' },
  { symbol: 'Searching', category: 'Actions', meaning: 'Active pursuit of something important — often meaning, connection, or lost potential.', omen: 'neutral', details: 'Finding what you seek: the answer is within reach. Never finding it: the search itself is the growth.' },
  // ── Animals ──
  { symbol: 'Snake', category: 'Animals', meaning: 'Transformation, hidden knowledge, and sometimes deceit. In Eastern tradition, snakes are often signs of wealth and wisdom.', omen: 'auspicious', details: 'A golden snake signals financial improvement. A snake biting you suggests a warning from your subconscious.' },
  { symbol: 'Dragon', category: 'Animals', meaning: 'Power, protection, and great fortune. In East Asian tradition, dreaming of a dragon is one of the most auspicious signs possible.', omen: 'auspicious', details: 'A dragon ascending signifies rising fortune. A dragon descending into water means hidden blessings in reserve.' },
  { symbol: 'Tiger', category: 'Animals', meaning: 'Authority, courage, and potential conflict. A tiger approaching signals a powerful person entering your life.', omen: 'neutral', details: 'Befriending a tiger: you will gain powerful allies. Fighting a tiger: face a major challenge with courage.' },
  { symbol: 'Dog', category: 'Animals', meaning: 'Loyalty, friendship, and protection. A friendly dog predicts trustworthy companions. An aggressive dog warns of betrayal.', omen: 'neutral', details: 'Color matters: white dog — purity and guidance. Black dog — shadow or subconscious fear emerging.' },
  { symbol: 'Fish', category: 'Animals', meaning: 'Wealth, abundance, and fertility. Dreaming of swimming fish — especially in clear water — is a classic omen of prosperity.', omen: 'auspicious', details: 'Many fish: financial gain coming. A dead fish: missed opportunity or ending of a relationship.' },
  { symbol: 'Bird', category: 'Animals', meaning: 'Freedom, messages, and spiritual communication. The type of bird matters greatly.', omen: 'auspicious', details: 'White bird: purity and peace. Black bird: hidden knowledge or shadow. Bird singing: good news arriving. Bird dying: end of a communication pattern.' },
  { symbol: 'Horse', category: 'Animals', meaning: 'Freedom, power, vitality, and rapid progress. A horse in motion is a strong omen for forward momentum.', omen: 'auspicious', details: 'Riding a horse freely: career acceleration or travel opportunity. A white horse: purity and spiritual guidance approaching.' },
  { symbol: 'Phoenix', category: 'Animals', meaning: 'Rebirth, resilience, and triumphant transformation after hardship. One of the most powerful dream symbols.', omen: 'auspicious', details: 'Seeing a phoenix: you are entering a period of extraordinary renewal after loss or difficulty. Extremely auspicious.' },
  { symbol: 'Wolf', category: 'Animals', meaning: 'Instinct, pack loyalty, and primal wisdom. Can also signal a predatory person in your life.', omen: 'neutral', details: 'A wolf alone: solitude and self-reliance. A wolf pack: community and collective strength. A snarling wolf: someone untrustworthy is nearby.' },
  { symbol: 'Cat', category: 'Animals', meaning: 'Intuition, independence, mystery, and feminine energy. Cats in dreams often represent your intuitive self.', omen: 'neutral', details: 'A purring cat: comfort and self-trust. A hissing cat: your instincts are warning you. A black cat crossing: heightened awareness needed.' },
  { symbol: 'Butterfly', category: 'Animals', meaning: 'Transformation, lightness, and the soul\'s journey. Butterflies almost always carry positive omens.', omen: 'auspicious', details: 'A butterfly landing on you: a significant transformation is complete or near. Multiple butterflies: joy and new social connections blooming.' },
  { symbol: 'Crow / Raven', category: 'Animals', meaning: 'Prophecy, intelligence, and messages from the deeper self. Not inherently negative in Eastern tradition.', omen: 'neutral', details: 'A crow calling: pay attention to a message you\'ve been ignoring. Many crows: a collective shift is coming in your environment.' },
  { symbol: 'Turtle', category: 'Animals', meaning: 'Longevity, wisdom, protection, and patient progress. In Chinese cosmology, the turtle is one of the four sacred animals.', omen: 'auspicious', details: 'A turtle appearing: steady, protected progress. Don\'t rush — the right pace will bring lasting results.' },
  { symbol: 'Bear', category: 'Animals', meaning: 'Strength, introspection, and the need to hibernate or withdraw before a new cycle.', omen: 'neutral', details: 'A peaceful bear: powerful inner resources available. An aggressive bear: confronting a dominant force or authority figure.' },
  { symbol: 'Spider', category: 'Animals', meaning: 'Creativity, weaving of fate, and entanglement. Spiders in dreams relate to creative power and life patterns.', omen: 'neutral', details: 'A spider spinning a web: you are building something significant. A spider biting: a situation feels like a trap.' },
  // ── Nature ──
  { symbol: 'Water', category: 'Nature', meaning: 'Emotions, the unconscious, and spiritual depth. The state of the water reflects your emotional state.', omen: 'neutral', details: 'Clear water: emotional clarity. Turbulent water: unresolved feelings. Deep water: hidden depths to explore.' },
  { symbol: 'Fire', category: 'Nature', meaning: 'Transformation, passion, and purification. Fire in dreams is rarely destructive — it burns away what no longer serves you.', omen: 'auspicious', details: 'Controlled flame: inspiration and creative breakthrough. Wildfire: rapid, unstoppable change approaching.' },
  { symbol: 'Rain', category: 'Nature', meaning: 'Cleansing, renewal, and emotional release. Rain washes away accumulated burdens.', omen: 'auspicious', details: 'Gentle rain: blessings and clarity. Storm: purging of an old chapter. Drought ending with rain: relief after a long difficulty.' },
  { symbol: 'Mountain', category: 'Nature', meaning: 'Challenges, ambition, and spiritual aspiration. Climbing a mountain represents your journey toward a significant goal.', omen: 'neutral', details: 'Reaching the peak: success and achievement ahead. Being unable to climb: obstacles to address first.' },
  { symbol: 'Ocean', category: 'Nature', meaning: 'The vastness of the unconscious, opportunity, and sometimes overwhelm. The ocean holds everything yet unexplored.', omen: 'neutral', details: 'Calm ocean: inner peace available. Storm at sea: navigating emotional turbulence. Drowning: feeling overwhelmed — seek support.' },
  { symbol: 'Forest', category: 'Nature', meaning: 'The unconscious, growth, and sometimes feeling lost or found.', omen: 'neutral', details: 'Walking peacefully in a forest: harmony with your deeper self. Lost in a forest: confusion about your path — clarity is coming.' },
  { symbol: 'Sun', category: 'Nature', meaning: 'Vitality, clarity, success, and recognition. The sun illuminates what was hidden.', omen: 'auspicious', details: 'Rising sun: a new beginning with strong positive energy. A sun at full noon: peak success, visibility, and recognition. Eclipsed sun: something is temporarily blocking your light.' },
  { symbol: 'Moon', category: 'Nature', meaning: 'Intuition, cycles, feminine energy, and the hidden self. The moon rules the tides of emotion.', omen: 'neutral', details: 'Full moon: a situation has reached completion or full revelation. Crescent moon: something new is beginning to form. Blood moon: intensity and transformation.' },
  { symbol: 'Stars', category: 'Nature', meaning: 'Guidance, destiny, and hopes for the future. Stars in dreams are navigational — they orient you.', omen: 'auspicious', details: 'A single bright star: a guiding principle or mentor. A falling star: a wish ready to manifest. Stars going dark: reassessment of direction needed.' },
  { symbol: 'Lightning', category: 'Nature', meaning: 'Sudden revelation, breakthrough, or shock. Lightning is the universe\'s punctuation mark.', omen: 'neutral', details: 'Lightning striking the ground: sudden clarity or change arriving. Lightning hitting you: a shocking but ultimately clarifying experience.' },
  { symbol: 'Earthquake', category: 'Nature', meaning: 'Foundation-level change, upheaval, and the shaking loose of what was stuck.', omen: 'warning', details: 'Small tremor: a warning to reinforce unstable areas of life. Major quake: significant life restructuring is coming or needed.' },
  { symbol: 'Flood', category: 'Nature', meaning: 'Overwhelming emotions or circumstances, purification, and renewal after excess.', omen: 'neutral', details: 'Surviving a flood: emotional resilience. Being swept away: feeling overwhelmed. Flood receding: the difficult period is ending.' },
  { symbol: 'Snow', category: 'Nature', meaning: 'Stillness, purity, and a period of rest before renewal. Snow quiets the world.', omen: 'auspicious', details: 'Fresh snowfall: a clean slate and fresh start. Blizzard: isolation or feeling trapped. Melting snow: a difficult period is ending.' },
  // ── Objects ──
  { symbol: 'Money', category: 'Objects', meaning: 'Self-worth, value, and energy exchange. Dreams of receiving money are generally positive.', omen: 'auspicious', details: 'Finding money: unexpected windfall or recognition. Losing money: fear of loss or carelessness in waking life.' },
  { symbol: 'House', category: 'Objects', meaning: 'The self — each room represents a different aspect of your psyche and life.', omen: 'neutral', details: 'Discovering new rooms: discovering new abilities or areas of growth. A crumbling house: something in your life needs attention.' },
  { symbol: 'Mirror', category: 'Objects', meaning: 'Self-reflection, identity, and truth. What you see (or don\'t) in a mirror reveals your current relationship with yourself.', omen: 'neutral', details: 'Broken mirror: fractured self-image. No reflection: identity confusion. A clear reflection: honest self-awareness.' },
  { symbol: 'Key', category: 'Objects', meaning: 'Access, opportunity, and solutions. A key in a dream signals that an answer or opening is close at hand.', omen: 'auspicious', details: 'Finding a key: discovering a solution. Losing a key: feeling locked out. Being given a key: trust or responsibility granted.' },
  { symbol: 'Gold', category: 'Objects', meaning: 'Wealth, spiritual attainment, and inner worth. Gold appearing in a dream is consistently auspicious across cultures.', omen: 'auspicious', details: 'Gold jewelry: recognition and status. Golden light: spiritual awakening or important guidance arriving.' },
  { symbol: 'Bridge', category: 'Objects', meaning: 'Transition, crossing from one life phase to another, connection.', omen: 'auspicious', details: 'Crossing a solid bridge: successful transition ahead. A broken bridge: an obstacle to the next phase. Building a bridge: creating your own path.' },
  { symbol: 'Clock / Time', category: 'Objects', meaning: 'Deadlines, mortality awareness, and urgency of purpose.', omen: 'warning', details: 'Clocks stopping: something is reaching a natural conclusion. Racing against time: pressure to act before a window closes.' },
  { symbol: 'Book', category: 'Objects', meaning: 'Knowledge, secrets, and life narrative. The content of the book matters greatly.', omen: 'auspicious', details: 'Reading a book: you are gaining wisdom. A blank book: a new chapter with no limits. A locked book: hidden knowledge waiting to be unlocked.' },
  { symbol: 'Sword', category: 'Objects', meaning: 'Clarity, decisive action, truth, and sometimes conflict. A sword cuts through illusion.', omen: 'neutral', details: 'Holding a sword: decisive action is needed or available. A broken sword: doubt in your own power. A sheathed sword: wisdom to know when not to act.' },
  { symbol: 'Ring', category: 'Objects', meaning: 'Commitment, wholeness, and cycles. Rings symbolize eternal connection.', omen: 'auspicious', details: 'Receiving a ring: a new commitment or recognition of loyalty. Losing a ring: anxiety about a relationship or promise. A ring with a gemstone: the gem\'s quality reflects the relationship\'s health.' },
  { symbol: 'Door', category: 'Objects', meaning: 'Transition, opportunity, and choice. Doors divide one state of being from another.', omen: 'neutral', details: 'An open door: opportunity is available. A locked door: an opportunity not yet accessible. Many doors: choices and potential paths ahead.' },
  { symbol: 'Phone', category: 'Objects', meaning: 'Communication, connection, and messages you may be missing or avoiding.', omen: 'neutral', details: 'A ringing phone you don\'t answer: ignoring an important message. A broken phone: communication breakdown. Receiving an important call: expect meaningful news.' },
  { symbol: 'Candle', category: 'Objects', meaning: 'Hope, guidance, inner light, and the fragility of life.', omen: 'auspicious', details: 'A burning candle: hope and spiritual guidance present. Candle going out: a situation is ending. Lighting a candle: initiating hope or a new intention.' },
  // ── Body ──
  { symbol: 'Teeth Falling', category: 'Body', meaning: 'One of the most universal dream symbols — often linked to anxiety about communication, appearance, or loss of power.', omen: 'warning', details: 'In Chinese tradition, teeth falling signals a family member needing attention. In general, it invites you to check in on your relationships.' },
  { symbol: 'Pregnancy', category: 'Body', meaning: 'Creativity, new beginnings, and potential coming to fruition. Often not literal.', omen: 'auspicious', details: 'A project, relationship, or inner transformation is gestating and about to be born.' },
  { symbol: 'Death', category: 'Body', meaning: 'Transformation and endings that free. Dreaming of death is almost never a literal omen.', omen: 'neutral', details: 'Your own death: a major life chapter is ending. Another\'s death: a relationship or dynamic is transforming.' },
  { symbol: 'Hair', category: 'Body', meaning: 'Strength, identity, and vitality. The condition and length of hair carries meaning.', omen: 'neutral', details: 'Long, healthy hair: strength and vitality at their peak. Hair falling out: anxiety about loss of power or identity. Cutting hair: intentional release of the past.' },
  { symbol: 'Eyes', category: 'Body', meaning: 'Perception, awareness, and the window to truth. What you see — and what you refuse to see.', omen: 'neutral', details: 'Clear, bright eyes: clear vision of your situation. Closed eyes: willful blindness. Extra eyes: heightened awareness or being watched.' },
  { symbol: 'Hands', category: 'Body', meaning: 'Action, skill, and what you are creating or holding onto.', omen: 'neutral', details: 'Open hands: generosity and receiving. Clenched fists: holding on or preparing to fight. Bleeding hands: sacrifice and effort. Hands of light: healing ability.' },
  { symbol: 'Voice / Unable to Speak', category: 'Body', meaning: 'Self-expression, authority, and feeling unheard. Loss of voice is one of the most common anxiety dreams.', omen: 'warning', details: 'Unable to speak: feeling silenced or dismissed. Speaking and being heard: you have found your authentic voice.' },
  { symbol: 'Wound / Bleeding', category: 'Body', meaning: 'Emotional pain, sacrifice, or a situation that needs healing attention.', omen: 'warning', details: 'A wound healing: recovery is underway. A fresh wound: recent emotional hurt needing acknowledgment. Bleeding stopping: resolution is available.' },
  // ── Social ──
  { symbol: 'Wedding', category: 'Social', meaning: 'Union, commitment, and new partnership — not always romantic.', omen: 'auspicious', details: 'A joyful wedding: harmonious partnerships forming. A troubled wedding: concerns about a current or upcoming commitment.' },
  { symbol: 'School / Exam', category: 'Social', meaning: 'Performance anxiety and self-evaluation. Often reflects real-world pressure to meet expectations.', omen: 'warning', details: 'Failing an exam: fear of inadequacy. Passing with ease: confidence in your abilities is available to you.' },
  { symbol: 'Being Naked in Public', category: 'Social', meaning: 'Vulnerability, exposure, and authenticity — often anxiety-based.', omen: 'warning', details: 'If embarrassed: fear of judgment or exposure. If unbothered: confidence in showing your true self is emerging.' },
  { symbol: 'Baby', category: 'Social', meaning: 'New beginnings, pure potential, and the nurturing of something new.', omen: 'auspicious', details: 'A healthy baby: new creative or business endeavor with great potential. A crying baby: a new project needs immediate attention.' },
  { symbol: 'Ancestor / Deceased Loved One', category: 'Social', meaning: 'Guidance, unresolved grief, messages from the past, or a deep inner wisdom seeking expression.', omen: 'neutral', details: 'A peaceful ancestor: protection and blessing from the past. A troubled ancestor: unresolved family patterns needing attention.' },
  { symbol: 'Stranger', category: 'Social', meaning: 'An unknown aspect of the self, or a new energy entering your life.', omen: 'neutral', details: 'A friendly stranger: a beneficial new person or perspective approaching. A threatening stranger: a part of yourself you fear to meet.' },
  { symbol: 'Crowd', category: 'Social', meaning: 'Social pressure, anonymity, or collective energy. Your relationship with the crowd reveals your social dynamic.', omen: 'neutral', details: 'Moving with a crowd: going along with others — examine whether this serves you. Alone in a crowd: feeling isolated despite being surrounded by people.' },
  { symbol: 'Celebrity / Famous Person', category: 'Social', meaning: 'Aspiration, idealized traits, or qualities you wish to embody or recognize in yourself.', omen: 'neutral', details: 'Meeting a celebrity: you are ready to step into a larger version of yourself. Being a celebrity: desire for recognition or fear of it.' },
  { symbol: 'Teacher / Guide', category: 'Social', meaning: 'A desire for wisdom, mentorship, or an inner guide seeking to communicate.', omen: 'auspicious', details: 'Receiving guidance from a teacher: you are ready to absorb an important lesson. Being the teacher: you have knowledge to share.' },
  { symbol: 'Enemy / Being Attacked', category: 'Social', meaning: 'Inner conflict projected outward, or genuine vigilance about a real threat.', omen: 'warning', details: 'Defeating your attacker: you will overcome this challenge. Being defeated: a fresh strategy is needed. Ask who the attacker resembles in waking life.' },
]

const CATEGORIES = ['All', 'Animals', 'Nature', 'Objects', 'Actions', 'Body', 'Social']

export default function DreamPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState<typeof DREAM_LIBRARY[0] | null>(null)

  const filtered = useMemo(() => {
    return DREAM_LIBRARY.filter(d => {
      const matchCat = category === 'All' || d.category === category
      const matchQ = !query || d.symbol.toLowerCase().includes(query.toLowerCase()) || d.meaning.toLowerCase().includes(query.toLowerCase())
      return matchCat && matchQ
    })
  }, [query, category])

  const omenColor = (o: string) => o === 'auspicious' ? 'var(--jade)' : o === 'warning' ? 'var(--ember)' : 'var(--muted)'
  const omenLabel = (o: string) => o === 'auspicious' ? '✓ Auspicious' : o === 'warning' ? '⚠ Warning' : '◈ Neutral'

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>MINGYUN</Link>
        <Link href="/" className={styles.back}>← Home</Link>
      </nav>

      <div className={styles.hero}>
        <p className={styles.eyebrow}>Dream Interpretation</p>
        <div className={styles.ornament}>🌙</div>
        <h1 className={styles.title}>What Did Your <span className={styles.gold}>Dream Mean?</span></h1>
        <p className={styles.sub}>Search our library of {DREAM_LIBRARY.length}+ dream symbols — rooted in Eastern and universal traditions.</p>
      </div>

      <div className={styles.layout}>
        {/* Left: Search + List */}
        <div className={styles.listCol}>
          <div className={styles.searchWrap}>
            <input
              className={styles.searchInput}
              placeholder="Search dream symbols..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>

          <div className={styles.categories}>
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`${styles.catBtn} ${category === c ? styles.catActive : ''}`}
                onClick={() => setCategory(c)}
              >{c}</button>
            ))}
          </div>

          <div className={styles.count}>{filtered.length} symbols found</div>

          <div className={styles.list}>
            {filtered.map(d => (
              <button
                key={d.symbol}
                className={`${styles.listItem} ${selected?.symbol === d.symbol ? styles.listItemActive : ''}`}
                onClick={() => setSelected(d)}
              >
                <div className={styles.listLeft}>
                  <div className={styles.listSymbol}>{d.symbol}</div>
                  <div className={styles.listCategory}>{d.category}</div>
                </div>
                <div className={styles.listOmen} style={{ color: omenColor(d.omen) }}>{omenLabel(d.omen)}</div>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className={styles.noResult}>No symbols match your search. Try different keywords.</div>
            )}
          </div>
        </div>

        {/* Right: Detail */}
        <div className={styles.detailCol}>
          {selected ? (
            <div className={styles.detail}>
              <div className={styles.detailHeader}>
                <h2 className={styles.detailSymbol}>{selected.symbol}</h2>
                <div className={styles.detailMeta}>
                  <span className={styles.detailCat}>{selected.category}</span>
                  <span className={styles.detailOmen} style={{ color: omenColor(selected.omen) }}>{omenLabel(selected.omen)}</span>
                </div>
              </div>
              <div className={styles.detailSection}>
                <div className={styles.detailLabel}>Core Meaning</div>
                <p className={styles.detailText}>{selected.meaning}</p>
              </div>
              <div className={styles.detailSection}>
                <div className={styles.detailLabel}>Deeper Reading</div>
                <p className={styles.detailText}>{selected.details}</p>
              </div>
              <div className={styles.detailCta}>
                <p>Connect this symbol to your personal birth chart for deeper insight.</p>
                <Link href="/" className={styles.detailCtaBtn}>Get My Free Reading →</Link>
              </div>
            </div>
          ) : (
            <div className={styles.detailEmpty}>
              <div className={styles.emptyIcon}>🌙</div>
              <p>Select a symbol from the list to reveal its meaning.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
