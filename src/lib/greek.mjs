import { glossaryIndex } from "./glossary.mjs";

/**
 * The Greek in *Leviathan*, glossed, with the Hebrew and Aramaic at the end
 * because most of it reaches Hobbes through the Septuagint anyway.
 *
 * He has more Greek than Latin and uses it differently. The Latin is mostly
 * terms of art; the Greek is mostly etymology, produced to show that a word the
 * Church has made into a mystery began as an ordinary word for an ordinary
 * thing — a bishop is an overseer, a minister does errands, excommunication is
 * being put out of the meeting.
 *
 * The 1651 text transliterates without accents and the printer guesses at the
 * endings, so headwords keep his spelling. `find` is what `glossary.mjs` looks
 * for in the chapter text; see latin.mjs for the sibling list.
 */
export const GROUPS = [
  {
    id: "no-english",
    title: "No name in our tongue",
    blurb:
      "His own phrase, from the passage on *makarismos*. Hobbes reaches for Greek where he thinks English has nothing to reach for, and says so. Two of these are the foundations of his account of reasoning and of law.",
  },
  {
    id: "person",
    title: "Person, owner, belief",
    blurb:
      "Three places where he sets the Greek beside the Latin to fix a definition. Each has a facing entry in the Latin glossary.",
  },
  {
    id: "church",
    title: "The church and its officers",
    blurb:
      "The heart of Part III's method: take the Greek of the New Testament, translate it as any other Greek would be translated, and watch the claim to power in it fall away.",
  },
  {
    id: "hell",
    title: "Hell, and who is in it",
    blurb:
      "Four words the English Bible leaves standing as proper names for places and persons. Hobbes translates them back into common nouns, and the geography of the next world goes with them.",
  },
  {
    id: "schools",
    title: "The schools",
    blurb: "Where the philosophers taught, what they were called for it, and what they said when they had nothing to say.",
  },
  {
    id: "hebrew",
    title: "Hebrew and Aramaic",
    blurb:
      "Thin, and mostly arriving through the Septuagint or the Vulgate rather than direct. Hobbes reads no Hebrew to speak of, and says so more or less openly by always quoting somebody's translation of it.",
  },
];

export const TERMS = [
  {
    group: "no-english",
    term: "Logos",
    script: "λόγος",
    lang: "grc",
    literal: "speech, reason, account",
    find: ["Logos"],
    gloss:
      "One Greek word where Latin has two, *ratio* and *oratio*, and Hobbes takes the single word as evidence rather than coincidence: not that there is no speech without reason, but that there is no reasoning without speech. The act of it they called *syllogisme*, a summing up. All of [reason](/concepts/reason/) as reckoning follows from this paragraph.",
  },
  {
    group: "no-english",
    term: "Nomos",
    script: "νόμος",
    lang: "grc",
    literal: "distribution",
    find: ["Nomos"],
    gloss:
      "\"They well knew of old, who called that *Nomos*, (that is to say, Distribution,) which we call Law.\" The etymology carries the argument of Chapter 24: property is not found but dealt out, and it is dealt out by the sovereign, so justice is defined by giving every man his own — where \"his own\" is whatever the distribution made his.",
  },
  {
    group: "no-english",
    term: "Makarismos",
    script: "μακαρισμός",
    lang: "grc",
    literal: "a pronouncing blessed",
    find: ["Makarismos"],
    gloss:
      "\"For which we have no name in our tongue.\" Praise is of goodness, magnifying is of power, and this is of a man's [felicity](/concepts/felicity/) — the third of a set the English language leaves incomplete, and one of the few places Hobbes admits a gap he cannot fill.",
  },
  {
    group: "no-english",
    term: "Pleonexia",
    script: "πλεονεξία",
    lang: "grc",
    literal: "having more",
    find: ["pleonexia"],
    gloss:
      "A desire of more than your share, and the Greek name for breaking the ninth law of nature, which commands the acknowledgement of natural equality. The observers of that law are the modest; the breakers are arrogant men.",
  },
  {
    group: "no-english",
    term: "Orme, Aphorme",
    script: "ὁρμή, ἀφορμή",
    lang: "grc",
    literal: "impulse toward, impulse away",
    find: ["orme and aphorme"],
    gloss:
      "The Greek for appetite and aversion, which Hobbes notes both signify motions — one of approaching, the other of retiring. He wants the physical sense: the passions are small beginnings of motion, and the languages agree with him, which is why nature \"presse[s] upon men those truths\" they later stumble at. See [endeavour](/concepts/endeavour/).",
  },
  {
    group: "no-english",
    term: "Zogria",
    script: "ζωγρία",
    lang: "grc",
    literal: "taking alive",
    find: ["Zogria"],
    gloss:
      "What we call quarter. The Greek says what the thing is: the victor has not given a life but deferred taking one, so a man who has quarter holds it at discretion and owes service from the moment he is trusted with his liberty.",
  },
  {
    group: "person",
    term: "Prosopon",
    script: "πρόσωπον",
    lang: "grc",
    literal: "face",
    find: ["Prosopon"],
    gloss:
      "The Greek for what Latin calls *persona*, the mask. Hobbes puts them side by side to establish that a [person](/concepts/person/) is a part borne rather than a soul possessed — and the whole apparatus of representation, and so the common-wealth, rests on it.",
  },
  {
    group: "person",
    term: "Kurios",
    script: "κύριος",
    lang: "grc",
    literal: "owner, lord",
    find: ["Kurios"],
    gloss:
      "Beside the Latin *dominus*. What an owner is to goods, an author is to actions: the right of possession is dominion, the right of doing is authority, and the parallel is exactly what makes authorising a sovereign intelligible.",
  },
  {
    group: "person",
    term: "Pisteno Eis, Pisteno Anto",
    script: "πιστεύω εἰς, πιστεύω αὐτῷ",
    lang: "grc",
    literal: "I believe into, I believe him",
    find: ["Pisteno"],
    gloss:
      "\"Never used but in the writings of Divines,\" like the Latin *credo in*. Ordinary Greek and ordinary Latin say I believe him. Splitting faith in a man from belief of what he says is what later lets Hobbes hold that belief cannot be commanded, only profession.",
  },
  {
    group: "church",
    term: "Ecclesia",
    script: "ἐκκλησία",
    lang: "grc",
    literal: "an assembly called out",
    find: ["Ecclesia"],
    gloss:
      "Chapter 39 is a chapter about this one word. It means a lawful assembly of citizens summoned by public authority — the sense it has at Acts 19, where the town clerk uses it of a riot — and everything Hobbes wants follows: a [church](/concepts/church/) is an assembly, an assembly needs someone with authority to call it, and there is no such person but the civil sovereign.",
  },
  {
    group: "church",
    term: "Episcopus",
    script: "ἐπίσκοπος",
    lang: "grc",
    literal: "an overseer",
    find: ["Episcopus"],
    gloss:
      "\"Bishop, a word formed in our language, out of the Greek *Episcopus*, signifieth an overseer, or Superintendent of any businesse.\" A job, taken by metaphor from shepherds, and applied to kings as readily as to pastors. The office is not a rank in a hierarchy that the word by itself can be made to prove.",
  },
  {
    group: "church",
    term: "Diakonos",
    script: "διάκονος",
    lang: "grc",
    literal: "one who does another's errands",
    find: ["Diakonos"],
    gloss:
      "The word behind \"minister,\" and it differs from a servant only in being bound by an undertaking rather than by condition. Those who teach the word of God are ministers in exactly the sense in which those who look after the tables are.",
  },
  {
    group: "church",
    term: "Proestotes",
    script: "προεστῶτες",
    lang: "grc",
    literal: "those who stand in front",
    find: ["proestotes"],
    gloss:
      "Presidents of an assembly, the Latin *antistites*. The office is procedural — count the votes, declare the result, and break a tie by adding your own — which is precisely as much authority as Hobbes will grant the elders who bore the name.",
  },
  {
    group: "church",
    term: "Aposunagogon Poiein",
    script: "ἀποσυνάγωγον ποιεῖν",
    lang: "grc",
    literal: "to make out of the synagogue",
    find: ["Aposunagogon"],
    gloss:
      "Excommunication in the original: to put a man out of the meeting. Drawn from the Jewish custom of casting out the contagious as lepers were separated, and, translated, no more terrible than being left out of a congregation — no punishment a civil power need recognise, and none at all against a sovereign.",
  },
  {
    group: "church",
    term: "Upakouei",
    script: "ὑπακούει",
    lang: "grc",
    literal: "hearkens to",
    find: ["upakouei"],
    gloss:
      "St. Paul's word at 2 Thessalonians 3, which Bellarmine reads as \"obey\" to make the Epistles into laws. Hobbes points out that it covers hearkening to counsel as well as to command, and that Paul's remedy — avoid his company, that he may be ashamed — is not what legislators do.",
  },
  {
    group: "church",
    term: "Paraggelias Edokamen",
    script: "παραγγελίας ἐδώκαμεν",
    lang: "grc",
    literal: "we gave you instructions",
    find: ["paraggelias"],
    gloss:
      "Equivalent, Hobbes says, to *paredokamen*, what we delivered to you. So the \"commandements\" of 1 Thessalonians 4:2 are things handed over, and the traditions of the Apostles are counsel rather than law: despising them despises God, but no man is beaten or amerced for it.",
  },
  {
    group: "church",
    term: "Logos Theou, Theologia",
    script: "λόγος θεοῦ, θεολογία",
    lang: "grc",
    literal: "word of God, God-talk",
    find: ["Logos Theou"],
    gloss:
      "In scriptural Greek, which keeps many Hebraisms, the word of God often means not what God says but what is said concerning God — so *logos theou* and *theologia* are one thing, the doctrine of religion, which is what we call divinity. A great deal of the authority claimed for scripture rests on not noticing this.",
  },
  {
    group: "church",
    term: "Periousios, Epiousios",
    script: "περιούσιος, ἐπιούσιος",
    lang: "grc",
    literal: "over and above, for the day",
    find: ["periousios"],
    gloss:
      "The pair behind \"a peculiar people\" at Titus 2:14 and \"daily bread\" in the Lord's Prayer. Hobbes uses the opposition to justify the Vulgate's *peculium* against the King James's \"peculiar treasure\": what is meant is a possession set aside, not a compliment paid.",
  },
  {
    group: "church",
    term: "Delosin Kai Aletheian",
    script: "δήλωσιν καὶ ἀλήθειαν",
    lang: "grc",
    literal: "evidence and truth",
    find: ["delosin"],
    gloss:
      "The Septuagint's rendering of the Urim and Thummim, which Bellarmine takes for a gift of near-infallibility to the High Priest. Hobbes grants the translation and takes the conclusion away: whatever was given was given to the High Priest, and the High Priest was the civil sovereign's officer.",
  },
  {
    group: "church",
    term: "Dia Puros",
    script: "διὰ πυρός",
    lang: "grc",
    literal: "through fire",
    find: ["dia puros"],
    gloss:
      "1 Corinthians 3:15, \"saved, yet so as by fire,\" the verse on which the fire of purgatory was built. Hobbes does not dispute the Greek; he disputes reading an allegory as a survey, and the passage is one of the clearest cases of his rule that a metaphor proves nothing about where anything is.",
  },
  {
    group: "hell",
    term: "Hades",
    script: "ᾅδης",
    lang: "grc",
    literal: "the unseen",
    find: ["Hades"],
    gloss:
      "What the Latins read as *infernus*, and no more than a place where men cannot see: it contains the grave as much as any deeper place. Once the word is translated the underworld stops being a location and the dead are simply dead until the Resurrection.",
  },
  {
    group: "hell",
    term: "Gehenna, Tophet",
    script: "γέεννα, תֹּפֶת",
    literal: "the valley of Hinnom, the burning place",
    find: ["Gehenna"],
    gloss:
      "A real valley outside Jerusalem where children had been sacrificed to Moloch and where Josiah burnt the priests on their own altars. The name of a rubbish fire in a particular field became the name of eternal torment, and Hobbes puts the field back.",
  },
  {
    group: "hell",
    term: "Tartarus",
    script: "τάρταρος",
    lang: "grc",
    literal: "the pit",
    find: ["Tartarus"],
    gloss:
      "Used with *inferno* and \"the bottomless pit\" for where Korah, Dathan and Abiram went. The globe of the earth is finite and, against the height of the stars, small; a hole of infinite depth in it is not a place but a figure of speech about company.",
  },
  {
    group: "hell",
    term: "Eis To Skotos To Exoteron",
    script: "εἰς τὸ σκότος τὸ ἐξώτερον",
    lang: "grc",
    literal: "into the outer darkness",
    find: ["Skotos"],
    gloss:
      "Matthew 22:13, translated \"utter darkness,\" which reads as an intensity. The Greek says *where*, not *how much*: outside, away from the habitation of God's elect. One preposition, and a torment becomes an exclusion.",
  },
  {
    group: "hell",
    term: "Diabolus, Satan, Abbadon",
    script: "διάβολος, σατανᾶς, Ἀβαδδών",
    lang: "grc",
    literal: "the accuser, the enemy, the destroyer",
    find: ["Diabolus"],
    gloss:
      "\"Not Proper Names, But Appellatives.\" All three are common nouns describing an office or a quality, and the English Bible's habit of leaving them untranslated is what turns them into individuals with biographies. Chapter 38 says so in one sentence and Part IV spends a chapter on the consequences.",
  },
  {
    group: "hell",
    term: "Daemon",
    script: "δαίμων",
    lang: "grc",
    literal: "a spirit",
    find: ["Daemon"],
    gloss:
      "Among the Gentiles a name for diseases, virtues and vices alike, worshipped as powers: a man might understand by it an ague as readily as a devil. Chapter 45 makes the whole of demonology an inheritance from Greek fancy that the Jews picked up and the Church kept. See [spirit](/concepts/spirit/).",
  },
  {
    group: "hell",
    term: "Heroes",
    script: "ἥρωες",
    lang: "grc",
    literal: "heroes",
    find: ["called Heroes"],
    gloss:
      "The Greek name for the mighty men before the flood, whom scripture calls giants; both accounts say they were begotten of the children of God by the children of men. Hobbes sets the two side by side without comment, which is comment enough.",
  },
  {
    group: "hell",
    term: "Eido",
    script: "εἴδω",
    lang: "grc",
    literal: "to see",
    find: ["word Eido"],
    gloss:
      "The root of *idea*, *idol* and *phantasm*, all of them originally names for what appears in the eye or in the brain. An image is of something seen; therefore there is no image of a thing invisible, and none of a thing infinite — which disposes of most of what images in churches are said to be. See [imagination](/concepts/imagination/).",
  },
  {
    group: "schools",
    term: "Academia, Lycaeum, Stoa",
    script: "Ἀκαδήμεια, Λύκειον, στοά",
    lang: "grc",
    literal: "Academus's grove, the walk by Pan's temple, the covered colonnade",
    find: ["Academia", "Lycaeum"],
    gloss:
      "Where the masters taught, and the whole reason the sects have the names they have: Academics, Peripatetics from the walk Aristotle taught in, Stoics from a merchants' arcade. Placing the schools of philosophy in the leisure of idle young men in a market town is not an aside; it is the argument of Chapter 46 in miniature.",
  },
  {
    group: "schools",
    term: "Metaphysiques",
    script: "τὰ μετὰ τὰ φυσικά",
    lang: "grc",
    literal: "the books after the physics",
    find: ["Metaphysiques"],
    gloss:
      "A librarian's label for where the volumes sat on the shelf, mistaken for the name of a subject beyond nature. \"Scarce any thing can be more absurdly said in naturall Philosophy, than that which now is called Aristotles Metaphysiques.\"",
  },
  {
    group: "schools",
    term: "Antiperistasis",
    script: "ἀντιπερίστασις",
    lang: "grc",
    literal: "surrounding on all sides",
    find: ["Antiperistasis"],
    gloss:
      "Filed with sympathy, antipathy and occult qualities as terms that name neither the agent that produces an effect nor the operation by which it is produced. The definition of empty language in the book: a word that answers a question by repeating it in Greek.",
  },
  {
    group: "schools",
    term: "Thaumaturgi",
    script: "θαυματουργοί",
    lang: "grc",
    literal: "workers of wonders",
    find: ["Thaumaturgi"],
    gloss:
      "Conjurers, and Hobbes says there are too many sorts to list. The point of Chapter 37 is that they work by dexterity and confederacy, so a [miracle](/concepts/miracle/) is not a thing done but a thing that admits of no natural explanation — a judgement about the spectator as much as about the event.",
  },
  {
    group: "hebrew",
    term: "Cephas",
    script: "כֵּיפָא",
    lang: "arc",
    literal: "stone",
    find: ["Cephas"],
    gloss:
      "Aramaic, and the Greek *Petrus* means the same. Rigidly translated, \"Thou art Peter, and upon this rock I will build my Church\" is a pun on a nickname, and the rock Hobbes takes it to name is the article confessed a verse earlier — that Jesus is the Christ — rather than the man or his successors.",
  },
  {
    group: "hebrew",
    term: "Urim, Thummim",
    script: "אוּרִים וְתֻמִּים",
    lang: "he",
    literal: "lights, perfections",
    find: ["Urim"],
    gloss:
      "Put in the breastplate of judgment at Exodus 28:30, and rendered by the Septuagint as *delosin kai aletheian*. Whatever they conveyed, they conveyed to the High Priest, which for Hobbes settles who may enquire of God and who may not.",
  },
  {
    group: "hebrew",
    term: "Ephod",
    script: "אֵפוֹד",
    lang: "he",
    literal: "a priestly vestment",
    find: ["Ephod"],
    gloss:
      "What David commands the priest to bring so that he may enquire of the Lord at Keilah. The detail matters to Chapter 36's case that the kings who enquired of God on extraordinary occasions were themselves sovereign prophets, and that consulting God was an act of state.",
  },
  {
    group: "hebrew",
    term: "Messiah, Christos",
    script: "Χριστός, מָשִׁיחַ",
    literal: "anointed",
    find: ["the Christ, that is, the Anointed"],
    gloss:
      "Hebrew and Greek for one word, and the word means anointed — the ceremony by which kings and priests were made. Hobbes lets the etymology carry a good deal of Part III: the office claimed is a kingly one, and the kingdom it belongs to is to come rather than present.",
  },
  {
    group: "hebrew",
    term: "Hebraismes",
    literal: "Hebrew turns of phrase",
    find: ["Hebraismes"],
    gloss:
      "The New Testament's Greek keeps the idioms of the language behind it, which is why \"the word of God\" so often means talk about God rather than talk by him. Naming the habit is how Chapter 36 dismantles the argument that scripture speaks in its own voice.",
  },
];

/**
 * Greek a reader arrives expecting, and one Hebrew name. None is in the book.
 */
export const ABSENT = [
  {
    term: "Zoon politikon",
    script: "ζῷον πολιτικόν",
    lang: "grc",
    literal: "a political animal",
    gloss:
      "Aristotle's phrase, and the doctrine [Chapter 17](/chapters/17-of-the-causes-generation-and-definition-of-a-common-wealth/) exists to refute — but Hobbes argues against the [bees and ants](/themes/animals/) rather than against the Greek, and never quotes it.",
  },
  {
    term: "Eudaimonia",
    script: "εὐδαιμονία",
    lang: "grc",
    literal: "flourishing, happiness",
    gloss:
      "The thing whose Latin, *summum bonum*, he denies outright in Chapter 11. The Greek never appears: he disposes of the subject in the schools' language rather than in Aristotle's own.",
  },
  {
    term: "Behemoth",
    script: "בְּהֵמוֹת",
    lang: "he",
    literal: "beasts, the beast",
    gloss:
      "Leviathan's companion in Job 40, and absent here. Hobbes gave the name to [his history of the civil war](/works/behemoth/), written about 1668 and kept from the press by the King; it is the other half of the pair, and it is a different book.",
  },
];

/** Every term with the chapters and paragraphs where Hobbes uses it. */
export function greekIndex() {
  return glossaryIndex({ groups: GROUPS, terms: TERMS, absent: ABSENT, label: "greek" });
}
