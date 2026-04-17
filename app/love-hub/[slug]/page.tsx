'use client'
import { useState, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
}

export default function LoveReadingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
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
        <Link href="/" className={styles.logo}>MINGYUN</Link>
        <Link href="/love-hub" className={styles.back}>← Love Hub</Link>
      </nav>

      <div className={styles.wrap}>

        {/* Hero */}
        <div className={styles.hero}>
          <span className={styles.heroIcon}>{reading.icon}</span>
          <div className={styles.heroBadge}>★{reading.credits} credits</div>
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
                <p className={styles.unlockTitle}>Unlock Your Personalized Reading</p>
                <p className={styles.unlockSub}>
                  The overview above is based on general elemental principles.<br />
                  The full reading is calculated from your exact birth data and both charts combined.
                </p>
                <button
                  className={styles.unlockBtn}
                  onClick={() => router.push('/credits')}
                >
                  Get ★{reading.credits} Credits — from ${reading.credits <= 8 ? '1.99' : reading.credits <= 12 ? '4.99' : '9.99'}
                </button>
                <p className={styles.unlockNote}>
                  Credits never expire · Use across all 30+ readings · No subscription required
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
                <span className={styles.relatedCredits}>★{READINGS[s]?.credits ?? 10}</span>
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
