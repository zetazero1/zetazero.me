import { describe, expect, it } from "vitest";
import type { CollectionEntry } from "astro:content";
import { articleFilter, noteFilter } from "./posts";

const entry = (kind: "article" | "note") =>
  ({
    data: {
      kind,
      draft: false,
      pubDatetime: new Date("2020-01-01T00:00:00Z"),
    },
  }) as CollectionEntry<"blog">;

describe("content kind filters", () => {
  it("keeps notes out of article listings", () => {
    expect(articleFilter(entry("article"))).toBe(true);
    expect(articleFilter(entry("note"))).toBe(false);
  });

  it("keeps articles out of the notes listing", () => {
    expect(noteFilter(entry("note"))).toBe(true);
    expect(noteFilter(entry("article"))).toBe(false);
  });
});
