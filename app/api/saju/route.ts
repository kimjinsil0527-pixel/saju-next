import { NextRequest, NextResponse } from 'next/server'
import {
  getYearPillar, getMonthPillar, getDayPillar, getHourPillar,
  getElementBalance, getDominant, getWeakness,
  getChartSipsin, getDayMasterStrength, getLuckPillars,
  getBranchInteractions, JIJANGGAN, SIPSIN_EN, SIPSIN_FORTUNE_LEVEL,
  getSipsin, getYongshin, getGyeokguk, getJohu,
} from '@/lib/sajuCalc'
import { ILGAN_PROFILE, ELEMENT_PROFILE, getLifePeriodFortune } from '@/lib/sajuContent'
import { Lunar } from 'lunar-javascript'

// Hour branch key → branch index
const HOUR_BRANCH_IDX: Record<string, number> = {
  rat: 0, ox: 1, tiger: 2, rabbit: 3,
  dragon: 4, snake: 5, horse: 6, goat: 7,
  monkey: 8, rooster: 9, dog: 10, pig: 11,
}

const ELEMENT_LUCKY_COLORS: Record<string, string> = {
  wood: 'Blue-Green · Forest', fire: 'Red · Orange',
  earth: 'Yellow · Ochre', metal: 'White · Gold', water: 'Black · Navy',
}

// Annual fortune texts keyed by the Ten God of current year's stem vs. Day Master
const ANNUAL_FORTUNE: Record<string, string[]> = {
  '비견': [
    'A year of independent effort and self-reliance. Competition may appear, but your own initiative determines everything.',
    'Your determination and personal drive are at a peak. Focus on what is uniquely yours to build — and defend it wisely.',
  ],
  '겁재': [
    'Rivalry and financial outflow through others are possible. Your resilience will be tested — and strengthened.',
    'A year that sharpens you. Every challenge you overcome this year compounds your capability.',
  ],
  '식신': [
    'Creative and productive energy defines this year. Expressing your talents brings tangible rewards — in work, in joy, in health.',
    'What you build and create now carries real weight. Natural ability flows freely and earns its recognition.',
  ],
  '상관': [
    'Bold self-expression and a desire to break conventions characterize this year. Channel it into creation rather than confrontation.',
    'Artistic and unconventional energy runs high. Authority relationships may be strained — choose battles wisely.',
  ],
  '편재': [
    'Financial opportunity arrives in unexpected forms. Social connections open doors — stay alert and act decisively.',
    'A dynamic year for wealth and networking. Money can come and go quickly — capture and hold the gains.',
  ],
  '정재': [
    'Stable, earned income and practical financial progress. Discipline compounds your results this year.',
    'Wealth comes through consistency. A year to build solid foundations rather than chase quick returns.',
  ],
  '편관': [
    'Pressure and challenge sharpen you this year. Those who channel this intensity into focused action emerge transformed.',
    'A demanding year that separates who you are from who you\'ve been performing as. The testing matters.',
  ],
  '정관': [
    'Career advancement, social recognition, and a year of earned authority. What you\'ve built is being seen — and it stands.',
    'Structure and responsibility pay dividends. Official matters, promotions, and recognition define this year.',
  ],
  '편인': [
    'A year for study, research, and inward development. Unusual inspiration arrives — trust your instincts.',
    'Creative and intellectual energy that doesn\'t follow convention. Insights gathered now become future breakthroughs.',
  ],
  '정인': [
    'Support, rest, and resource accumulation define this year. Help arrives when needed.',
    'A favorable year for study, healing, and receiving care. Accept help graciously — it advances your path.',
  ],
}

// Monthly fortune texts by Ten God
const MONTHLY_FORTUNE_TEXTS: Record<string, string[]> = {
  '비견': [
    'Independent energy is strong. Trust your own judgment and move forward on personal initiatives.',
    'A self-reliant month — you accomplish most through your own directed effort.',
  ],
  '겁재': [
    'Watch your finances this month — unexpected outflow is possible. Protect what you\'ve built.',
    'Competition or rivalry may surface. Stay grounded in your values rather than reacting to others.',
  ],
  '식신': [
    'Creative and productive energy flows. A great time to create, express, and share your work.',
    'Natural talent is visible. What you produce now carries unusual quality — good for health and output.',
  ],
  '상관': [
    'Bold expression and unconventional thinking are favored. Good for art, writing, and innovative work.',
    'You may clash with rigid structures this month. Channel intensity into creation rather than confrontation.',
  ],
  '편재': [
    'Financial opportunity appears — often through social connections or unexpected channels.',
    'Active, social energy brings new prospects. Networking and visible effort return more than usual.',
  ],
  '정재': [
    'Stable, earned income and practical progress. Consistent effort reliably compounds this month.',
    'A good time for financial planning and building steady foundations. Discipline pays off.',
  ],
  '편관': [
    'Pressure and intensity characterize this month. Channel ambition into focused work, not conflict.',
    'Authority and structure may create friction. Stay disciplined — this challenge sharpens your edge.',
  ],
  '정관': [
    'Career energy is strong. Responsibility is rewarded. A good month for official matters and recognition.',
    'Structure and diligence pay visible dividends. Authority figures take notice of what you\'ve built.',
  ],
  '편인': [
    'Study, research, and creative inspiration define this month. Trust unusual ideas that arrive quietly.',
    'An introspective month with strong intuitive signal. Inner development sets up future success.',
  ],
  '정인': [
    'Support arrives when needed. A favorable month for rest, healing, study, and receiving help.',
    'Rest and recovery are as productive as action this month. Good for learning and mentorship.',
  ],
}

function calcMonthlyFortune(
  birthYear: number,
  currentYear: number,
  dayMasterStemIdx: number,
): { month: number; fortune: string; level: number; sipsin: string }[] {
  const results = []
  for (let m = 1; m <= 12; m++) {
    const mp = getMonthPillar(currentYear, m, 15)
    const sipsin = getSipsin(dayMasterStemIdx, mp.stemIdx)
    const sipsinKey = sipsin as keyof typeof SIPSIN_FORTUNE_LEVEL
    const baseLevel = SIPSIN_FORTUNE_LEVEL[sipsinKey] ?? 3
    // Add small variation based on birth year + month so it feels personalized
    const variation = ((birthYear + m) % 3) - 1  // -1, 0, or +1
    const clampedLevel = Math.min(5, Math.max(1, baseLevel + variation))
    const texts = MONTHLY_FORTUNE_TEXTS[sipsin] ?? MONTHLY_FORTUNE_TEXTS['비견']
    const fortune = texts[(birthYear + currentYear + m + dayMasterStemIdx) % texts.length]
    results.push({ month: m, fortune, level: clampedLevel, sipsin })
  }
  return results
}

function calcAnnualSipsin(dayMasterStemIdx: number, yearStemIdx: number): string {
  return getSipsin(dayMasterStemIdx, yearStemIdx)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { birthdate, gender, hourKey, calendar } = body as {
      birthdate: string
      gender: string
      hourKey?: string
      calendar?: string  // 'Solar' | 'Lunar'
    }

    if (!birthdate) {
      return NextResponse.json({ error: 'Please enter your birth date.' }, { status: 400 })
    }

    const [yearStr, monthStr, dayStr] = birthdate.split('-')
    let year = parseInt(yearStr)
    let month = parseInt(monthStr)
    let day = parseInt(dayStr)

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return NextResponse.json({ error: 'Invalid date format.' }, { status: 400 })
    }

    // ─── Lunar → Solar conversion ──────────────────────────────────────────
    let isLunar = false
    if (calendar === 'Lunar') {
      try {
        const lunar = Lunar.fromYmd(year, month, day)
        const solar = lunar.getSolar()
        year = solar.getYear()
        month = solar.getMonth()
        day = solar.getDay()
        isLunar = true
      } catch {
        return NextResponse.json({ error: 'Invalid lunar date. Please check the date and try again.' }, { status: 400 })
      }
    }

    // ─── Four Pillars ──────────────────────────────────────────────────────
    const yearPillar = getYearPillar(year)
    const monthPillar = getMonthPillar(year, month, day)   // solar-term-corrected
    const dayPillar = getDayPillar(year, month, day)

    const hourBranchIdx =
      hourKey && hourKey !== 'unknown' ? (HOUR_BRANCH_IDX[hourKey] ?? -1) : -1
    const hourPillar = getHourPillar(dayPillar.stemIdx, hourBranchIdx)

    // ─── Element Balance ───────────────────────────────────────────────────
    const allPillars = [yearPillar, monthPillar, dayPillar, ...(hourPillar ? [hourPillar] : [])]
    const allElements = [
      ...allPillars.map(p => p.element),
      ...allPillars.map(p => p.branchElement),
    ]
    const balance = getElementBalance(allElements)
    const dominant = getDominant(balance)
    const weakness = getWeakness(balance)

    // ─── Ten Gods (십신) ───────────────────────────────────────────────────
    const dayMasterIdx = dayPillar.stemIdx
    const stemIndices = [
      yearPillar.stemIdx, monthPillar.stemIdx,
      dayPillar.stemIdx, hourPillar?.stemIdx ?? null,
    ]
    const branchIndices = [
      yearPillar.branchIdx, monthPillar.branchIdx,
      dayPillar.branchIdx, hourPillar?.branchIdx ?? null,
    ]
    const { stemSipsin, branchSipsin } = getChartSipsin(dayMasterIdx, stemIndices, branchIndices)

    // ─── Hidden Stems (지장간) ─────────────────────────────────────────────
    const hiddenStems = {
      year: JIJANGGAN[yearPillar.branchHanja] ?? [],
      month: JIJANGGAN[monthPillar.branchHanja] ?? [],
      day: JIJANGGAN[dayPillar.branchHanja] ?? [],
      hour: hourPillar ? (JIJANGGAN[hourPillar.branchHanja] ?? []) : [],
    }

    // ─── Branch Interactions ───────────────────────────────────────────────
    const interactions = getBranchInteractions(branchIndices)

    // ─── Day Master Strength ───────────────────────────────────────────────
    const otherStemIdx = [
      yearPillar.stemIdx, monthPillar.stemIdx,
      ...(hourPillar ? [hourPillar.stemIdx] : []),
    ]
    const otherBranchIdx = [
      yearPillar.branchIdx, dayPillar.branchIdx,
      ...(hourPillar ? [hourPillar.branchIdx] : []),
    ]
    const dayMasterStrength = getDayMasterStrength(
      dayMasterIdx, monthPillar.branchIdx, otherStemIdx, otherBranchIdx,
    )

    // ─── Luck Pillars (대운) ───────────────────────────────────────────────
    const luckPillars = getLuckPillars(
      month, day, gender,
      yearPillar.stemIdx,
      monthPillar.stemIdx,
      monthPillar.branchIdx,
    )

    // ─── 용신 (用神 / Favorable Element) ──────────────────────────────────
    const yongshin = getYongshin(dayMasterIdx, monthPillar.branchIdx, dayMasterStrength)

    // ─── 격국 (格局 / Chart Pattern) ───────────────────────────────────────
    const gyeokguk = getGyeokguk(dayMasterIdx, monthPillar.branchIdx)

    // ─── 조후 (調候 / Seasonal Balance) ───────────────────────────────────
    const johu = getJohu(dayMasterIdx, monthPillar.branchIdx)

    // ─── Annual Fortune (current year Ten God → Day Master) ────────────────
    const currentYear = new Date().getFullYear()
    const currentYearPillar = getYearPillar(currentYear)
    const annualSipsin = calcAnnualSipsin(dayMasterIdx, currentYearPillar.stemIdx)
    const annualTexts = ANNUAL_FORTUNE[annualSipsin] ?? ANNUAL_FORTUNE['비견']
    const todayFortune = annualTexts[(year + month + day) % annualTexts.length]

    // ─── Content / Profile Data ────────────────────────────────────────────
    const ilganProfile = ILGAN_PROFILE[dayPillar.stemHanja] ?? null
    const dominantProfile = ELEMENT_PROFILE[dominant] ?? null
    const weaknessProfile = ELEMENT_PROFILE[weakness] ?? null
    const lifePeriod = getLifePeriodFortune(
      yearPillar.stemHanja, yearPillar.branchHanja,
      monthPillar.stemHanja, dayPillar.stemHanja,
      !!hourPillar,
    )

    // ─── Monthly Fortune (Ten Gods × current year) ────────────────────────
    const monthly = calcMonthlyFortune(year, currentYear, dayMasterIdx)

    // ─── Ten God display labels ────────────────────────────────────────────
    const sipsinLabels = {
      yearStem: stemSipsin[0] ? (SIPSIN_EN[stemSipsin[0]]?.short ?? null) : null,
      monthStem: stemSipsin[1] ? (SIPSIN_EN[stemSipsin[1]]?.short ?? null) : null,
      dayStem: '일간 (日干)',
      hourStem: stemSipsin[3] ? (SIPSIN_EN[stemSipsin[3] as keyof typeof SIPSIN_EN]?.short ?? null) : null,
      yearBranch: branchSipsin[0] ? (SIPSIN_EN[branchSipsin[0] as keyof typeof SIPSIN_EN]?.short ?? null) : null,
      monthBranch: branchSipsin[1] ? (SIPSIN_EN[branchSipsin[1] as keyof typeof SIPSIN_EN]?.short ?? null) : null,
      dayBranch: branchSipsin[2] ? (SIPSIN_EN[branchSipsin[2] as keyof typeof SIPSIN_EN]?.short ?? null) : null,
      hourBranch: branchSipsin[3] ? (SIPSIN_EN[branchSipsin[3] as keyof typeof SIPSIN_EN]?.short ?? null) : null,
    }

    return NextResponse.json({
      pillars: {
        year: yearPillar,
        month: monthPillar,
        day: dayPillar,
        hour: hourPillar,
      },
      meta: {
        isLunar,
        solarDate: `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`,
      },
      analysis: {
        zodiac: yearPillar.zodiac,
        gender,
        dominantElement: dominant,
        weaknessElement: weakness,
        dominantColor: ELEMENT_LUCKY_COLORS[dominant],
        balance,
        todayFortune,
        ilgan: dayPillar.stem,
        ilganHanja: dayPillar.stemHanja,
        ilganProfile,
        dominantProfile,
        weaknessProfile,
        lifePeriod,
        monthly,
        // ── Professional BaZi analysis data ──
        sipsinLabels,
        hiddenStems,
        interactions,
        dayMasterStrength,
        luckPillars,
        annualSipsin,
        currentYearStem: currentYearPillar.stemHanja,
        currentYearBranch: currentYearPillar.branchHanja,
        // ── 용신 / 격국 / 조후 ──
        yongshin,
        gyeokguk,
        johu,
      },
    })
  } catch (err) {
    console.error('Saju API error:', err)
    return NextResponse.json(
      { error: 'A server error occurred. Please try again.' },
      { status: 500 },
    )
  }
}
