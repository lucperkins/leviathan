/**
 * Disciplines that claim Hobbes as an ancestor. Each entry is a claim somebody
 * actually makes, with the passage in *Leviathan* it rests on, so a reader can
 * see how much of the claim is in the book and how much is in the claimant.
 * Same shape as src/lib/library.mjs, rendered by the Shelves component:
 * `title` is the claim, `author` whoever presses it, `note` the case for it.
 */
const W = "https://en.wikipedia.org/wiki/";

export const CLAIMS = [
  {
    title: "The human sciences",
    blurb:
      "The oldest and largest of the claims: that Hobbes was the first person to do to human beings what the new physics had done to bodies.",
    works: [
      {
        id: "social-science",
        title: "The first social scientist",
        href: `${W}Social_science`,
        author: "The standard claim",
        year: "since 1651",
        note: "He took the resolutive-compositive method of the Paduan physicists — resolve a thing into its parts, learn the parts, recompose — and applied it to the commonwealth, then to the man inside it, then to the motions inside the man. The Introduction tells the reader to do it himself: Nosce teipsum, read thy self, and having learned the passions in yourself, you will read them in everyone. Hobbes's own version of the claim is in De Corpore: civil philosophy, he says, is no older than his own book De Cive.",
      },
      {
        id: "associationism",
        title: "The first associationist psychology",
        href: `${W}Associationism`,
        author: "Hartley, Hume, and the tradition after them",
        year: "1739–1749",
        note: "Chapter 3 explains why one thought follows another: imaginations run in trains, and the order of a train is the order in which the sense impressions first arrived. The doctrine that mental life is a chain of associations, which Hume and Hartley made the centre of eighteenth century psychology, is stated here first and without ceremony.",
      },
      {
        id: "methodological-individualism",
        title: "Methodological individualism",
        href: `${W}Methodological_individualism`,
        author: "J. W. N. Watkins",
        year: "1965",
        note: "That every social fact must be explicable by the dispositions and situations of individual people, because there is nothing else for it to consist of. Watkins, who named the principle for modern social science, took Hobbes as its first thoroughgoing practitioner: the commonwealth is explained by showing how individuals would make one.",
      },
      {
        id: "artificial-intelligence",
        title: "The grandfather of artificial intelligence",
        href: `${W}Artificial_intelligence`,
        author: "John Haugeland",
        authorHref: `${W}John_Haugeland`,
        year: "1985",
        note: "Because of one sentence in Chapter 5: reason is nothing but reckoning, that is, adding and subtracting, of the consequences of general names. If thinking is computation on symbols, a machine that computes on symbols is thinking, and the whole research programme follows. Haugeland opens his book on AI by giving Hobbes the title.",
      },
    ],
  },
  {
    title: "Politics and law",
    blurb: "Claims about what he founded rather than what he argued.",
    works: [
      {
        id: "modern-political-philosophy",
        title: "The founder of modern political philosophy",
        author: "Leo Strauss, and most syllabuses since",
        authorHref: `${W}Leo_Strauss`,
        year: "1936",
        note: "That the break is at Hobbes: politics stops asking what the best life is and starts from what people actually want and fear, with rights before duties and the individual before the city. Whether that makes him the first modern or the last of something else is the argument Strauss spent a career on.",
      },
      {
        id: "legal-positivism",
        title: "Legal positivism",
        href: `${W}Legal_positivism`,
        author: "Bentham and John Austin",
        authorHref: `${W}John_Austin_(legal_philosopher)`,
        year: "1776–1832",
        note: "Law is the command of the sovereign, and its validity has nothing to do with whether it is good: Chapter 26 says a law may be unjust in the sense of iniquitous but cannot be unjust in the sense of invalid. Austin's command theory is this with the theology and the covenant removed, and every twentieth century jurisprudence since Hart has had to answer it.",
      },
      {
        id: "group-agency",
        title: "Corporate persons and group agency",
        href: `${W}Corporate_personhood`,
        author: "Christian List and Philip Pettit",
        authorHref: `${W}Philip_Pettit`,
        year: "2011",
        note: "Chapter 16 is the first sustained account of how a multitude becomes one person by authorising a representative — which is the problem a modern theory of corporations, states and committees has to solve. List and Pettit's work on group agency starts from it, and Skinner has traced the modern idea of the state as a person back through the same chapter.",
      },
      {
        id: "realism",
        title: "Realism in international relations",
        href: `${W}Realism_(international_relations)`,
        author: "The discipline, by adoption",
        year: "since 1945",
        note: "One sentence of Chapter 13 — kings in the state and posture of gladiators, forts and garrisons and spies pointed at each other — became the founding image of a school. Hobbes says almost nothing else about relations between states, which has not stopped Hobbesian from meaning anarchy without a common power.",
      },
    ],
  },
  {
    title: "The modern toolkit",
    blurb: "Later machinery that turned out to fit the argument, and was fitted to it.",
    works: [
      {
        id: "rational-choice",
        title: "Rational choice and game theory",
        href: `${W}Rational_choice_model`,
        author: "Gauthier, Hampton, Kavka",
        year: "1969–1986",
        note: "The state of nature is a collective action problem: everyone prefers peace, nobody can afford to disarm first, and the Foole of Chapter 15 is the free rider asking why he should keep a covenant when breaking it pays. Hobbes describes the structure three centuries before there was a name for it, which is why the reconstructions read so naturally.",
      },
      {
        id: "semantics",
        title: "A theory of meaning built on names",
        href: `${W}Philosophy_of_language`,
        author: "The nominalist line",
        year: "Chapter 4",
        note: "Truth and falsity are properties of speech, not of things; universals are names; definitions settle what a word will do, and reasoning that has not settled them is not reasoning. Whatever else Part I is, it is a philosophy of language put at the foundation of a political argument, which was a new thing to do.",
      },
      {
        id: "public-choice",
        title: "Constitutional economics",
        href: `${W}Public_choice`,
        author: "James Buchanan",
        year: "1975",
        note: "That the rules of the game should be chosen by the players in advance, on terms each would accept without knowing how they will do under them. Buchanan's constitutional economics is Hobbesian in structure — an agreement among self-interested parties to be bound — and he said so, while rejecting the sovereign that Hobbes thought the agreement required.",
      },
    ],
  },
];

export const CLAIMS_TOTAL = CLAIMS.reduce((n, s) => n + s.works.length, 0);
