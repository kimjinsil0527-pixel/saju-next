/**
 * Comprehensive Four Pillars (사주팔자 / BaZi) calculation library
 * Version 2.0 — Solar terms, Ten Gods, Hidden Stems, Luck Pillars, Day Master Strength
 */

// ─── Heavenly Stems (天干 / 천간) ─────────────────────────────────────────────
export const HEAVENLY_STEMS = [
  'Jiǎ (甲)', 'Yǐ (乙)', 'Bǐng (丙)', 'Dīng (丁)', 'Wù (戊)',
  'Jǐ (己)', 'Gēng (庚)', 'Xīn (辛)', 'Rén (壬)', 'Guǐ (癸)',
]
export const HEAVENLY_STEMS_HANJA = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
export const HEAVENLY_ELEMENTS = [
  'wood', 'wood', 'fire', 'fire', 'earth',
  'earth', 'metal', 'metal', 'water', 'water',
]
// 0 = Yang (陽), 1 = Yin (陰)
// 甲丙戊庚壬 = Yang; 乙丁己辛癸 = Yin
export const STEM_POLARITY = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]

// ─── Earthly Branches (地支 / 지지) ──────────────────────────────────────────
export const EARTHLY_BRANCHES = [
  'Zǐ (子)', 'Chǒu (丑)', 'Yín (寅)', 'Mǎo (卯)', 'Chén (辰)', 'Sì (巳)',
  'Wǔ (午)', 'Wèi (未)', 'Shēn (申)', 'Yǒu (酉)', 'Xū (戌)', 'Hài (亥)',
]
export const EARTHLY_BRANCHES_HANJA = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
export const ZODIAC = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig']

// Main element of each branch (地支 主氣)
// 子=water, 丑=earth, 寅=wood, 卯=wood, 辰=earth, 巳=fire,
// 午=fire, 未=earth, 申=metal, 酉=metal, 戌=earth, 亥=water
export const BRANCH_ELEMENT = [
  'water', 'earth', 'wood', 'wood', 'earth', 'fire',
  'fire', 'earth', 'metal', 'metal', 'earth', 'water',
]
// 子=Yang, 丑=Yin, 寅=Yang, 卯=Yin, 辰=Yang, 巳=Yin,
// 午=Yang, 未=Yin, 申=Yang, 酉=Yin, 戌=Yang, 亥=Yin
export const BRANCH_POLARITY = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]

// ─── Hidden Stems (地藏干 / 지장간) ─────────────────────────────────────────
// Each branch holds hidden heavenly stems: [initial 餘氣, middle 中氣, main 本氣]
// (last in array = primary/本氣)
export const JIJANGGAN: Record<string, string[]> = {
  '子': ['壬', '癸'],
  '丑': ['癸', '辛', '己'],
  '寅': ['戊', '丙', '甲'],
  '卯': ['甲', '乙'],
  '辰': ['乙', '癸', '戊'],
  '巳': ['戊', '庚', '丙'],
  '午': ['丙', '己', '丁'],
  '未': ['丁', '乙', '己'],
  '申': ['戊', '壬', '庚'],
  '酉': ['庚', '辛'],
  '戌': ['辛', '丁', '戊'],
  '亥': ['戊', '甲', '壬'],
}

// ─── Element Interactions (五行 生剋) ─────────────────────────────────────
// Generative cycle (相生): wood→fire→earth→metal→water→wood
export const GENERATES: Record<string, string> = {
  wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood',
}
// Controlling cycle (相剋): wood→earth→water→fire→metal→wood
export const CONTROLS: Record<string, string> = {
  wood: 'earth', fire: 'metal', earth: 'water', metal: 'wood', water: 'fire',
}
// Reverse lookups
export const GENERATED_BY: Record<string, string> = {
  fire: 'wood', earth: 'fire', metal: 'earth', water: 'metal', wood: 'water',
}
export const CONTROLLED_BY: Record<string, string> = {
  earth: 'wood', metal: 'fire', water: 'earth', wood: 'metal', fire: 'water',
}

// ─── Element Display ─────────────────────────────────────────────────────────
export const ELEMENT_COLORS: Record<string, string> = {
  wood: '#6BAE76', fire: '#E8724A', earth: '#C8A96E', metal: '#AAAACC', water: '#6AAEDD',
}
export const ELEMENT_EMOJI: Record<string, string> = {
  wood: '🌲', fire: '🔥', earth: '🏔️', metal: '⚔️', water: '🌊',
}

// ─── Solar Terms (절기 / 節氣) ────────────────────────────────────────────────
// The 12 principal solar terms that start each saju month.
// Indexed by calendar month (index 0 = January).
// Values are the typical day-of-month when the solar term falls (±1 day in some years).
//
// Jan: 小寒(Xiǎohán)~6  Feb: 立春(Lìchūn)~4   Mar: 驚蟄(Jīngzhé)~6
// Apr: 清明(Qīngmíng)~5 May: 立夏(Lìxià)~6    Jun: 芒種(Mángzhòng)~6
// Jul: 小暑(Xiǎoshǔ)~7  Aug: 立秋(Lìqiū)~7    Sep: 白露(Báilù)~8
// Oct: 寒露(Hánlù)~8    Nov: 立冬(Lìdōng)~7   Dec: 大雪(Dàxuě)~7
export const SOLAR_TERM_DAYS = [6, 4, 6, 5, 6, 6, 7, 7, 8, 8, 7, 7]

/**
 * Returns the saju solar month index (0–11) for a given calendar date.
 * Solar month 0 = 寅月 (Tiger, ~Feb 4 – Mar 5)
 * Solar month 11 = 丑月 (Ox, ~Jan 6 – Feb 3)
 *
 * Example: Jan 3 → solar month 10 (子月); Jan 7 → solar month 11 (丑月)
 */
export function getSolarMonthIndex(calMonth: number, calDay: number): number {
  const termDay = SOLAR_TERM_DAYS[calMonth - 1]
  // Base solar month when day >= term day:
  // Calendar month m → solar index = (m + 10) % 12
  // Verify: Feb(2) → (2+10)%12=0=寅月✓, Jan(1) → (1+10)%12=11=丑月✓, Dec(12) → 10=子月✓
  const solarIdx = (calMonth + 10) % 12
  return calDay >= termDay ? solarIdx : (solarIdx - 1 + 12) % 12
}

// ─── Pillar Calculations ──────────────────────────────────────────────────────

/** Year Pillar (年柱) */
export function getYearPillar(year: number) {
  const stemIdx = ((year - 4) % 10 + 10) % 10
  const branchIdx = ((year - 4) % 12 + 12) % 12
  return {
    stem: HEAVENLY_STEMS[stemIdx],
    stemHanja: HEAVENLY_STEMS_HANJA[stemIdx],
    branch: EARTHLY_BRANCHES[branchIdx],
    branchHanja: EARTHLY_BRANCHES_HANJA[branchIdx],
    zodiac: ZODIAC[branchIdx],
    element: HEAVENLY_ELEMENTS[stemIdx],
    branchElement: BRANCH_ELEMENT[branchIdx],
    stemIdx,
    branchIdx,
  }
}

/**
 * Month Pillar (月柱) — uses solar terms for accuracy.
 *
 * The traditional rule (五虎遁年起月法):
 *   甲/己 year: 寅月 starts with 丙 (stem index 2)
 *   乙/庚 year: 寅月 starts with 戊 (stem index 4)
 *   丙/辛 year: 寅月 starts with 庚 (stem index 6)
 *   丁/壬 year: 寅月 starts with 壬 (stem index 8)
 *   戊/癸 year: 寅月 starts with 甲 (stem index 0)
 *
 * @param year  Birth/target year
 * @param month Calendar month (1–12)
 * @param day   Calendar day (1–31); if omitted, assumes mid-month (after solar term)
 */
export function getMonthPillar(year: number, month: number, day?: number) {
  const calDay = day ?? 15
  const yearStemIdx = ((year - 4) % 10 + 10) % 10
  const solarMonthIdx = getSolarMonthIndex(month, calDay)

  // Month branch: solarMonth 0 → 寅(2), 1 → 卯(3), ..., 10 → 子(0), 11 → 丑(1)
  const branchIdx = (solarMonthIdx + 2) % 12

  // Month stem base indexed by year stem group (yearStemIdx % 5)
  // Group 0 (甲己)=2, Group 1 (乙庚)=4, Group 2 (丙辛)=6, Group 3 (丁壬)=8, Group 4 (戊癸)=0
  const monthStemBase = [2, 4, 6, 8, 0][yearStemIdx % 5]
  const stemIdx = (monthStemBase + solarMonthIdx) % 10

  return {
    stem: HEAVENLY_STEMS[stemIdx],
    stemHanja: HEAVENLY_STEMS_HANJA[stemIdx],
    branch: EARTHLY_BRANCHES[branchIdx],
    branchHanja: EARTHLY_BRANCHES_HANJA[branchIdx],
    element: HEAVENLY_ELEMENTS[stemIdx],
    branchElement: BRANCH_ELEMENT[branchIdx],
    stemIdx,
    branchIdx,
  }
}

/** Day Pillar (日柱) — uses Julian Day Number for accuracy */
export function getDayPillar(year: number, month: number, day: number) {
  const a = Math.floor((14 - month) / 12)
  const y = year + 4800 - a
  const m = month + 12 * a - 3
  const jdn =
    day + Math.floor((153 * m + 2) / 5) + 365 * y +
    Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045
  const stemIdx = ((jdn + 9) % 10 + 10) % 10
  const branchIdx = ((jdn + 1) % 12 + 12) % 12
  return {
    stem: HEAVENLY_STEMS[stemIdx],
    stemHanja: HEAVENLY_STEMS_HANJA[stemIdx],
    branch: EARTHLY_BRANCHES[branchIdx],
    branchHanja: EARTHLY_BRANCHES_HANJA[branchIdx],
    element: HEAVENLY_ELEMENTS[stemIdx],
    branchElement: BRANCH_ELEMENT[branchIdx],
    stemIdx,
    branchIdx,
  }
}

/**
 * Hour Pillar (時柱) — using 五鼠遁日起時法.
 * @param dayStemIdx  Day stem index (0–9)
 * @param hourBranchIdx  Hour branch index (0–11), or -1 if unknown
 */
export function getHourPillar(dayStemIdx: number, hourBranchIdx: number) {
  if (hourBranchIdx < 0) return null
  // 五鼠遁: 甲/己 day → 子時=甲(0), 乙/庚 day → 子時=丙(2),
  //         丙/辛 day → 子時=戊(4), 丁/壬 day → 子時=庚(6), 戊/癸 day → 子時=壬(8)
  const hourStemBase = [0, 2, 4, 6, 8][dayStemIdx % 5]
  const stemIdx = (hourStemBase + hourBranchIdx) % 10
  return {
    stem: HEAVENLY_STEMS[stemIdx],
    stemHanja: HEAVENLY_STEMS_HANJA[stemIdx],
    branch: EARTHLY_BRANCHES[hourBranchIdx],
    branchHanja: EARTHLY_BRANCHES_HANJA[hourBranchIdx],
    element: HEAVENLY_ELEMENTS[stemIdx],
    branchElement: BRANCH_ELEMENT[hourBranchIdx],
    stemIdx,
    branchIdx: hourBranchIdx,
  }
}

// ─── Ten Gods (十神 / 십신) ───────────────────────────────────────────────────
// The Ten Gods express the relationship of every stem/branch in the chart to the Day Master.

export type SipsinKey =
  | '비견' | '겁재' | '식신' | '상관'
  | '편재' | '정재' | '편관' | '정관'
  | '편인' | '정인'

export const SIPSIN_EN: Record<SipsinKey, { name: string; short: string; nature: string }> = {
  '비견': { name: 'Rob Wealth / Peer (比肩)', short: 'Peer 比肩', nature: 'positive' },
  '겁재': { name: 'Competitor / Rob Wealth (劫財)', short: 'Rival 劫財', nature: 'mixed' },
  '식신': { name: 'Eating God (食神)', short: 'Output 食神', nature: 'positive' },
  '상관': { name: 'Hurting Officer (傷官)', short: 'Expression 傷官', nature: 'mixed' },
  '편재': { name: 'Indirect Wealth (偏財)', short: 'Volatile Wealth 偏財', nature: 'positive' },
  '정재': { name: 'Direct Wealth (正財)', short: 'Stable Wealth 正財', nature: 'positive' },
  '편관': { name: 'Seven Killings (偏官 七殺)', short: 'Pressure 七殺', nature: 'mixed' },
  '정관': { name: 'Direct Officer (正官)', short: 'Authority 正官', nature: 'positive' },
  '편인': { name: 'Indirect Resource (偏印 梟神)', short: 'Creativity 偏印', nature: 'mixed' },
  '정인': { name: 'Direct Resource (正印)', short: 'Support 正印', nature: 'positive' },
}

export const SIPSIN_FORTUNE_LEVEL: Record<SipsinKey, number> = {
  '정인': 5, '식신': 5, '정재': 4, '정관': 4, '편재': 4,
  '비견': 3, '편인': 3, '상관': 3, '겁재': 2, '편관': 2,
}

/**
 * Calculate the Ten God (십신) of a heavenly stem relative to the Day Master.
 * @param dayMasterIdx  Day Master stem index (0–9)
 * @param targetIdx     Target stem index (0–9)
 */
export function getSipsin(dayMasterIdx: number, targetIdx: number): SipsinKey {
  const dayEl = HEAVENLY_ELEMENTS[dayMasterIdx]
  const targetEl = HEAVENLY_ELEMENTS[targetIdx]
  const samePolarity = STEM_POLARITY[dayMasterIdx] === STEM_POLARITY[targetIdx]

  if (targetEl === dayEl) return samePolarity ? '비견' : '겁재'
  if (GENERATES[dayEl] === targetEl) return samePolarity ? '식신' : '상관'
  if (CONTROLS[dayEl] === targetEl) return samePolarity ? '편재' : '정재'
  if (CONTROLLED_BY[dayEl] === targetEl) return samePolarity ? '편관' : '정관'
  // GENERATED_BY[dayEl] === targetEl
  return samePolarity ? '편인' : '정인'
}

/**
 * Calculate the Ten God of an earthly branch (using its main element) relative to the Day Master.
 */
export function getSipsinBranch(dayMasterIdx: number, branchIdx: number): SipsinKey {
  const dayEl = HEAVENLY_ELEMENTS[dayMasterIdx]
  const branchEl = BRANCH_ELEMENT[branchIdx]
  const samePolarity = STEM_POLARITY[dayMasterIdx] === BRANCH_POLARITY[branchIdx]

  if (branchEl === dayEl) return samePolarity ? '비견' : '겁재'
  if (GENERATES[dayEl] === branchEl) return samePolarity ? '식신' : '상관'
  if (CONTROLS[dayEl] === branchEl) return samePolarity ? '편재' : '정재'
  if (CONTROLLED_BY[dayEl] === branchEl) return samePolarity ? '편관' : '정관'
  return samePolarity ? '편인' : '정인'
}

/**
 * Get all Ten Gods for the full four-pillar chart.
 * Returns an array matching [year stem, month stem, day stem(self), hour stem,
 *                            year branch, month branch, day branch, hour branch]
 * Day stem is always 비견 (self).
 */
export function getChartSipsin(
  dayMasterIdx: number,
  stemIndices: (number | null)[],
  branchIndices: (number | null)[],
) {
  const stemSipsin = stemIndices.map(s =>
    s == null ? null : getSipsin(dayMasterIdx, s)
  )
  const branchSipsin = branchIndices.map(b =>
    b == null ? null : getSipsinBranch(dayMasterIdx, b)
  )
  return { stemSipsin, branchSipsin }
}

// ─── Day Master Strength (일간강약 / 旺衰) ────────────────────────────────────
// Score 0–10+: ≥5 = strong (身旺), <5 = weak (身弱)
// Main factor: season (월지). Secondary: supporting stems/branches.
//
// 旺(3)=Peak, 相(2)=Rising, 休(1.5)=Resting, 囚(1)=Imprisoned, 死(0.5)=Diminished
// Index order: 子丑寅卯辰巳午未申酉戌亥
const SEASON_SCORE: Record<string, number[]> = {
  water:  [3, 1.5, 0.5, 0.5, 1, 1, 1, 1, 2, 2, 1.5, 3],
  wood:   [2, 1, 3, 3, 1.5, 0.5, 0.5, 1, 0.5, 0.5, 1, 2],
  fire:   [1, 0.5, 2, 2, 1.5, 3, 3, 2, 0.5, 0.5, 1.5, 1],
  earth:  [0.5, 3, 1, 1, 3, 2, 2, 3, 1.5, 1.5, 3, 0.5],
  metal:  [1.5, 2, 0.5, 0.5, 2, 1.5, 1, 1.5, 3, 3, 2, 1.5],
}

export interface DayMasterStrength {
  score: number
  label: string
  labelEn: string
  isStrong: boolean
}

/**
 * Assess Day Master strength based on season, supporting stems/branches.
 * @param dayMasterStemIdx   Day Master stem index
 * @param monthBranchIdx     Month branch index (most important — season)
 * @param otherStemIndices   Indices of year/month/hour stems
 * @param otherBranchIndices Indices of year/month/day/hour branches (excluding month branch counted above)
 */
export function getDayMasterStrength(
  dayMasterStemIdx: number,
  monthBranchIdx: number,
  otherStemIndices: number[],
  otherBranchIndices: number[],
): DayMasterStrength {
  const el = HEAVENLY_ELEMENTS[dayMasterStemIdx]

  // Season is the dominant factor (weighted x2)
  let score = SEASON_SCORE[el][monthBranchIdx] * 2

  // Supporting/opposing stems
  for (const sIdx of otherStemIndices) {
    const sEl = HEAVENLY_ELEMENTS[sIdx]
    if (sEl === el) score += 1.5               // 비견/겁재: same element — supports
    else if (GENERATED_BY[el] === sEl) score += 1.2 // 정인/편인: generates DM — supports
    else if (GENERATES[el] === sEl) score -= 0.5    // 식신/상관: DM generates — drains
    else if (CONTROLS[el] === sEl) score -= 0.5     // 편재/정재: DM controls — drains
    else if (CONTROLLED_BY[el] === sEl) score -= 1  // 편관/정관: controls DM — suppresses
  }

  // Supporting/opposing branches (main element)
  for (const bIdx of otherBranchIndices) {
    const bEl = BRANCH_ELEMENT[bIdx]
    if (bEl === el) score += 1
    else if (GENERATED_BY[el] === bEl) score += 0.7
    else if (CONTROLLED_BY[el] === bEl) score -= 0.7
  }

  const isStrong = score >= 5
  let label: string
  let labelEn: string
  if (score >= 8) { label = '극왕 (極旺)'; labelEn = 'Extremely Strong' }
  else if (score >= 6) { label = '왕 (旺)'; labelEn = 'Strong' }
  else if (score >= 4.5) { label = '중화 (中和)'; labelEn = 'Balanced' }
  else if (score >= 3) { label = '약 (弱)'; labelEn = 'Weak' }
  else { label = '극약 (極弱)'; labelEn = 'Extremely Weak' }

  return { score: Math.round(score * 10) / 10, label, labelEn, isStrong }
}

// ─── Branch Interactions (지지 관계) ──────────────────────────────────────────

// 六合 (六合 육합) — Six Harmonious Pairs
// Each pair merges to produce a new element
export const LIU_HE: Array<{ b1: number; b2: number; result: string; name: string }> = [
  { b1: 0, b2: 1, result: 'earth', name: '子丑합 土' },
  { b1: 2, b2: 11, result: 'wood', name: '寅亥합 木' },
  { b1: 3, b2: 10, result: 'fire', name: '卯戌합 火' },
  { b1: 4, b2: 9, result: 'metal', name: '辰酉합 金' },
  { b1: 5, b2: 8, result: 'water', name: '巳申합 水' },
  { b1: 6, b2: 7, result: 'earth', name: '午未합 土' },
]

// 三合 (三合 삼합) — Three-Way Harmony (need all 3 for full combination)
export const SAN_HE: Array<{ b1: number; b2: number; b3: number; result: string; name: string }> = [
  { b1: 8, b2: 0, b3: 4, result: 'water', name: '申子辰 水局' },
  { b1: 5, b2: 9, b3: 1, result: 'metal', name: '巳酉丑 金局' },
  { b1: 2, b2: 6, b3: 10, result: 'fire', name: '寅午戌 火局' },
  { b1: 11, b2: 3, b3: 7, result: 'wood', name: '亥卯未 木局' },
]

// 方合 (方合 방합) — Directional Combination (seasonal/directional harmony)
export const FANG_HE: Array<{ b1: number; b2: number; b3: number; result: string; name: string }> = [
  { b1: 2, b2: 3, b3: 4, result: 'wood', name: '寅卯辰 木方' },
  { b1: 5, b2: 6, b3: 7, result: 'fire', name: '巳午未 火方' },
  { b1: 8, b2: 9, b3: 10, result: 'metal', name: '申酉戌 金方' },
  { b1: 11, b2: 0, b3: 1, result: 'water', name: '亥子丑 水方' },
]

// 六冲 (六沖 육충) — Six Clashes (opposite branches conflict)
export const LIU_CHONG: Array<{ b1: number; b2: number; name: string }> = [
  { b1: 0, b2: 6, name: '子午충' },
  { b1: 1, b2: 7, name: '丑未충' },
  { b1: 2, b2: 8, name: '寅申충' },
  { b1: 3, b2: 9, name: '卯酉충' },
  { b1: 4, b2: 10, name: '辰戌충' },
  { b1: 5, b2: 11, name: '巳亥충' },
]

// 六害 (六害 육해) — Six Harms (enmity relationships)
export const LIU_HAI: Array<{ b1: number; b2: number; name: string }> = [
  { b1: 0, b2: 7, name: '子未해' },
  { b1: 1, b2: 6, name: '丑午해' },
  { b1: 2, b2: 5, name: '寅巳해' },
  { b1: 3, b2: 4, name: '卯辰해' },
  { b1: 8, b2: 11, name: '申亥해' },
  { b1: 9, b2: 10, name: '酉戌해' },
]

// 三刑 (三刑 삼형) — Three Punishments
export const SAN_XING: Array<{ branches: number[]; name: string; type: string }> = [
  { branches: [2, 5, 8], name: '寅巳申 형', type: 'Domineering (恃勢之刑)' },
  { branches: [1, 10, 7], name: '丑戌未 형', type: 'Ungrateful (無恩之刑)' },
  { branches: [0, 3], name: '子卯 형', type: 'Disrespectful (無禮之刑)' },
]
// Self-punishments (自刑): 辰辰, 午午, 酉酉, 亥亥
export const SELF_XING = [4, 6, 9, 11]

export interface BranchInteractions {
  harmony: string[]
  clash: string[]
  harm: string[]
  punishment: string[]
}

/** Detect all branch interactions among the given set of branch indices. */
export function getBranchInteractions(branchIndices: (number | null)[]): BranchInteractions {
  const bi = branchIndices.filter((b): b is number => b != null)
  const result: BranchInteractions = { harmony: [], clash: [], harm: [], punishment: [] }

  for (const { b1, b2, name } of LIU_HE) {
    if (bi.includes(b1) && bi.includes(b2)) result.harmony.push(name)
  }
  for (const { b1, b2, b3, name } of SAN_HE) {
    if (bi.includes(b1) && bi.includes(b2) && bi.includes(b3)) result.harmony.push(name)
  }
  for (const { b1, b2, b3, name } of FANG_HE) {
    if (bi.includes(b1) && bi.includes(b2) && bi.includes(b3)) result.harmony.push(name)
  }
  for (const { b1, b2, name } of LIU_CHONG) {
    if (bi.includes(b1) && bi.includes(b2)) result.clash.push(name)
  }
  for (const { b1, b2, name } of LIU_HAI) {
    if (bi.includes(b1) && bi.includes(b2)) result.harm.push(name)
  }
  for (const { branches, name } of SAN_XING) {
    if (branches.every(b => bi.includes(b))) result.punishment.push(name)
    else if (branches.length === 2 && bi.includes(branches[0]) && bi.includes(branches[1]))
      result.punishment.push(name)
  }
  // Self-punishment
  for (const b of SELF_XING) {
    if (bi.filter(x => x === b).length >= 2)
      result.punishment.push(`${EARTHLY_BRANCHES_HANJA[b]}${EARTHLY_BRANCHES_HANJA[b]} 자형`)
  }

  return result
}

// ─── Luck Pillars (大運 / 대운) ───────────────────────────────────────────────
/**
 * Calculate 8 major luck pillars (10-year cycles).
 *
 * Direction rule (順逆):
 *   Male + Yang year   → Forward (順行)
 *   Male + Yin year    → Backward (逆行)
 *   Female + Yang year → Backward (逆行)
 *   Female + Yin year  → Forward (順行)
 *
 * Starting age: count days from birth to the next (forward) or previous (backward)
 * solar term, then divide by 3 (each 3 days ≈ 1 year of luck).
 */
export interface LuckPillar {
  stemIdx: number
  branchIdx: number
  stem: string
  stemHanja: string
  branch: string
  branchHanja: string
  element: string
  ageStart: number
  ageEnd: number
}

export interface LuckPillarsResult {
  startAge: number
  isForward: boolean
  pillars: LuckPillar[]
}

export function getLuckPillars(
  birthMonth: number,
  birthDay: number,
  gender: string,
  yearStemIdx: number,
  monthStemIdx: number,
  monthBranchIdx: number,
): LuckPillarsResult {
  const isMale = gender === 'male' || gender === '남성'
  const isYangYear = yearStemIdx % 2 === 0  // 甲丙戊庚壬 = Yang

  // Forward if male+yang or female+yin
  const isForward = (isMale && isYangYear) || (!isMale && !isYangYear)

  const termDay = SOLAR_TERM_DAYS[birthMonth - 1]
  let daysToTerm: number

  if (isForward) {
    // Days to NEXT solar term
    if (birthDay < termDay) {
      daysToTerm = termDay - birthDay
    } else {
      const nextMonth = (birthMonth % 12) + 1
      const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][birthMonth - 1]
      daysToTerm = (daysInMonth - birthDay) + SOLAR_TERM_DAYS[nextMonth - 1]
    }
  } else {
    // Days to PREVIOUS solar term
    if (birthDay >= termDay) {
      daysToTerm = birthDay - termDay
    } else {
      const prevMonth = ((birthMonth - 2 + 12) % 12) + 1
      const daysInPrevMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][prevMonth - 1]
      daysToTerm = birthDay + (daysInPrevMonth - SOLAR_TERM_DAYS[prevMonth - 1])
    }
  }

  // 1 year ≈ 3 days; minimum start age = 1
  const startAge = Math.max(1, Math.round(daysToTerm / 3))

  const pillars: LuckPillar[] = []
  for (let i = 0; i < 8; i++) {
    const offset = isForward ? i + 1 : -(i + 1)
    const stemIdx = ((monthStemIdx + offset) % 10 + 10) % 10
    const branchIdx = ((monthBranchIdx + offset) % 12 + 12) % 12
    pillars.push({
      stemIdx,
      branchIdx,
      stem: HEAVENLY_STEMS[stemIdx],
      stemHanja: HEAVENLY_STEMS_HANJA[stemIdx],
      branch: EARTHLY_BRANCHES[branchIdx],
      branchHanja: EARTHLY_BRANCHES_HANJA[branchIdx],
      element: HEAVENLY_ELEMENTS[stemIdx],
      ageStart: startAge + i * 10,
      ageEnd: startAge + i * 10 + 9,
    })
  }

  return { startAge, isForward, pillars }
}

// ─── Element Balance & Analysis ───────────────────────────────────────────────

export function getElementBalance(elements: string[]): Record<string, number> {
  const counts: Record<string, number> = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 }
  for (const el of elements) if (el in counts) counts[el]++
  return counts
}

export function getDominant(balance: Record<string, number>): string {
  return Object.entries(balance).sort((a, b) => b[1] - a[1])[0][0]
}

export function getWeakness(balance: Record<string, number>): string {
  return Object.entries(balance).sort((a, b) => a[1] - b[1])[0][0]
}

// ─── Compatibility Score ──────────────────────────────────────────────────────

export function getCompatibilityScore(el1: string, el2: string): number {
  if (el1 === el2) return 82
  if (GENERATES[el1] === el2 || GENERATES[el2] === el1) return 91
  if (CONTROLS[el1] === el2 || CONTROLS[el2] === el1) return 55
  return 70
}

// ─── 용신 (用神 / Yongshin — Favorable Element) ──────────────────────────────
/**
 * Determines the chart's 용신 (the element that most benefits the Day Master).
 *
 * Method: 억부용신 (Eokbu — Suppression/Support)
 *   身旺(strong): Day Master needs to be drained or restrained.
 *     Primary 용신 = 식상(食傷) element (what DM generates)
 *     Secondary = 재성(財星) element (what DM controls)
 *     If extremely strong (score ≥ 7): 관성(官星) also acceptable
 *
 *   身弱(weak): Day Master needs support.
 *     Primary 용신 = 인성(印星) element (what generates DM)
 *     Secondary = 비겁(比劫) element (same as DM)
 *
 * 조후용신(調候) overrides for extreme seasonal conditions:
 *   Midsummer (午月/未月) + Fire/Wood DM: Water becomes primary regardless
 *   Midwinter (子月/丑月) + Water/Metal DM: Fire becomes primary regardless
 */
export interface YongshinResult {
  primary: string           // primary 용신 element
  secondary: string         // secondary 용신 element
  avoid: string             // 기신(忌神) — element to avoid
  method: string            // 억부 or 조후
  reasoning: string         // explanation
  luckyColors: string[]
  luckyDirections: string[]
  luckyNumbers: string[]
}

// Lucky attributes per element
const ELEMENT_LUCKY: Record<string, { colors: string[]; directions: string[]; numbers: string[] }> = {
  wood:  { colors: ['Green', 'Blue-green', 'Teal'],       directions: ['East', 'Southeast'],  numbers: ['3', '4', '8'] },
  fire:  { colors: ['Red', 'Orange', 'Bright pink'],      directions: ['South'],               numbers: ['2', '7', '9'] },
  earth: { colors: ['Yellow', 'Brown', 'Beige', 'Ochre'], directions: ['Center', 'Northeast', 'Southwest'], numbers: ['5', '0', '10'] },
  metal: { colors: ['White', 'Silver', 'Gold', 'Grey'],   directions: ['West', 'Northwest'],   numbers: ['4', '9', '6'] },
  water: { colors: ['Black', 'Navy', 'Deep blue', 'Dark grey'], directions: ['North'],         numbers: ['1', '6', '5'] },
}

export function getYongshin(
  dayMasterStemIdx: number,
  monthBranchIdx: number,
  dmStrength: DayMasterStrength,
): YongshinResult {
  const dayEl = HEAVENLY_ELEMENTS[dayMasterStemIdx]

  // ── 조후용신 override for extreme seasons ──────────────────────────────
  // Midsummer (午=6, 未=7): chart is too hot — Water is urgently needed
  const isMidsummer = monthBranchIdx === 6 || monthBranchIdx === 7
  // Midwinter (子=0, 丑=1): chart is too cold — Fire is urgently needed
  const isMidwinter = monthBranchIdx === 0 || monthBranchIdx === 1
  // Extreme heat: 巳=5, 午=6, 未=7 and DM is Fire or Wood
  const isExtremeHeat = (monthBranchIdx >= 5 && monthBranchIdx <= 7) && (dayEl === 'fire' || dayEl === 'wood')
  // Extreme cold: 亥=11, 子=0, 丑=1 and DM is Water or Metal
  const isExtremeCold = (monthBranchIdx === 11 || monthBranchIdx <= 1) && (dayEl === 'water' || dayEl === 'metal')

  if (isExtremeHeat) {
    const primary = 'water'
    const secondary = 'metal'
    return {
      primary, secondary,
      avoid: 'fire',
      method: '조후용신 (Seasonal Balance)',
      reasoning: 'Born in the height of summer with a hot Day Master. Water is urgently needed to cool the chart and restore balance. Metal supports Water as secondary.',
      luckyColors: ELEMENT_LUCKY[primary].colors,
      luckyDirections: ELEMENT_LUCKY[primary].directions,
      luckyNumbers: ELEMENT_LUCKY[primary].numbers,
    }
  }

  if (isExtremeCold) {
    const primary = 'fire'
    const secondary = 'wood'
    return {
      primary, secondary,
      avoid: 'water',
      method: '조후용신 (Seasonal Balance)',
      reasoning: 'Born in the depths of winter with a cold Day Master. Fire is urgently needed to warm the chart. Wood fuels Fire as secondary.',
      luckyColors: ELEMENT_LUCKY[primary].colors,
      luckyDirections: ELEMENT_LUCKY[primary].directions,
      luckyNumbers: ELEMENT_LUCKY[primary].numbers,
    }
  }

  // ── 억부용신 (standard) ────────────────────────────────────────────────
  let primary: string
  let secondary: string
  let avoid: string
  let reasoning: string

  if (dmStrength.isStrong) {
    // Strong DM: drain or restrain it
    primary = GENERATES[dayEl]      // 식상 — what DM generates (drains DM)
    secondary = CONTROLS[dayEl]     // 재성 — what DM controls (also drains)
    avoid = GENERATED_BY[dayEl]     // 인성 — would make DM even stronger
    reasoning = `Your Day Master is ${dmStrength.labelEn.toLowerCase()} (score ${dmStrength.score}). The chart needs ${primary} energy to channel and express your strength, and ${secondary} energy to direct it into tangible results. Avoid excess ${avoid} which would overstrengthen an already powerful chart.`
  } else {
    // Weak DM: support and strengthen it
    primary = GENERATED_BY[dayEl]  // 인성 — what generates DM
    secondary = dayEl               // 비겁 — same element as DM
    avoid = CONTROLLED_BY[dayEl]   // 관성 — what controls DM (would further weaken)
    reasoning = `Your Day Master is ${dmStrength.labelEn.toLowerCase()} (score ${dmStrength.score}). The chart needs ${primary} energy to nourish and strengthen your foundation, supported by ${secondary} energy from peers. Avoid ${avoid} energy which pressures an already weak Day Master.`
  }

  return {
    primary, secondary, avoid,
    method: '억부용신 (Suppression/Support)',
    reasoning,
    luckyColors: ELEMENT_LUCKY[primary].colors,
    luckyDirections: ELEMENT_LUCKY[primary].directions,
    luckyNumbers: ELEMENT_LUCKY[primary].numbers,
  }
}

// ─── 격국 (格局 / Gyeokguk — Chart Pattern) ──────────────────────────────────
/**
 * The chart pattern is primarily determined by the Ten God of the month branch's
 * 본기(主氣 / main hidden stem) relative to the Day Master.
 *
 * The 본기 is the last stem in the JIJANGGAN array (most influential).
 *
 * Standard 10 patterns + 건록격 + 양인격 for 비견/겁재 month branches.
 */
export type GyeokgukKey =
  | '건록격' | '양인격' | '식신격' | '상관격'
  | '편재격' | '정재격' | '칠살격' | '정관격'
  | '편인격' | '정인격'

export interface GyeokgukResult {
  key: GyeokgukKey
  name: string
  nameEn: string
  description: string
  strengths: string[]
  challenges: string[]
}

const GYEOKGUK_INFO: Record<GyeokgukKey, { nameEn: string; description: string; strengths: string[]; challenges: string[] }> = {
  '건록격': {
    nameEn: 'Prosperity Pattern (建祿格)',
    description: 'Born with the Day Master at full strength in its own month. A self-sufficient, independent pattern — wealth and position are earned through personal effort rather than inheritance.',
    strengths: ['Strong self-reliance', 'Clear personal values', 'Steady career trajectory', 'Resilient under pressure'],
    challenges: ['Can be inflexible with others\' approaches', 'Wealth comes slowly through effort', 'Tendency to go it alone'],
  },
  '양인격': {
    nameEn: 'Sword Pattern (羊刃格)',
    description: 'An intense, forceful pattern associated with strong will, competitive drive, and the capacity for decisive action. Often found in leaders, athletes, and those in high-stakes fields.',
    strengths: ['Exceptional determination', 'High competitive drive', 'Capable of bold decisions', 'Thrives under pressure'],
    challenges: ['Prone to conflict and confrontation', 'Difficulty accepting limits', 'Impulsiveness in high-stakes moments'],
  },
  '식신격': {
    nameEn: 'Eating God Pattern (食神格)',
    description: 'A blessed, creative pattern. Natural talent flows freely. Associated with artistic ability, enjoyment of life, and the capacity to generate abundance through genuine skill.',
    strengths: ['Creative output of unusual quality', 'Natural talent recognized early', 'Good health and enjoyment', 'Generous and expressive'],
    challenges: ['Can procrastinate when not inspired', 'Avoids unpleasant confrontations', 'May spread talents too widely'],
  },
  '상관격': {
    nameEn: 'Hurting Officer Pattern (傷官格)',
    description: 'A brilliant, unconventional pattern. Strong intelligence, exceptional expression, and a drive to surpass convention. Often associated with artists, innovators, and original thinkers.',
    strengths: ['Exceptional intelligence and wit', 'Original thinking', 'Powerful self-expression', 'Pushes beyond convention'],
    challenges: ['Tension with authority structures', 'Can be blunt or polarizing', 'Restlessness in stable situations'],
  },
  '편재격': {
    nameEn: 'Indirect Wealth Pattern (偏財格)',
    description: 'A dynamic, socially adept pattern with a natural flair for opportunity. Wealth often comes through business, speculation, or unconventional channels. Strong social intelligence.',
    strengths: ['Sharp eye for opportunity', 'Strong social network', 'Entrepreneurial instinct', 'Generous and magnetic'],
    challenges: ['Financial volatility — money flows freely in both directions', 'Impulsive financial decisions', 'Scattered focus'],
  },
  '정재격': {
    nameEn: 'Direct Wealth Pattern (正財格)',
    description: 'A stable, diligent wealth pattern. Income is earned through consistent effort and careful management. Long-term financial security through discipline rather than luck.',
    strengths: ['Financial reliability and discipline', 'Steady accumulation', 'Trustworthy and responsible', 'Strong practical intelligence'],
    challenges: ['Misses volatile but high-return opportunities', 'Can be overly cautious', 'Risk aversion may limit growth'],
  },
  '칠살격': {
    nameEn: 'Seven Killings Pattern (七殺格 / 偏官格)',
    description: 'A powerful, intense pattern that forges leadership through pressure and adversity. Often found in military leaders, executives, and those who transform challenge into capability.',
    strengths: ['Exceptional resilience', 'Authority built through overcoming difficulty', 'Decisive command presence', 'Competitive edge'],
    challenges: ['Life involves significant pressure and obstacle', 'Conflict-prone relationships', 'Must develop discipline to channel intensity'],
  },
  '정관격': {
    nameEn: 'Direct Officer Pattern (正官格)',
    description: 'A structured, principled pattern associated with integrity, responsibility, and advancement through proper channels. Often found in professionals and those in organizational leadership.',
    strengths: ['Natural authority and credibility', 'Advancement through merit', 'Strong ethical foundation', 'Respected by peers and institutions'],
    challenges: ['Can be rigid within conventional structures', 'Slow to adapt to change', 'May miss opportunities outside the rules'],
  },
  '편인격': {
    nameEn: 'Indirect Resource Pattern (偏印格)',
    description: 'An independent, intellectually deep pattern. Unconventional wisdom and creative intelligence. Often associated with researchers, spiritual practitioners, and original thinkers.',
    strengths: ['Deep intuition and insight', 'Strong independent thinking', 'Ability to work alone effectively', 'Unique creative perspective'],
    challenges: ['Can be reclusive or isolated', 'Inconsistent motivation', 'May struggle with conventional career paths'],
  },
  '정인격': {
    nameEn: 'Direct Resource Pattern (正印格)',
    description: 'A blessed, nurtured pattern associated with learning, support, and moral depth. Often found in academics, educators, and those who work in service and care.',
    strengths: ['Strong academic and intellectual capacity', 'Moral integrity', 'Receives support at key moments', 'Calm and steady temperament'],
    challenges: ['Can be dependent on support systems', 'Avoids bold independent moves', 'May be too principled to be pragmatic'],
  },
}

export function getGyeokguk(
  dayMasterStemIdx: number,
  monthBranchIdx: number,
): GyeokgukResult {
  const monthBranchHanja = EARTHLY_BRANCHES_HANJA[monthBranchIdx]
  const hiddenStems = JIJANGGAN[monthBranchHanja] ?? []

  // 본기 = last hidden stem (most influential)
  const bongiHanja = hiddenStems[hiddenStems.length - 1]
  const bongiIdx = HEAVENLY_STEMS_HANJA.indexOf(bongiHanja)

  let gyeokgukKey: GyeokgukKey

  if (bongiIdx === -1) {
    // Fallback if bongi not found
    gyeokgukKey = '건록격'
  } else {
    const sipsin = getSipsin(dayMasterStemIdx, bongiIdx)
    if (sipsin === '비견') gyeokgukKey = '건록격'
    else if (sipsin === '겁재') gyeokgukKey = '양인격'
    else if (sipsin === '식신') gyeokgukKey = '식신격'
    else if (sipsin === '상관') gyeokgukKey = '상관격'
    else if (sipsin === '편재') gyeokgukKey = '편재격'
    else if (sipsin === '정재') gyeokgukKey = '정재격'
    else if (sipsin === '편관') gyeokgukKey = '칠살격'
    else if (sipsin === '정관') gyeokgukKey = '정관격'
    else if (sipsin === '편인') gyeokgukKey = '편인격'
    else gyeokgukKey = '정인격'
  }

  const info = GYEOKGUK_INFO[gyeokgukKey]
  return {
    key: gyeokgukKey,
    name: gyeokgukKey,
    nameEn: info.nameEn,
    description: info.description,
    strengths: info.strengths,
    challenges: info.challenges,
  }
}

// ─── 조후 (調候 / Johu — Seasonal Balance Assessment) ────────────────────────
/**
 * Assesses the chart's seasonal energy balance.
 * Returns whether the chart is hot/cold/dry/wet, and what elements address the imbalance.
 */
export interface JohuResult {
  season: string          // spring/summer/autumn/winter
  seasonKor: string
  tendency: string        // hot / cold / balanced
  neededElement: string   // element to supplement for comfort
  avoidElement: string    // element that makes it worse
  note: string
}

// Month branch → season
const BRANCH_SEASON: Record<number, { season: string; seasonKor: string; tendency: string }> = {
  2:  { season: 'early spring', seasonKor: '초봄 (寅月)', tendency: 'warming' },
  3:  { season: 'spring',       seasonKor: '봄 (卯月)',   tendency: 'balanced' },
  4:  { season: 'late spring',  seasonKor: '늦봄 (辰月)', tendency: 'warming' },
  5:  { season: 'early summer', seasonKor: '초여름 (巳月)', tendency: 'hot' },
  6:  { season: 'summer',       seasonKor: '여름 (午月)', tendency: 'very hot' },
  7:  { season: 'late summer',  seasonKor: '늦여름 (未月)', tendency: 'hot' },
  8:  { season: 'early autumn', seasonKor: '초가을 (申月)', tendency: 'cooling' },
  9:  { season: 'autumn',       seasonKor: '가을 (酉月)', tendency: 'balanced' },
  10: { season: 'late autumn',  seasonKor: '늦가을 (戌月)', tendency: 'cooling' },
  11: { season: 'early winter', seasonKor: '초겨울 (亥月)', tendency: 'cold' },
  0:  { season: 'winter',       seasonKor: '겨울 (子月)', tendency: 'very cold' },
  1:  { season: 'late winter',  seasonKor: '늦겨울 (丑月)', tendency: 'cold' },
}

export function getJohu(dayMasterStemIdx: number, monthBranchIdx: number): JohuResult {
  const dayEl = HEAVENLY_ELEMENTS[dayMasterStemIdx]
  const { season, seasonKor, tendency } = BRANCH_SEASON[monthBranchIdx]

  let neededElement: string
  let avoidElement: string
  let note: string

  const isHot = tendency === 'hot' || tendency === 'very hot'
  const isCold = tendency === 'cold' || tendency === 'very cold'

  if (isHot) {
    neededElement = 'water'
    avoidElement = 'fire'
    note = `Born in ${season}, the chart carries strong heat. Water energy cools and moistens the chart, preventing the Day Master from becoming too dry or aggressive. Metal is also helpful as it produces Water.`
  } else if (isCold) {
    neededElement = 'fire'
    avoidElement = 'water'
    note = `Born in ${season}, the chart is dominated by cold and contraction. Fire energy warms and activates the chart, allowing the Day Master to function with full vitality. Wood fuels Fire and is secondarily helpful.`
  } else if (tendency === 'warming') {
    neededElement = dayEl === 'wood' || dayEl === 'fire' ? 'water' : 'fire'
    avoidElement = 'metal'
    note = `Born in ${season}, the chart is emerging from cold into warmth. The balance of temperature is still forming — moderating elements support the Day Master's vitality without extremes.`
  } else if (tendency === 'cooling') {
    neededElement = dayEl === 'metal' || dayEl === 'water' ? 'fire' : 'earth'
    avoidElement = 'water'
    note = `Born in ${season}, the chart is beginning to cool. Warming energy protects vitality before winter arrives. Fire and Earth support stability through the transition.`
  } else {
    // balanced season
    neededElement = GENERATED_BY[dayEl]  // fall back to what generates DM
    avoidElement = CONTROLLED_BY[dayEl]
    note = `Born in ${season}, the chart has naturally moderate seasonal energy. The Day Master's needs are determined primarily by the overall element balance rather than extreme seasonal conditions.`
  }

  return { season, seasonKor, tendency, neededElement, avoidElement, note }
}
