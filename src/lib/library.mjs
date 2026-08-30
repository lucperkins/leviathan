/**
 * Major works about *Leviathan*, grouped by what they are for. Every entry
 * links somewhere: a Wikipedia article for the book where one exists, then the
 * section of an author's article that covers it, then the Open Library record,
 * which has almost everything and is neither a shop nor a tracker. `id` is the
 * anchor, so entries can be linked from elsewhere on the site.
 */
const W = "https://en.wikipedia.org/wiki/";

export const SHELVES = [
  {
    title: "Editions",
    blurb:
      "The text on this site is the 1651 English of the Project Gutenberg transcription. These are the editions a reader who wants apparatus should hold.",
    works: [
      {
        id: "malcolm-leviathan",
        title: "Leviathan",
        href: "https://en.wikipedia.org/wiki/Noel_Malcolm",
        author: "Noel Malcolm (ed.)",
        year: "2012",
        note: "The Clarendon edition, in three volumes: the English and Latin texts on facing pages, with an introduction longer than most books about Hobbes. The scholarly standard, and the place to settle any question about what he actually wrote.",
      },
      {
        id: "tuck-leviathan",
        title: "Leviathan",
        href: "https://en.wikipedia.org/wiki/Richard_Tuck",
        author: "Richard Tuck (ed.)",
        year: "1991",
        note: "The Cambridge student edition, revised in 1996. Modernised spelling, light annotation, and the one most people have read.",
      },
      {
        id: "molesworth-works",
        title: "The English Works of Thomas Hobbes",
        href: "https://openlibrary.org/works/OL654092W",
        author: "Sir William Molesworth (ed.)",
        authorHref: `${W}Sir_William_Molesworth,_8th_Baronet`,
        year: "1839–45",
        note: "Eleven volumes, with five more of the Latin. Paid for and edited by a radical MP, it made the whole of Hobbes available for the first time and remained the standard citation for a century and a half.",
      },
    ],
  },
  {
    title: "The readings that set the terms",
    blurb:
      "Twentieth century books that each produced a Hobbes, and that later work is still arguing with. They disagree with one another more than any of them disagrees with the text.",
    works: [
      {
        id: "strauss-political-philosophy",
        title: "The Political Philosophy of Hobbes",
        href: "https://openlibrary.org/works/OL509284W",
        author: "Leo Strauss",
        authorHref: `${W}Leo_Strauss`,
        year: "1936",
        note: "That the system rests on a moral attitude to violent death rather than on the new science, and so is older and less modern than it claims to be.",
      },
      {
        id: "oakeshott-introduction",
        title: "Hobbes on Civil Association",
        href: "https://openlibrary.org/works/OL29663W",
        author: "Michael Oakeshott",
        authorHref: `${W}Michael_Oakeshott`,
        year: "1975",
        note: "Collects the 1946 introduction that made Hobbes respectable in English philosophy again, reading him as a sceptic about power rather than an apologist for it.",
      },
      {
        id: "warrender-obligation",
        title: "The Political Philosophy of Hobbes: His Theory of Obligation",
        href: "https://openlibrary.org/works/OL1377959W",
        author: "Howard Warrender",
        year: "1957",
        note: "That obligation rests on the laws of nature as God's commands, not on self-interest or the sword. The strongest statement of the reading A. E. Taylor proposed in 1938, and the one the field has spent seventy years testing.",
      },
      {
        id: "schmitt-leviathan",
        title: "The Leviathan in the State Theory of Thomas Hobbes",
        href: "https://openlibrary.org/works/OL16937458W",
        author: "Carl Schmitt",
        authorHref: `${W}Carl_Schmitt`,
        year: "1938",
        note: "That the frontispiece is an emblem of failure: in reserving a private inward faith to the subject, Hobbes admitted the distinction that would eventually take the state apart. Written by a jurist who had joined the Nazi party in 1933, and inseparable from that.",
      },
      {
        id: "macpherson-possessive-individualism",
        title: "The Political Theory of Possessive Individualism",
        href: "https://openlibrary.org/works/OL677844W",
        author: "C. B. Macpherson",
        authorHref: `${W}C._B._Macpherson`,
        year: "1962",
        note: "That the state of nature is seventeenth century market society read back into nature. Much disputed, still the sharpest question anyone has put to Chapter 13.",
      },
      {
        id: "watkins-system",
        title: "Hobbes's System of Ideas",
        href: "https://openlibrary.org/works/OL487820W",
        author: "J. W. N. Watkins",
        year: "1965",
        note: "Takes the claim to be a system seriously and asks whether the politics really does follow from the physics.",
      },
      {
        id: "spragens-politics-of-motion",
        title: "The Politics of Motion: The World of Thomas Hobbes",
        href: "https://openlibrary.org/works/OL4810482W",
        author: "Thomas A. Spragens Jr.",
        year: "1973",
        note: "That the politics follows from a change of cosmology rather than from a change of subject, and that Hobbes kept the shape of Aristotle's enterprise while replacing everything inside it: a world with no natural places or ends leaves men in the same condition as the bodies in it, moving until something stops them.",
      },
      {
        id: "skinner-reason-and-rhetoric",
        title: "Reason and Rhetoric in the Philosophy of Hobbes",
        href: "https://openlibrary.org/works/OL29420323W",
        author: "Quentin Skinner",
        authorHref: `${W}Quentin_Skinner`,
        year: "1996",
        note: "The humanist rhetoric Hobbes was trained in, repudiated in the 1640s, and quietly took back up in Leviathan. The book that made the literary surface of the text a philosophical subject.",
      },
      {
        id: "skinner-republican-liberty",
        title: "Hobbes and Republican Liberty",
        href: "https://openlibrary.org/works/OL2724337W",
        author: "Quentin Skinner",
        authorHref: `${W}Quentin_Skinner`,
        year: "2008",
        note: "What Chapter 21 was designed to destroy: the republican idea that to be unfree is to be dependent on another's will, whether or not that will is ever exercised.",
      },
    ],
  },
  {
    title: "Politics, religion, and the moment",
    blurb: "Books that put the argument back among the events and quarrels it was written into.",
    works: [
      {
        id: "leviathan-and-the-air-pump",
        title: "Leviathan and the Air-Pump",
        href: `${W}Leviathan_and_the_Air-Pump`,
        author: "Steven Shapin and Simon Schaffer",
        year: "1985",
        note: "The quarrel with Boyle over the air-pump, read as a dispute about who gets to say what counts as knowledge, and what kind of community can settle it. The most influential book written about either man.",
      },
      {
        id: "martinich-two-gods",
        title: "The Two Gods of Leviathan",
        href: "https://openlibrary.org/works/OL8005077W",
        author: "A. P. Martinich",
        year: "1992",
        note: "The case that Hobbes was a sincere, if unorthodox, Christian, and that Parts III and IV are doing what they say they are doing.",
      },
      {
        id: "collins-allegiance",
        title: "The Allegiance of Thomas Hobbes",
        href: "https://openlibrary.org/works/OL5828051W",
        author: "Jeffrey R. Collins",
        year: "2005",
        note: "That the book is an intervention in the Engagement controversy on the side of the new republic, which is roughly what the royalists in Paris accused it of being.",
      },
      {
        id: "sommerville-historical-context",
        title: "Thomas Hobbes: Political Ideas in Historical Context",
        href: "https://openlibrary.org/works/OL1984752W",
        author: "Johann Sommerville",
        year: "1992",
        note: "What his positions looked like beside those of the people actually arguing in England at the time, which is less singular than the standard picture suggests.",
      },
      {
        id: "lilla-stillborn-god",
        title: "The Stillborn God",
        href: "https://openlibrary.org/works/OL4295883W",
        author: "Mark Lilla",
        authorHref: `${W}Mark_Lilla`,
        year: "2007",
        note: "That Hobbes performed the decisive break in Western thought — the Great Separation — by explaining religion anthropologically, from fear and ignorance of causes, and so making it possible to argue about politics without arguing about God. The rest of the book is about the attempts to put God back, and why they failed. Chapter 12 of Leviathan is the hinge of the whole account.",
      },
      {
        id: "malcolm-aspects",
        title: "Aspects of Hobbes",
        href: "https://openlibrary.org/works/OL1734099W",
        author: "Noel Malcolm",
        year: "2002",
        note: "Essays on the parts nobody else covers: the printing of Leviathan, the Latin edition, the reception abroad, the manuscripts.",
      },
    ],
  },
  {
    title: "The argument as philosophy",
    blurb:
      "Books that treat the covenant as a live problem rather than a historical one, mostly from the game-theoretic turn of the 1980s.",
    works: [
      {
        id: "gauthier-logic",
        title: "The Logic of Leviathan",
        href: "https://openlibrary.org/works/OL4804106W",
        author: "David Gauthier",
        authorHref: `${W}David_Gauthier`,
        year: "1969",
        note: "The reconstruction that made Hobbes a formal argument to be checked rather than a doctrine to be placed.",
      },
      {
        id: "hampton-social-contract",
        title: "Hobbes and the Social Contract Tradition",
        href: "https://openlibrary.org/works/OL2732447W",
        author: "Jean Hampton",
        authorHref: `${W}Jean_Hampton`,
        year: "1986",
        note: "That Hobbes's own solution fails on his own premises: the sovereign cannot be created by the covenant he is needed to enforce.",
      },
      {
        id: "kavka-hobbesian",
        title: "Hobbesian Moral and Political Theory",
        href: "https://openlibrary.org/works/OL13424840W",
        author: "Gregory S. Kavka",
        year: "1986",
        note: "Not what Hobbes said but rather what can be built from it: the best defensible theory in the neighbourhood of his premises.",
      },
      {
        id: "pettit-made-with-words",
        title: "Made with Words: Hobbes on Language, Mind, and Politics",
        author: "Philip Pettit",
        year: "2008",
        note: "That speech is the hinge of the whole system, which is what the chain of definitions on this site is also trying to show.",
        href: "/definitions/",
      },
    ],
  },
  {
    title: "Life, and where to start",
    blurb: "For a reader coming to him new, or wanting the man rather than the argument.",
    works: [
      {
        id: "martinich-biography",
        title: "Hobbes: A Biography",
        href: "https://openlibrary.org/works/OL1950771W",
        author: "A. P. Martinich",
        year: "1999",
        note: "The standard modern life, and careful about separating what is known from what Aubrey enjoyed telling.",
      },
      {
        id: "aubrey-brief-lives",
        title: "Brief Lives",
        href: "https://openlibrary.org/works/OL2953447W",
        author: "John Aubrey",
        authorHref: `${W}John_Aubrey`,
        year: "c. 1680",
        note: "Not a book about Leviathan at all, but the source of nearly everything anyone knows about Hobbes the man. Gossipy, unreliable, and irreplaceable.",
      },
      {
        id: "tuck-hobbes",
        title: "Hobbes: A Very Short Introduction",
        href: "https://openlibrary.org/works/OL2011486W",
        author: "Richard Tuck",
        year: "1989",
        note: "A hundred and fifty pages, and the best short account of why the philosophy and the politics are one argument.",
      },
      {
        id: "cambridge-companion",
        title: "The Cambridge Companion to Hobbes",
        href: "https://openlibrary.org/works/OL19555911W",
        author: "Tom Sorell (ed.)",
        year: "1996",
        note: "Chapter-length surveys by different hands, useful for finding out what the disagreements are before choosing a side.",
      },
      {
        id: "oxford-handbook",
        title: "The Oxford Handbook of Hobbes",
        href: "https://openlibrary.org/works/OL21119332W",
        author: "A. P. Martinich and Kinch Hoekstra (eds)",
        year: "2016",
        note: "The larger and more recent survey, and the place to see what the field looks like now.",
      },
    ],
  },
];

export const TOTAL = SHELVES.reduce((n, s) => n + s.works.length, 0);

/**
 * Every entry here links somewhere: Wikipedia for the book where it has an
 * article, otherwise the section of an author's article that covers it, a
 * Wikipedia entry for the collection an essay belongs to, or, failing all of
 * those, the publisher's DOI.
 *
 * Books that answer Hobbes rather than expound him: the canonical replies, and
 * the modern work that still argues on his ground. The narrative version of
 * this is /hobbes/impact/; this is the list with the claims attached. Several
 * of these are discussed at more length on the theme pages, which is where the
 * notes send a reader rather than repeating the argument.
 */
export const REPLIES = [
  {
    title: "The replies",
    blurb:
      "Written by people who had read him, mostly without saying so. Each takes a different part of the argument to be the mistake.",
    works: [
      {
        id: "spinoza-ttp",
        title: "Tractatus Theologico-Politicus",
        href: `${W}Tractatus_Theologico-Politicus`,
        author: "Baruch Spinoza",
        authorHref: `${W}Baruch_Spinoza`,
        year: "1670",
        note: "Published anonymously, and the closest thing Hobbes had to a continental successor: the same naturalism about scripture and prophecy, the same refusal of a church with power of its own. The break is over what the covenant costs, and Spinoza named it himself in a letter of 1674 — he keeps natural right entire, where Hobbes has the subject give it up.",
      },
      {
        id: "locke-two-treatises",
        title: "Two Treatises of Government",
        href: `${W}Two_Treatises_of_Government`,
        author: "John Locke",
        authorHref: `${W}John_Locke`,
        year: "1689",
        note: "The Second Treatise answers the Hobbesian position at length and never names him. A state of nature of inconvenience rather than war, governed by a natural law that already carries rights; government instituted to protect them, limited by them, and resistible when it breaks them. See the theme on contractarianism.",
      },
      {
        id: "rousseau-inequality",
        title: "Discourse on the Origin of Inequality",
        href: `${W}Discourse_on_Inequality`,
        author: "Jean-Jacques Rousseau",
        authorHref: `${W}Jean-Jacques_Rousseau`,
        year: "1755",
        note: "The sharpest attack on Chapter 13 ever written: that Hobbes described civilised man, with all his vanity and comparison, and called the description natural. Take those away and the creature left is timid and solitary, but not at war.",
      },
      {
        id: "hume-original-contract",
        title: "Of the Original Contract",
        href: `${W}Essays,_Moral,_Political,_and_Literary`,
        author: "David Hume",
        authorHref: `${W}David_Hume`,
        year: "1748",
        note: "The objection that has followed the theory ever since: almost every government was founded in conquest or usurpation, nobody consented to anything, and a promise no one made cannot be what binds them.",
      },
      {
        id: "hegel-philosophy-of-right",
        title: "Elements of the Philosophy of Right",
        href: `${W}Elements_of_the_Philosophy_of_Right`,
        author: "G. W. F. Hegel",
        authorHref: `${W}Georg_Wilhelm_Friedrich_Hegel`,
        year: "1820",
        note: "The strongest rival account of what a state is for. Not an instrument contracted into by individuals who already know what they want, but rather the condition under which they come to be the kind of people who can want anything worth having.",
      },
    ],
  },
  {
    title: "Still on his ground",
    blurb:
      "Twentieth century and after. Some take the premises and go elsewhere, some refuse the question, and one refutes the empirics.",
    works: [
      {
        id: "rawls-theory-of-justice",
        title: "A Theory of Justice",
        href: `${W}A_Theory_of_Justice`,
        author: "John Rawls",
        authorHref: `${W}John_Rawls`,
        year: "1971",
        note: "The other branch of the tradition: agreement kept as the test of a principle, and everything Hobbes used it for discarded. The original position behind a veil of ignorance is a device for asking what could be justified to everyone, not what self-interested parties would settle for.",
      },
      {
        id: "nozick-anarchy-state-utopia",
        title: "Anarchy, State, and Utopia",
        href: `${W}Anarchy,_State,_and_Utopia`,
        author: "Robert Nozick",
        authorHref: `${W}Robert_Nozick`,
        year: "1974",
        note: "Derives a state from a state of nature without a covenant at all: protective associations compete, one comes to dominate, and a minimal state arrives by invisible hand. The Hobbesian move, made without the Hobbesian moment.",
      },
      {
        id: "bull-anarchical-society",
        title: "The Anarchical Society",
        href: `${W}The_Anarchical_Society`,
        author: "Hedley Bull",
        authorHref: `${W}Hedley_Bull`,
        year: "1977",
        note: "Against the reading that made Hobbes the patron of realism: states without a common power over them nevertheless form a society, with rules and institutions and a shared interest in keeping them. See the section on the law of nations.",
      },
      {
        id: "foucault-society-must-be-defended",
        title: "“Society Must Be Defended”",
        href: `${W}Foucault%27s_lectures_at_the_Coll%C3%A8ge_de_France#Society_Must_be_Defended_(1975%E2%80%931976)`,
        author: "Michel Foucault",
        authorHref: `${W}Michel_Foucault`,
        year: "1975–76",
        note: "Lectures that set out to do political theory without the sovereign, and take Hobbes as the thing to get past: the covenant is treated as a device for making war disappear from the account of how power actually works. The most interesting modern refusal of the whole frame.",
      },
      {
        id: "shklar-liberalism-of-fear",
        title: "The Liberalism of Fear",
        href: `${W}Judith_N._Shklar#Views`,
        author: "Judith Shklar",
        year: "1989",
        note: "An essay that builds a liberalism on the summum malum rather than a summum bonum: begin from cruelty and the fear of it, put avoiding the worst first, and ask what a state must not do. The most Hobbesian argument made by someone who was not a Hobbesian.",
      },
      {
        id: "ostrom-governing-the-commons",
        title: "Governing the Commons",
        href: "https://doi.org/10.1017/CBO9780511807763",
        author: "Elinor Ostrom",
        authorHref: `${W}Elinor_Ostrom`,
        year: "1990",
        note: "The empirical answer. Communities sharing a fishery or a pasture solve their collective action problems by their own rules and monitoring, without a Leviathan and without privatisation, and have done so for centuries. It won a Nobel prize and it is a direct reply to Chapter 17.",
      },
      {
        id: "acemoglu-narrow-corridor",
        title: "The Narrow Corridor",
        href: `${W}Daron_Acemoglu#The_Narrow_Corridor`,
        author: "Daron Acemoglu and James A. Robinson",
        year: "2019",
        note: "Takes the image as its organising device — the absent Leviathan, the despotic Leviathan, and the shackled one that a strong society holds in check. Liberty is placed in the corridor between anarchy and domination, which is a claim Hobbes denies.",
      },
    ],
  },
];

export const REPLIES_TOTAL = REPLIES.reduce((n, s) => n + s.works.length, 0);
