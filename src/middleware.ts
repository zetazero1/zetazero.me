import type { MiddlewareHandler } from "astro";
import { prefersMarkdown } from "./middleware/negotiate";
import { MARKDOWN_CONTENT_TYPE, representationFor } from "./representations";

const markdown: MiddlewareHandler = async (context, next) => {
  const { request } = context;
  if (request.method !== "GET" && request.method !== "HEAD") return next();
  const representation = representationFor(context.routePattern);
  if (!representation) return next();
  if (prefersMarkdown(request)) {
    const md = await representation.render(context);
    if (md !== null) {
      return new Response(request.method === "HEAD" ? null : md, {
        headers: { "Content-Type": MARKDOWN_CONTENT_TYPE, Vary: "Accept" },
      });
    }
  }
  // The HTML answer varies on Accept too, or a cache could hand it to a
  // client that asked for markdown.
  const response = await next();
  addVary(response.headers, "Accept");
  return response;
};

export const onRequest = markdown;

function addVary(headers: Headers, value: string): void {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", value);
    return;
  }
  if (existing.trim() === "*") return;
  const tokens = existing
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean);
  if (
    tokens.includes("*") ||
    tokens.some((token) => token.toLowerCase() === value.toLowerCase())
  )
    return;
  headers.set("Vary", [...tokens, value].join(", "));
}
