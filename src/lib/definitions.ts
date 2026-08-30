/**
 * The chain of definitions, as data.
 *
 * Hobbes settles every term before he uses it, and builds each new definition
 * out of terms already fixed. This file records that: for each term, the
 * sentence in which he defines it, with the borrowed terms marked inline as
 * `{word|id}`, where `word` is how it appears in the sentence and `id` is the
 * definition it points back to. Everything else — the dependency edges, the
 * derivation of a term back to its roots, the links into the chapter text — is
 * computed from these strings, so there is one place to correct.
 *
 * The text is Hobbes's, verbatim and unmodernised, trimmed to the defining
 * sentence. `quote` is the opening words used to locate the paragraph in the
 * chapter file; it must match the text on disk (see rehype-quote-sources).
 */
export interface Definition {
  id: string;
  /** The term as a heading: modern where the site modernises, his where it does not. */
  term: string;
  chapter: number;
  chapterId: string;
  /** The defining sentence, with borrowings marked `{word|id}`. */
  text: string;
  /** Opening words for locating the paragraph; omitted where the chapter has no numbering. */
  quote?: string;
  /** Said in the site's voice, where the borrowing needs explaining. */
  note?: string;
}

export const DEFINITIONS: Definition[] = [
  {
    id: "motion",
    term: "Motion",
    chapter: 0,
    chapterId: "the-introduction",
    text: "For what is the Heart, but a Spring; and the Nerves, but so many Strings; and the Joynts, but so many Wheeles, giving motion to the whole Body.",
    note: "The one term Hobbes never defines. Everything else is built from it, which is what makes the chain a chain and not a circle.",
  },
  {
    id: "sense",
    term: "Sense",
    chapter: 1,
    chapterId: "01-of-sense",
    quote: "So that Sense in all cases, is nothing els but originall fancy",
    text: "So that Sense in all cases, is nothing els but originall fancy, caused (as I have said) by the pressure, that is, by the {motion|motion}, of externall things upon our Eyes, Eares, and other organs thereunto ordained.",
  },
  {
    id: "imagination",
    term: "Imagination",
    chapter: 2,
    chapterId: "02-of-imagination",
    quote: "Imagination therefore is nothing but Decaying Sense",
    text: "Imagination therefore is nothing but Decaying {Sense|sense}; and is found in men, and many other living Creatures, as well sleeping, as waking.",
  },
  {
    id: "speech",
    term: "Speech",
    chapter: 4,
    chapterId: "04-of-speech",
    quote: "The generall use of Speech, is to transferre our Mentall Discourse",
    text: "The generall use of Speech, is to transferre our {Mentall Discourse|imagination}, into Verbal; or the Trayne of our Thoughts, into a Trayne of Words.",
    note: "Mental discourse is the train of imaginations of Chapter 3, so speech is defined out of imagination, which was defined out of sense.",
  },
  {
    id: "reason",
    term: "Reason",
    chapter: 5,
    chapterId: "05-of-reason-and-science",
    quote: "Reason, in this sense, is nothing but Reckoning",
    text: "For Reason, in this sense, is nothing but Reckoning (that is, Adding and Substracting) of the Consequences of generall {names|speech} agreed upon, for the Marking and Signifying of our {thoughts|imagination}.",
    note: "This is the hinge of Part I. Reason is reckoning with names, so nothing without speech can reason, and every later demonstration depends on names being settled first.",
  },
  {
    id: "endeavour",
    term: "Endeavour",
    chapter: 6,
    chapterId: "06-of-the-interiour-beginnings-of-voluntary-motions",
    quote: "These small beginnings of Motion, within the body of Man",
    text: "These small beginnings of {Motion|motion}, within the body of Man, before they appear in walking, speaking, striking, and other visible actions, are commonly called ENDEAVOUR.",
  },
  {
    id: "appetite",
    term: "Appetite",
    chapter: 6,
    chapterId: "06-of-the-interiour-beginnings-of-voluntary-motions",
    quote: "This Endeavour, when it is toward something which causes it",
    text: "This {Endeavour|endeavour}, when it is toward something which causes it, is called APPETITE, or DESIRE; the later, being the generall name.",
  },
  {
    id: "good",
    term: "Good and evil",
    chapter: 6,
    chapterId: "06-of-the-interiour-beginnings-of-voluntary-motions",
    quote: "whatsoever is the object of any mans Appetite or Desire",
    text: "But whatsoever is the object of any mans {Appetite|appetite} or Desire; that is it, which he for his part calleth Good: And the object of his Hate, and Aversion, evill.",
    note: "Good is not a quality of the thing but rather a name given from the appetite of the speaker, which is why a common measure has to be established later by a sovereign.",
  },
  {
    id: "will",
    term: "Will",
    chapter: 6,
    chapterId: "06-of-the-interiour-beginnings-of-voluntary-motions",
    quote: "In Deliberation, the last Appetite, or Aversion",
    text: "In Deliberation, the last {Appetite|appetite}, or Aversion, immediately adhaering to the action, or to the omission thereof, is that wee call the WILL; the Act, (not the faculty,) of Willing.",
  },
  {
    id: "religion",
    term: "Religion",
    chapter: 6,
    chapterId: "06-of-the-interiour-beginnings-of-voluntary-motions",
    quote: "Feare of power invisible, feigned by the mind",
    text: "Feare of {power|power} invisible, feigned by the mind, or {imagined|imagination} from tales publiquely allowed, RELIGION; not allowed, SUPERSTITION.",
  },
  {
    id: "power",
    term: "Power",
    chapter: 10,
    chapterId: "10-of-power-worth-dignity-honour-and-worthiness",
    quote: "The POWER of a Man, (to take it Universally,) is his present means",
    text: "The POWER of a Man, (to take it Universally,) is his present means, to obtain some future apparent {Good|good}.",
  },
  {
    id: "warre",
    term: "War",
    chapter: 13,
    chapterId: "13-of-the-naturall-condition-of-mankind",
    quote: "during the time men live without a common Power to keep them all in awe",
    text: "Hereby it is manifest, that during the time men live without a common {Power|power} to keep them all in awe, they are in that condition which is called Warre; and such a warre, as is of every man, against every man.",
  },
  {
    id: "right",
    term: "Right of nature",
    chapter: 14,
    chapterId: "14-of-the-first-and-second-naturall-lawes-and-of-contracts",
    quote: "The RIGHT OF NATURE, which Writers commonly call Jus Naturale",
    text: "The RIGHT OF NATURE, which Writers commonly call Jus Naturale, is the Liberty each man hath, to use his own {power|power}, as he {will|will} himselfe, for the preservation of his own Nature; that is to say, of his own Life; and consequently, of doing any thing, which in his own Judgement, and {Reason|reason}, hee shall conceive to be the aptest means thereunto.",
  },
  {
    id: "law",
    term: "Law of nature",
    chapter: 14,
    chapterId: "14-of-the-first-and-second-naturall-lawes-and-of-contracts",
    quote: "is a Precept, or generall Rule, found out by Reason",
    text: "A LAW OF NATURE, (Lex Naturalis,) is a Precept, or generall Rule, found out by {Reason|reason}, by which a man is forbidden to do, that, which is destructive of his life, or taketh away the means of preserving the same.",
    note: "Right and law are opposites here, and both are defined out of reason: the right is a liberty, the law an obligation.",
  },
  {
    id: "covenant",
    term: "Contract and covenant",
    chapter: 14,
    chapterId: "14-of-the-first-and-second-naturall-lawes-and-of-contracts",
    quote: "The mutuall transferring of Right, is that which men call CONTRACT",
    text: "The mutuall transferring of {Right|right}, is that which men call CONTRACT.",
  },
  {
    id: "justice",
    term: "Justice",
    chapter: 15,
    chapterId: "15-of-other-lawes-of-nature",
    quote: "the definition of INJUSTICE, is no other than",
    text: "But when a {Covenant|covenant} is made, then to break it is Unjust: And the definition of INJUSTICE, is no other than The Not Performance Of Covenant.",
    note: "The whole moral vocabulary arrives here, and it arrives late: before there are covenants nothing can be unjust.",
  },
  {
    id: "person",
    term: "Person",
    chapter: 16,
    chapterId: "16-of-persons-authors-and-things-personated",
    quote: "whose words or actions are considered, either as his own",
    text: "A PERSON, is he whose {words|speech} or actions are considered, either as his own, or as representing the words or actions of an other man, or of any other thing to whom they are attributed, whether Truly or by Fiction.",
    note: "Representation is what makes an artificial person possible, and so what makes a commonwealth possible.",
  },
  {
    id: "commonwealth",
    term: "Commonwealth",
    chapter: 17,
    chapterId: "17-of-the-causes-generation-and-definition-of-a-common-wealth",
    quote: "One Person, of whose Acts a great Multitude, by mutuall Covenants",
    text: "One {Person|person}, of whose Acts a great Multitude, by mutuall {Covenants|covenant} one with another, have made themselves every one the {Author|person}, to the end he may use the strength and {means|power} of them all, as he shall think expedient, for their Peace and Common Defence.",
    note: "Every word of it has been defined already. This is the moment the natural chain becomes an artificial one, and nothing new is introduced to do it.",
  },
  {
    id: "sovereign",
    term: "Sovereign",
    chapter: 17,
    chapterId: "17-of-the-causes-generation-and-definition-of-a-common-wealth",
    quote: "he that carryeth this Person, as called",
    text: "And he that carryeth {this Person|commonwealth}, as called SOVERAIGNE, and said to have Soveraigne {Power|power}; and every one besides, his SUBJECT.",
  },
  {
    id: "civill",
    term: "Civil law",
    chapter: 26,
    chapterId: "26-of-civill-lawes",
    quote: "CIVILL LAW, Is to every Subject, those Rules, which the Common-wealth hath Commanded",
    text: "CIVILL LAW, Is to every {Subject|sovereign}, those Rules, which the {Common-wealth|commonwealth} hath Commanded him, by Word, Writing, or other sufficient Sign of the {Will|will}, to make use of, for the Distinction of {Right|right}, and Wrong.",
  },
  {
    id: "punishment",
    term: "Punishment",
    chapter: 28,
    chapterId: "28-of-punishments-and-rewards",
    quote: "A PUNISHMENT, is an Evill inflicted by publique Authority",
    text: "A PUNISHMENT, is an Evill inflicted by publique {Authority|person}, on him that hath done, or omitted that which is Judged by the same Authority to be a Transgression of the {Law|civill}; to the end that the {will|will} of men may thereby the better be disposed to obedience.",
    note: "Because punishment is defined through authority, harm done without it is not punishment but rather hostility — which is how the definition limits the power it describes.",
  },
  {
    id: "church",
    term: "Church",
    chapter: 39,
    chapterId: "39-of-the-signification-in-scripture-of-the-word-church",
    quote: "I define a CHURCH to be",
    text: "A company of men professing Christian {Religion|religion}, united in the {person|person} of one {Soveraign|sovereign}; at whose command they ought to assemble, and without whose {authority|person} they ought not to assemble.",
    note: "The definition that decides Part III. By the time he needs it every term is already fixed in the political chapters, so a church turns out to be a term in politics.",
  },
];

export const BY_ID = new Map(DEFINITIONS.map((d) => [d.id, d]));

export type Segment = { text: string } | { word: string; of: string };

/** Split a definition's text into plain runs and the terms it borrows. */
export function segments(text: string): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const m of text.matchAll(/\{([^{}|]+)\|([a-z]+)\}/g)) {
    if (m.index > last) out.push({ text: text.slice(last, m.index) });
    out.push({ word: m[1], of: m[2] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}

/** The terms a definition consumes directly, in the order they appear. */
export function borrows(d: Definition): string[] {
  const seen = new Set<string>();
  for (const s of segments(d.text)) if ("of" in s) seen.add(s.of);
  return [...seen];
}

/**
 * Everything a term rests on, itself included, in the order the book defines
 * them. This is the derivation: reading it top to bottom is reading Hobbes's
 * own order of proof.
 */
export function derivation(id: string): Definition[] {
  const need = new Set<string>();
  const walk = (at: string) => {
    if (need.has(at)) return;
    need.add(at);
    const d = BY_ID.get(at);
    if (d) for (const b of borrows(d)) walk(b);
  };
  walk(id);
  return DEFINITIONS.filter((d) => need.has(d.id));
}

/** Definitions that consume this one, for reading the chain forwards. */
export function usedBy(id: string): Definition[] {
  return DEFINITIONS.filter((d) => borrows(d).includes(id));
}
