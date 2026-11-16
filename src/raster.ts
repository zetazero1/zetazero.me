import { Resvg } from "@cf-wasm/resvg/workerd";

/** Convert generated SVG artwork to PNG for the site's OG images. */
export function svgToPng(svg: string): Uint8Array<ArrayBuffer> {
  return new Uint8Array(new Resvg(svg).render().asPng());
}
