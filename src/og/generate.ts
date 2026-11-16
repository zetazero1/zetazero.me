import { type CollectionEntry } from "astro:content";
import { svgToPng } from "@/raster";
import postOgImage from "./templates/post";
import siteOgImage from "./templates/site";

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await postOgImage(post);
  return svgToPng(svg);
}

export async function generateOgImageForSite() {
  const svg = await siteOgImage();
  return svgToPng(svg);
}
