// ─── Day Master (日干) Profiles ───
export const ILGAN_PROFILE: Record<string, {
  title: string
  personality: string
  strength: string
  weakness: string
  love: string
  career: string
  health: string
  loveDetail: { tags: string[]; body: string; lock: string }
  wealthDetail: { tags: string[]; body: string; lock: string }
  healthDetail: { tags: string[]; body: string; lock: string }
}> = {
  '甲': {
    title: 'Jiǎ Wood (甲) — The Tall Tree',
    personality: 'You carry the energy of a great tree reaching toward the sky — independent, driven, and built to lead. Once you set a goal, nothing stops you from pushing forward. You hold yourself to high standards and naturally command respect. People trust you because you stand firm where others waver.',
    strength: 'Decisive leadership, pioneering spirit, relentless drive. You have an inner compass that rarely wavers, even under pressure.',
    weakness: 'Your conviction can harden into stubbornness. You may dismiss others\' input, and your inflexibility can create friction in relationships.',
    love: 'Bold and direct in romance. You lead, but need a partner who meets you as an equal — constant power struggles will wear you both down.',
    career: 'Entrepreneur, executive, politician, surgeon, software engineer. You excel anywhere independence and authority are rewarded.',
    health: 'Watch your liver and gallbladder. Stress accumulates as headaches and eye fatigue. Consistent sleep matters more than you admit.',
    loveDetail: {
      tags: ['Takes the Lead', 'Pride-Driven', 'Rarely Shows Wounds', 'Needs an Equal Partner'],
      body: 'In love, you move with the same directness you bring to everything else — you pursue, you express, you commit. But beneath that confidence lives a quiet sensitivity. The moment a partner fails to show respect, your walls go up fast and stay up long.\n\nYou rarely let anyone see your hurt. You process pain alone, which means your partner often has no idea a problem has been building. This creates silent distance that can become a chasm over time.\n\nYou thrive with someone who matches your energy — someone who challenges you intellectually, respects your autonomy, and never makes you feel small. Too submissive, and you get bored. Too dominant, and sparks fly for the wrong reasons.',
      lock: 'When does your most significant romantic turning point arrive this year — and what energy is heading your way?',
    },
    wealthDetail: {
      tags: ['Pioneer Wealth Pattern', 'Strong Early Investment', 'Better at Earning than Saving', 'Independent Income Suits You'],
      body: 'Your wealth doesn\'t come from following established paths — it comes from blazing your own. New ventures, unconventional projects, and independent income streams are where Jiǎ Wood thrives financially. A steady paycheck rarely feels like enough.\n\nYour weakness is the back half of the equation. You generate wealth with confidence, but managing and retaining it requires discipline you may not prioritize. Savings don\'t build themselves — you need intentional systems.\n\nLong-term wealth for you is built by going deep on one thing. The tree that grows tallest is rooted deepest. Real estate and founding your own business align well with your energy.',
      lock: 'Which months this year hold the highest wealth potential — and when should you hold back from big financial moves?',
    },
    healthDetail: {
      tags: ['Liver & Gallbladder Vulnerable', 'Eye Strain Accumulates', 'Stress Headaches', 'Spring Needs Extra Care'],
      body: 'Your body\'s Achilles heel is the liver and gallbladder system. When you push hard and sleep irregularly — which you do often — these are the first organs to signal overload. Tension headaches and dry, tired eyes are your body\'s early warning system.\n\nSpring (February through April) is when your Wood energy surges, which paradoxically makes it the season you\'re most likely to overdo it. This is the time to be most intentional about rest and alcohol.\n\nGreen vegetables, bitter foods, and sour flavors support your liver energy. More than any supplement, though, your health hinges on one thing: learning to stop before you\'re depleted, not after.',
      lock: 'Your specific health vulnerability windows this year — and a diet guide tailored to your elemental constitution.',
    },
  },
  '乙': {
    title: 'Yǐ Wood (乙) — The Vine & Flower',
    personality: 'You are the quiet intelligence of the garden — flexible, perceptive, and deeply attuned to the emotional landscape around you. Beneath your soft exterior is a will that bends but never breaks. You read the room better than almost anyone, and you survive environments that would break more rigid personalities.',
    strength: 'Empathy, adaptability, creativity, and warmth. You make people feel genuinely understood — a rare and powerful gift.',
    weakness: 'Indecisiveness and people-pleasing can keep you from voicing your real needs. You sometimes lose yourself trying to accommodate everyone else.',
    love: 'A devoted, attentive partner. But you give so freely that you can lose your own voice. Expressing your feelings honestly is the skill that changes everything for you.',
    career: 'Artist, designer, therapist, educator, healthcare, marketing. Wherever human connection and intuition are valued, you excel.',
    health: 'Liver and nervous system need attention. Emotional turbulence directly affects digestion. Stillness practices — meditation, yoga — are medicine for you.',
    loveDetail: {
      tags: ['Devoted Caretaker', 'Reads Emotions Deeply', 'Swallows Hurt Quietly', 'Needs Clear, Decisive Partner'],
      body: 'You love through attention — the remembered preference, the perfectly timed check-in, the gesture that says "I was thinking of you." This quality is magnetic. Partners feel truly cared for around you.\n\nBut you give more than you ask for. Over time, your unexpressed needs accumulate quietly, and when they finally surface, the release can feel disproportionate to your partner. Naming your feelings as they arise — not weeks later — is the relationship skill that changes everything for you.\n\nYou find your greatest stability with someone decisive and grounded, someone who takes the wheel so you don\'t have to be responsible for everything. A passive partner creates stagnation; the right one draws out your full brilliance.',
      lock: 'The season your romantic energy peaks this year — and what kind of connection is moving toward you.',
    },
    wealthDetail: {
      tags: ['Relationship-Based Wealth', 'Steady Growth Over Time', 'Collaborative Projects Pay Off', 'Generosity Can Overspend'],
      body: 'Your wealth flows through people. The right introduction, the collaboration that opens a door, the referral from someone you supported years ago — this is how Yǐ Wood builds financial momentum. Your network is your net worth.\n\nYou\'re not built for aggressive speculation. Your path is consistent, incremental growth — and it works. Slow money is real money. Side projects and co-creative ventures often surprise you with how well they perform.\n\nWatch the outflow carefully. Your generosity in relationships can quietly become a financial drain — social spending, lending, gifts. Budgeting for yourself isn\'t selfish; it\'s how you stay positioned to give.',
      lock: 'The months when unexpected income appears this year — and your specific financial leak to close.',
    },
    healthDetail: {
      tags: ['Nervous System Sensitive', 'Gut-Emotion Connection', 'Immunity Dips in Transitions', 'Spring & Fall Need Care'],
      body: 'Your emotions and your body run on the same circuit. When something unsettles your heart, your stomach feels it first. Digestive discomfort, appetite changes, and nervous tension are almost always a signal that something emotional needs attention.\n\nYou\'re particularly vulnerable during seasonal transitions — the weeks when spring becomes summer, or when autumn arrives. Your immune system dips in these windows, so they\'re worth treating as maintenance seasons.\n\nMeditation, stretching, time in natural settings — these aren\'t luxuries for you, they\'re regulation tools. Tart foods and leafy greens support your Wood constitution. Your health improves dramatically when your emotional life is honest.',
      lock: 'Your health vulnerability months this year — and a targeted maintenance guide for your constitution.',
    },
  },
  '丙': {
    title: 'Bǐng Fire (丙) — The Sun',
    personality: 'You are the room\'s energy source. Radiant, magnetic, and impossible to overlook, you draw people in with warmth and infectious enthusiasm. Your presence genuinely lifts others — you make ordinary moments feel electric. Passion isn\'t something you summon; it\'s what you\'re made of.',
    strength: 'Charisma, expressiveness, boldness, and social intelligence. You inspire people by simply being yourself.',
    weakness: 'You ignite fast and can cool just as quickly. Impulsiveness and difficulty with follow-through are the shadows of your fire.',
    love: 'Intense, expressive, all-in. You pour everything into romance — but sustaining that flame over the long haul requires conscious effort beyond the rush of early passion.',
    career: 'Broadcaster, performer, lecturer, entrepreneur, marketer, politician. Anywhere you\'re front and center, you thrive.',
    health: 'Heart, blood pressure, and eyes need monitoring. Sustained overwork and overstimulation put real strain on your cardiovascular system.',
    loveDetail: {
      tags: ['All-In Romance Style', 'Unmatched Expressiveness', 'Can Run Hot and Cold', 'Needs Continuous Spark'],
      body: 'When you fall for someone, you fall completely. The early phase of a relationship with you is genuinely thrilling — you\'re generous, present, affectionate, and seemingly limitless. This intensity is your greatest romantic gift.\n\nBut fire needs fuel. When novelty fades and routine sets in, your natural warmth can dim. Partners who don\'t recognize this may feel abandoned, even when you\'re right there. The growth edge for you is learning that love isn\'t just combustion — it\'s also maintenance.\n\nYou shine brightest with someone equally energized and positive, someone who keeps pace with your enthusiasm rather than draining it. With the right match, your fire never has to dim — it just deepens.',
      lock: 'The window this year when your romantic energy peaks — and the phase when emotional steadiness matters most.',
    },
    wealthDetail: {
      tags: ['Performance-Driven Income', 'Big Earner, Big Spender', 'Branding is Your Asset', 'Visibility Creates Wealth'],
      body: 'Your income follows your visibility. The more you move, connect, and express, the more financial opportunities materialize. Staying still is not a Bǐng Fire strategy — your wealth lives in action, conversation, and presentation.\n\nExpression is literally worth money for you: speaking, selling, creating, and performing are the channels where your financial energy concentrates. Invest in your public presence — it returns multiples.\n\nThe caution is spending. You match income with lifestyle naturally, which feels great in good months and dangerous in slow ones. Create a structure that saves automatically before you have a chance to redirect it.',
      lock: 'Your peak income months this year — and the specific period when financial discipline matters most.',
    },
    healthDetail: {
      tags: ['Heart & Blood Pressure Watch', 'Overheating Risk', 'Eye Health', 'Summer Depletion Paradox'],
      body: 'Your body runs hot. This gives you stamina and vitality — but also vulnerability when the heat tips into overdrive. Sustained high-intensity states put real load on your heart and circulatory system. Palpitations, flushing, and tension headaches are your early signals.\n\nHere\'s the paradox: summer, when Fire energy peaks, is actually when you\'re most likely to burn out. The impulse is to do more; the need is to cool down. Stay hydrated, sleep in, and eat bitter foods (dark leafy greens, black coffee in moderation) to regulate your internal heat.\n\nYour most important health skill: turning off. Deliberate rest — not just slowing down — is what keeps your fire burning long.',
      lock: 'The high-risk health windows in your year ahead — and your Fire constitution management guide.',
    },
  },
  '丁': {
    title: 'Dīng Fire (丁) — The Candleflame',
    personality: 'You are still, focused, and precise — a flame that illuminates exactly what needs to be seen. While others scatter their attention, you go deep. Your concentration, once locked, produces work that quieter observers would call remarkable. You see what most miss, and you understand people at a level that unsettles them sometimes.',
    strength: 'Concentration, intuition, patience, and penetrating insight. You carry a quiet intensity that, once recognized, commands respect.',
    weakness: 'Emotional sensitivity runs deep and wounds linger. You process alone, storing more than you should, until pressure builds.',
    love: 'Serious, loyal, and quietly passionate. You don\'t perform affection — you live it. What you need most is a partner who takes time to understand what\'s underneath.',
    career: 'Researcher, artist, writer, physician, analyst, philosopher. Fields demanding depth, precision, and intuition are your domain.',
    health: 'Heart and small intestine need attention. Mental overload translates to insomnia and heart palpitations. Rest is medicine.',
    loveDetail: {
      tags: ['Depth Over Surface', 'Warm Underneath a Cool Exterior', 'Strong Need to Be Understood', 'Trust Unlocks Everything'],
      body: 'You observe before you invest. Others might read your measured pace as disinterest, but you\'re quietly deciding whether someone is worth the fullness of your heart. Once you decide, you give completely — and your depth of devotion is rare.\n\nYou don\'t say "I love you" easily. Instead, you prove it — through consistency, through the long memory for what someone mentioned once, through being there when it matters. Partners who can\'t read below the surface may feel like they\'re dating a wall. The ones who can, feel enormously held.\n\nWhat you need most: a partner who doesn\'t require you to perform emotion, and who takes time to hear what you don\'t say out loud.',
      lock: 'The significant relationship shift approaching your chart this year — and the precise timing involved.',
    },
    wealthDetail: {
      tags: ['Expertise-Based Wealth', 'Slow Build, Long Peak', 'One Deep Niche Over Many', 'Financial Prime After 40'],
      body: 'Your wealth comes from mastery, not hustle. The deeper you go in a single field, the more your financial returns compound. Spreading across multiple directions fragments both your energy and your income. Focus is your financial strategy.\n\nThe timeline is important to understand: your 30s often feel like investment without visible return. But something shifts in your 40s when accumulated expertise starts commanding serious recognition and compensation. You\'re building the foundation of a skyscraper, not a one-story house.\n\nStable, long-horizon investments suit your nature. Real estate, steady accumulation, and building an unmatched professional reputation are more aligned with your wealth pattern than quick trades or trend chasing.',
      lock: 'The year\'s windows when your expertise draws financial opportunity — and the months requiring financial patience.',
    },
    healthDetail: {
      tags: ['Insomnia Prone', 'Heart Palpitations', 'Mental Overload Risk', 'Autumn & Winter Watch'],
      body: 'Your mind rarely fully stops. This is a source of your brilliance — and your most significant health vulnerability. When stress or worry accumulates, sleep fractures first. Insomnia and the physical sensation of a racing or heavy heart are your body\'s way of telling you the pressure has exceeded capacity.\n\nAutumn and winter are your most vulnerable seasons. The external world contracts; so does your internal fire. Without compensating warmth — bright environments, warm drinks, human connection — a quiet depression can settle in.\n\nThe two most important health habits for you: expressing what\'s on your mind (not just processing it privately), and giving yourself genuine permission to stop working. Your flame doesn\'t need to burn all night.',
      lock: 'Your specific high-risk months this year — and a mental wellness guide calibrated to your Fire constitution.',
    },
  },
  '戊': {
    title: 'Wù Earth (戊) — The Mountain',
    personality: 'Steady, trustworthy, and immovable at the core — you are the mountain that others orient themselves around. People feel safe around you. You don\'t need to announce your stability; it simply radiates. When chaos hits, you\'re the one who stays calm and clear, and that quality draws people toward you across a lifetime.',
    strength: 'Reliability, deep patience, warmth, and unshakeable responsibility. You are the person people call when it actually matters.',
    weakness: 'Your preference for stability can become resistance to change. You may hold positions long after flexibility would serve you better.',
    love: 'Committed and constant. You\'re less interested in the drama of romance than in building something real — partnership, not performance.',
    career: 'Executive, real estate, finance, civil service, healthcare, education. Where trust and steadiness are the core qualification, you lead.',
    health: 'Digestive system and stomach need care. You stress-eat and skip meals. Regularity is your most powerful health tool.',
    loveDetail: {
      tags: ['Built for Partnership', 'Slow to Open, Permanent When Committed', 'Stability Over Romance', 'Resistant to Sudden Change'],
      body: 'You don\'t fall in love quickly, and you don\'t love lightly. Your romantic process is careful — you observe, you consider, you decide. Once committed, though, you are one of the most loyal and dependable presences a person can have beside them.\n\nYou\'re not the partner who writes poems or plans elaborate surprises. You\'re the partner who shows up — consistently, quietly, completely. Those who understand that this is love in its most durable form feel deeply safe with you.\n\nYou do poorly with emotional volatility and constant change demands. A partner who respects your pace and values steadiness over novelty is the foundation for the long-lasting relationship you\'re built for.',
      lock: 'The season when new or deepening connection enters your chart this year — and the timing of a significant shift.',
    },
    wealthDetail: {
      tags: ['Real Estate Affinity', 'Slow and Solid Accumulation', 'Peak Assets 40–50s', 'Misses Fast Opportunities'],
      body: 'Your wealth is built like a mountain — one layer at a time, over time. You\'re not positioned for volatile quick gains, and you don\'t need to be. Your financial strength lies in consistent work, reliable income, and patient accumulation of real, tangible assets.\n\nReal estate, stable financial instruments, and long-term savings are in strong alignment with your energy. You\'re at your financial peak in your 40s and 50s, when the compounding of decades of careful work becomes visible.\n\nThe one area to watch: your instinct to stay with what\'s familiar can mean missing new financial opportunities. You don\'t need to speculate, but staying slightly open to evolution in your strategy is worth the discomfort.',
      lock: 'The wealth-building windows in your year and the specific months to protect against financial outflow.',
    },
    healthDetail: {
      tags: ['Digestive System Central', 'Stress Eating Pattern', 'Dampness & Weight Watch', 'Regular Meals as Medicine'],
      body: 'Your stomach and spleen are your health center. When you\'re stressed, you eat — and the food you reach for is usually the kind that compounds the problem. This connection between emotional state and eating is one of your most important patterns to understand.\n\nEarth energy is sensitive to dampness. High humidity, standing water, and excessively rich or sweet foods slow your system down and contribute to sluggishness and weight challenges. Light, clean, and regular meals do more for your wellbeing than almost any intervention.\n\nSimply eating at consistent times each day has a disproportionate impact on your energy, mood, and health. Don\'t underestimate the mundane power of routine.',
      lock: 'Your health-sensitive months this year — and a dietary and lifestyle guide for your Earth constitution.',
    },
  },
  '己': {
    title: 'Jǐ Earth (己) — The Fertile Soil',
    personality: 'Meticulous, pragmatic, and quietly brilliant at execution. Where others miss details, you catch them. Where others make broad plans, you make them work. You\'re not loud about your intelligence — you demonstrate it through results. Humble but certain in your own worldview, you are more capable than most people realize.',
    strength: 'Precision, practical intelligence, attentiveness, and genuine care for the people around you.',
    weakness: 'Anxiety and self-doubt can stop you at the threshold of opportunities. You over-analyze exits before you even walk through the door.',
    love: 'Quiet and deeply consistent in love. You show care through small, perfect gestures rather than grand declarations. The right person notices everything.',
    career: 'Accountant, administrator, pharmacist, nutritionist, planner, counselor. Precision, reliability, and structure are your territory.',
    health: 'Spleen and stomach are sensitive. Worry affects digestion directly. Regularity and stress management are foundational.',
    loveDetail: {
      tags: ['Subtle Caretaker', 'Small Gestures, Deep Meaning', 'Anxiety in Romance', 'Needs Consistent Reassurance'],
      body: 'Your love language is the small, perfect gesture — the coffee made exactly right, the remembered detail from a conversation weeks ago, the quiet presence when someone needs company but not words. To the right person, this feels like being truly seen.\n\nBut anxiety can destabilize your romantic life. "Do they still like me? Did I say something wrong? Are they pulling away?" — these questions run quietly in the background even in secure relationships. When they run loud, it can become a self-fulfilling pressure on your partner.\n\nYou\'re best matched with someone warm, communicative, and generous with reassurance. Not because you\'re needy — but because clarity calms your overactive mind and lets your genuine warmth flow freely.',
      lock: 'When romantic energy activates in your chart this year — and which season holds the most potential.',
    },
    wealthDetail: {
      tags: ['Precision Wealth Management', 'Steady Income Preferred', 'Watch the Small Leaks', 'Internal Wealth Builder'],
      body: 'You\'re not built for get-rich-quick energy, and you don\'t need it. Your financial pattern is about precision: minimize waste, accumulate steadily, and let compounding do the work over time. This approach builds real security.\n\nYour instinct to check twice and spend carefully means you typically don\'t make the catastrophic financial mistakes that follow impulsive decisions. You lose money in the small, habitual ways — recurring subscriptions you forgot, social expenses that add up — not in big blunders.\n\nLow-risk, steady investment vehicles like index funds or savings plans align well with your nature. Your financial strength grows with age and experience.',
      lock: 'The months when income rises this year — and your specific financial drain to identify and close.',
    },
    healthDetail: {
      tags: ['Gut-Worry Connection', 'Digestive Sensitivity', 'Prone to Overthinking', 'Routine is Your Medicine'],
      body: 'Your digestive system speaks the language of your emotions. When you worry — which is often — your gut reacts first. This isn\'t a weakness; it\'s a highly sensitive feedback system. The real problem is when you ignore what it\'s telling you.\n\nOverwork is a pattern for you. Your strong sense of responsibility means you take on more than your share, push past signals to rest, and arrive at exhaustion before you slow down. Building scheduled recovery time into your week isn\'t optional — it\'s maintenance.\n\nWarm, easy-to-digest foods eaten on a regular schedule do more for your wellbeing than almost any health protocol. The humble act of eating consistently and sleeping at regular times is genuinely transformative for your constitution.',
      lock: 'Your health-sensitive periods this year — and a stress management guide tailored to your Earth constitution.',
    },
  },
  '庚': {
    title: 'Gēng Metal (庚) — The Blade',
    personality: 'Direct, principled, and built with titanium will. You call it as you see it, stand firm when others fold, and honor commitments with a seriousness that most people can\'t match. Injustice genuinely troubles you. You have the kind of loyalty that people remember for a lifetime — and the uncompromising standards to match it.',
    strength: 'Decisive conviction, iron integrity, moral courage. In adversity, you sharpen rather than break.',
    weakness: 'Your directness can cut without intending to. You\'d rather be right than palatable, and the cost is sometimes isolation.',
    love: 'Quiet but profoundly loyal. Expressing feelings doesn\'t come naturally, but once given, your heart is given completely.',
    career: 'Military, law, law enforcement, surgeon, engineer, professional athlete. Environments demanding strength, precision, and integrity.',
    health: 'Lungs, large intestine, and skin need attention. Dry environments and overwork drain your Metal energy. Hydration is essential.',
    loveDetail: {
      tags: ['Speaks Through Action', 'Loyalty Above All', 'Jealousy Can Surface', 'Exterior vs. Interior'],
      body: 'You don\'t say "I love you" easily, but you show it constantly — in the reliability, the defense of your partner\'s name when they\'re not in the room, the quiet sacrifice that never gets announced. Partners who can read between the lines feel enormously secure with you.\n\nThe ones who need verbal expression and emotional performance may feel left out in the cold. This mismatch is the central challenge of your romantic life. Not your capacity to love — which is real and deep — but your channel for communicating it.\n\nBetrayal is your line in the sand. Dishonesty or disloyalty doesn\'t get forgiven easily and isn\'t forgotten. You are built for a partner with matching integrity — someone as serious about keeping commitments as you are.',
      lock: 'The romantic timing in your chart this year — and the cycle where relational tension requires attention.',
    },
    wealthDetail: {
      tags: ['Effort-Proportional Returns', 'Strong Timing Instinct', 'No Waste, No Excess', 'Long-Term Accumulation'],
      body: 'Your wealth equation is simple and honest: you earn what you work for, and you work harder than most. There\'s no shortcut in your chart — but your returns are real, durable, and yours.\n\nWhat sets you apart financially is your decision-making speed. When you spot an opportunity, you move. This timing instinct, combined with your research discipline, means your investments tend to perform. You don\'t speculate — you commit with conviction and follow through.\n\nYour spending is lean. You don\'t do waste. This means savings accumulate over time in a way that compounds into substantial security. Metal assets — real property, physical holdings, tangible investments — resonate with your energy.',
      lock: 'Your highest-yield financial windows this year — and the cycle where income surges are most likely.',
    },
    healthDetail: {
      tags: ['Lungs & Respiratory Watch', 'Large Intestine Sensitive', 'Autumn High-Risk Season', 'Hydration Critical'],
      body: 'Metal governs the lungs and large intestine — your most health-sensitive systems. Dry environments, poor air quality, and dehydration hit you harder than they do others. When you\'re running hard and not drinking enough water, your respiratory system and skin both signal the deficit.\n\nAutumn is your power season, but also your most physically vulnerable period. The shift into dry, cool air concentrates respiratory and skin challenges. This is the season to build in proactive care rather than reactive response.\n\nWhite foods — pear, radish, lotus root — support your lungs in the traditional system. Adequate water throughout the day is the single most impactful habit for your constitution. When your body signals rest, it means it more urgently than for other types.',
      lock: 'Your lung and immune vulnerability windows this year — and your Metal constitution health guide.',
    },
  },
  '辛': {
    title: 'Xīn Metal (辛) — The Polished Gem',
    personality: 'You are precise, refined, and operating at a standard others rarely achieve. Aesthetic intelligence is second nature — you notice quality, craft, and dissonance in ways most people simply don\'t. Underneath the polish is a sharp, analytical mind and a perfectionism that drives extraordinary results, even if it sometimes drives you to the edge.',
    strength: 'Exquisite attention to detail, high aesthetic intelligence, sharp intuition, and the discipline to make things excellent.',
    weakness: 'Perfectionism can paralyze execution. Small failures sting disproportionately. You are your own harshest critic.',
    love: 'You\'ve built a precise picture of what you want and won\'t easily compromise it. Romantic and idealistic at heart, but prone to holding the real thing to an impossible standard.',
    career: 'Designer, artist, researcher, writer, dermatologist, jeweler, aesthetician. Wherever precision and beauty intersect.',
    health: 'Lungs, respiratory system, and skin are your sensitive points. Stress shows on your skin. Air quality matters to you more than to most.',
    loveDetail: {
      tags: ['High Romantic Standards', 'Detail-Oriented Partner', 'Easily Wounded', 'Atmosphere and Elegance Matter'],
      body: 'Your ideal relationship looks like a well-crafted scene: considered, beautiful, resonant. This standard isn\'t unreasonable — you feel things at a depth that makes ordinary romance feel hollow. When you find someone who rises to it, the connection is extraordinary.\n\nThe risk is that your internal critic applies to your partner as well. You notice everything — the inconsistency, the overlooked detail, the gap between what was promised and delivered. These are real signals sometimes. But sometimes they\'re perfectionism applied where grace would serve better.\n\nYou attract people easily; your challenge is staying long enough to let something real develop past the initial assessment. Lowering the standard slightly — while keeping your core values intact — is where lasting love becomes possible.',
      lock: 'The romantic cycle in your chart this year — and the timing when connection deepens or turns.',
    },
    wealthDetail: {
      tags: ['Premium Output = Premium Pay', 'Brand Value as Asset', 'Perfectionism Slows Launch', 'Aesthetic Work Richly Rewarded'],
      body: 'You are paid for quality, not quantity. The more you establish yourself as the person who does something at the highest level, the more your income reflects it. Your financial path is about reputation, not volume.\n\nThe obstruction is often internal. Waiting for something to be perfect before releasing it costs real money and momentum. Learning when "excellent" is good enough — not perfect, but excellent — is a financial skill as much as a creative one.\n\nInvest in your public presentation and professional image. For Xīn Metal, the packaging is genuinely part of the product, and it returns income. Aesthetic fields at the premium end of the market are where your earning potential concentrates.',
      lock: 'Your income surge windows this year — and the financial timing worth acting on quickly.',
    },
    healthDetail: {
      tags: ['Skin Reflects Stress', 'Respiratory Sensitivity', 'Air Quality Matters', 'Perfectionism Taxes the Body'],
      body: 'Your skin is your health barometer. When stress levels rise, your skin responds — breakouts, dryness, sensitivity — before other symptoms appear. Take these signals seriously rather than covering them.\n\nYou\'re more affected by air quality than most people. On poor air days, or in spaces that aren\'t ventilated well, you experience more head pressure, fatigue, and respiratory irritation. Clean air is a genuine wellbeing priority.\n\nThe hidden health drain is perfectionism itself. The chronic low-level stress of never feeling your work is good enough quietly taxes every system in your body. Self-compassion isn\'t just good psychology for you — it\'s medicine.',
      lock: 'Your skin and respiratory health windows this year — and the seasonal guide for your Metal constitution.',
    },
  },
  '壬': {
    title: 'Rén Water (壬) — The Deep River',
    personality: 'Flowing, intelligent, and endlessly adaptable — you carry the energy of a great river that finds its way around every obstacle. Your mind moves fast and wide. Curiosity is not something you practice; it\'s something you are. You see patterns others miss, absorb information at unusual speed, and navigate changing environments better than almost anyone.',
    strength: 'Wisdom, versatility, adaptive intelligence, and a visionary quality that sees over the horizon.',
    weakness: 'Staying in one place for long challenges you. Scattered focus and inconsistency are the price of your expansive nature.',
    love: 'Intellectually driven attraction, freedom as non-negotiable, and genuine warmth for the right person. You need space — and a partner who understands that.',
    career: 'International trade, travel, diplomacy, philosophy, writer, tech, investment. Fields with movement, information, and global scope.',
    health: 'Kidneys, bladder, and joints are your vulnerable points. Alcohol and caffeine in excess deplete you. Cold exposure in winter is a real risk.',
    loveDetail: {
      tags: ['Intellectual Attraction', 'Freedom Non-Negotiable', 'Hates Possessiveness', 'Needs Mental Stimulation'],
      body: 'You fall in love with minds. The person who makes a conversation shift direction, who references something unexpected, who keeps up with your river of ideas — that person holds your attention in a way that raw physical attraction alone never could.\n\nBeing controlled or tracked erodes trust faster for you than for most. "Where are you?" followed by expectation is a slow relationship killer. You need a partner who chooses to be there, not one who needs to be monitored — and who offers you the same freedom in return.\n\nThe growth work for Rén Water in love is commitment persistence. Your interest is genuine when present; but maintaining it through the unremarkable stretches of long-term partnership requires intention you don\'t always apply.',
      lock: 'The relationship turning points in your chart this year — and when connection deepens or shifts.',
    },
    wealthDetail: {
      tags: ['Information as Income', 'Global Opportunity Affinity', 'Diverse Portfolio', 'First-Mover Advantage'],
      body: 'Your wealth comes from information and speed. You process market signals faster than most, and your ability to adapt positions you for first-mover advantages in emerging spaces. Tech, international markets, and rapidly evolving industries are your natural terrain.\n\nGlobal connections are disproportionately valuable for you. An introduction from the right person in the right city can change your financial trajectory. Don\'t underestimate the return on cultivating your international network.\n\nThe risk is spreading too thin. Diversification is a strength up to a point; beyond that, it fragments returns. Pick your core positions and invest in understanding them deeply before you add more.',
      lock: 'The global opportunity windows in your year and the specific months your financial energy peaks.',
    },
    healthDetail: {
      tags: ['Kidneys & Bladder Watch', 'Joint Care Needed', 'Alcohol Risk', 'Winter Cold Dangerous'],
      body: 'Water governs the kidneys and bladder — your foundational energy organs. When you deplete them through overwork, excessive alcohol, irregular sleep, or prolonged cold exposure, the effects move through your entire system. Lower back pain, deep fatigue, and poor water processing are the signals to watch.\n\nYour active nature puts load on your joints over time — knees and hips especially. Regular stretching and low-impact strength work extend your functional range into later decades.\n\nWinter (November through January) is your most physically sensitive period. Keeping your lower back and abdomen warm is more important than most realize. Black foods — black sesame, black beans, seaweed — traditionally nourish the kidney system associated with your constitution.',
      lock: 'Your health vulnerability windows this year — and the kidney and joint care guide for your Water constitution.',
    },
  },
  '癸': {
    title: 'Guǐ Water (癸) — The Dewdrop & Rain',
    personality: 'Quiet, perceptive, and operating at a depth that surprises people when they finally get close. You are the still water that reflects what others walk past without seeing. Your intuitive intelligence is profound — you sense truth before it\'s spoken, read emotional undercurrents in a room, and understand people at a level that both draws them to you and occasionally unnerves them.',
    strength: 'Deep intuition, emotional attunement, fluid intelligence, and a mysterious presence that people find compelling.',
    weakness: 'Overthinking can paralyze. Emotional sensitivity creates highs that are genuinely beautiful and lows that are genuinely hard.',
    love: 'Profoundly felt, romantically rich, and deeply personal. You love through resonance — through the subtle, the unsaid, the felt.',
    career: 'Psychologist, philosopher, writer, musician, spiritual teacher, researcher, healer. Depth is your domain.',
    health: 'Kidneys, bladder, and hormonal systems are sensitive. Cold is your adversary. Keep warm, especially the abdomen.',
    loveDetail: {
      tags: ['Mysterious Magnetic Quality', 'Deeply Emotional Lover', 'Mood Sensitivity Watch', 'Seeks Soul-Level Connection'],
      body: 'There\'s something about you that people can\'t quite name but can\'t stop noticing. You don\'t announce yourself — you draw people in with a subtle gravity that\'s hard to explain and even harder to resist.\n\nYou don\'t fall in love with surfaces. What captivates you is interior depth — the quality of someone\'s attention, the way they hold difficulty, the unspoken understanding that passes between you. Relationships that can\'t go beyond the surface drain rather than nourish you.\n\nYour sensitivity is both your greatest romantic gift and your most significant vulnerability. A careless comment, a subtle withdrawal of warmth, a minor inconsistency — all of these register deeply. Learning to distinguish signal from noise, real threat from imagined, is the central work of your emotional life.',
      lock: 'The timing of significant romantic energy in your year — and the season to be most emotionally careful.',
    },
    wealthDetail: {
      tags: ['Intuition-Guided Investment', 'Creative Fields Lucrative', 'Irregular Income Pattern', 'Depth Creates Value'],
      body: 'Your financial sixth sense is real. You sense opportunity, misalignment, and timing in ways that don\'t reduce to data alone. When you trust this — and pair it with research — your investment instincts tend to be accurate.\n\nYour income pattern is irregular rather than steady. Peak periods can be genuinely abundant; slow periods require reserves you may not have built. Creating a savings buffer during your high seasons is the single most stabilizing financial move available to you.\n\nCreative, therapeutic, and wisdom-based fields — psychology, writing, spiritual work, depth consulting — align with both your nature and your financial potential. As you develop mastery, your earning capacity in these spaces grows significantly.',
      lock: 'The income surge windows and vulnerability periods in your financial year ahead.',
    },
    healthDetail: {
      tags: ['Kidney & Hormone System', 'Cold is Your Adversary', 'Emotional Drain → Immunity Drop', 'Winter Maximum Caution'],
      body: 'Your deepest physical vulnerability lies in the kidneys, adrenals, and hormonal system. When you\'re emotionally depleted, your immune function drops in tandem — there is no clear line between your emotional and physical energy.\n\nCold is genuinely harmful to your constitution in a way that isn\'t true for everyone. Cold food, cold environments, sitting on cold surfaces — these quietly drain the foundational energy your constitution depends on. Keeping your lower abdomen and lower back warm year-round is simple, specific, and important.\n\nWinter is your highest-risk season. Dark foods in the traditional system nourish your kidney energy: black sesame, black beans, dark seaweed, miso. Warm water over cold, always. Consistency in warmth maintenance pays significant health dividends.',
      lock: 'Your health-sensitive months this year — and a complete Water constitution guide for your specific vulnerabilities.',
    },
  },
}

// ─── Five Element Energy Profiles ───
export const ELEMENT_PROFILE: Record<string, {
  emoji: string
  keyword: string
  strong: { traits: string[]; desc: string; shadow: string }
  weak: { traits: string[]; desc: string; tip: string }
}> = {
  wood: {
    emoji: '🌿',
    keyword: 'Growth · Drive · Vitality',
    strong: {
      traits: ['Powerful drive', 'Pioneer spirit', 'Embraces challenge', 'Optimistic outlook', 'Natural leadership'],
      desc: 'Dominant Wood energy means you are continuously reaching — toward goals, toward growth, toward something better. You\'re the person who starts things, who sees possibility before others do, who pushes through walls that stop others cold. There\'s a spring-like aliveness to how you move through the world.',
      shadow: 'That same drive can push you into overextension — too many projects, too much speed, not enough finish. When Wood energy runs unchecked, stubbornness hardens and flexibility disappears. The tree needs deep roots, not just height.',
    },
    weak: {
      traits: ['Starting feels difficult', 'Low drive periods', 'Decision hesitation', 'Loss of direction'],
      desc: 'When Wood energy is deficient, the impulse to begin stalls. You know what you want to do, but initiating feels heavier than it should. Motivation comes in fits and starts, and the direction you felt so certain about last week feels blurry today.',
      tip: 'Spend time in living green environments — trees, parks, natural settings. Start your morning by waking with the light when possible. Begin with small, completable goals to rebuild your sense of forward motion. Sour foods and green vegetables support your Wood system.',
    },
  },
  fire: {
    emoji: '🔥',
    keyword: 'Passion · Expression · Presence',
    strong: {
      traits: ['Magnetic presence', 'Expressive power', 'Contagious enthusiasm', 'Strong intuition', 'Social ease'],
      desc: 'Fire energy at full strength makes you the warmth in the room — the person who makes conversations memorable and ordinary moments feel alive. Your enthusiasm is genuine, your expression is rich, and the inspiration you generate in others is a real gift you bring without effort.',
      shadow: 'The same flame that warms can consume. Impulsive decisions made from the heat of the moment, emotional volatility, and the tendency to ignite fast and cool unexpectedly — these are the shadow patterns of strong Fire. The embers need tending, not just the flame.',
    },
    weak: {
      traits: ['Self-confidence dips', 'Expression feels blocked', 'Enthusiasm fades quickly', 'Feeling unseen'],
      desc: 'When Fire energy is low, your natural vibrancy dims. Presenting yourself, starting conversations, or bringing energy to a room all feel harder than they should. A quiet sense of invisibility can creep in.',
      tip: 'Wear warm colors — reds, oranges, deep yellows. Move your body with intensity at least a few times a week. Practice speaking more than you listen in small, safe settings. Bitter flavors and red foods support your Fire system.',
    },
  },
  earth: {
    emoji: '🌍',
    keyword: 'Stability · Trust · Groundedness',
    strong: {
      traits: ['Deep reliability', 'Genuine warmth', 'Unshakeable steadiness', 'Strong responsibility', 'Natural centeredness'],
      desc: 'Earth energy dominant means you are the ground other people stand on. Your stability isn\'t performed — it simply is. You carry weight without breaking. Your presence in people\'s lives is the kind they only fully appreciate when it\'s gone. You are the person who holds the center when everything else shifts.',
      shadow: 'The mountain that never moves can also never explore new terrain. Strong Earth can harden into immovability — resisting change, digging in rather than adapting, letting caution become stagnation. The soil needs occasional turning to stay fertile.',
    },
    weak: {
      traits: ['Groundlessness', 'Difficulty settling', 'Indecision', 'Anxiety about the future'],
      desc: 'When Earth energy is insufficient, a sense of floating — of not quite landing anywhere — characterizes the experience. Decisions feel unstable, the future feels unreliable, and small disruptions feel disproportionately unsettling.',
      tip: 'Walk barefoot on natural ground when possible. Create and hold a simple daily routine. Warm, nourishing foods eaten at regular times are the most direct Earth energy supplement. Yellow and golden colors support this system.',
    },
  },
  metal: {
    emoji: '⚡',
    keyword: 'Clarity · Principle · Precision',
    strong: {
      traits: ['Decisive', 'Principled to the core', 'Fast execution', 'Sharp discernment', 'Reliable under pressure'],
      desc: 'Metal energy at strength means you cut through noise directly to what matters. Your judgment is swift, your commitment is real, and your integrity isn\'t situational — it\'s structural. You are the person who says the true thing even when it\'s uncomfortable, who keeps their word when it would be easier not to.',
      shadow: 'Precision without mercy becomes harshness. The rigid edge that cuts straight can also cut the people beside you. Strong Metal can make compromise feel like failure, and isolation can follow from an unwillingness to meet people where they are.',
    },
    weak: {
      traits: ['Difficulty deciding', 'Execution stalls', 'Inconsistent follow-through', 'Principles shift situationally'],
      desc: 'When Metal energy is low, you find yourself second-guessing, starting things you don\'t finish, and struggling to hold to commitments you genuinely intended to keep. The capacity to draw clean lines and follow through on them is temporarily inaccessible.',
      tip: 'Set clear, specific intentions with deadlines you write down. Honor small commitments to yourself first — this rebuilds your Metal foundation. White, gold, and silver colors and clean, organized spaces support this energy.',
    },
  },
  water: {
    emoji: '💧',
    keyword: 'Wisdom · Flow · Intuition',
    strong: {
      traits: ['Deep wisdom', 'Remarkable adaptability', 'Sharp intuition', 'Long-range vision', 'Fluid intelligence'],
      desc: 'Water energy dominant means you see what others overlook. You navigate complexity and ambiguity with a fluidity that looks effortless but represents genuine intelligence. You absorb information from the environment, read below-surface dynamics accurately, and find paths through obstacles that others don\'t even perceive as navigable.',
      shadow: 'A river without banks is a flood. Unlimited Water can dissolve into directionlessness — overthinking that produces no action, instability disguised as flexibility, anxiety wearing the mask of intuition. The water needs a channel to move with purpose.',
    },
    weak: {
      traits: ['Intuition feels clouded', 'Rigidity increases', 'Adapting feels effortful', 'Wisdom feels inaccessible'],
      desc: 'When Water energy is deficient, the usual fluency in reading situations and adapting disappears. Thinking becomes more rigid, decisions feel harder to trust, and the natural knowing that normally guides you runs quiet.',
      tip: 'Drink more water — genuinely. Spend time near water: ocean, river, rain, even a bath. Meditation and reflective writing activate your Water system. Dark-colored foods — black sesame, dark beans, seaweed — nourish the kidney system associated with Water energy.',
    },
  },
}

// ─── Life Period Fortunes ───
export function getLifePeriodFortune(
  yearStemHanja: string,
  yearBranchHanja: string,
  monthStemHanja: string,
  dayStemHanja: string,
  hourPillar: boolean
) {
  const earlyFortune: Record<string, string> = {
    '甲': 'Your early years carry a stable, supportive foundation. Leadership instincts emerge young — you were the one with opinions, with direction, possibly with friction against authority figures who didn\'t know what to do with someone so certain of themselves. The push-and-pull with parents or teachers often strengthened you more than it wounded you.',
    '乙': 'Your early years are characterized by warmth and relational richness. You grew up sensitive to the emotional atmosphere around you, which developed your remarkable people-reading ability. Creative and empathetic tendencies showed up early, often expressed through art, music, or deep friendships.',
    '丙': 'Bright, socially engaged, and visibly energetic from the start. You were noticed early — in school, in family gatherings, in any group setting. Your expressive personality drew both attention and affection, and leadership roles found you as much as you found them.',
    '丁': 'A quieter, more interior early life. You watched more than you spoke, processed more than you expressed, and formed a rich inner world before anyone fully appreciated the depth developing there. Early on, you likely became fascinated by a particular subject or question that still shapes you today.',
    '戊': 'Stable and steady from the beginning. Your early environment offered security more than turbulence, and you absorbed the value of reliability early. You were the responsible one — sometimes to a fault — and adults found you unusually trustworthy.',
    '己': 'A thoughtful, attentive child who noticed what others missed. Your early sensitivity formed the foundation of your capacity for genuine care. Anxiety may have been present alongside this sensitivity — the inner world was always active, sometimes overactive.',
    '庚': 'Independent and willful from early on. You questioned rules that didn\'t make sense, pushed back against authority when you sensed inconsistency, and developed a strong internal compass that operated separately from external validation.',
    '辛': 'Perceptive and aesthetically aware from the beginning. You likely had refined tastes early — in music, in visual environments, in the quality of what surrounded you. A perfectionist tendency formed early and became the engine of your later excellence.',
    '壬': 'Curious, active, and endlessly interested in the world from childhood. Your early years were characterized by wide-ranging engagement — different activities, different friend groups, different interests — building an adaptability that became one of your core assets.',
    '癸': 'A quiet, interior early life with a rich imaginative world. You absorbed emotional atmospheres deeply and may have felt the weight of what others around you were feeling before you had the language to describe it. Intuitive capacity showed itself early.',
  }

  const middleFortune: Record<string, string> = {
    '甲': 'Your middle years are when your leadership fully comes into its own. Professionally and personally, you step into positions of genuine influence. The efforts of your earlier years consolidate into tangible outcomes. Protect your health during this season — the momentum can tempt overreach.',
    '乙': 'Your network is the engine of your middle years. Relationships built and tended carefully begin returning significant value — in opportunities, in support, in collaborative ventures. The people who know you become the path to your most important achievements.',
    '丙': 'Your most publicly visible chapter. Recognition, expanded social reach, and active achievement define this period. You\'re in your element — moving, connecting, building. The caution is spending your energy in every direction; choose where to focus.',
    '丁': 'Expertise reaches its peak. The years of deep, concentrated effort become visible in a way they couldn\'t before — as reputation, authority, and mastery that others recognize and seek out. Financial stability arrives with this recognition.',
    '戊': 'Your middle years deliver on the foundation you\'ve built. Asset accumulation, institutional credibility, and social trust converge. You become the steady center for people around you in new ways — in family, in community, in organization.',
    '己': 'Quiet, incremental progress accumulates into real results. This isn\'t a period of dramatic peaks — it\'s a period of genuine solidity. The careful, detailed work of your earlier years compounds into security and capability.',
    '庚': 'Bold decisions define your middle chapter. You\'re willing to take decisive turns — in career, in relationships, in personal reinvention — that others hesitate to make. These choices, made from strength and conviction, tend to open doors rather than close them.',
    '辛': 'Refinement peaks. Your professional identity and aesthetic excellence reach a level of recognition that justifies the years of demanding, detail-oriented work. This is when others begin to describe you as the best at what you do.',
    '壬': 'Expansive, active, and internationally oriented. Your middle years bring you into contact with wider opportunity — cross-border connections, large-scale networks, and diverse environments where your adaptive intelligence finds its fullest expression.',
    '癸': 'Your wisdom becomes currency. Years of depth, observation, and interior development transform into recognized insight. In your field and in your relationships, people seek your perspective in ways they didn\'t when you were younger.',
  }

  const lateFortune: Record<string, string> = {
    '甲': 'Your later years carry the dignity of a tree that has weathered storms and still stands tall. The reputation you\'ve built, the people whose lives you\'ve shaped, and the work that outlasts you — these become your legacy. Health-tended, you remain active and purposeful well into old age.',
    '乙': 'Rich in relationship and warmth, your later years are surrounded by the people your care has gathered across a lifetime. You remain connected, appreciated, and genuinely loved in a way that reflects who you\'ve been to others.',
    '丙': 'Your warmth remains. Even in later life, you carry an energy that people find brightening — you haven\'t dimmed. Financial planning in earlier years pays off here; the question is whether you prepared as energetically as you lived.',
    '丁': 'Deep peace characterizes your later years. The questions you\'ve spent a lifetime contemplating begin to find their answers, and the wisdom you\'ve accumulated becomes a genuine contribution to those around you. Philosophical and spiritual depth defines this chapter.',
    '戊': 'Secure, respected, and surrounded by family and community — your later years are the harvest of decades of reliable, responsible living. The ground you built on remains solid, and those who planted their lives near you continue to draw from that foundation.',
    '己': 'Quiet, genuine contentment. Your later years hold the warmth of relationships carefully maintained and the satisfaction of a life well-attended. You continue to find meaning in the small, the real, and the close.',
    '庚': 'You retain your edge and your principles into old age. The integrity that defined your younger years remains intact and respected. Physical vitality, supported by care, allows for an active and engaged later chapter.',
    '辛': 'Graceful and polished to the end. Your aesthetic sense, your refined perspective, and the quality of what you\'ve built carry their worth into your later years. The shift from perfection as pressure to perfection as pleasure is the work of this chapter.',
    '壬': 'Still moving, still curious, still finding new terrain to explore. Your later years hold an energy that most people half your age lack. Travel, new learning, and continued engagement with the wider world mark this season well.',
    '癸': 'Quiet but profound wisdom defines your later years. The depth you\'ve spent a lifetime developing becomes something you genuinely inhabit rather than just possess. Inner peace, spiritual insight, and the satisfaction of having lived at depth characterize this chapter.',
  }

  const branchWealth: Record<string, string> = {
    '子': 'Wealth flows quickly in and out. Your financial energy is fluid — income can be strong, but so can outflow. Building automatic saving systems is the highest-leverage financial habit available to you.',
    '丑': 'Slow, steady, and solid. Real estate and stable long-term investments align especially well with your wealth energy. The patient approach wins for you consistently.',
    '寅': 'Active effort generates income. Proactive pursuit of opportunities — especially in the early stages of a venture — produces disproportionate returns. Your wealth comes from moving, not waiting.',
    '卯': 'People are your wealth path. The right connection, the referral from someone who trusts you, the collaboration — this is how your financial doors open. Invest in relationships as consciously as you invest in skills.',
    '辰': 'Large wealth events are part of your pattern — periods when significant money arrives at once. Real estate and land hold particular resonance. Manage windfalls carefully; they arrive sporadically.',
    '巳': 'Knowledge and expertise are your most reliable wealth generators. The more specialized and recognized your skills become, the higher your financial ceiling rises. Invest in learning.',
    '午': 'You can earn significantly and spend just as freely. Financial peaks can be high; the discipline is keeping what comes in. Conscious boundaries around spending protect the wealth your income generates.',
    '未': 'Stable, service-oriented wealth. Financial services, hospitality, and helping professions show consistent returns. Slow and reliable builds your security.',
    '申': 'Your analytical mind generates investment returns. Quick, data-informed decisions tend to perform well. The instinct to act decisively, when informed, is an asset rather than a risk.',
    '酉': 'Meticulous management means little wealth escapes your attention. You may not generate the largest sums, but you keep more of what you earn than most. Compounding works powerfully in your favor.',
    '戌': 'Effort is faithfully rewarded. Your wealth accumulates in direct proportion to your input — there\'s no shortcut, but there\'s also no ceiling on what sustained effort builds. Patience with your timeline is essential.',
    '亥': 'Intuitive investments and wisdom-based decisions are your financial edge. Water, maritime, logistics, and distribution industries hold unexpected wealth connections for your energy.',
  }

  return {
    early: earlyFortune[yearStemHanja] || 'Early life fortune data loading...',
    middle: middleFortune[monthStemHanja] || 'Middle years fortune data loading...',
    late: lateFortune[dayStemHanja] || 'Later years fortune data loading...',
    wealth: branchWealth[yearBranchHanja] || 'Wealth pattern data loading...',
  }
}

// ─── Monthly Fortune (Current Year) ───
export function getMonthlyFortune(year: number, dayStemHanja: string): { month: number; fortune: string; level: number }[] {
  const base = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'].indexOf(dayStemHanja)
  const seed = (year + base) % 5

  const templates = [
    ['Strong launch energy. Set your intentions clearly — actions taken now carry further than usual.', 'Financial upswing. An unexpected income opportunity may present itself.'],
    ['Interpersonal friction possible. Emotional steadiness is your most valuable tool this month.', 'Pay attention to your body. Rest and recovery deserve priority.'],
    ['Opportunity month. The preparation you\'ve been doing is ready to meet its moment.', 'Romantic energy rises. A meaningful connection is in range.'],
    ['Hold your ground and explore selectively. Stability and controlled experimentation work together.', 'Contracts and major decisions: approach with care and patience.'],
    ['Wealth flows this month. Prioritize saving and building on the momentum.', 'Career energy peaks. Collaboration with colleagues or leadership produces strong results.'],
  ]

  return Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    fortune: templates[(seed + i) % templates.length][(i + base) % 2],
    level: ((seed + i + base) % 5) + 1,
  }))
}
