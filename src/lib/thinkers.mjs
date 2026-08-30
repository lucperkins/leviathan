/**
 * Every thinker Hobbes names in *Leviathan*, grouped as the book itself
 * groups them by use. `quote` is the opening of a representative passage; the
 * page locates it in the chapter text at build time so each entry links to the
 * paragraph rather than the chapter. `mentions` counts name tokens across all
 * chapters, verified in context (so "Innocent" the adjective, "fishers of men"
 * and Ptolemy the king of Egypt are excluded).
 */
export const CATEGORIES = [
  {
    title: "Greek philosophers",
    blurb:
      "All but one of these appear in Chapter 46, where Hobbes gives a short history of the schools in order to explain how philosophy went wrong.",
    people: [
      {
        name: "Aristotle",
        dates: "384–322 BC",
        mentions: 26,
        interlocutor: "aristotle",
        note: "The authority Hobbes set out to displace, named more often than any other thinker. He blames the universities more than the man, and coins <em>Aristotelity</em> for what they made of him.",
        chapter: "46-of-darknesse-from-vain-philosophy-and-fabulous-traditions",
        quote: "And I beleeve that scarce any thing can be more absurdly said in naturall Philosophy",
      },
      {
        name: "Plato",
        dates: "c. 428–348 BC",
        mentions: 7,
        interlocutor: "plato",
        note: "Treated more gently than Aristotle. Hobbes approves his demand that geometry come first, and names the Academy in his account of where the schools began.",
        chapter: "46-of-darknesse-from-vain-philosophy-and-fabulous-traditions",
        quote: "Plato in certaine publique Walks called Academia",
      },
      {
        name: "Socrates",
        dates: "c. 470–399 BC",
        mentions: 1,
        note: "Named once, and only as a warning: the philosophers who followed him trimmed their doctrine to the city's religion for fear of sharing his fate.",
        chapter: "46-of-darknesse-from-vain-philosophy-and-fabulous-traditions",
        quote: "and fearing the fate of Socrates",
      },
      {
        name: "Zeno of Citium",
        dates: "c. 334–262 BC",
        mentions: 1,
        note: "Appears only to explain a word: the Stoics are named from the Stoa where he taught, as the Peripatetics are from a walk.",
        chapter: "46-of-darknesse-from-vain-philosophy-and-fabulous-traditions",
        quote: "and those that Zeno taught, Stoiques, from the Stoa",
      },
      {
        name: "Carneades",
        dates: "c. 214–129 BC",
        mentions: 1,
        note: "The Academic sceptic whose embassy to Rome drew crowds and alarmed Cato, who advised the Senate to send him home quickly.",
        chapter: "46-of-darknesse-from-vain-philosophy-and-fabulous-traditions",
        quote: "And this was it which Carneades also did at Rome",
      },
    ],
  },
  {
    title: "Poets, historians, and orators",
    blurb:
      "Cited as witnesses rather than authorities: for what a word once meant, for what the ancients believed, or as examples of writing whose truth is the writer's and not the reader's.",
    people: [
      {
        name: "Cicero",
        dates: "106–43 BC",
        mentions: 12,
        interlocutor: "cicero",
        note: "The most quoted Roman. A witness on persons, property, and punishment, and, with Aristotle, blamed for the republican idea of liberty that Hobbes thinks caused the Civil War.",
        chapter: "04-of-speech",
        quote: "the authority of an Aristotle, a Cicero, or a Thomas",
      },
      {
        name: "Homer",
        dates: "c. 8th century BC",
        mentions: 3,
        note: "Cited for the practice of divining by dipping into his verses, and as a source from which the Greeks drew rules of poetry as they drew rules of government from their own practice.",
        chapter: "12-of-religion",
        quote: "dipping of Verses in Homer, and Virgil",
      },
      {
        name: "Virgil",
        dates: "70–19 BC",
        mentions: 3,
        note: "Quoted on the depth of Tartarus in the discussion of hell, and paired with Homer as a poet whose lines were used for fortune-telling.",
        chapter: "21-of-the-liberty-of-subjects",
        quote: "the Rules of Poetry, out of the Poems of Homer and Virgil",
      },
      {
        name: "Hesiod",
        dates: "c. 700 BC",
        mentions: 1,
        note: "Named as the source of the genealogy of the gods, evidence for Hobbes that the gentile religion was poetry taken for history.",
        chapter: "45-of-daemonology-and-other-reliques-of-the-religion-of-the-gentiles",
        quote: "the Genealogie of their Gods, written by Hesiod",
      },
      {
        name: "Livy",
        dates: "59 BC–AD 17",
        mentions: 3,
        note: "Hobbes's example of the limits of testimony: to disbelieve his talking cow is to distrust Livy, not God.",
        chapter: "07-of-the-ends-or-resolutions-of-discourse",
        quote: "If Livy say the Gods made once a Cow speak",
      },
      {
        name: "Varro",
        dates: "116–27 BC",
        mentions: 1,
        note: "Invoked with Cicero as a standard of Latin that the scholastics' barbarous vocabulary would have baffled.",
        chapter: "46-of-darknesse-from-vain-philosophy-and-fabulous-traditions",
        quote: "such as would pose Cicero, and Varro, and all the Grammarians",
      },
    ],
  },
  {
    title: "Jewish writers and the church fathers",
    blurb:
      "Almost all of these are brought in for one purpose: to settle which books belong in the canon, and who had authority to say so.",
    people: [
      {
        name: "Josephus",
        dates: "AD 37–c. 100",
        mentions: 3,
        note: "\"A learned Jew\" cited on the number of the canonical books of the Hebrew Bible.",
        chapter: "33-of-the-number-antiquity-scope-authority-and-interpreters-of-the-books-of-holy-scripture",
        quote: "Josephus a learned Jew, that wrote in the time of the Emperor Domitian",
      },
      {
        name: "Philo",
        dates: "c. 20 BC–c. AD 50",
        mentions: 1,
        note: "Named with Josephus as proof that learned Jews wrote eloquent Greek, in the argument about the language of scripture.",
        chapter: "33-of-the-number-antiquity-scope-authority-and-interpreters-of-the-books-of-holy-scripture",
        quote: "we have extant the works of Philo and Josephus both Jews",
      },
      {
        name: "Jerome",
        dates: "c. 342–420",
        mentions: 4,
        note: "The authority Hobbes leans on for the canon, and for the observation that the book of Job begins in prose.",
        chapter: "33-of-the-number-antiquity-scope-authority-and-interpreters-of-the-books-of-holy-scripture",
        quote: "they are the same that are acknowledged by St. Jerome",
      },
      {
        name: "Augustine",
        dates: "354–430",
        mentions: 1,
        note: "Named once, and against him: the doctrine of purgatory is traced to his reading of a psalm rather than to the text itself.",
        chapter: "44-of-spirituall-darknesse-from-misinterpretation-of-scripture",
        quote: "if Augustine had not applied the Wrath to the fire of Hell",
      },
      {
        name: "Ambrose",
        dates: "c. 339–397",
        mentions: 1,
        note: "His excommunication of the emperor Theodosius is the precedent Bellarmine cites for papal power over princes; Hobbes calls it, if true, a capital crime.",
        chapter: "42-of-power-ecclesiasticall",
        quote: "The fact of St. Ambrose, in Excommunicating Theodosius the Emperour",
      },
      {
        name: "Cyprian",
        dates: "c. 210–258",
        mentions: 1,
        note: "Quoted by Bellarmine calling the see of Peter the head and root of episcopal authority; Hobbes answers that the law of nature is a better principle than any doctor's word.",
        chapter: "42-of-power-ecclesiasticall",
        quote: "the Sea of S. Peter is called by S. Cyprian",
      },
    ],
  },
  {
    title: "The schoolmen",
    blurb:
      "Hobbes attacks scholasticism at length and almost never names a scholastic. The whole medieval tradition is addressed collectively as \"the Schoole-men\".",
    people: [
      {
        name: "Thomas Aquinas",
        dates: "c. 1225–1274",
        mentions: 1,
        interlocutor: "aquinas",
        note: "Never properly named. He appears once, as a type of authority a fool defers to, in a list with Aristotle and Cicero: \"a Thomas, or any other Doctor whatsoever.\"",
        chapter: "04-of-speech",
        quote: "the authority of an Aristotle, a Cicero, or a Thomas",
      },
      {
        name: "Francisco Suárez",
        dates: "1548–1617",
        mentions: 1,
        note: "The one scholastic quoted directly, and only to be ridiculed: a chapter title of his is offered as a specimen of insignificant speech.",
        chapter: "08-of-the-vertues-commonly-called-intellectual",
        quote: "the Translation of the Title of the sixth chapter of Suarez first Booke",
      },
    ],
  },
  {
    title: "Contemporaries and near-contemporaries",
    blurb:
      "The moderns Hobbes names are, with one exception, people he is arguing against.",
    people: [
      {
        name: "Robert Bellarmine",
        dates: "1542–1621",
        mentions: 32,
        interlocutor: "bellarmine",
        note: "The most cited modern by a wide margin. The last third of Chapter 42 answers his <em>De Summo Pontifice</em> book by book.",
        chapter: "42-of-power-ecclesiasticall",
        quote: "maintained chiefly, and I think as strongly as is possible, by Cardinall Bellarmine",
      },
      {
        name: "Theodore Beza",
        dates: "1519–1605",
        mentions: 4,
        note: "Calvin's successor at Geneva, and the source of the hardest text against Hobbes: that Christ's kingdom began at the resurrection rather than at the last day.",
        chapter: "44-of-spirituall-darknesse-from-misinterpretation-of-scripture",
        quote: "but by Beza; that will have it to begin from the Resurrection",
      },
      {
        name: "Sir Edward Coke",
        dates: "1552–1634",
        mentions: 3,
        note: "The great common lawyer, and Hobbes's opponent on what makes law binding. Against Coke's artificial perfection of reason, Hobbes answers that it is authority, not wisdom, that makes a law.",
        chapter: "15-of-other-lawes-of-nature",
        quote: "Somewhat like to a piece of Law in Cokes Commentaries on Litleton",
      },
      {
        name: "Sir Thomas Littleton",
        dates: "c. 1407–1481",
        mentions: 1,
        note: "Named only as the author of the treatise on tenures that Coke's commentary was built on.",
        chapter: "26-of-civill-lawes",
        quote: "nor yet (as Sr. Ed, Coke makes it",
      },
      {
        name: "John Selden",
        dates: "1584–1654",
        mentions: 1,
        note: "The only living scholar Hobbes praises, for his treatise on titles of honour. One sentence, and no argument with him at all.",
        chapter: "10-of-power-worth-dignity-honour-and-worthiness",
        quote: "in Mr. Seldens most excellent Treatise of that subject",
      },
    ],
  },
  {
    title: "Lawgivers and founders",
    blurb:
      "Not philosophers, but named for what they did with doctrine: each is an example of authority claiming a divine source for its rules.",
    people: [
      {
        name: "Numa Pompilius",
        dates: "legendary, 8th–7th century BC",
        mentions: 1,
        note: "Rome's second king, who claimed to receive his ceremonies from a nymph. Hobbes's standing example of a founder pretending to revelation so that laws would be obeyed.",
        chapter: "12-of-religion",
        quote: "So Numa Pompilius pretended to receive the Ceremonies he instituted",
      },
      {
        name: "Muhammad",
        dates: "c. 570–632",
        mentions: 2,
        note: "Named in the same list, as having claimed conferences with the Holy Ghost in the form of a dove; Hobbes writes him as \"Mahomet\".",
        chapter: "12-of-religion",
        quote: "and Mahomet, to set up his new Religion, pretended to have conferences",
      },
      {
        name: "Solon",
        dates: "c. 630–c. 560 BC",
        mentions: 1,
        note: "Cited for feigning madness in order to be heard, in the argument about how far a subject may go in urging a course on the state.",
        chapter: "29-of-those-things-that-weaken-or-tend-to-the-dissolution-of-a-common-wealth",
        quote: "if Solon had not caused to be given out he was mad",
      },
      {
        name: "Justinian",
        dates: "482–565",
        mentions: 1,
        note: "Named for the <em>Institutes</em>, the source of the sevenfold division of civil law Hobbes reports before giving his own.",
        chapter: "26-of-civill-lawes",
        quote: "In the Institutions of Justinian, we find seven sorts of Civill Lawes",
      },
    ],
  },
];

/**
 * Names a reader expects and does not find. Every one of these returns zero
 * matches in the text.
 */
export const OMISSIONS = [
  {
    name: "Thucydides",
    why: "Hobbes translated him. The history of the Peloponnesian War, published in 1629, was his first book and the first English version made directly from the Greek, and its lesson about assemblies at war runs through Part II. He never names him.",
  },
  {
    name: "Euclid",
    why: "Geometry is the model for the entire method — reasoning from definitions to conclusions that hold whether or not one likes them. By Aubrey's account Hobbes discovered the <em>Elements</em> at forty and it changed his life. The name never appears.",
  },
  {
    name: "Francis Bacon",
    why: "Hobbes worked as his secretary in the 1620s, taking down his thoughts on walks at Gorhambury. The programme of replacing verbal disputation with a science of causes is close to Bacon's own.",
  },
  {
    name: "René Descartes",
    why: "Hobbes wrote the third set of Objections to the <em>Meditations</em> in 1641 and quarrelled with him afterwards. The two men disagreed precisely about incorporeal substance, which Chapter 46 is largely about.",
  },
  {
    name: "Galileo",
    why: "Hobbes visited him near Florence in 1636, and the doctrine that everything is body in motion — the foundation of Part I — is taken from the new science he represented.",
  },
  {
    name: "Marin Mersenne and Pierre Gassendi",
    why: "The Paris circle that gave Hobbes his scientific education and among whom he wrote both <em>De Cive</em> and much of <em>Leviathan</em>.",
  },
  {
    name: "Niccolò Machiavelli",
    why: "The obvious predecessor for a politics built on how people behave rather than how they ought to. His absence is the more conspicuous because Hobbes was routinely accused of being his disciple.",
  },
  {
    name: "Jean Bodin",
    why: "The theorist of indivisible sovereignty, which is the doctrine <em>Leviathan</em> is most famous for arguing. Bodin's <em>Six Books of the Common-wealth</em> was standard reading in England.",
  },
  {
    name: "Hugo Grotius",
    why: "The leading contemporary authority on natural law, covenant, and the right of war, working the same ground a decade earlier and cited by everyone else in the debate.",
  },
  {
    name: "Luther and Calvin",
    why: "The Reformation is everywhere in Part III and its two founders are never named, though Calvin's successor Beza is answered at length.",
  },
  {
    name: "Duns Scotus and William of Ockham",
    why: "The schoolmen Hobbes is attacking for most of Part IV. He takes on the doctrine and leaves the names alone, apart from the single glance at Suárez.",
  },
  {
    name: "Lucretius",
    why: "The ancient poem of atoms and void is the closest thing in antiquity to Hobbes's own materialism, and the obvious authority to claim. Seneca, Tacitus, Ovid, and Horace are missing too.",
  },
];
