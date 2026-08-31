/**
 * The Latin in *Leviathan*, glossed. Hobbes writes in English on purpose — the
 * complaint of Chapter 46 is that school Latin hides its own emptiness — so the
 * Latin he does keep is doing work: a term of art he is defining, a phrase from
 * the Vulgate he is correcting, or a piece of jargon he has quoted in order to
 * take it apart.
 *
 * `find` is what `glossary.mjs` looks for in the chapter text, so an entry for
 * a phrase that is not in the book fails loudly rather than quietly. Anything
 * Hobbes leaves in Greek is in greek.mjs.
 */
export const GROUPS = [
  {
    id: "good-and-evil",
    title: "Good, evil, and the ends of man",
    blurb:
      "Hobbes reaches for Latin where English has no single word, and the borrowings carry the argument: the schools' vocabulary of ends is produced in order to be denied.",
  },
  {
    id: "right-and-law",
    title: "Right, law, and the person",
    blurb:
      "The technical core. Four of these are terms Hobbes defines rather than uses, and the distinctions they carry are the ones the rest of the book is built on.",
  },
  {
    id: "commonwealth",
    title: "The common-wealth",
    blurb: "Latin for the made thing itself, for its business, and for the names of the men who serve it.",
  },
  {
    id: "scripture",
    title: "Scripture and worship",
    blurb:
      "Hobbes reads the Vulgate against the King James where it suits him, and it usually suits him: the older Latin is often the more literal, and the more useful.",
  },
  {
    id: "schools",
    title: "The language of the Schools",
    blurb:
      "Quoted to be convicted. Chapter 46 collects the scholastic terms that, in Hobbes's phrase, pass only in Latin so that the vanity of them may be concealed.",
  },
];

export const TERMS = [
  {
    group: "good-and-evil",
    term: "Pulchrum, Turpe",
    literal: "beautiful, base",
    find: ["Pulchrum", "Turpe"],
    gloss:
      "The two words that come nearest to good and evil without being the same. *Pulchrum* is whatever by some apparent sign promises good, *turpe* whatever promises evil — the sign, not the thing. English has no single word for either, which is why Hobbes has to list fair, beautiful, handsome, gallant, comely and amiable on one side and foul, deformed, ugly, base and nauseous on the other.",
  },
  {
    group: "good-and-evil",
    term: "Jucundum, Utile",
    literal: "delightful, useful",
    find: ["Jucundum", "Utile"],
    gloss:
      "The rest of the division, with *molestum* and *inutile* opposite them. Good in the promise is *pulchrum*, good in the effect is *jucundum*, good in the means is *utile*. The scheme is the point: [good](/concepts/good-and-evil/) is not a quality a thing has but a name for where it stands in somebody's desire.",
  },
  {
    group: "good-and-evil",
    term: "Finis Ultimus",
    literal: "last end",
    find: ["Finis Ultimus"],
    gloss:
      "There is none, and the denial is flat. Life is motion, motion does not arrive, and a mind at rest is a mind that has stopped. See [felicity](/concepts/felicity/).",
  },
  {
    group: "good-and-evil",
    term: "Summum Bonum",
    literal: "greatest good",
    find: ["Summum Bonum"],
    gloss:
      "Denied in the same breath, and named as the property of \"the Books of the old Morall Philosophers.\" Two Latin words dispose of the subject that Aristotle's *Ethics* exists to establish; what replaces it is a continual progress of desire from one object to the next.",
  },
  {
    group: "good-and-evil",
    term: "Credo In; Credo Illi, Fido Illi",
    literal: "I believe in; I believe him, I trust him",
    find: ["Credo In", "Credo Illi", "Fido Illi"],
    gloss:
      "Only divines say *credo in*; ordinary Latin says *credo illi*. Hobbes points at the idiom to separate two things run together in the word faith — an opinion about a saying, and an opinion about the man who said it — and the separation does a great deal of work later, when belief has to be something a sovereign cannot command.",
  },
  {
    group: "good-and-evil",
    term: "Philosophia Prima",
    literal: "first philosophy",
    find: ["Philosophia Prima"],
    gloss:
      "Not metaphysics as the schools practised it, but the right limiting of the significations of names: settling what body, time, place, matter and motion mean before anything is built on them. It stands at the head of the table of sciences in Chapter 9, and Chapter 46 accuses Aristotle's followers of having lost it.",
  },
  {
    group: "right-and-law",
    term: "Jus Naturale",
    literal: "the right of nature",
    find: ["Jus Naturale"],
    gloss:
      "The liberty each man has to use his own power as he will for the preservation of his own nature. A liberty, not a claim on anybody: it obliges no one, and everyone has it over everything. See [the right of nature](/concepts/right-of-nature/).",
  },
  {
    group: "right-and-law",
    term: "Lex Naturalis",
    literal: "a law of nature",
    find: ["Lex Naturalis"],
    gloss:
      "A precept found out by reason, forbidding a man to do what is destructive of his life. It sits one paragraph after *jus naturale* so that the two can be told apart, because writers confound them: right is liberty, law is obligation, and one takes away what the other allows. See [the law of nature](/concepts/law-of-nature/).",
  },
  {
    group: "right-and-law",
    term: "Persona",
    literal: "a mask",
    find: ["Persona in latine", "as Persona"],
    gloss:
      "The disguise or outward appearance of a man, counterfeited on the stage, and then the man who wears it. Hobbes takes the theatrical sense as the primary one and builds representation out of it, which is how a multitude becomes one [person](/concepts/person/) and the common-wealth becomes possible at all.",
  },
  {
    group: "right-and-law",
    term: "Unus Sustineo Tres Personas",
    literal: "I bear three persons",
    find: ["Unus Sustineo"],
    gloss:
      "Cicero, quoted in full as \"mei, adversarii, & judicis\" — my own, my adversary's, and the judge's. The citation is evidence, not ornament: it shows that *persona* already meant a part borne on someone else's behalf in the best Latin there is, so the doctrine of Chapter 16 is not a coinage.",
  },
  {
    group: "right-and-law",
    term: "Fidejussores, Sponsores, Praedes, Vades",
    literal: "guarantors, sureties, bail for a debt, bail for an appearance",
    find: ["Fidejussores", "Sponsores", "Praedes", "Vades"],
    gloss:
      "Roman law's four words for a surety, borrowed to name the conditional author: the man who owns another's covenant only if that other fails to perform it. *Praedes* answer for a debt, *vades* for an appearance before a magistrate.",
  },
  {
    group: "commonwealth",
    term: "Civitas",
    literal: "a city, a commonwealth",
    find: ["CIVITAS", "Civitas"],
    gloss:
      "The Latin given for COMMON-WEALTH in the Introduction's first paragraph and again at the moment of its generation in Chapter 17. Chapter 26 draws the consequence for the law: the civil law of Rome was called civil after *civitas*, so civil law is simply the law of a common-wealth, and every nation's is its own.",
  },
  {
    group: "commonwealth",
    term: "Persona Civitatis",
    literal: "the person of the common-wealth",
    find: ["Persona Civitatis"],
    gloss:
      "What the civil law adds to a command: not new content but a name in whose person it is given. Law is distinguished from counsel by who speaks, and this is the Latin for who.",
  },
  {
    group: "commonwealth",
    term: "Salus Populi",
    literal: "the safety of the people",
    find: ["Salus Populi"],
    gloss:
      "The artificial man's business, in the anatomy that opens the book. Cicero's *salus populi suprema lex esto* was a commonplace of the age; Chapter 30 makes it an office the sovereign can be judged by, since safety there means not bare survival but all the contentments of life a man may lawfully acquire.",
  },
  {
    group: "commonwealth",
    term: "Duces, Comites, Marchiones",
    literal: "leaders, companions, wardens of the marches",
    find: ["Duces", "Comites", "Marchiones"],
    gloss:
      "Duke, count and marquis, returned to what they were: a general in war, a companion of the general left to govern conquered ground, and a count set over the bounds of the empire. Titles of honour are worth what the sovereign sets on them, and their history shows them beginning as jobs.",
  },
  {
    group: "commonwealth",
    term: "Non Habebis Deos Alienos",
    literal: "Thou shalt not have the gods of other nations",
    find: ["Non Habebis Deos Alienos"],
    gloss:
      "The Vulgate's first commandment, put to constitutional use in Chapter 30: to be in love with the form of government of a neighbour nation is the political form of the sin, since kings are also called gods. It is quoted more fully in Chapter 42, with \"coram me\" after it, as the first article of what Hobbes there calls the law of sovereignty.",
  },
  {
    group: "scripture",
    term: "Spiritus",
    literal: "breath, wind",
    find: ["Spiritus"],
    gloss:
      "The Latin behind \"spirit\" in the English Bible, produced in Chapter 34 to show what the word can honestly mean: thin and invisible bodies, which are still bodies. An incorporeal substance is two words that destroy each other. See [spirit](/concepts/spirit/).",
  },
  {
    group: "scripture",
    term: "Peculium De Cunctis Populis",
    literal: "a possession out of all peoples",
    find: ["Peculium De Cunctis Populis"],
    gloss:
      "The Vulgate at Exodus 19:5, preferred to the King James \"a peculiar treasure unto me above all Nations\" and to Geneva's \"most precious Jewel.\" Hobbes wants the property sense, because the covenant at Sinai is being read as an act of sovereignty rather than a compliment.",
  },
  {
    group: "scripture",
    term: "Regnum Sacerdotale, Sacerdotium Regale",
    literal: "a priestly kingdom, a royal priesthood",
    find: ["Regnum Sacerdotale", "Sacerdotium Regale"],
    gloss:
      "Exodus and 1 Peter in the Vulgate, set side by side because the nouns matter. The English versions offer \"a Kingdome of Priests,\" which makes priests of everyone; the Latin makes the kingdom the thing and the priesthood the adjective, and so keeps civil government at the head of the sentence.",
  },
  {
    group: "scripture",
    term: "Sanctum Sanctorum",
    literal: "the holy of holies",
    find: ["Sanctum Sanctorum"],
    gloss:
      "A Latin calque of a Hebrew superlative, and for Hobbes a piece of evidence: only one man went in, and only he enquired God's will immediately of God. Where God's word arrives through one office, no private man can claim it.",
  },
  {
    group: "scripture",
    term: "Cultus",
    literal: "cultivation, tending",
    find: ["CULTUS", "Cultus"],
    gloss:
      "Properly the labour bestowed on a thing with a purpose to get benefit by it — of the ground, husbandry; of men, courting. Worship is the same word and the same act, which is why *cultus Dei* and *publicola*, the courter of the people, sit in one sentence.",
  },
  {
    group: "scripture",
    term: "In Aeternum",
    literal: "for ever",
    find: ["In Aeternum"],
    gloss:
      "Quoted at John 8:52, where the Jews take our Saviour's \"shall never see death\" for the talk of a man with a devil in him. The reading matters to Chapter 44's case that eternal life is a gift restored rather than a property the soul was born with.",
  },
  {
    group: "schools",
    term: "Nunc-stans",
    literal: "a standing now",
    find: ["Nunc-stans", "Hic-stans"],
    gloss:
      "The schools' eternity: not endless succession but the standing still of present time. Hobbes's answer is that nobody understands it, himself included, and that they would not accept a *hic-stans*, a standing here, for an infinite greatness of place. The same word appears in Chapter 5 as \"Eternal-now,\" in a list of noises learned by rote.",
  },
  {
    group: "schools",
    term: "Creatur Infundendo, Creando Infunditur",
    literal: "It is created by being poured in, and poured in by being created",
    find: ["Creatur Infundendo"],
    gloss:
      "Offered by the schools as the cause of the soul of man, and translated by Hobbes on the spot so the reader can watch it explain nothing. Nothing in Part IV shows the method better: quote the sentence, put it in English, stop.",
  },
  {
    group: "schools",
    term: "Circumscriptive, Definitive",
    literal: "by circumscription, by definition",
    // "Definitive" alone catches Chapter 42's "sentence definitive", a final
    // judgment rather than a mode of being somewhere.
    find: ["Circumscriptive"],
    gloss:
      "The distinction that keeps angels somewhere without giving them a place: not circumscribed by any bounds, yet determined to be here rather than there. Hobbes's verdict is the sharpest line in the chapter — such terms pass only in Latin, so that the vanity of them may be concealed.",
  },
  {
    group: "schools",
    term: "Volitio, Voluntas",
    literal: "an act of willing, the will",
    find: ["Volitio", "Voluntas"],
    gloss:
      "The schools assign the faculty as the cause of the act, making the power the cause of its own exercise. For Hobbes the [will](/concepts/will/) is not a faculty at all but the last appetite in deliberating, so there is nothing left for *voluntas* to name.",
  },
  {
    group: "schools",
    term: "Est",
    literal: "is",
    find: ["Est, or Is"],
    gloss:
      "The verb from which entity, essence, essential and essentially are all derived — and, Hobbes notes, a language without it could reason exactly as well. The words are signs that one name follows from another, not names of things, and separated essences are what you get by forgetting it.",
  },
  {
    group: "schools",
    term: "Cui Bono",
    literal: "to whose benefit?",
    find: ["Cui Bono"],
    gloss:
      "The question a Roman praetor put to accusers when the witnesses were not enough, and the one Hobbes ends the book's argument with. Asked of the doctrine that the kingdom of Christ began at the Resurrection, it answers itself: the profit expected was sovereign power over the people.",
  },
];

/**
 * Latin that readers arrive expecting and will not find. Two of the three most
 * quoted Hobbesian tags are not in this book, and the third is on the picture
 * rather than in the text.
 */
export const ABSENT = [
  {
    term: "Bellum omnium contra omnes",
    literal: "the war of all against all",
    gloss:
      "[*De Cive*](/works/de-cive/), not *Leviathan*. The English chapter that everyone quotes it from says \"a war of every man against every man,\" and never reaches for the Latin. See [the state of nature](/themes/the-state-of-nature/).",
  },
  {
    term: "Auctoritas, non veritas, facit legem",
    literal: "authority, not truth, makes law",
    gloss:
      "Added in the Latin *Leviathan* of 1668, seventeen years after the English. Carl Schmitt made it the motto of the whole system, which is a fair summary of Chapter 26 and still a sentence Hobbes's English readers never saw.",
  },
  {
    term: "Non est potestas super terram quae comparetur ei",
    literal: "There is no power on earth to be compared to him",
    gloss:
      "Job 41:24 in the Vulgate, printed above the sovereign on the [frontispiece](/) and nowhere in the text beneath it. Hobbes quotes the same chapter of Job in English in Chapter 28, to a different purpose.",
  },
];
