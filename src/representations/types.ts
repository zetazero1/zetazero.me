import type { APIContext } from "astro";

export interface RepresentationEntry {
  path: string;
  title: string;
  description?: string;
}

export interface Representation {
  route: string;
  section: string;
  render(context: APIContext): Promise<string | null>;
  list(): Promise<RepresentationEntry[]>;
}
