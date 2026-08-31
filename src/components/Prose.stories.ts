import Prose from "../theme/components/Prose.astro";

const body = `
<p>Nature hath made men so equall, in the faculties of body, and mind; as that though there bee found one man sometimes manifestly stronger in body, or of quicker mind then another; yet when all is reckoned together, the difference between man, and man, is not so considerable, as that one man can thereupon claim to himselfe any benefit, to which another may not pretend, as well as he.</p>
<h3>From Equality Proceeds Diffidence</h3>
<p>From this equality of ability, ariseth equality of hope in the attaining of our Ends. And therefore if any two men desire the same thing, which neverthelesse they cannot both enjoy, they become enemies; and in the way to their End, (which is principally their owne conservation, and sometimes their delectation only,) endeavour to destroy, or subdue one an other.</p>
<p>Hereby it is manifest, that during the time men live without a common Power to keep them all in awe, they are in that condition which is called Warre; and such a warre, as is of every man, against every man.</p>
`;

export default {
  title: "Reading/Prose",
  component: Prose,
};

export const Default = {
  args: { slots: { default: body } },
  parameters: {
    docs: {
      source: {
        code: `<Prose>\n  <Content />\n</Prose>`,
        language: "astro",
      },
    },
  },
};

export const WithPullQuote = {
  args: {
    slots: {
      default: `
<p>Whatsoever therefore is consequent to a time of Warre, where every man is Enemy to every man; the same is consequent to the time, wherein men live without other security, than what their own strength, and their own invention shall furnish them withall. In such condition, there is no place for Industry; because the fruit thereof is uncertain: and consequently no Culture of the Earth; and which is worst of all, continuall feare, and danger of violent death; And the life of man, solitary, poore, nasty, brutish, and short.</p>
<aside class="pullquote" role="note" aria-label="Pull quote"><p>And the life of man, solitary, poore, nasty, brutish, and short.</p></aside>
<p>It may seem strange to some man, that has not well weighed these things; that Nature should thus dissociate, and render men apt to invade, and destroy one another.</p>`,
    },
  },
};
