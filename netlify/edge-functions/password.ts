import type { Config, Context } from "@netlify/edge-functions";

/**
 * Site-wide HTTP Basic Auth. Any username; the password must equal the
 * SITE_PASSWORD environment variable. If the variable is missing the site
 * refuses to serve rather than serving unprotected.
 */
export default async (request: Request, context: Context) => {
  const expected = Netlify.env.get("SITE_PASSWORD");
  if (!expected) return new Response("SITE_PASSWORD is not configured.", { status: 503 });

  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    let supplied = "";
    try {
      supplied = atob(header.slice(6)).split(":").slice(1).join(":");
    } catch {}
    if (supplied.length === expected.length && timingSafeEqual(supplied, expected)) return context.next();
  }
  return new Response("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Leviathan", charset="UTF-8"', "Cache-Control": "no-store" },
  });
};

function timingSafeEqual(a: string, b: string) {
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const config: Config = { path: "/*" };
