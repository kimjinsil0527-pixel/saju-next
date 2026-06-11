'use client'
import { useState, use } from 'react'
import Link from 'next/link'
import styles from './reading.module.css'

type ReadingType = 'single' | 'couple'

interface Reading {
  icon: string
  title: string
  subtitle: string
  credits: number
  type: ReadingType
  desc: string
  whatYouLearn: string[]
  sampleHeadline: string
  freeOverview: string
  freeInsights: string[]
  lockedLabel: string
  lockedLines: string[]
  relatedSlugs: string[]
  tag: string
}

const READINGS: Record<string, Reading> = {
  'crush': {
    icon: '💌', title: 'Crush & One-Sided Love', subtitle: 'Does your crush feel the same?',
    credits: 8, type: 'couple',
    desc: "You have feelings — but do they? Your Four Pillars chart carries clear signals about mutual attraction energy and the optimal timing to make your move.",
    whatYouLearn: ['Whether your crush holds romantic interest toward you', 'The best window to confess or take action', 'Your attraction element and how it interacts with theirs', 'Whether this connection has long-term potential'],
    sampleHeadline: 'Your Attraction Energy — Free Overview',
    freeOverview: "Your Day Master reveals the way you naturally attract and pursue romantic interest. Based on your elemental profile, you carry a strong magnetic quality that draws people in — but your attraction energy works best when you allow the other person to come toward you rather than chasing directly. This is especially true in the current seasonal cycle, where your personal energy is at a reflective peak rather than an outward peak.",
    freeInsights: [
      "Your dominant element creates a natural warmth that people find approachable and trustworthy — your crush likely feels comfortable around you already.",
      "The current annual cycle is active for your Relationship Star, meaning new and existing romantic energy is amplified through this season.",
      "You tend to fall for people whose energy complements your own element — and this crush likely carries the element that your chart is most drawn to.",
      "Your attraction style is patient and thoughtful rather than impulsive — and this works in your favor because it reads as confident and secure to others.",
      "The spring and early summer months carry your highest personal magnetism this year. If you're considering making a move, this window is naturally supported.",
      "One signal to watch: if your crush initiates contact or creates reasons to spend time with you, it strongly reflects elemental interest on their side.",
    ],
    lockedLabel: 'Unlock the full reading for specific answers',
    lockedLines: [
      "Mutual feeling probability — based on both charts combined: high / medium / low / unlikely",
      "The exact month and season window with highest success for confession or action",
      "Their specific elemental response pattern — do they open slowly or quickly? what triggers them to pull back?",
      "The one approach that activates their romantic interest vs. the one that shuts it down",
      "Long-term potential score with full reasoning: __ / 100",
      "Whether this connection leads to a relationship or remains one-sided — chart-based forecast",
    ],
    relatedSlugs: ['dating', 'soulmate', 'new-couple'],
    tag: 'Confession timing',
  },
  'new-couple': {
    icon: '🌹', title: 'New Relationship Reading', subtitle: 'Is this going somewhere real?',
    credits: 8, type: 'couple',
    desc: "You just started seeing someone. The early energy of a relationship often tells the whole story — your charts know whether this connection is casual chemistry or something that lasts.",
    whatYouLearn: ['Early-stage elemental compatibility score', 'Whether both of your energy styles are naturally compatible', 'Potential friction points to watch out for', 'The natural pace this relationship wants to move at'],
    sampleHeadline: 'Early Relationship Energy — Free Overview',
    freeOverview: "The beginning of a relationship is when elemental energy is most visible and least filtered by habit. In this phase, both people are essentially broadcasting their core element — and what you feel in the first few months is often the clearest signal of the underlying dynamic. Your chart's early-stage relationship energy shows a strong desire for genuine connection over casual interaction.",
    freeInsights: [
      "Your Day Master naturally seeks depth in relationships — you're not someone who stays in something that doesn't have real meaning, which means your instincts about this person deserve attention.",
      "The current cycle in your chart supports new relationships taking root — the energy is receptive and open, which is a genuinely good sign for timing.",
      "New relationships that begin during a Relationship Star activation period (like your current phase) tend to develop more naturally and with less friction in the early months.",
      "Your elemental type values trust and consistency above excitement — if this person is showing up reliably, that matters more than grand gestures for your chart.",
      "The first 3 months are the clearest window — how this person treats you when things are still new is the most honest data point your chart can work with.",
      "There is a natural complement between your elemental types that creates warmth and ease in conversation — most people around you probably notice you seem relaxed together.",
      "One thing to watch: your element can be slow to express vulnerability. The relationship grows faster when you allow yourself to be seen rather than presenting only your composed side.",
    ],
    lockedLabel: 'Unlock the full compatibility analysis',
    lockedLines: [
      "Full five-element compatibility breakdown — where you match, where you clash, and what each element means for the relationship",
      "The #1 friction point most likely to surface between months 2–4, and how to navigate it before it becomes a pattern",
      "Long-term sustainability score with detailed reasoning: __ / 100",
      "Whether the timing of meeting is auspicious in both charts — or whether timing is working against you",
      "Optimal relationship pace: specific guidance on when to deepen commitment vs. when to give space",
      "Whether this person's chart shows they are emotionally available right now or carrying unresolved energy from before",
    ],
    relatedSlugs: ['crush', 'relationship-dive', 'love-language'],
    tag: 'Most popular',
  },
  'dating': {
    icon: '✨', title: 'Dating & Almost-There Stage', subtitle: "Will it become official?",
    credits: 8, type: 'couple',
    desc: "You're in the talking phase — not quite together, not just friends. This reading analyzes the energetic momentum between your charts and tells you whether this naturally progresses.",
    whatYouLearn: ["The direction your connection's energy is naturally moving", 'Whether there are elemental blockers slowing things down', 'The timing window for the relationship to go official', 'What each of you subconsciously needs before committing'],
    sampleHeadline: 'Relationship Momentum — Free Overview',
    freeOverview: "The 'almost-there' phase is one of the most energetically interesting periods in any relationship — because both people are already partially committed but neither has fully crossed the threshold. Your chart reveals a lot about why you're in this in-between space and what needs to shift for things to move forward.",
    freeInsights: [
      "Your chart is currently in a forward-momentum cycle — meaning your own energy is ready to progress. If things feel stuck, the hesitation is more likely coming from their side.",
      "Your elemental type tends to know relatively quickly whether someone is right — the fact that you're still in this phase suggests you already feel something real.",
      "The 'talking stage' often stalls when one person's element requires more security signals before committing. Based on common elemental patterns, they may need consistent reassurance before they'll step forward.",
      "Your energy is most attractive and confident when you're not chasing — your chart shows a natural magnetism that increases when you focus on your own life in parallel with pursuing connection.",
      "There is currently a bonding energy window active in your chart that favors deepening connections — this is one of the better periods of the year to have a direct, honest conversation about where things stand.",
      "The uncertainty you're feeling is normal for this stage — it doesn't mean something is wrong. It means both energies are still calibrating to each other.",
    ],
    lockedLabel: 'Get the specific timing and outcome forecast',
    lockedLines: [
      "Whether this becomes official — and in which specific month the shift is most likely",
      "The key conversation or moment that triggers the relationship to formalize — what to say and when",
      "What's holding them back (if anything) based on their chart — specific elemental blocker identified",
      "Your most attractive quality to them according to their elemental type",
      "Whether this is a long-term relationship or a shorter-cycle connection — chart-based forecast",
      "The one thing you can do right now to accelerate the transition naturally",
    ],
    relatedSlugs: ['new-couple', 'crush', 'relationship-dive'],
    tag: 'Relationship timing',
  },
  'relationship-dive': {
    icon: '💞', title: 'Relationship Deep Dive', subtitle: 'Understand your dynamic completely',
    credits: 15, type: 'couple',
    desc: "For established couples. This full reading compares both of your charts across all five elements — revealing the hidden tensions, unspoken needs, and what makes your connection uniquely powerful.",
    whatYouLearn: ['Full five-element compatibility breakdown', 'Your dominant dynamic (who leads, who grounds, who energizes)', 'The emotional needs neither of you are openly expressing', 'Your strongest bonding element and how to activate it', 'Where the friction originates and how to resolve it'],
    sampleHeadline: 'Relationship Dynamic — Free Overview',
    freeOverview: "Every relationship has a dominant elemental dynamic — a core energy pattern that drives both the best moments and the most recurring conflicts. Your chart reveals not just whether you're compatible, but how your two energies interact at a structural level. Understanding this pattern is what transforms a relationship from reactive to intentional.",
    freeInsights: [
      "Your Day Master element plays a specific role in your relationship — it either generates energy for your partner, controls it, or flows in parallel with it. Each pattern creates a different relationship feeling.",
      "Relationships between complementary elements (where one generates the other) tend to feel natural and supportive — one partner consistently lifts the other without feeling drained.",
      "Relationships between controlling elements (where one element governs the other) create intense chemistry and deep attachment, but also a recurring power tension that needs conscious management.",
      "The most common source of conflict in relationships isn't incompatibility — it's mismatched emotional needs that neither person is explicitly communicating. Your chart reveals what you actually need vs. what you ask for.",
      "Your chart has a specific 'shadow element' — the elemental energy you struggle to express — and your partner's chart likely activates this shadow directly, which is why they can both frustrate and deeply understand you.",
      "The seasons where your element is at its lowest energy are your relationship's most vulnerable periods — knowing these windows in advance allows you to give each other more space rather than taking things personally.",
      "Long-term relationships tend to stabilize around one partner's Earth element — whoever carries more Earth energy naturally becomes the relationship's anchor, for better and worse.",
    ],
    lockedLabel: 'Unlock the complete couples analysis',
    lockedLines: [
      "Complete five-element interaction map — all 5 elemental relationships between your charts explained",
      "Your relationship's dominant dynamic type: generative / controlling / parallel — with full explanation",
      "The #1 unspoken need each of you is carrying that the other isn't meeting",
      "Your relationship's biggest long-term risk and the specific action that prevents it",
      "Monthly harmony and tension forecast for the next 6 months — which months to invest and which to give space",
      "Specific communication style calibrated to your exact elemental dynamic",
    ],
    relatedSlugs: ['love-language', 'conflict', 'full-compat'],
    tag: 'Full chart comparison',
  },
  'conflict': {
    icon: '⚡', title: 'Love Conflict Forecast', subtitle: 'When tensions peak — and when they heal',
    credits: 12, type: 'couple',
    desc: "Every relationship has rough patches. This reading maps the elemental friction points in both of your charts to predict when tension is most likely — so you can prepare, not be blindsided.",
    whatYouLearn: ['The months carrying highest conflict energy for your relationship', 'The root elemental cause of your recurring arguments', 'When harmony naturally returns after difficult periods', 'How each of your charts handles confrontation differently'],
    sampleHeadline: 'Conflict Energy — Free Overview',
    freeOverview: "Conflict in relationships is rarely random — it follows elemental cycles that are visible in both charts. Understanding when your combined energy is under strain (and why) is one of the most practical things you can do for a relationship. Prepared couples navigate friction without it becoming damage.",
    freeInsights: [
      "Every elemental pairing has a specific recurring conflict pattern — it's not about personality clashes, it's about two energy systems creating friction at predictable points.",
      "The most damaging conflicts happen when both partners are in a low-energy phase simultaneously — these are the windows where small issues escalate unnecessarily.",
      "Your personal element has a specific stress response: some elements go cold and withdraw, others become vocal and confrontational. Knowing yours (and your partner's) prevents misreading the signals.",
      "Annual cycles create predictable tension windows — most couples notice they argue more in certain months without understanding why. It's elemental, not personal.",
      "The relationship's strongest harmony windows are equally predictable — and these are the best times to have important conversations, make joint decisions, or deepen intimacy.",
      "Recurring arguments that never seem to get resolved are almost always rooted in an unmet elemental need, not the surface topic of the argument itself.",
      "Post-conflict recovery speed varies significantly by element — Water types need time and space; Fire types need immediate resolution; Earth types need reassurance of stability.",
    ],
    lockedLabel: 'Get your 12-month conflict and harmony map',
    lockedLines: [
      "Month-by-month conflict and harmony forecast for the next 12 months — specific months highlighted",
      "The specific trigger pattern behind your most recurring argument — and its elemental root cause",
      "The 3 highest harmony months this year — ideal for important conversations and deepening connection",
      "How to defuse your partner's elemental stress response — specific, actionable techniques",
      "The 2 highest tension months — what to avoid doing during these windows",
      "Whether this year overall strengthens or weakens your relationship energy",
    ],
    relatedSlugs: ['relationship-dive', 'love-language', 'full-compat'],
    tag: '12-month forecast',
  },
  'long-distance': {
    icon: '✈️', title: 'Long Distance Love', subtitle: 'Can this survive the distance?',
    credits: 10, type: 'couple',
    desc: "Long-distance relationships carry a unique elemental challenge. Some charts thrive with independence; others wither. This reading tells you honestly whether the energy supports endurance.",
    whatYouLearn: ['Whether both charts carry strong long-distance endurance energy', 'The ideal timeline to close the distance', 'The biggest emotional risk during the separation period', 'What each of you needs to maintain the connection from afar'],
    sampleHeadline: 'Distance Endurance — Free Overview',
    freeOverview: "Long-distance tests relationships in a very specific way — it removes physical presence and forces the connection to survive on communication, trust, and emotional consistency alone. Some elemental pairings are actually strengthened by this test; others struggle significantly. Your chart gives a clear signal about which category you're in.",
    freeInsights: [
      "Certain elements thrive in long-distance because they're naturally comfortable with independence and don't require constant physical presence to feel secure in a relationship.",
      "The biggest threat to long-distance relationships isn't the distance itself — it's one person growing in a new direction while the other stays in place. Your charts' growth energies need to be compatible.",
      "Communication style compatibility matters more in long-distance than in any other relationship format. How you each process and express emotional needs by text and call becomes the whole relationship.",
      "Your current annual cycle affects how much you need closeness vs. independence — if you're in a high-independence phase, distance is naturally easier. If you're in a high-closeness phase, it's harder regardless of feelings.",
      "Long-distance relationships have a natural expiration point energetically — after which both charts either close the gap or begin drifting. This window is visible in the charts.",
      "Trust energy is element-specific: some elements extend trust naturally and hold it; others need regular reassurance that the trust is still justified. Knowing which type each of you is prevents unnecessary insecurity.",
    ],
    lockedLabel: 'Get the full endurance and timeline analysis',
    lockedLines: [
      "Endurance probability rating based on both charts: strong / moderate / challenging / not recommended",
      "The specific month the emotional strain reaches its peak — and how to handle it",
      "The ideal timing window to close the distance permanently",
      "Whether the distance strengthens or weakens your elemental bond over time",
      "Specific actions calibrated to your elemental types to maintain connection during separation",
      "Whether this relationship survives long-distance — chart-based honest forecast",
    ],
    relatedSlugs: ['relationship-dive', 'conflict', 'marriage-timing'],
    tag: 'Endurance analysis',
  },
  'age-gap': {
    icon: '🕰️', title: 'Age Gap Relationship', subtitle: 'Generational energy — harmony or clash?',
    credits: 10, type: 'couple',
    desc: "Age gaps bring different generational elemental cycles into play. What looks like a compatibility mismatch on the surface may be a deeply complementary pairing — or a fundamental energy clash.",
    whatYouLearn: ['How the generational cycle difference affects your dynamic', 'Whether the energy gap creates tension or balance', 'Which partner holds more elemental power in this pairing', 'How to bridge the generational energy difference'],
    sampleHeadline: 'Age Gap Dynamic — Free Overview',
    freeOverview: "In Four Pillars analysis, age gaps create generational cycle differences that affect the elemental dynamic in very specific ways. The 60-year Stem-Branch cycle means certain age gaps produce mirror-image charts with deep resonance, while others create fundamental elemental tension. The size of the gap matters less than the specific cycle relationship between the two birthdays.",
    freeInsights: [
      "Age gap relationships often work well when the elder partner's chart carries Earth energy — this creates a naturally stabilizing, grounding influence that the younger partner's chart can grow from.",
      "The most common challenge in age-gap relationships isn't values or lifestyle — it's different positions in the life cycle energy map. One person may be in a building phase while the other is in a harvesting phase.",
      "When the younger partner is in their ascending cycle (typically 20s–30s), they naturally want expansion and growth. If the elder partner is in a consolidation cycle, this can create restlessness if not consciously acknowledged.",
      "Age-gap relationships tend to carry a mentor-student dynamic in the early phases. This is beautiful when both partners embrace it — but becomes toxic if either person resents the role.",
      "The elder partner's five-element balance is often more settled and complete, which can feel either reassuring or limiting to the younger partner depending on their own elemental needs.",
      "Societally, age-gap relationships face external pressure. Your chart's Metal element strength determines how much external opinion actually affects your internal connection.",
    ],
    lockedLabel: 'Get the full generational compatibility analysis',
    lockedLines: [
      "Full generational cycle analysis — your specific cycle relationship and what it means",
      "Whether the age gap creates complementary or competing energy in your specific pairing",
      "The most likely challenge this pairing faces in years 3–5 — and how to prepare",
      "The age gap's long-term impact on the relationship power balance",
      "How this relationship evolves as both charts mature — 10-year forecast",
      "Whether the gap is a strength or weakness in this specific elemental combination",
    ],
    relatedSlugs: ['relationship-dive', 'new-couple', 'marriage-timing'],
    tag: 'Generational energy',
  },
  'office-romance': {
    icon: '🏢', title: 'Office Romance Reading', subtitle: 'Is the risk worth it?',
    credits: 10, type: 'couple',
    desc: "Feelings for a coworker are some of the most complicated — the stakes are high and the environment is shared. Your charts reveal whether the energy truly supports this, or whether it's a risky elemental trap.",
    whatYouLearn: ['Whether the elemental attraction is genuine or situational', 'The professional risk level based on both charts', 'Whether this naturally progresses beyond the workplace', 'How to navigate the situation without damaging your career energy'],
    sampleHeadline: 'Workplace Romance Energy — Free Overview',
    freeOverview: "Workplace environments amplify elemental attraction in ways that can be misleading — shared goals, regular contact, and structured roles create artificial intimacy that mimics real connection. Your chart can distinguish between genuine romantic energy and situational chemistry. This is one of the most important distinctions you can make before acting.",
    freeInsights: [
      "Shared work environments activate your Fire element — which governs both passion and performance. This is why workplace attraction feels so intense: it's layering professional activation on top of personal chemistry.",
      "The question to ask yourself: would you feel the same way about this person if you met them outside of work? Your chart's Relationship Star knows the honest answer.",
      "If the attraction is genuine rather than situational, your chart shows it as a clear Relationship Star activation — not just social harmony energy, which can mimic attraction in group settings.",
      "Your career element and your relationship element are separate systems in Four Pillars. The key risk of an office romance is that damage to one can flow into the other — your chart shows how connected these systems are for you specifically.",
      "Timing matters significantly in workplace relationships. The same connection that causes career friction in one cycle may be entirely natural in a different cycle when your social and professional energies are aligned.",
      "Before acting, consider: your chart may be in a high-social energy period that makes everyone more appealing right now. This can create false signals about specific individuals.",
    ],
    lockedLabel: 'Get the full risk and outcome analysis',
    lockedLines: [
      "Whether the attraction is genuine romantic energy or situational — definitive chart-based answer",
      "Professional risk level: low / moderate / high — based on both charts and current cycles",
      "Whether this develops into a real relationship outside the workplace",
      "The optimal timing to reveal feelings — or whether to wait",
      "What happens if it doesn't work: chart-based forecast for professional aftermath",
      "The one factor that determines whether this is worth pursuing at all",
    ],
    relatedSlugs: ['crush', 'new-couple', 'dating'],
    tag: 'Risk & reward',
  },
  'love-language': {
    icon: '🗣️', title: 'Love Language by Saju', subtitle: "How your partner really needs to be loved",
    credits: 12, type: 'couple',
    desc: "Stop guessing how to love your partner. Each of the Five Elements has a distinct emotional style — this reading decodes how your partner gives and receives love, and how to speak their elemental language.",
    whatYouLearn: ["Your partner's primary elemental love style", 'How they express affection vs. how they need to receive it', 'Your own love language element and how it interacts with theirs', 'The exact communication style that makes them feel most secure'],
    sampleHeadline: 'Elemental Love Language — Free Overview',
    freeOverview: "The Five Elements each carry a completely different emotional blueprint — not just how people feel, but how they express care, how they need to receive it, and what makes them feel loved vs. neglected. Understanding your partner's elemental love style is one of the highest-leverage things you can do for a relationship because it removes misinterpretation at the source.",
    freeInsights: [
      "Wood types express love through action — they show up, help, fix things, and plan for the future together. They feel loved when their effort is acknowledged, not just their presence.",
      "Fire types love loudly — affirmation, enthusiasm, physical warmth, and spontaneous gestures. They feel loved when you match their energy and show excitement about them.",
      "Earth types love through nurturing and consistency — feeding you, checking in, remembering small details. They feel loved through stability and knowing you'll always come back.",
      "Metal types love through quality time and high standards — they take relationships seriously and show care through precision and reliability. They feel loved when you respect their boundaries and don't waste their time.",
      "Water types love through depth and presence — they listen fully, remember everything, and feel things intensely. They feel loved when you create space for them to be their full, complicated self.",
      "The biggest love language mismatch: when a Fire person loves a Water person. Fire expresses through excitement and volume; Water needs quiet depth. Both are loving — but neither feels received without translation.",
      "Your own elemental love style affects what you assume your partner needs. We tend to love others the way we want to be loved — which is precisely where the mismatch lives.",
    ],
    lockedLabel: 'Get your partner\'s specific elemental love profile',
    lockedLines: [
      "Your partner's specific Day Master element and complete love language profile",
      "The #1 thing your partner needs that you're likely not giving — identified from their chart",
      "How your love languages interact — compatibility score and specific friction point",
      "Exact phrases and gestures that resonate deeply with their element",
      "The love language gap most likely to cause silent distance in your relationship",
      "How their love language shifts across seasons — what they need more of in winter vs. summer",
    ],
    relatedSlugs: ['relationship-dive', 'conflict', 'new-couple'],
    tag: 'Partner analysis',
  },
  'soulmate': {
    icon: '🌟', title: 'Soulmate Profile', subtitle: 'Who is coming for you?',
    credits: 15, type: 'single',
    desc: "Your Four Pillars chart carries a detailed imprint of the person most aligned with your destiny energy. This reading builds a profile of your destined person — not a fantasy, but an elemental blueprint.",
    whatYouLearn: ['The elemental type of your most compatible partner', 'Approximate age range and likely industry or vocation', 'Their dominant personality traits and emotional style', 'The life season when they enter your life'],
    sampleHeadline: 'Soulmate Energy Blueprint — Free Overview',
    freeOverview: "In Four Pillars, the Relationship Star (夫妻星) embedded in your birth chart carries a specific elemental signature — a blueprint of the person your energy most naturally aligns with. This isn't about perfection. It's about elemental resonance: the person whose chart creates a generative or deeply complementary dynamic with yours at a structural level.",
    freeInsights: [
      "Your Relationship Star's element is the primary indicator of your most compatible partner's energy type. This element shows up consistently in people you feel genuinely drawn to — not just attracted to, but deeply at ease with.",
      "Your Day Master element influences who you attract. Strong, grounded elements attract people who seek stability; dynamic, active elements attract people who seek inspiration. You are already sending a signal.",
      "The person most aligned with your chart typically appears in environments related to your dominant element — Wood types meet through growth-oriented settings (education, nature, business development); Fire types through social, creative, or public environments.",
      "Your chart's current 10-year cycle (大運) heavily influences when your Soulmate energy is most active. Some decades carry strong incoming relationship energy; others are oriented toward self-development first.",
      "Most people meet their most significant partner within a window of heightened Relationship Star activity — typically 2–4 years within a specific 10-year cycle. Your chart shows where that window is.",
      "The soulmate concept in Four Pillars is practical rather than mystical: it's the person whose elemental needs you can meet naturally, and who can meet yours, without either person having to fundamentally change.",
      "One important insight: your chart may show more than one high-compatibility window in a lifetime. The first may not be the deepest — depth often increases with your own elemental maturity.",
    ],
    lockedLabel: 'Unlock your complete soulmate profile',
    lockedLines: [
      "Your Relationship Star's exact element and what it reveals about your ideal partner's personality type",
      "Approximate age range of your most compatible partner — based on generational cycle alignment",
      "Their likely industry, lifestyle, or life orientation",
      "The specific year and season window when they are most likely to enter your life",
      "How you are most likely to meet — elemental environment and circumstances",
      "Whether someone currently in your life matches this profile — chart comparison available",
    ],
    relatedSlugs: ['when-love', 'marriage-timing', 'past-life-love'],
    tag: 'Most requested',
  },
  'when-love': {
    icon: '📅', title: 'When Will Love Arrive?', subtitle: 'Your romantic timing window',
    credits: 12, type: 'single',
    desc: "If you're single and wondering when love is coming — your chart has the answer. The Relationship Star moves through your chart on a predictable cycle. This reading finds your peak window.",
    whatYouLearn: ['Your current position in the romantic timing cycle', 'The year(s) with highest incoming love energy', 'Whether your chart is currently in a receptive or closed phase', 'What you can do now to align yourself with incoming energy'],
    sampleHeadline: 'Romantic Timing — Free Overview',
    freeOverview: "Romantic timing in Four Pillars is governed by the Relationship Star's position in your annual and 10-year cycles. When it's active, connections form naturally and frequently — you barely have to try. When it's dormant, even strong effort produces limited results. Knowing which phase you're in is the single most useful piece of timing information you can have.",
    freeInsights: [
      "The Relationship Star activates on a cycle that intersects your annual energy (年運) and your 10-year cycle (大運). Right now, one of these is active for you — and that determines how much natural support your love life has.",
      "When the Relationship Star is dormant, it doesn't mean love isn't possible — it means the energy isn't flowing toward you automatically. More intentional effort is needed, and results come more slowly.",
      "When the Relationship Star is active, almost everything you do generates connection. This is why some periods in life feel magnetically social while others feel isolated — it's not you, it's the cycle.",
      "Your current year's energy affects the type of person you're likely to attract — not just whether you attract anyone. Some years bring compatible energy; others bring intensity without longevity.",
      "The most common mistake: meeting someone in a high-excitement year and committing quickly — only to find the energy fades when the cycle shifts. Your chart shows whether what you're feeling has a long arc.",
      "Preparation matters even when the timing isn't perfect yet. The elemental work you do on yourself now — clearing old energy, strengthening your dominant element — directly affects the quality of connection that arrives when the window opens.",
      "For most people, there are 2–3 major romantic windows in a lifetime where the energy is fully supported at every level. Knowing which one is coming next is both practical and deeply reassuring.",
    ],
    lockedLabel: 'Get your specific timing window',
    lockedLines: [
      "Whether your Relationship Star is currently active, approaching peak, or in a dormant phase",
      "The specific year(s) with your strongest incoming love energy — named years, not ranges",
      "The season within that year where the energy peaks — and why",
      "Whether a significant new connection arrives this year or in the next cycle",
      "What your chart is signaling about the type of person arriving and what they'll need from you",
      "What to do right now to maximize the window — element-specific preparation",
    ],
    relatedSlugs: ['soulmate', 'marriage-timing', 'breakup'],
    tag: 'Timing prediction',
  },
  'marriage-timing': {
    icon: '💍', title: 'Marriage Timing', subtitle: 'Your most auspicious years to marry',
    credits: 15, type: 'single',
    desc: "Not all years carry equal marriage energy. Your Four Pillars chart has clear windows where marriage is cosmically supported — and windows where it creates unnecessary friction.",
    whatYouLearn: ['Your top 2–3 most auspicious years for marriage', 'The elemental reasons behind each window', 'Years to avoid for marriage and why', 'Whether you\'re currently in a marriage energy peak'],
    sampleHeadline: 'Marriage Timing — Free Overview',
    freeOverview: "In Four Pillars, marriage timing is determined by the intersection of your Relationship Star activation, your 10-year cycle phase, and the annual energy of the proposed year. Getting this alignment right doesn't guarantee a perfect marriage — but it significantly reduces the elemental friction that causes early-stage marital stress.",
    freeInsights: [
      "Your 10-year cycle (大運) creates the background condition for marriage. Some 10-year phases actively support union and family formation; others prioritize career, travel, or personal transformation. The decade matters as much as the year.",
      "The most challenging years to marry are those where your chart carries high change energy — moving, career shifts, or major transitions. These years create instability that affects the foundation of a new marriage.",
      "Auspicious marriage years carry Earth element energy in your annual cycle — stability, groundedness, and the energy of building lasting structures. When Earth is weak, structures built that year tend to shift.",
      "Your Day Master element has a specific natural marriage age range where union energy is most supported — not a deadline, but a sweet spot where your chart is most receptive to deep commitment.",
      "Interestingly, some of the best marriage years are not the most romantic-feeling years. A stable, low-drama year with good Earth energy is often a better foundation than an intensely passionate year with high change energy.",
      "If you are already with someone, your partner's chart also matters — the year needs to carry auspicious energy in both charts for a truly supported union. One strong chart and one weak chart still creates friction.",
      "The concept of 沖 (clashing) years is important: certain years carry a direct elemental clash with your Day Master — and marrying in these years is consistently associated with greater early marital difficulty.",
    ],
    lockedLabel: 'Get your specific auspicious marriage years',
    lockedLines: [
      "Your top 3 most auspicious marriage years — specific years named with elemental reasoning",
      "Years to avoid for marriage and the specific elemental reason for each",
      "Your natural marriage energy age range — where your chart is most receptive to lasting union",
      "Whether your current or upcoming year carries marriage support",
      "If you're with someone: whether their chart aligns with yours for marriage in the same window",
      "The one elemental condition that, if present in the year, makes marriage significantly more supported",
    ],
    relatedSlugs: ['wedding-date', 'soulmate', 'when-love'],
    tag: 'Auspicious years',
  },
  'wedding-date': {
    icon: '🌸', title: 'Wedding Date Selection', subtitle: 'Choose the perfect day for your forever',
    credits: 25, type: 'couple',
    desc: "Your wedding date carries elemental energy that influences the entire marriage. This reading compares both charts to identify dates where the energy is harmonious, stable, and auspicious for lasting union.",
    whatYouLearn: ['The best months within your chosen year for the wedding', 'Specific elemental considerations for date selection', 'Dates and seasons to avoid based on both charts', 'How the wedding date interacts with your marriage energy windows'],
    sampleHeadline: 'Wedding Date Principles — Free Overview',
    freeOverview: "The traditional practice of selecting auspicious dates (擇日) is one of the oldest applications of Four Pillars analysis. The day you marry carries a set of stems and branches that interact with both partners' charts — and certain combinations create lasting harmony while others introduce friction into the foundation of the marriage itself.",
    freeInsights: [
      "Auspicious wedding dates share a common pattern: the day's Heavenly Stem element either generates or neutrally complements both partners' Day Masters. Days where the Stem clashes with either chart create an energetically unstable foundation.",
      "The ideal wedding day carries strong Earth energy in its branches — Earth governs stability, endurance, and the energy of sustained structures. A Metal day (precision, commitment) is the second most favorable.",
      "Seasons matter: spring and early autumn are the most universally supported seasons for weddings in Four Pillars — spring for new beginnings, early autumn for harvest and stability. Midsummer can carry excessive Fire energy that overstimulates rather than grounds.",
      "Days that carry the same branch as either partner's birth day (日柱相沖) should be avoided — this creates a direct clash between the wedding's energy and one partner's core chart, which is associated with friction in the first year.",
      "Lunar calendar considerations intersect with solar calendar analysis — the most supported dates are those where both systems align favorably rather than just one.",
      "The time of the ceremony itself carries a branch that affects the first year of marriage. Morning ceremonies during Dragon or Snake hours (7am–11am) carry particularly auspicious beginnings energy.",
      "Beyond the charts, the practical principle applies: a day that works logistically and feels right to both of you carries its own energetic alignment. The chart is a guide, not a constraint.",
    ],
    lockedLabel: 'Get your personalized auspicious date report',
    lockedLines: [
      "Your top 3 recommended months for the wedding — with elemental reasoning for each",
      "Specific lucky days within each month based on both charts combined",
      "Days and months to absolutely avoid — identified elemental clashes",
      "The optimal time of day for the ceremony based on your combined charts",
      "A full printable auspicious date report — shareable with family",
      "Alternative dates if your preferred window isn't available",
    ],
    relatedSlugs: ['marriage-timing', 'full-compat', 'relationship-dive'],
    tag: 'Both charts analyzed',
  },
  'twin-flame': {
    icon: '🔥', title: 'Twin Flame Reading', subtitle: 'Soul-level connection or karmic trap?',
    credits: 20, type: 'couple',
    desc: "The most intense connections in life are often the most complicated. This reading goes beyond compatibility to examine the soul-level purpose of your most profound relationship.",
    whatYouLearn: ['Whether your connection is a twin flame, karmic, or soulmate type', 'The soul-level purpose this relationship serves', 'Why this connection feels so different from others', 'Whether this person is meant to stay or is a catalyst for growth'],
    sampleHeadline: 'Soul Connection Type — Free Overview',
    freeOverview: "Not all profound connections are meant to last — and not all lasting connections feel profound in the same way. Four Pillars distinguishes between different types of deep connections based on the elemental relationship between charts. Understanding which type you have changes how you approach, accept, and ultimately navigate the relationship.",
    freeInsights: [
      "A twin flame dynamic in Four Pillars shows as a mirror-image elemental structure — your charts reflect each other in ways that create both profound recognition and equally profound friction. You see yourself in them, which is both the gift and the difficulty.",
      "A karmic connection shows as an elemental debt pattern — one chart carries energy the other needs, but the exchange isn't balanced. These connections feel fated and often involve repeating patterns until the lesson is learned.",
      "A soulmate dynamic shows as genuine elemental complementarity — one chart's weakness is the other's strength, creating a natural partnership energy. These feel comfortable, not necessarily intense.",
      "The intensity of a connection is not a reliable indicator of its health or longevity. Some of the most intense connections (controlling element dynamics) are designed to transform, not sustain.",
      "What distinguishes a twin flame from a karmic connection in chart analysis: twin flames share a fundamental elemental resonance that feels like home. Karmic connections feel like unfinished business — because they are.",
      "The chart can also show whether the connection is in a completion phase (the karma is resolving) or an escalation phase (the lesson is still active). This determines whether continuing or ending is the higher path.",
      "Many people are in karmic connections they've mistaken for twin flames because of the intensity. The chart doesn't judge — it simply shows the structural truth of what you're in.",
    ],
    lockedLabel: 'Get your specific connection type and guidance',
    lockedLines: [
      "Definitive connection type for your specific charts: twin flame / karmic / soulmate / companion — with full elemental reasoning",
      "The soul-level lesson this relationship is teaching you — identified from your chart pattern",
      "Whether the connection is designed to last or to transform you and complete",
      "The peak period of this connection's intensity — and what comes after",
      "What resolution looks like for this specific connection type — and when it arrives",
      "Whether staying or leaving is more aligned with both charts' growth trajectories",
    ],
    relatedSlugs: ['past-life-love', 'soulmate', 'relationship-dive'],
    tag: 'Soul connection',
  },
  'past-life-love': {
    icon: '🌀', title: 'Past Life Love Reading', subtitle: 'Were you connected before this lifetime?',
    credits: 15, type: 'couple',
    desc: "Some connections feel impossibly familiar the first time you meet. Your Four Pillars chart carries residual energy patterns from past cycles. This reading explores whether a current connection has roots beyond this lifetime.",
    whatYouLearn: ['Whether your chart shows karmic love debt or credit with this person', 'The nature of your past connection', 'How past-life energy influences your current dynamic', 'Whether the karma is complete or still unfolding'],
    sampleHeadline: 'Karmic Love Pattern — Free Overview',
    freeOverview: "Four Pillars doesn't use the language of 'past lives' directly — but the system does recognize that certain elemental patterns in a chart carry what the classics call 桃花業 (peach blossom karma): a deeply encoded romantic pattern that influences who you're drawn to and why. When two people share this pattern, the recognition is immediate and often unexplainable.",
    freeInsights: [
      "When you meet someone and feel like you already know them — that sense of immediate depth and familiarity — it often reflects a mirroring of elemental patterns between your charts rather than chance.",
      "Past-life connections in Four Pillars appear as recurring Peach Blossom (桃花) interactions across both charts, often with an unusual number of complementary stems and branches that defy statistical probability.",
      "Karmic love can carry either a debt (業債) or a credit (業緣). Debt connections feel urgent, complicated, and slightly painful — you need each other even when it's difficult. Credit connections feel like coming home.",
      "One of the clearest signs of a karmic connection: the relationship activates parts of your chart — old wounds, suppressed strengths, deep character — that no other relationship has touched in the same way.",
      "Karmic connections don't always mean romantic partnership is the right outcome. Sometimes the karma is to see each other clearly, release an old pattern, and part in peace. The depth of feeling doesn't determine the form.",
      "Your chart's Peach Blossom star position reveals how karmic love tends to appear in your life — through what circumstances and what type of initial encounter. This is consistent across lifetimes.",
      "Once karmic energy completes its cycle, both people often experience a simultaneous emotional settling — less urgency, more peace, and a clarity about whether to continue or part. This is the chart resolving.",
    ],
    lockedLabel: 'Get your specific karmic connection analysis',
    lockedLines: [
      "Whether past-life karma is confirmed between your two charts — elemental evidence",
      "The nature of the past connection: lover / rival / protector / teacher / student",
      "How the karmic pattern is playing out in your current dynamic — specific to your charts",
      "Whether the karma is in a completion phase or still actively unfolding",
      "What action resolves the karma and allows both charts to move forward freely",
      "Whether this connection is destined to repeat or complete in this lifetime",
    ],
    relatedSlugs: ['twin-flame', 'soulmate', 'closure'],
    tag: 'Karmic connection',
  },
  'family-approval': {
    icon: '👨‍👩‍👧', title: 'Family Approval Energy', subtitle: "How will your family receive your partner?",
    credits: 12, type: 'couple',
    desc: "Family dynamics can make or break a relationship. This reading analyzes the elemental energy between your partner's chart and your family's collective energy.",
    whatYouLearn: ["Your partner's elemental response to family pressure", 'Whether any chart clashes exist between partner and family', 'The family member most likely to create friction', 'How to introduce your partner most harmonically'],
    sampleHeadline: 'Family Dynamics — Free Overview',
    freeOverview: "Family approval dynamics are driven by elemental compatibility between your partner's chart and the dominant energy of your family system. Some partners slot into a family's elemental pattern naturally; others carry energy that disrupts the existing dynamic — not because they're wrong for you, but because the elemental frequencies don't match the family's existing pattern.",
    freeInsights: [
      "Your family's dominant elemental energy (often carried by the most influential parent or elder) acts as the primary filter through which your partner will be assessed — consciously or not.",
      "Partners who carry the same element as a dominant family member often face an interesting challenge: familiarity breeds both comfort and competition. The family may like them but subtly struggle with the dynamic.",
      "Partners who carry the generating element of the family's dominant energy (the element that feeds theirs) tend to be welcomed most naturally — they feel supportive and non-threatening to the family structure.",
      "Partners who carry the controlling element (the element that governs the family's dominant energy) often face more resistance — not because they're bad people, but because their energy creates an unconscious power tension.",
      "Your own chart carries a bridge element between your partner and your family — how you hold that bridge determines how smoothly or difficultly the integration goes.",
      "The first impression is heavily influenced by the season and time of introduction. Introducing a partner during a season aligned with their own element produces their most natural, comfortable expression.",
      "Family approval concerns often reflect the family's own elemental insecurities rather than genuine issues with your partner. Understanding this helps you not take the friction personally.",
    ],
    lockedLabel: 'Get the full family reception forecast',
    lockedLines: [
      "Full family reception energy forecast — overall alignment between your partner and your family system",
      "The specific family member most likely to create friction — and their elemental reason",
      "Whether family opposition has real staying power or fades naturally over time",
      "The optimal time, season, and setting to introduce your partner for the best reception",
      "How your partner should present themselves to resonate with your family's elemental energy",
      "Whether family friction is a genuine incompatibility signal or an elemental adjustment period",
    ],
    relatedSlugs: ['marriage-timing', 'relationship-dive', 'wedding-date'],
    tag: 'Family dynamics',
  },
  'breakup': {
    icon: '💔', title: 'Breakup Analysis', subtitle: 'Why did it really end?',
    credits: 10, type: 'couple',
    desc: "Breakups rarely happen for the reasons we tell ourselves. Your Four Pillars chart carries the elemental pattern behind your relationship endings — seeing it clearly is the first step to breaking the cycle.",
    whatYouLearn: ['The core elemental incompatibility that led to the ending', 'Whether timing played a role (wrong cycle, not wrong person)', 'Your recurring relationship pattern and its elemental root cause', 'What this relationship was meant to teach your chart'],
    sampleHeadline: 'Breakup Energy — Free Overview',
    freeOverview: "The end of a relationship in Four Pillars is rarely random. Breakups tend to cluster around specific cycle shifts — particularly when a major elemental change enters the 10-year cycle and disrupts the existing dynamic. Understanding whether your breakup was cycle-driven or fundamentally incompatibility-driven changes everything about how you process it.",
    freeInsights: [
      "The most common cause of breakups in Four Pillars is a 10-year cycle shift that changes one partner's priorities, energy level, or elemental needs — while the other partner remains unchanged. The relationship that worked in one decade doesn't work in the next.",
      "Cycle-driven breakups are often not about the person — they're about elemental incompatibility with the life phase each person is entering. These are the hardest to process because there's no one to blame.",
      "Fundamentally incompatible breakups carry a different signature: the same argument recurring for years, a persistent sense that something important is unmet, or one partner consistently depleting the other's elemental energy.",
      "Your recurring relationship pattern is visible in your chart's Peach Blossom position and your Day Master's relationship with the Relationship Star. Most people attract the same elemental type repeatedly until the lesson resolves.",
      "The question 'wrong person or wrong timing?' has a real answer in your chart. The two produce different elemental signatures — and understanding which one applies changes how you move forward.",
      "Every significant relationship, including the ones that end, serves a specific elemental purpose in your chart's development. The one that hurt the most usually activated the shadow element you most needed to integrate.",
      "Processing a breakup elemental-style means identifying what energy the relationship gave you that you need to generate for yourself now — because that dependency is part of what created the relationship pattern.",
    ],
    lockedLabel: 'Get the full breakup and pattern analysis',
    lockedLines: [
      "The #1 elemental incompatibility that drove the breakdown — specifically identified",
      "Whether this was a timing issue or a fundamental mismatch — clear chart-based answer",
      "Your recurring relationship wound and where it originates in your chart",
      "Whether reconnection is energetically possible or recommended — honest assessment",
      "What your chart needs you to work on before your next relationship",
      "The elemental pattern you're most likely to repeat — and how to interrupt it",
    ],
    relatedSlugs: ['ex-return', 'move-on', 'closure'],
    tag: 'Root cause reading',
  },
  'ex-return': {
    icon: '🔄', title: 'Will They Come Back?', subtitle: 'Honest energy assessment of reconciliation',
    credits: 12, type: 'couple',
    desc: "This is the most honest reading we offer. No false hope, no empty reassurance — just an elemental analysis of whether reconciliation energy is genuinely present in both charts.",
    whatYouLearn: ['Whether reconciliation energy is present in the combined charts', 'The timing window when they are most likely to reach out', 'What would need to change energetically for reunion to work', 'Whether rekindling is genuinely recommended for your chart'],
    sampleHeadline: 'Reconciliation Energy — Free Overview',
    freeOverview: "Reconciliation has a specific elemental signature — and it's either present in the charts or it isn't. The most important thing this reading does is separate genuine reconnection energy from the nostalgic pull your own chart creates when you're in a low or reflective cycle. Both feel similar from the inside; they look very different in the chart.",
    freeInsights: [
      "When you're in a low-energy or reflective period in your own cycle, your chart pulls toward the familiar — including past relationships. This creates a strong feeling of missing someone that may or may not reflect genuine reconnection energy.",
      "Genuine reconciliation energy shows as a re-activation of the Relationship Star in both charts simultaneously — not just in one. One-sided re-activation produces longing without movement.",
      "The most common reconciliation pattern: both people move through their respective change cycles independently, and then re-enter a phase where their original elemental compatibility reasserts itself. This happens at predictable cycle junctions.",
      "If the original breakup was cycle-driven rather than fundamentally incompatible, reconciliation becomes more likely when both people's cycles reach a new point of alignment. This can take months or years.",
      "If the original breakup was fundamentally incompatible, the same incompatibility exists regardless of how much time passes. The charts don't change — and revisiting creates the same friction at a higher emotional cost.",
      "One of the clearest signals that reconciliation is genuinely possible: both people have done independent elemental work (growth, healing, change) since the separation. When both charts have shifted, the dynamic that returns is different from what broke.",
      "The hardest truth in this reading: sometimes the most loving thing your chart can tell you is that the energy has genuinely completed — and the best thing for both of you is to let it be complete.",
    ],
    lockedLabel: 'Get the specific reconciliation forecast',
    lockedLines: [
      "Reconciliation probability: high / moderate / low / not recommended — with specific elemental reasoning",
      "The specific month window when contact from their side is most energetically likely",
      "What their chart currently holds about the relationship — are they thinking about it?",
      "Whether reconciliation serves both charts — or creates a one-sided benefit",
      "The one thing that would need to change for it to work differently this time",
      "Whether the energy supports a clean reconnection or repeating the same cycle",
    ],
    relatedSlugs: ['breakup', 'closure', 'move-on'],
    tag: 'Reconciliation timing',
  },
  'move-on': {
    icon: '🌅', title: 'Moving On & New Love', subtitle: 'When does your next chapter begin?',
    credits: 10, type: 'single',
    desc: "Healing has its own timing — and so does new love arriving. This reading maps your emotional recovery cycle and tells you when your chart is genuinely ready to open to someone new.",
    whatYouLearn: ['Your current position in the post-breakup healing cycle', 'When your chart energy fully clears the previous connection', 'The window when new romantic energy starts entering your life', 'What you need to do now to support your healing process'],
    sampleHeadline: 'Healing & New Love Timeline — Free Overview',
    freeOverview: "Post-relationship healing in Four Pillars follows an elemental cycle that's as predictable as the seasons. The chart shows not just when you'll feel better emotionally, but when the old energy genuinely clears from your system — which is different, and matters more for what comes next.",
    freeInsights: [
      "Emotional healing and elemental clearing are two different things. You can feel better before the old relationship energy has truly released from your chart — and entering a new relationship in that in-between period often produces connections that carry the unresolved energy of the previous one.",
      "Your element's healing timeline: Wood types heal through growth and new projects (6–12 months); Fire types heal through social connection and expression (3–6 months); Earth types heal through routine and stability (6–18 months); Metal types heal through solitude and standards (3–9 months); Water types heal through depth and time (9–18 months).",
      "The clearest sign that healing is complete in your chart: you can think about the previous relationship with clarity rather than longing, regret, or anger. Emotional neutrality is the elemental signal.",
      "New romantic energy typically enters the chart within 1–3 cycles after the old energy clears — which is why 'I'm not looking' is often when the most significant connections arrive. The chart is receptive precisely when you're not projecting need.",
      "Your current cycle phase heavily influences the type of connection that arrives next. Some phases attract intensity; others attract steadiness. The chart tells you which is coming — so you can recognize it rather than dismiss it because it feels different from what you expected.",
      "One practical insight: the activities and environments that strengthen your dominant element during the healing period directly accelerate the clearing. This isn't metaphor — it's elemental recalibration.",
      "The timing of 'ready' in your chart is specific, not general. Most people underestimate how much the cycle timing matters — jumping into something too early is one of the most common sources of repeating patterns.",
    ],
    lockedLabel: 'Get your specific healing and new love timeline',
    lockedLines: [
      "Your exact healing timeline — how many months until the elemental clearing is complete",
      "The specific month when new romantic energy first activates in your chart",
      "The type of person most likely to arrive in your next connection window",
      "Whether a significant new person arrives this year or in the next annual cycle",
      "What your chart needs from you to accelerate the clearing process",
      "The one thing you're still carrying from the previous relationship — and how to release it",
    ],
    relatedSlugs: ['closure', 'breakup', 'when-love'],
    tag: 'Healing timeline',
  },
  'closure': {
    icon: '🕊️', title: 'Closure Reading', subtitle: 'Release what is keeping you tied',
    credits: 8, type: 'single',
    desc: "Emotional closure is an elemental process. Some charts hold on; others let go easily. This reading identifies the specific emotional pattern keeping you attached — and what will help you release it.",
    whatYouLearn: ['Why your element struggles or not with letting go', 'What emotional pattern is keeping you tied to this person', 'The specific shift that signals true closure for your chart', 'Practical elemental-based practices to support healing'],
    sampleHeadline: 'Closure & Release Energy — Free Overview',
    freeOverview: "Closure is one of the most misunderstood concepts in healing — because it's commonly treated as a single event rather than an elemental process. Your chart reveals exactly what your specific element needs to experience genuine release, and why the usual advice often doesn't work for your type.",
    freeInsights: [
      "Each of the Five Elements has a completely different relationship with endings. Wood lets go by growing forward — new projects and directions naturally pull attention away from the past. Fire lets go by expressing fully — you need to say everything out loud, once, to someone safe.",
      "Earth holds on longest of all five elements — not from weakness, but because Earth energy is built for stability and sustaining. The Earth type's path to closure involves accepting that stability can be rebuilt in a different form.",
      "Metal lets go through boundaries and clarity — once a Metal type has made a clear decision, they can release with precision. The challenge is giving themselves permission to decide that something is truly over.",
      "Water types process through depth and time — they need to fully feel the loss before it clears, which means the healing looks slower from the outside but is often more complete. Trying to rush a Water type produces recycling, not release.",
      "The most common closure block: continuing to analyze the relationship in search of a different explanation. Your element tells you which type of analysis loop you're most prone to — and what breaks it.",
      "True closure in Four Pillars looks like the relationship energy settling into a neutral place in the chart — not forgotten, not avoided, simply no longer charged. This is a real, measurable shift, not just a feeling.",
      "One of the most powerful tools for closure: understanding what elemental need this person met that you weren't providing for yourself. When you take back that energy source, the attachment dissolves naturally.",
    ],
    lockedLabel: 'Get your personalized closure practice',
    lockedLines: [
      "Your specific element's attachment pattern — and the exact emotional loop you're in",
      "The emotional belief from your chart that is keeping you tied to this person",
      "The exact internal shift that signals genuine closure for your specific element",
      "A personalized elemental practice to accelerate release — tailored to your Day Master",
      "When the emotional weight of this connection reaches its natural end in your cycle",
      "One specific action that produces the most movement for your elemental type",
    ],
    relatedSlugs: ['move-on', 'breakup', 'ex-return'],
    tag: 'Emotional release',
  },
  'full-compat': {
    icon: '📋', title: 'Full Compatibility Report', subtitle: '40-page deep-dive PDF',
    credits: 25, type: 'couple',
    desc: "The most comprehensive couples analysis we offer — every elemental interaction between your two charts in a detailed PDF report.",
    whatYouLearn: ['Complete five-element interaction map', 'Compatibility scores across love, communication, finances, and values', 'Monthly harmony and tension forecast for 12 months', 'Long-term sustainability rating and growth potential', 'Personalized communication guide for your dynamic'],
    sampleHeadline: 'Full Compatibility — Free Overview',
    freeOverview: "A full compatibility report goes far beyond a simple match score. It maps every elemental interaction between your two charts — what each person brings, what each person needs, where natural support flows, and where friction concentrates. Understanding your relationship as an elemental system rather than a feeling is what allows couples to navigate it with intention.",
    freeInsights: [
      "The five-element compatibility system examines 25 possible elemental pairings (5 elements × 5 elements across Day Masters). Each pairing has a specific dynamic — generative, controlling, parallel, or neutral — with distinct relationship characteristics.",
      "Generative pairings (相生) are the most naturally supportive — one partner's element feeds and strengthens the other's. This produces relationships that feel consistently encouraging rather than depleting.",
      "Controlling pairings (相剋) create the most intense chemistry — the controlling element naturally governs the other, creating a deep but complicated dynamic. These relationships are rarely neutral: they're either deeply transformative or ultimately exhausting.",
      "Beyond Day Master compatibility, the full report examines all four pillars: Year, Month, Day, and Hour. Two people can have compatible Day Masters but significant friction in their Month or Year pillars — which affects specific areas of life like family, career compatibility, and long-term vision alignment.",
      "The 10-year cycle comparison reveals when your two charts are in aligned phases vs. diverging phases — this is what determines whether any given year feels like you're growing together or separately.",
      "One of the most valuable parts of a full report: the communication compatibility analysis. Two people can be elementally compatible in love but fundamentally different in how they process and express — and this gap is one of the most common sources of long-term relationship breakdown.",
      "The long-term forecast section (years 1, 3, 5, 10) is what separates a full report from a standard compatibility check. It shows not just whether you match, but how the relationship's elemental dynamic evolves as both charts mature.",
    ],
    lockedLabel: 'Get your complete 40-page compatibility report',
    lockedLines: [
      "Complete 40-page PDF delivered instantly — printable and shareable",
      "Compatibility scores across 6 dimensions: love, communication, finances, values, growth, and long-term vision",
      "Full 12-month harmony and conflict calendar with specific months highlighted",
      "Personalized communication guide calibrated to your exact elemental dynamic",
      "Long-term forecast: years 1, 3, 5, and 10 in the relationship",
      "Recommended elemental practices for strengthening your specific pairing",
    ],
    relatedSlugs: ['relationship-dive', 'conflict', 'love-language'],
    tag: '40-page PDF',
  },
  'loyalty': {
    icon: '🛡️', title: 'Loyalty & Trust Reading', subtitle: 'What does their chart say about commitment?',
    credits: 15, type: 'couple',
    desc: "Commitment shows up in the chart. Some elements carry naturally loyal, stable energy; others carry wandering, freedom-seeking energy. This reading gives an honest elemental assessment.",
    whatYouLearn: ["Your partner's elemental commitment style", 'Whether their chart shows stable or variable relationship energy', 'The conditions under which their loyalty strengthens or weakens', "Your own chart's commitment pattern and how it interacts with theirs"],
    sampleHeadline: 'Commitment & Loyalty Energy — Free Overview',
    freeOverview: "Loyalty in Four Pillars is not a moral quality — it's an elemental one. Certain Day Master elements are structurally oriented toward depth, consistency, and long-term commitment. Others are oriented toward freedom, variety, and evolving connection. Neither is wrong — but mismatching expectations based on elemental differences is one of the most common sources of heartbreak.",
    freeInsights: [
      "Metal Day Masters carry the highest natural loyalty energy of all five elements. Metal's essence is precision, standards, and follow-through — once committed, the Metal type holds with extraordinary endurance. The challenge is that their commitment is conditional on respect being maintained.",
      "Earth Day Masters are loyal through consistency — they show up, day after day, in the same reliable way. Earth types are not dramatic about love; they demonstrate it through presence and dependability. This can be mistaken for lack of passion.",
      "Wood Day Masters are loyal when growing — as long as the relationship continues to support their growth and direction, they're deeply committed. If they feel stifled or stuck, their natural outward energy creates restlessness even within commitment.",
      "Fire Day Masters are intensely loyal in the moment and genuinely devoted — but their element naturally moves toward what's energized and alive. Fire types need their partner to keep bringing vitality into the connection, not just stability.",
      "Water Day Masters carry deep, enduring loyalty that operates below the surface. They may not express it loudly, but Water types form the most lasting bonds of any element — they simply need depth, not performance, from their partner.",
      "The most common loyalty concern comes not from genuinely disloyal people but from elemental differences in how commitment is expressed. A Metal type may seem cold; a Fire type may seem inconsistent — but both can be deeply loyal in their own elemental language.",
      "External stress tests loyalty by elemental type: Earth and Metal types tend to become more committed under pressure; Fire and Wood types may need space to process; Water types need reassurance that the connection is secure.",
    ],
    lockedLabel: 'Get your partner\'s specific loyalty and commitment profile',
    lockedLines: [
      "Your partner's specific Day Master element and complete commitment energy profile",
      "The conditions that make their loyalty energy waver — if any exist in their chart",
      "Whether their chart shows any indicators of wandering energy in the current cycle",
      "How your two charts' commitment styles interact — compatibility and tension points",
      "The one thing that most strengthens their devotion and dedication to you",
      "Whether the relationship's current cycle is strengthening or testing commitment",
    ],
    relatedSlugs: ['relationship-dive', 'love-language', 'full-compat'],
    tag: 'Commitment analysis',
  },
  'love-triangle': {
    icon: '🔺', title: 'Love Triangle Reading', subtitle: 'Two paths — which one is yours?',
    credits: 15, type: 'single',
    desc: "Being torn between two people is one of the most emotionally exhausting situations. This reading compares the elemental weight of both connections and helps you see which path your chart is aligned with.",
    whatYouLearn: ['The elemental nature of each connection in your chart', 'Which person carries more compatible energy with your chart', 'The long-term potential of each path', 'What staying in indecision is costing your energy'],
    sampleHeadline: 'Dual Path Energy — Free Overview',
    freeOverview: "Being torn between two people creates a specific elemental problem: your Relationship Star energy, which is meant to flow toward a single point of connection, becomes divided — which drains your personal fortune energy across the board. The longer the indecision continues, the more it affects not just your love life but your career, health, and general life momentum.",
    freeInsights: [
      "Your chart typically shows a primary Relationship Star (the person most aligned with your elemental destiny) and secondary attraction energy. The difficulty in a love triangle is that both activations feel real — because both are. But they're not equal.",
      "One connection in a triangle typically activates your growth element — it's exciting, challenging, and pulls you forward. The other activates your comfort element — it's safe, warm, and familiar. Your chart shows which one your current cycle actually needs.",
      "The growth connection often feels more exciting but less stable. The comfort connection often feels more secure but less stimulating. What you need changes depending on your current 10-year cycle phase.",
      "Your element has a specific decision-making style: Wood types decide by direction (which path aligns with where I'm growing?); Fire types decide by energy (which connection makes me feel most alive?); Earth types decide by stability (which person can I genuinely build with?); Metal types decide by standards (which relationship meets my actual requirements?); Water types decide by depth (which connection goes deepest?).",
      "Indecision in a triangle is almost always driven by fear rather than genuine ambiguity — fear of loss, fear of commitment, or fear of choosing wrong. Your chart reveals which fear is dominant for you.",
      "An important truth: the person you can't choose between is sometimes a signal that neither is the right choice — and both connections are keeping you from something or someone your chart is actually meant for.",
      "The cost of prolonged indecision is visible in your overall fortune energy — it creates what the classics call 桃花亂 (disordered peach blossom energy), which disperses the magnetism that would otherwise attract a clear, strong connection.",
    ],
    lockedLabel: 'Get the full two-path comparison and recommendation',
    lockedLines: [
      "Full elemental compatibility comparison for both connections — scored and explained",
      "Which connection has stronger long-term staying power based on both charts",
      "What each person represents elementally in your chart: growth vs. comfort vs. something else",
      "The real cost of continued indecision — visible in your current annual cycle",
      "A clear chart-based recommendation: which path is more aligned with your chart's trajectory",
      "What the right choice looks like from the inside — the elemental signal to trust",
    ],
    relatedSlugs: ['soulmate', 'relationship-dive', 'crush'],
    tag: 'Two-path comparison',
  },
  'friend-to-love': {
    icon: '🌱', title: 'Friendship to Romance', subtitle: 'Can friendship become something more?',
    credits: 8, type: 'couple',
    desc: "Some of the most lasting relationships begin as friendships — but not all friendships carry romantic energy. This reading checks whether the elemental chemistry supports a romantic transition.",
    whatYouLearn: ['Whether romantic elemental energy is present in both charts', 'What is holding the transition back', 'How the friendship dynamic would change if romance developed', 'The right timing for a natural transition'],
    sampleHeadline: 'Friendship to Romance — Free Overview',
    freeOverview: "Friendship and romance activate different elemental systems — which is why not all deep friendships can successfully transition into romantic partnerships, and why some that do lose the friendship quality in the process. Your chart shows exactly how these two types of connection energy interact in your specific situation.",
    freeInsights: [
      "Friendship energy in Four Pillars is governed by social element harmony — shared interests, easy communication, mutual understanding. Romantic energy is governed by the Relationship Star activation — attraction, desire for union, and a different kind of need.",
      "When both systems are active between two people, the friendship becomes a natural foundation for romance — it provides trust and genuine knowing that most romantic relationships spend years trying to build.",
      "When only friendship energy is active (no Relationship Star), the transition to romance is possible but artificial — it requires one or both people to manufacture something that isn't naturally there, which creates fragility.",
      "The fear most people have in this situation is that pursuing romance and failing will destroy the friendship. Your chart shows whether the friendship energy is strong enough to survive the transition attempt — in either direction.",
      "One of the clearest signals that romantic energy is genuinely present: you find yourself thinking about this person differently than you think about other close friends — with a specific curiosity, attention, or awareness that has a different quality.",
      "Timing in friendship-to-romance transitions matters significantly. The same romantic energy that would succeed in one cycle may be rejected in another — not because feelings changed, but because their chart's receptivity changed.",
      "Some of the deepest and most lasting romantic relationships begin as friendships. The friendship energy doesn't disappear when romance develops — it becomes the foundation that most romantic relationships envy.",
    ],
    lockedLabel: 'Get the specific transition analysis',
    lockedLines: [
      "Whether romantic elemental energy is genuinely present — or friendship-only",
      "What is blocking the romantic energy from activating (if anything)",
      "The timing window when romantic energy peaks between you — when to act",
      "How to create the conditions for a natural transition rather than an awkward confession",
      "Whether romantic development strengthens or risks damaging the friendship",
      "Their chart's current receptivity to romantic transition — are they open to it right now?",
    ],
    relatedSlugs: ['crush', 'dating', 'new-couple'],
    tag: 'Transition potential',
  },
  'biz-partner': {
    icon: '🤝', title: 'Business Partner Compatibility', subtitle: 'Love + work — can both thrive?',
    credits: 20, type: 'couple',
    desc: "Mixing romantic and professional energy is one of the most complex elemental combinations. This reading examines both layers — whether your charts support both a loving and productive relationship simultaneously.",
    whatYouLearn: ['Whether your charts support both romantic and professional alignment', 'Which domain carries stronger energy between you', 'The elemental friction most likely to emerge in business', 'How professional stress affects your romantic energy and vice versa'],
    sampleHeadline: 'Dual-Layer Compatibility — Free Overview',
    freeOverview: "In Four Pillars, romantic energy and career energy are governed by completely different elemental systems. The same elemental dynamic that creates romantic chemistry may create professional rivalry — or vice versa. This is why some couples are extraordinary life partners but terrible business partners, while others thrive in both domains simultaneously.",
    freeInsights: [
      "Your career element (官星/財星) and your relationship element (夫妻星) interact in your chart in a specific way — they either support, deplete, or conflict with each other. This internal dynamic determines whether love and work naturally coexist or constantly compete for your energy.",
      "The most challenging dual-partner dynamic: when the same person activates both your romantic energy and your wealth energy in a controlling relationship. This creates intense attraction and intense power tension — simultaneously.",
      "Couples who successfully run businesses together almost always carry complementary elemental strengths in the domain of work: one person's Metal precision with the other's Fire drive; one person's Earth stability with the other's Wood vision.",
      "The most common failure pattern in romantic-professional partnerships: the professional roles begin to replicate the romantic dynamic. If one person leads romantically, they tend to lead professionally — which eventually creates resentment in the other.",
      "Stress transfer is a critical risk: when business is difficult, it flows into the relationship. Your chart shows how porous the boundary is between your professional and romantic energies — some people separate them cleanly; others can't.",
      "The clearest sign a romantic-professional partnership will work: both people's charts show strong, independent career energy that isn't dependent on each other. When both can succeed independently, they can choose to collaborate rather than need to.",
      "One practical insight: formal agreements (roles, compensation, decision rights) between romantic-professional partners are not unromantic — they are elemental protection. Metal-type structure prevents Wood-type ambiguity from creating relationship-damaging conflict.",
    ],
    lockedLabel: 'Get the full dual-layer compatibility analysis',
    lockedLines: [
      "Full romantic compatibility score — independent of professional dynamic",
      "Full professional compatibility score — and where the two diverge",
      "The #1 business scenario most likely to damage the romantic relationship",
      "How to structure the professional relationship to protect the romantic one",
      "Whether this combination is recommended, proceed with caution, or avoid",
      "The specific elemental roles each partner should take in the business for maximum harmony",
    ],
    relatedSlugs: ['relationship-dive', 'loyalty', 'full-compat'],
    tag: 'Love + career',
  },

  // ── NEW READINGS ──────────────────────────────────────────────────────────

  'ideal-partner': {
    icon: '🎯', title: 'My Ideal Partner Profile', subtitle: 'Who is your chart calling in?',
    credits: 12, type: 'single',
    desc: "Your Four Pillars chart isn't just a map of who you are — it's a blueprint of who you're energetically drawn to. This reading decodes the elemental type, personality traits, and even approximate life background of your most compatible partner.",
    whatYouLearn: ['The elemental type you are most naturally attracted to', 'Personality traits that activate your romantic energy', "Red flags — the type you're drawn to but shouldn't be", "What your chart says about your ideal partner's career and lifestyle", "Why certain past relationships felt right but ultimately weren't"],
    sampleHeadline: 'Your Attraction Blueprint — Free Overview',
    freeOverview: "Every Day Master has an elemental 'companion star' — a specific energy type that naturally activates romantic feelings. This isn't a preference you choose consciously; it's wired into the structure of your chart. Understanding this pattern explains why you keep falling for certain types — and why those types aren't always the healthiest match for you.",
    freeInsights: [
      "Your Day Master has a specific relationship star (夫星/妻星) embedded in your chart. This star reveals the elemental type that most activates your romantic feelings — and it's more specific than personality type alone.",
      "The person who activates your Relationship Star tends to feel immediately familiar — like you've known them before. This feeling is real elemental resonance, not imagination.",
      "Your chart also carries a 'romantic tension type' — the elemental energy you find irresistibly attractive but that creates recurring friction. This is the type you need to understand clearly before choosing a partner.",
      "The Five Elements framework identifies not just compatibility but energetic role — whether you need a partner who generates energy for you, grounds you, or mirrors you. Each creates a completely different relationship feeling.",
      "People who consistently choose incompatible partners are usually following their Tension Star rather than their Companion Star. The tension feels like chemistry; the companion feels like safety. Both are real, but they lead to very different outcomes.",
      "Your ideal partner's elemental type also correlates with their likely industry, lifestyle pace, and communication style — meaning the profile is more specific and predictive than most people expect.",
    ],
    lockedLabel: 'Get your complete Ideal Partner Profile',
    lockedLines: [
      "Your primary Companion Star element — the exact type your chart is most compatible with",
      "Three personality traits that appear in almost all of your serious attractions",
      "Your Tension Star profile — the type you find irresistible but need to approach with awareness",
      "Industry and lifestyle indicators for your most compatible match",
      "Whether your chart favors meeting someone through work, social circles, family introductions, or chance encounters",
      "The single most important quality to look for — and the one to never compromise on",
    ],
    relatedSlugs: ['soulmate', 'when-love', 'my-love-style'],
    tag: 'Your love blueprint',
  },

  'my-love-style': {
    icon: '🪞', title: 'My Love Style Analysis', subtitle: 'How do you actually show up in love?',
    credits: 10, type: 'single',
    desc: "How you attach, how you pursue, how you pull back — your Four Pillars chart maps your love style with precision. This reading reveals your romantic patterns, your emotional triggers, and how others experience you in relationships.",
    whatYouLearn: ['Your attachment style through a Five Elements lens', 'How you express affection vs. how you need to receive it', 'Your romantic strengths and blind spots', 'What triggers you to withdraw or push someone away', 'How you appear to partners — and what they actually experience with you'],
    sampleHeadline: 'Your Romantic Energy Profile — Free Overview',
    freeOverview: "Your Day Master element determines not just who you attract but how you behave in romantic relationships. Wood Day Masters pursue steadily but need freedom. Fire types are intensely romantic but burn hot and cold. Earth types are devoted but can become possessive. Metal types are principled and loyal but emotionally guarded. Water types are deeply intuitive but can be elusive. Each element has a love signature — and understanding yours changes everything.",
    freeInsights: [
      "Your romantic expression style is shaped primarily by your Day Master — it determines whether you pursue directly or create circumstances for others to come to you.",
      "Your emotional reception style (how you need to be loved) is often different from your expression style — this mismatch is the source of most 'we just weren't compatible' feelings in your past relationships.",
      "Your chart reveals a primary romantic strength — something about the way you show up in relationships that partners consistently value, even when other things go wrong.",
      "It also reveals a primary romantic blind spot — a pattern you repeat without realizing it, that tends to create the same problem across different relationships.",
      "Your Monthly Pillar element adds nuance: it governs how you behave in the early stages of a relationship versus how you show up once you're fully comfortable.",
      "Most people find this reading confronting but clarifying — because it names things they've always felt but never had language for.",
    ],
    lockedLabel: 'Unlock your complete Love Style profile',
    lockedLines: [
      "Your full attachment style mapped to your Four Pillars — with specific behavioral patterns",
      "The gap between how you express love and how you need to receive it — and how to bridge it",
      "Your #1 romantic blind spot — the pattern that keeps showing up in different partners",
      "How others actually experience you in the early stages vs. established relationship",
      "Your emotional trigger points — what makes you pull back, go cold, or overreact",
      "Specific guidance: what you need from a partner to feel truly secure in love",
    ],
    relatedSlugs: ['ideal-partner', 'toxic-pattern', 'love-blockers'],
    tag: 'Self-awareness reading',
  },

  'love-blockers': {
    icon: '🚧', title: 'What\'s Blocking My Love Life?', subtitle: 'Why isn\'t love arriving?',
    credits: 10, type: 'single',
    desc: "Sometimes the chart carries specific patterns that delay, complicate, or block romantic connection. This reading identifies the exact elemental obstacle in your love life — and what shifts need to happen for things to open up.",
    whatYouLearn: ['Whether your chart carries a structural love obstacle', 'What elemental energy is suppressing your relationship star', 'Whether the block is internal (patterns) or timing-based (cycles)', 'The specific shift — behavioral, environmental, or cyclical — that opens the door', 'When the current block is due to lift based on your 10-year cycle'],
    sampleHeadline: 'Love Obstacle Analysis — Free Overview',
    freeOverview: "In Four Pillars theory, love obstacles typically fall into three categories: a Relationship Star that is buried or weakened by other elements; a chart configuration that prioritizes career or independence energy over romantic energy; or a 10-year luck cycle that temporarily suppresses romantic fortune. Most people experiencing persistent romantic difficulty are dealing with one of these three patterns — and all three have a resolution.",
    freeInsights: [
      "The most common love blocker isn't bad luck — it's a strong career or independence star that inadvertently suppresses the Relationship Star. This pattern is extremely common in high-achieving individuals and is entirely navigable.",
      "A second common pattern: a chart that carries a Relationship Star but surrounds it with controlling or exhausting elements. The star is there — but it's being suppressed before it can activate.",
      "Timing matters enormously. Some people have a strong Relationship Star but are currently in a luck cycle that doesn't support it. This is temporary — and knowing when the cycle shifts changes everything about how you should approach the next few years.",
      "Behavioral blockers are also real: patterns learned in childhood (often visible in the Year or Month pillar) that produce self-protective behavior — emotional unavailability, standards that unconsciously screen out compatible people, fear of vulnerability.",
      "The chart doesn't just show whether love is blocked — it shows when and how the blockage lifts. For most people, there is a specific window in their 10-year cycle where romantic energy becomes much more available.",
      "Understanding your blocker removes the feeling that something is fundamentally wrong with you. In almost all cases, the block is specific, identifiable, and temporary.",
    ],
    lockedLabel: 'Identify your specific love blocker',
    lockedLines: [
      "Whether your block is structural (chart-based), cyclical (timing-based), or behavioral (pattern-based)",
      "The exact element or configuration creating the obstacle in your chart",
      "The specific 10-year luck cycle window when romantic energy is most available to you",
      "Behavioral patterns from your chart that may be screening out compatible partners",
      "Three actionable shifts — things you can change now — to reduce the block",
      "Honest assessment: is love delayed for you, or are there multiple strong windows ahead?",
    ],
    relatedSlugs: ['when-love', 'my-love-style', 'toxic-pattern'],
    tag: 'Why love delays',
  },

  'marriage-stability': {
    icon: '🏛️', title: 'Will This Relationship Lead to Marriage?', subtitle: 'Where is this really going?',
    credits: 12, type: 'couple',
    desc: "You're in a relationship — but is marriage actually on the path? This reading analyzes both charts for marriage timing alignment, long-term elemental endurance, and whether the connection has the structural energy to reach commitment.",
    whatYouLearn: ['Whether marriage energy is active in both charts simultaneously', 'The elemental endurance score of the relationship', 'The most likely timeline if marriage is in the cards', 'What needs to happen for commitment to materialize', 'Whether timing is the obstacle — or something more fundamental'],
    sampleHeadline: 'Marriage Path Energy — Free Overview',
    freeOverview: "Marriage in Four Pillars isn't just about compatibility — it's about timing alignment. Both people need to have active marriage energy in their charts at the same time for commitment to feel natural and inevitable rather than forced or premature. Couples who are compatible but who keep not quite getting there often have misaligned marriage timing — one person's energy is ready while the other's isn't.",
    freeInsights: [
      "Marriage energy in your chart is governed by your Relationship Star and the annual/decade cycle it's operating in. When the star is active and the cycle is supportive, the pull toward commitment feels natural and easy.",
      "Misaligned marriage timing is the #1 reason compatible couples stall before commitment. It's not that either person doesn't want it — it's that their readiness cycles are out of phase.",
      "Your chart reveals whether you carry 'early marriage' or 'later marriage' energy. Neither is better — but understanding which one you have prevents misinterpreting delays as problems.",
      "One of the most common patterns: the relationship is genuinely compatible, but one person's chart is currently in a cycle that emphasizes career, independence, or self-development. This isn't rejection — it's a timing issue with a resolution window.",
      "A relationship that has been together for more than 2 years without progression toward commitment usually indicates either a fundamental elemental mismatch in long-term potential, or a specific timing barrier — the reading clarifies which.",
      "The good news: most relationships that have genuine compatibility AND hit a timing wall eventually resolve. The question is whether waiting is worth it — and the chart can answer that.",
    ],
    lockedLabel: 'Get the marriage timing analysis',
    lockedLines: [
      "Whether marriage energy is currently active, approaching, or distant in your chart",
      "Whether your partner's chart shows concurrent marriage energy — alignment check",
      "The most likely timing window for commitment, if elemental energy supports it",
      "Whether the obstacle is timing-based (temporary) or structural (fundamental incompatibility)",
      "The specific condition that needs to be met for the relationship to progress to commitment",
      "Honest long-term potential score for this relationship: __ / 100",
    ],
    relatedSlugs: ['relationship-dive', 'marriage-timing', 'cohabitation'],
    tag: 'Commitment path',
  },

  'third-party': {
    icon: '👁️', title: 'Is There Someone Else?', subtitle: 'The question you\'re afraid to ask',
    credits: 15, type: 'couple',
    desc: "Trust issues in a relationship are painful — and uncertainty is often worse than knowing. This reading examines your partner's chart for signs of divided attention, wandering energy, or a third-party presence, and cross-references it with your own chart's current vulnerability.",
    whatYouLearn: ['Whether your partner\'s chart shows signs of divided romantic energy', 'What elemental pattern triggers wandering behavior in their type', 'Whether your instincts are tracking something real or amplified by anxiety', 'Your chart\'s current emotional vulnerability period', 'What to do with this information'],
    sampleHeadline: 'Relationship Integrity Analysis — Free Overview',
    freeOverview: "Gut feelings in relationships are elemental signals — your Day Master is processing energy data from the other person's chart in ways you can't fully articulate consciously. In Four Pillars, a consistent sense that something is off is worth examining rather than suppressing. That said, not every feeling of disconnection means infidelity — sometimes it reflects a cycle of emotional withdrawal, pressure, or a personal shift in your partner's energy that has nothing to do with another person.",
    freeInsights: [
      "Your intuition about a partner is often more accurate than you're willing to admit — because elemental energy is real, and you're genuinely reading it. The question is whether you're interpreting it correctly.",
      "Certain elemental chart types carry naturally wandering energy — not because they're malicious, but because their relationship star interacts with their independence star in a way that makes sustained commitment genuinely more difficult for them.",
      "When your partner enters a specific luck cycle — particularly one that activates their indirect wealth or indirect relationship star — the pull toward outside connection becomes temporarily stronger regardless of how much they love you.",
      "Your chart also plays a role: there are periods when your own emotional energy contracts or becomes less available to your partner. This can create a gap that an unstable partner fills elsewhere — and this reading addresses both sides.",
      "Signs in a chart that indicate third-party risk are specific and structural — they're not about character judgment, but about elemental configuration and timing alignment. The reading is honest rather than reassuring.",
      "The most important thing to understand: a chart can show elevated risk without confirming anything has happened. This reading is about clarity and awareness — not accusation.",
    ],
    lockedLabel: 'Get the full relationship integrity reading',
    lockedLines: [
      "Whether your partner's chart carries structural wandering energy — and how strong it is",
      "Current timing assessment: is their chart in a cycle that elevates outside-connection risk?",
      "Whether your gut instinct is tracking real elemental data or an anxiety amplification",
      "Your chart's current emotional vulnerability — are you in a period that makes you more or less able to see clearly?",
      "What specific behavioral signals in their chart type correlate with divided attention",
      "Recommended next step — based on both charts combined",
    ],
    relatedSlugs: ['loyalty', 'partner-true-feelings', 'relationship-dive'],
    tag: 'Relationship integrity',
  },

  'toxic-pattern': {
    icon: '🔁', title: 'Why Do I Keep Meeting the Same Person?', subtitle: 'Breaking the pattern',
    credits: 10, type: 'single',
    desc: "Different faces, same relationship. If you've noticed a recurring type of person showing up in your love life — or a recurring way that relationships end — your chart carries the answer. This reading identifies the specific elemental pattern driving the repetition.",
    whatYouLearn: ['The specific elemental pattern causing you to attract the same type', 'Whether this is a karmic pattern or a learned behavioral one', 'Why this type activates such strong attraction in you', 'What you unconsciously communicate that pulls in this dynamic', 'How to interrupt the cycle — specific chart-based guidance'],
    sampleHeadline: 'Relationship Pattern Analysis — Free Overview',
    freeOverview: "Repetitive relationship patterns in Four Pillars are almost always traceable to one of two sources: a Tension Star that generates strong chemistry with an incompatible type, or an early-life elemental imprint (usually from the Year or Hour pillar) that established a template for what 'love' feels like. Both patterns feel like fate — and neither one is. Both can be understood and interrupted.",
    freeInsights: [
      "The Tension Star in your chart creates irresistible attraction toward an elemental type that is genuinely incompatible with your long-term needs. This isn't a character flaw — it's structural. But it requires conscious navigation.",
      "Your Year Pillar often carries the earliest template for romantic energy — the emotional environment of your upbringing. When adult relationships replicate childhood energy patterns, it's because that energy feels familiar, not because it's right.",
      "The element that creates the most painful breakups for you is almost always the same element you find most magnetically attractive. This connection is not a coincidence — it's a defined elemental interaction.",
      "Patterns repeat not because you're unlucky but because you're unconsciously broadcasting an energy signal that matches the pattern. The good news: this signal can be changed — but it requires understanding what you're currently broadcasting.",
      "Breaking the pattern doesn't mean avoiding all chemistry. It means learning to distinguish between Tension Star chemistry (intense but ultimately depleting) and Companion Star chemistry (initially quieter, but genuinely sustaining).",
      "Most people who break their toxic pattern report that it happened after they stopped trying to fix the wrong type and started showing up differently for the right one. The reading identifies which shift is most relevant for your chart.",
    ],
    lockedLabel: 'Identify and break your pattern',
    lockedLines: [
      "The specific elemental type you keep attracting — and exactly why your chart generates this attraction",
      "Whether this is a Tension Star pattern, a karmic template, or an early-life imprint — or a combination",
      "The unconscious signal your chart is currently broadcasting that sustains the pattern",
      "Why ending these relationships is so difficult for your elemental type specifically",
      "The three shifts — behavioral, energetic, environmental — most likely to interrupt the cycle for you",
      "What a healthy relationship actually feels like for your chart (many people don't know because they've never experienced it)",
    ],
    relatedSlugs: ['love-blockers', 'my-love-style', 'ideal-partner'],
    tag: 'Pattern breaking',
  },

  'secret-admirer': {
    icon: '🫣', title: 'Is Someone Secretly in Love With Me?', subtitle: 'Who is thinking about you right now?',
    credits: 8, type: 'single',
    desc: "Your chart carries signals about incoming romantic energy — whether someone in your life is carrying feelings for you that haven't been expressed. This reading examines your current attraction field and tells you what the signs mean.",
    whatYouLearn: ['Whether incoming romantic energy is currently active in your chart', 'What kind of person is likely carrying these feelings', 'Whether they\'re in your current circle or someone you haven\'t met yet', 'Whether this person is worth pursuing or better left as they are', 'The timing for when hidden feelings tend to surface'],
    sampleHeadline: 'Incoming Love Energy — Free Overview',
    freeOverview: "In Four Pillars, incoming romantic energy is visible in the chart before you consciously know about it. When your Relationship Star is activated by a current cycle, it means romantic energy is flowing toward you — whether or not it's yet visible on the surface. This reading examines your current cycle for exactly this signal.",
    freeInsights: [
      "Your Relationship Star becoming active in your current cycle is the primary signal that romantic energy is approaching or already present. This star's strength and current condition determines how obvious or subtle the incoming connection will be.",
      "The element governing your current annual cycle affects how visible incoming attraction is — some cycles bring very obvious, forward admirers; others bring quiet, observant ones who take time to surface.",
      "People who are attracted to you but haven't said anything yet tend to be operating from the same elemental type as your chart's Tension Star — meaning they feel the pull strongly but have reasons to hesitate.",
      "Your current social and professional environment is the most likely source of incoming energy — the chart rarely brings attraction from completely unknown sources. Someone already in your world is the usual pattern.",
      "The timing of when hidden feelings tend to express themselves is readable from your chart. There's usually a window within the current or upcoming cycle when what's hidden surfaces naturally.",
      "A note: this reading is about energy, not certainty. It identifies probability and timing windows — not guaranteed outcomes. The energy is real; what you do with it is yours to decide.",
    ],
    lockedLabel: 'Unlock the full incoming love analysis',
    lockedLines: [
      "Whether incoming romantic energy is currently strong, mild, or absent in your chart",
      "The elemental type of the person most likely carrying feelings for you",
      "Whether they're someone already in your life or someone approaching",
      "The most likely timing window for their feelings to surface or be revealed",
      "Whether this person is a compatible match or a Tension Star type",
      "Whether you should wait for them to act or create an opening — chart-based guidance",
    ],
    relatedSlugs: ['when-love', 'crush', 'magnetic-timing'],
    tag: 'Incoming energy',
  },

  'first-meeting': {
    icon: '🌷', title: 'Blind Date & First Meeting Energy', subtitle: 'Will this first impression become something more?',
    credits: 8, type: 'couple',
    desc: "First meetings carry elemental energy that's often decisive for what follows. Whether it's a blind date, a setup, or a new connection — this reading tells you what the energy between your charts suggests about where this could go.",
    whatYouLearn: ['The elemental impression you create at first meeting', 'Whether your energy is naturally compelling to this person\'s type', 'Early-stage chemistry score and what it means for longer-term potential', 'What they\'re most likely to notice about you — and what could create hesitation', 'Whether to pursue further or let it pass'],
    sampleHeadline: 'First Impression Energy — Free Overview',
    freeOverview: "In Four Pillars, first-meeting energy is determined by the elemental interaction between two Day Masters meeting for the first time — before any habits, history, or expectations have formed. This initial energy is often the most honest read of elemental compatibility available. What you feel in the first 1–3 meetings is pure elemental signal, unfiltered by projection.",
    freeInsights: [
      "Your Day Master creates a specific first impression based on its element. This impression is remarkably consistent across different people who meet you for the first time — and it activates different reactions in different elemental types.",
      "First-meeting chemistry and long-term compatibility are related but not identical. The elements that create immediate chemistry (Tension Star dynamics) are not always the elements that create lasting partnership. Both are readable from the chart.",
      "How you're perceived in the first three meetings is shaped primarily by your Month Pillar — the social 'face' you present before the deeper self becomes visible. This is often different from who you actually are.",
      "If a first meeting feels immediately comfortable and natural — almost like you've known the person before — this usually signals a Companion Star interaction. If it feels intensely exciting and slightly destabilizing, this is usually a Tension Star dynamic.",
      "The best outcome from a first meeting for your elemental type isn't always the most exciting one. For some Day Masters, the most auspicious start feels like ease; for others, it's mutual respect; for others, it's curiosity. The reading specifies yours.",
      "One practical note: your chart shows whether you tend to make a stronger impression early (and then reveal complexity later) or a modest first impression (that deepens significantly over time). Knowing this helps you pace correctly.",
    ],
    lockedLabel: 'Get the full first-meeting analysis',
    lockedLines: [
      "The elemental impression you make — what you communicate without words at first meeting",
      "Whether this specific person's chart type is naturally receptive to your elemental energy",
      "First-meeting chemistry score and what it likely means for long-term potential",
      "What about you they're most drawn to — and the one thing that might create initial hesitation",
      "Whether this is a Companion Star or Tension Star dynamic — critical for next steps",
      "Recommended approach: pursue, create opportunity, wait and observe, or let it go",
    ],
    relatedSlugs: ['crush', 'dating', 'ideal-partner'],
    tag: 'Blind date analysis',
  },

  'partner-true-feelings': {
    icon: '💭', title: 'What Does My Partner Really Feel?', subtitle: 'What they say vs. what their chart says',
    credits: 12, type: 'couple',
    desc: "Partners don't always express what they feel — sometimes because they don't have the words, sometimes because the feelings themselves are complicated. Their Four Pillars chart carries the answer your conversations haven't given you.",
    whatYouLearn: ['How your partner genuinely experiences the relationship on a deep level', 'Whether their feelings have changed over time — and in which direction', 'What they need from you that they\'re not articulating', 'Whether their emotional withdrawal (if any) is about you or about them', 'What their chart says about their long-term intentions'],
    sampleHeadline: 'Partner Emotional Profile — Free Overview',
    freeOverview: "Every Day Master element has a specific way of experiencing and processing romantic emotion — and it's often quite different from how they express it externally. A Metal Day Master may express love through acts of service while internally feeling deeply attached. A Water Day Master may appear emotionally distant while experiencing profound connection beneath the surface. Understanding their elemental emotional language is the difference between constantly misreading each other and finally being on the same page.",
    freeInsights: [
      "Your partner's Day Master element determines their primary emotional expression style — the way they show love versus the way they internally experience it. For some elements, these are closely aligned; for others, there's a significant gap that creates misunderstanding.",
      "Their Monthly Pillar reveals how they behave in established relationships versus early-stage courtship. Many people find their partner significantly different once the relationship stabilizes — this pillar explains that shift.",
      "If your partner has been emotionally withdrawn recently, their chart usually reveals whether this is an internal processing period (their natural cycle), a response to something specific between you, or a sign of a larger shift in how they feel.",
      "What your partner is most afraid of in relationships is readable from their chart's fear star configuration — and this fear often drives behavior that looks like something completely different from the outside.",
      "Their chart also reveals their long-term relationship intention pattern — whether they tend toward deep commitment, tend to cycle in and out of relationships, or are currently in a growth period that is genuinely changing their relationship capacity.",
      "This reading doesn't replace honest conversation — but it gives you a framework for understanding what you're hearing and feeling that makes those conversations more productive rather than more circular.",
    ],
    lockedLabel: 'Get the full partner emotional analysis',
    lockedLines: [
      "How your partner genuinely experiences the relationship right now — their internal emotional state",
      "Whether their feelings have strengthened, stabilized, or shifted in the past 6 months",
      "What they need from you that they're not expressing directly — specific to their elemental type",
      "Whether current emotional distance (if present) is a cycle, a response, or a signal",
      "Their long-term intention pattern — commitment-oriented, cyclical, or currently transitional",
      "The one thing you could do differently that would genuinely change how they show up in the relationship",
    ],
    relatedSlugs: ['love-language', 'relationship-dive', 'third-party'],
    tag: 'Partner insight',
  },

  'magnetic-timing': {
    icon: '✨', title: 'When Am I Most Magnetic This Year?', subtitle: 'Your peak attraction windows for the year',
    credits: 8, type: 'single',
    desc: "Your romantic magnetism isn't constant — it peaks and dips with your elemental cycles. This reading maps your highest-attraction windows for the current year, so you can show up at the right moments rather than the wrong ones.",
    whatYouLearn: ['Your top 3 peak magnetism months this year', 'What makes each window uniquely powerful for you', 'The months to avoid for new romantic beginnings', 'What you naturally project during peak windows vs. low periods', 'How to consciously amplify your elemental magnetism'],
    sampleHeadline: 'Your Attraction Cycle — Free Overview',
    freeOverview: "In Four Pillars astrology, your personal magnetic energy follows a predictable elemental rhythm within each year. This rhythm is determined by the interaction between your Day Master element and the monthly branch energy. During certain months, your chart is simply in a more attractive state — more open, more vibrant, more naturally compelling. During others, your energy is inward-focused, which is excellent for depth but less optimal for new romantic beginnings.",
    freeInsights: [
      "Your Day Master interacts differently with each of the 12 monthly branches — creating natural high and low periods for romantic energy throughout the year. These cycles are real and measurable, not metaphorical.",
      "During your peak attraction months, you naturally project more confidence, warmth, and openness without trying harder. People around you simply respond more readily — because your elemental energy is broadcasting more clearly.",
      "During your low-attraction months, your energy isn't gone — it's inward. These periods are excellent for deepening existing connections, doing inner work, and clarifying what you actually want. They're not wasted time.",
      "The highest-risk mistake people make: pursuing new romantic connections during low-energy months and then wondering why their efforts aren't working. The timing, not the approach, is usually the variable.",
      "Your peak windows also correlate with social energy — during high periods, you naturally want to be out and visible. During low periods, you naturally pull back. Following these instincts, rather than fighting them, produces better results.",
      "One nuance: your peak magnetism months are excellent for first meetings, confessions, and introducing yourself to someone new. They don't guarantee outcomes — but they stack the elemental odds in your favor.",
    ],
    lockedLabel: 'Get your full attraction calendar',
    lockedLines: [
      "Your 3 peak magnetism months this year — specific months, not just seasons",
      "What elemental energy makes each peak month uniquely powerful for your type",
      "Your 2 lowest-magnetism months — when to pause new romantic pursuits",
      "The specific quality you project at your most attractive that others find compelling",
      "How to consciously amplify your natural magnetism during peak windows",
      "A note on any special celestial-elemental windows in the current year specific to your Day Master",
    ],
    relatedSlugs: ['when-love', 'secret-admirer', 'love-blockers'],
    tag: 'Peak timing',
  },

  'cohabitation': {
    icon: '🏠', title: 'Should We Move In Together?', subtitle: 'What your charts say about sharing space',
    credits: 10, type: 'couple',
    desc: "Moving in together is one of the biggest tests of elemental compatibility. Living with someone reveals what no date ever can. This reading examines both charts for cohabitation energy and tells you whether now is the right time — and what to prepare for.",
    whatYouLearn: ['Whether your elemental types are compatible for daily cohabitation', 'The #1 friction point most likely to emerge when sharing space', 'Whether the timing supports this transition or creates added pressure', 'What each of you needs in terms of personal space and autonomy', 'Whether cohabitation is likely to strengthen or test this relationship'],
    sampleHeadline: 'Cohabitation Compatibility — Free Overview',
    freeOverview: "Daily cohabitation amplifies all elemental dynamics — both positive and negative. The ease and tension that were subtle in a dating dynamic become pronounced when you share space. This is why compatible couples sometimes struggle with cohabitation and why other couples unexpectedly thrive in it. The elemental interaction at play is different when you're navigating daily rhythms together rather than curated time together.",
    freeInsights: [
      "Cohabitation success is most strongly predicted by the interaction between your Element and your partner's Element in a sustained, daily context — specifically, whether one element generates or controls the other, and how that feels over time.",
      "The generating relationship (where one element naturally produces the other) tends to create a nurturing cohabitation dynamic — one person naturally lifts the other's daily energy. This is generally sustainable and pleasant.",
      "The controlling relationship creates a different dynamic at home — one person's energy naturally constrains the other's. This can feel like structure and leadership at first, but over time it tends to produce resentment if not consciously balanced.",
      "Daily space requirements vary significantly by elemental type. Wood and Water types generally need more solitude to recharge; Fire and Earth types are often more comfortable with shared space and togetherness. Mismatched needs in this area are one of the most common sources of cohabitation friction.",
      "The timing of the move matters. Moving in during a career-pressure cycle for either partner, or during a personal transformation cycle, adds an additional stressor that can make the transition harder than it needs to be.",
      "Most couples who struggle with cohabitation report that the issues were actually present in the dating phase — they were just easy to ignore with limited shared time. This reading helps you see them clearly before they become entrenched.",
    ],
    lockedLabel: 'Get the full cohabitation analysis',
    lockedLines: [
      "Your elemental cohabitation compatibility score — and what it means in practical terms",
      "The #1 conflict most likely to emerge in shared daily life — specific to your chart combination",
      "Both people's personal space and autonomy needs — and whether they're compatible",
      "Whether current timing supports or complicates this transition",
      "The one agreement to establish before moving in that protects the relationship dynamic",
      "Overall recommendation: right time, too soon, or wait for a different cycle",
    ],
    relatedSlugs: ['marriage-stability', 'relationship-dive', 'conflict'],
    tag: 'Living together',
  },

  'remarriage': {
    icon: '🌻', title: 'Love After Divorce or Long-Term Heartbreak', subtitle: 'What does your chart say about a new beginning?',
    credits: 12, type: 'single',
    desc: "After a significant ending — a divorce, a long-term relationship, or a profound loss — the heart needs time before it's ready for something new. This reading maps your chart's recovery cycle, reveals when you'll genuinely be ready, and what the next chapter of your love life looks like.",
    whatYouLearn: ['Whether you\'re in a recovery cycle or a readiness cycle right now', 'When your chart shows genuine romantic openness returning', 'What the next significant romantic connection is likely to look like', 'Whether a remarriage or long-term commitment is supported by your chart', 'How this ending has changed your elemental romantic pattern going forward'],
    sampleHeadline: 'New Chapter Love Energy — Free Overview',
    freeOverview: "After a significant relationship ends, your chart enters a specific recovery phase — a period where romantic energy is deliberately contracted to allow internal recalibration. This isn't failure; it's necessary. The length and texture of this phase varies significantly by elemental type and by the decade cycle you're currently in. Understanding your phase prevents two common mistakes: moving on before you're ready, or waiting far longer than necessary.",
    freeInsights: [
      "Your Day Master element determines how you naturally process relationship endings — and how long a genuine recovery cycle typically takes for your type. For some elements, recovery is relatively quick (3–6 months of genuine processing). For others, the chart naturally takes longer to fully recalibrate.",
      "The decade luck cycle you're currently in has a major influence on when romantic opportunity genuinely re-opens. Some cycles naturally bring new connections even during recovery; others emphasize solitude and self-development as genuine preparation for what comes next.",
      "How this ending has affected your chart's Relationship Star is one of the most important factors. In some cases, the ending actually clears a suppression that was blocking better love from entering. This is more common than people expect.",
      "Your chart will reveal whether the next significant romantic connection is likely to arrive through similar channels as past relationships or through an entirely new social or professional context — an indicator that your elemental field has genuinely shifted.",
      "The most important signal that you're ready: not when the pain is gone, but when your chart's energy naturally turns outward again. This is a distinct and readable shift in your elemental cycle.",
      "Many people who have experienced significant heartbreak carry a transformed Relationship Star in the years that follow — one that calls in a more aligned, more mature type of connection than what came before. The ending, as painful as it was, often recalibrates your attraction field toward something genuinely better.",
    ],
    lockedLabel: 'Get your full new-chapter love reading',
    lockedLines: [
      "Whether you're currently in a recovery phase, a readiness phase, or an active opening phase",
      "The specific timing window when genuine romantic energy is most likely to re-enter your life",
      "What the next significant romantic connection is likely to look like — type, context, energy",
      "Whether remarriage or long-term commitment is supported by your chart in the current decade",
      "How the previous relationship has permanently changed your elemental romantic pattern",
      "The one internal shift that most accelerates your readiness for healthy new love",
    ],
    relatedSlugs: ['move-on', 'closure', 'when-love'],
    tag: 'New beginning',
  },
}

const RELATED_LABELS: Record<string, string> = {
  'crush': 'Crush Reading', 'new-couple': 'New Relationship', 'dating': 'Dating Stage',
  'relationship-dive': 'Relationship Deep Dive', 'conflict': 'Conflict Forecast',
  'long-distance': 'Long Distance', 'age-gap': 'Age Gap', 'office-romance': 'Office Romance',
  'love-language': 'Love Language', 'soulmate': 'Soulmate Profile', 'when-love': 'When Will Love Arrive',
  'marriage-timing': 'Marriage Timing', 'wedding-date': 'Wedding Date', 'twin-flame': 'Twin Flame',
  'past-life-love': 'Past Life Love', 'family-approval': 'Family Approval', 'breakup': 'Breakup Analysis',
  'ex-return': 'Will They Come Back', 'move-on': 'Moving On', 'closure': 'Closure Reading',
  'full-compat': 'Full Compatibility PDF', 'loyalty': 'Loyalty Reading', 'love-triangle': 'Love Triangle',
  'friend-to-love': 'Friendship to Love', 'biz-partner': 'Business Compatibility',
  'ideal-partner': 'Ideal Partner Profile', 'my-love-style': 'My Love Style',
  'love-blockers': 'Love Blockers', 'marriage-stability': 'Will It Lead to Marriage?',
  'third-party': 'Is There Someone Else?', 'toxic-pattern': 'Toxic Pattern Analysis',
  'secret-admirer': 'Secret Admirer Reading', 'first-meeting': 'First Meeting Energy',
  'partner-true-feelings': 'Partner\'s True Feelings', 'magnetic-timing': 'Magnetic Timing',
  'cohabitation': 'Move In Together?', 'remarriage': 'Love After Heartbreak',
}

export default function LoveReadingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const reading = READINGS[slug]

  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [revealed, setRevealed] = useState(false)

  if (!reading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--void)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <p style={{ color: 'var(--text-dim)', fontSize: 18 }}>Reading not found.</p>
        <Link href="/love-hub" style={{ color: 'var(--gold)', textDecoration: 'none' }}>← Back to Love Hub</Link>
      </div>
    )
  }

  function handleReveal(e: React.FormEvent) {
    e.preventDefault()
    if (!date1) return
    if (reading.type === 'couple' && !date2) return
    setRevealed(true)
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>UNMYUNG</Link>
        <Link href="/love-hub" className={styles.back}>← Love Hub</Link>
      </nav>

      <div className={styles.wrap}>

        {/* Hero */}
        <div className={styles.hero}>
          <span className={styles.heroIcon}>{reading.icon}</span>
          <div className={styles.heroBadge}>Free Preview</div>
          <span className={styles.heroTag}>{reading.tag}</span>
          <h1 className={styles.heroTitle}>{reading.title}</h1>
          <p className={styles.heroSub}>{reading.subtitle}</p>
          <p className={styles.heroDesc}>{reading.desc}</p>
        </div>

        {/* What You'll Learn */}
        <div className={styles.learnBox}>
          <p className={styles.learnLabel}>What this reading reveals</p>
          <ul className={styles.learnList}>
            {reading.whatYouLearn.map(item => (
              <li key={item} className={styles.learnItem}>
                <span className={styles.learnDot}>✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <div className={styles.formCard}>
          <p className={styles.formTitle}>
            Enter your birth {reading.type === 'couple' ? 'dates' : 'date'} to receive your free overview
          </p>
          <form className={styles.form} onSubmit={handleReveal}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Your Date of Birth</label>
                <input type="date" value={date1} onChange={e => setDate1(e.target.value)} required />
              </div>
              {reading.type === 'couple' && (
                <div className={styles.formGroup}>
                  <label>Their Date of Birth</label>
                  <input type="date" value={date2} onChange={e => setDate2(e.target.value)} required />
                </div>
              )}
            </div>
            <button type="submit" className={styles.previewBtn}>
              Get My Free Reading Overview →
            </button>
          </form>
        </div>

        {/* Free Reading Result */}
        {revealed && (
          <div className={styles.resultCard}>
            <div className={styles.resultTop}>
              <span className={styles.resultBadge}>Free Overview</span>
              <h2 className={styles.resultTitle}>{reading.sampleHeadline}</h2>
            </div>

            {/* Free Overview Paragraph */}
            <div className={styles.overviewSection}>
              <p className={styles.overviewText}>{reading.freeOverview}</p>
            </div>

            {/* Free Insights */}
            <div className={styles.insightsSection}>
              <p className={styles.insightsLabel}>Key Insights for Your Element Type</p>
              <div className={styles.insightsList}>
                {reading.freeInsights.map((insight, i) => (
                  <div key={i} className={styles.insightItem}>
                    <span className={styles.insightNum}>{i + 1}</span>
                    <p className={styles.insightText}>{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Locked section */}
            <div className={styles.lockedWrap}>
              <div className={styles.lockedPreview}>
                <p className={styles.lockedPreviewLabel}>{reading.lockedLabel}</p>
                <ul className={styles.lockedList}>
                  {reading.lockedLines.map(line => (
                    <li key={line} className={styles.lockedItem}>
                      <span className={styles.lockedDot}>🔒</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.unlockBox}>
                <p className={styles.unlockTitle}>Personalized Reading In Development</p>
                <p className={styles.unlockSub}>
                  The overview above is based on general elemental principles.<br />
                  The full reading is calculated from your exact birth data and both charts combined.
                </p>
                <button
                  className={styles.unlockBtn}
                  type="button"
                  disabled
                >
                  Detailed reading coming soon
                </button>
                <p className={styles.unlockNote}>
                  This preview is free. No payment is required for this unfinished feature.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Related Readings */}
        <div className={styles.related}>
          <p className={styles.relatedLabel}>Related Readings</p>
          <div className={styles.relatedGrid}>
            {reading.relatedSlugs.map(s => (
              <Link key={s} href={`/love-hub/${s}`} className={styles.relatedCard}>
                <span className={styles.relatedIcon}>{READINGS[s]?.icon ?? '💕'}</span>
                <span className={styles.relatedTitle}>{RELATED_LABELS[s]}</span>
                <span className={styles.relatedCredits}>Preview</span>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.backWrap}>
          <Link href="/love-hub" className={styles.backBtn}>← See All 30+ Love Readings</Link>
        </div>
      </div>
    </div>
  )
}
