---
title: 'Building a Personal Site with GitHub Pages'
pubDatetime: 2026-05-04T00:00:00+08:00
description: How I built a personal site with GitHub Pages, a custom domain, semantic HTML, and a restrained reading-first design.
tags:
  - Personal
---

I recently went through the process of setting up my personal website using GitHub Pages. What seemed like a simple task turned into a deep dive into static site generators, DNS configuration, SSL certificates, and web performance optimization. Here's what I learned along the way.

## Why GitHub Pages?

There are dozens of ways to host a personal website. You could use Vercel, Netlify, Cloudflare Pages, or even a traditional VPS. So why did I choose GitHub Pages?

The answer is simplicity. GitHub Pages is **free**, requires **zero server maintenance**, and integrates directly with your Git workflow. Push to main, and your site is live. No build pipelines to configure, no servers to patch, no bills to pay.

> The best infrastructure is the infrastructure you don't have to think about.

For a personal blog or portfolio site, GitHub Pages is more than enough. It serves static files over HTTPS with a global CDN, handles custom domains, and even supports Jekyll out of the box if you want it.

## The Setup Process

### Step 1: Create the Repository

GitHub Pages for user sites requires a specific repository naming convention. Your repo must be named `username.github.io`, where `username` is your GitHub username. This is non-negotiable.

    gh repo create Ha1baraA11.github.io --public --clone

The `--public` flag is important. GitHub Pages only works with public repositories on the free tier (unless you have GitHub Pro).

### Step 2: Choose Your Tech Stack

You have several options for building your site:

- **Pure HTML/CSS/JS**: Maximum control, no build step
- **Jekyll**: GitHub's built-in static site generator
- **Hugo**: Fast, Go-based static site generator
- **11ty (Eleventy)**: Flexible JavaScript-based SSG
- **React/Vue/Svelte**: SPA frameworks with static export

I went with a hybrid approach: **pure HTML/CSS for the layout**, with Jekyll handling the blog post pipeline. This gives me full control over the design while still letting me write blog posts in Markdown.

### Step 3: Configure a Custom Domain

If you own a domain (I bought `zetazero.top`), you can point it to GitHub Pages. This involves two things:

#### DNS Configuration

You need to create A records pointing to GitHub's IP addresses:

<div class="table-scroll" role="region" aria-label="DNS configuration table" tabindex="0">

| Record Type | Host | Value              |
|-------------|------|--------------------|
| A           | @    | 185.199.108.153    |
| A           | @    | 185.199.109.153    |
| A           | @    | 185.199.110.153    |
| A           | @    | 185.199.111.153    |
| CNAME       | www  | username.github.io |

</div>

#### CNAME File

Add a file named `CNAME` to the root of your repository with your domain:

    zetazero.top

This tells GitHub Pages to serve your site at that domain instead of `username.github.io`.

#### SSL Certificate

GitHub automatically provisions a free SSL certificate via Let's Encrypt after you verify your domain. The process involves adding a TXT record to your DNS:

    _github-pages-challenge-username.zetazero.top  TXT  "your-verification-code"

After verification, HTTPS is enabled automatically. This can take anywhere from a few minutes to an hour.

## Design Decisions

I spent a lot of time thinking about the design. My reference was [industrialempathy.com](https://www.industrialempathy.com/), a blog by Malte Ubl (formerly of Google) that uses the `eleventy-high-performance-blog` template.

### What Makes It Work

The design succeeds because of what it *doesn't* do. There are no:

- Hero images or background videos
- Complex multi-column layouts
- Animated transitions or parallax effects
- Social media feeds or comment widgets
- Cookie banners or newsletter popups

Instead, it relies on **strong typography** and **generous whitespace**. The content is the design.

### The CSS Framework

Under the hood, it uses **Bahunya**, a classless CSS framework. "Classless" means you don't need to add CSS classes to your HTML elements. The framework styles semantic HTML directly:

    <!-- No classes needed -->
    <article>
      <h1>Title</h1>
      <p>Content here...</p>
      <blockquote>
        <p>A quote</p>
      </blockquote>
    </article>

This approach has several advantages:

1.  everywhere" data-zh="**更干净的 HTML**：到处都是 `class=\"text-lg font-bold text-gray-700\"`"\>**Cleaner HTML**: No `class="text-lg font-bold text-gray-700"` everywhere
2.  **Smaller CSS**: The entire framework is under 3KB
3.  **Better accessibility**: Forces you to use proper semantic elements
4.  **Easier maintenance**: Change the design by editing one CSS file

### Color Palette

The color scheme is minimal:

- **Background:** `#181818` (near-black)
- **Text:** `#eee` (off-white)
- **Accent:** `#f9c412` (gold)
- **Code background:** `#2d2d2d` (dark gray)
- **Inline code:** `#e2777a` (soft red)

The gold accent color serves multiple purposes: links, buttons, blockquote borders, progress bars, and table headers. It creates visual consistency without needing a complex design system.

## Typography

Typography is the backbone of any reading-focused site. The template uses **Inter UI**, a variable font designed for screens. Variable fonts are great because they include all weights in a single file, reducing HTTP requests.

### Responsive Scaling

The font sizes scale across three breakpoints:

<div class="table-scroll" role="region" aria-label="Responsive typography table" tabindex="0">

| Viewport       | Body Text | H1       | H2       |
|----------------|-----------|----------|----------|
| \< 600px       | 1rem      | 2.074rem | 1.728rem |
| 600px – 1199px | 1.1rem    | 4.398rem | 3.11rem  |
| ≥ 1200px       | 1.2rem    | 6.076rem | 4.05rem  |

</div>

This creates a dramatic visual hierarchy on large screens while remaining readable on mobile. The heading sizes use a modular scale based on `1.2` (minor third), which creates natural visual harmony.

## Performance

Performance was a key design goal. The original template achieves a perfect 100 on all Lighthouse audits. Here's how:

### Critical CSS Inlining

The CSS is inlined directly into the HTML `<head>` instead of loading an external stylesheet. This eliminates a render-blocking request:

    <head>
      <style>
        /* All CSS here */
      </style>
    </head>

For a small site like this, the CSS is under 5KB, so inlining it is a net win. For larger sites, you'd want to split critical CSS from non-critical CSS.

### Image Optimization

The template generates multiple image sizes with `srcset`, creates blurry placeholders, and transcodes to AVIF and WebP formats. It also uses native lazy loading and async decoding.

    <picture>
      <source srcset="image.avif" type="image/avif">
      <source srcset="image.webp" type="image/webp">
      <img src="image.jpg" loading="lazy" decoding="async"
           width="800" height="600" alt="Description">
    </picture>

### Font Loading

Fonts are served from the same origin (not from Google Fonts) with `display: optional`. This means the text renders immediately with a system font, and the custom font only loads if it's available by the time the browser paints. No layout shift, no invisible text.

## What I'd Do Differently

Looking back, there are a few things I'd change:

Start with a template  
Don't build from scratch. Find a template that's close to what you want and customize it. You'll save hours.

Use a build tool from day one  
Even for a simple site, having a build step for CSS minification and image optimization pays off quickly.

Write content first  
I spent too much time on the design before having any content. The design should serve the content, not the other way around.

Don't over-optimize  
A personal blog doesn't need edge functions, ISR, or a CDN with 200 PoPs. GitHub Pages is enough.

## Conclusion

Building a personal site with GitHub Pages is a great way to learn web fundamentals. You'll encounter DNS, SSL, CSS, HTML, and JavaScript in a low-stakes environment. And when you're done, you have a permanent home on the internet that you fully control.

The code for this site is available on [GitHub](https://github.com/Ha1baraA11/Ha1baraA11.github.io). Feel free to use it as a starting point for your own site.

Published 04 May 2026
