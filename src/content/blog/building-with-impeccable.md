---
title: 'Building with Impeccable'
pubDatetime: 2026-06-01T00:00:00+08:00
description: How I used /impeccable to take my personal blog from rough to polished, one command at a time.
tags:
  - Personal
---

I have a personal blog. It's nothing fancy: static HTML, a dark theme, a handwriting animation on the hero. It worked. It looked fine. But "fine" and "polished" are different things.

Recently I went through the whole site using [Impeccable](https://impeccable.style), a design-focused AI skill for Claude Code. The process follows a loop: plan, build, review, refine. Six commands, each doing one thing well. Here's what happened at each step.

## 1. Init: Setting the Foundation

Before touching any code, `/impeccable init` asked me questions about the project. What's the purpose? Who's the audience? What's the brand personality?

My answers were straightforward: a personal blog, not a portfolio. Visitors land here through a direct link or a GitHub profile. The brand personality is "restrained, intimate, opinionated." The site should feel like a notebook on someone's desk, not a pitch deck.

Init generated a `PRODUCT.md` file that captures all of this. Every subsequent command reads it to understand context. The anti-references were especially useful: "no generic SaaS landing pages, no corporate portfolio templates." Having that written down meant the AI wouldn't drift toward defaults.

## 2. Shape: Planning Before Building

`/impeccable shape` is the "think before you build" step. Instead of jumping straight to code, it produces a design brief: what's being built, what it should look like, what references to draw from.

I didn't use shape for a single feature. Instead, I used it to frame the overall improvement direction. The brief identified the key surfaces: the homepage layout, the about page, the typography hierarchy, the interaction states. It recommended a "Restrained" color strategy (one accent, tinted neutrals), which matched what the site already was.

The important thing shape gave me was a contract. Once the brief was confirmed, every subsequent command had a clear target to aim at.

## 3. Craft: Building to Production Quality

`/impeccable craft` is where the actual work happens. It reads the design brief, inspects the existing code, and makes changes in passes: structure first, then visual system, then states, then motion, then responsive behavior.

The craft pass on my site did a lot of small things that add up:

- Unified all transitions to use an ease-out-quart curve instead of the default `ease`
- Improved the heading hierarchy: larger h1, heavier weights, `text-wrap: balance`
- Fixed the light theme's nav color from a mismatched teal to the brand blue
- Added `font-feature-settings` and font smoothing to the body
- Added `prefers-reduced-motion` support across all animations
- Added focus-visible styles for keyboard navigation

None of these changes are dramatic on their own. But together they make the site feel like someone cared about the details.

## 4. Audit: Technical Quality Check

`/impeccable audit` is a technical pass, not a design critique. It checks five dimensions: accessibility, performance, theming, responsive design, and anti-patterns. Each gets a score from 0 to 4.

My first audit scored 17 out of 20. The findings:

- The password input in the auth modal had no `aria-label` (P1)
- Two CSS transitions used layout properties like `padding-left` (P2)
- The error color was hard-coded instead of using a token (P2)
- The muted text color was right at the WCAG contrast threshold (P2)

I fixed all four in one pass. The second audit scored 19 out of 20. The only remaining deduction was a `width` transition on a pseudo-element, which is technically a layout property but has negligible impact since it's absolutely positioned.

## 5. Critique: Design Review

Where audit checks the code, `/impeccable critique` checks the design. It scores Nielsen's 10 usability heuristics, runs an automated detector for AI slop tells, and tests through different user personas.

My critique scored 31 out of 40. The highlights were strong: "Does NOT look AI-generated" (the detector's verdict), consistent token usage, clear visual hierarchy. The weak spots were:

- The About page had generic copy that didn't match the homepage's personality
- The footer was a single link with no context
- The blog post used em-dashes (the style guide bans them)

The persona tests were the most useful part. "Jordan" (first-timer) noted the About page felt like a different site. These aren't things a code audit would catch.

## 6. Polish: The Final Pass

`/impeccable polish` is the last step. It goes through everything systematically: spacing, typography, color contrast, interaction states, responsive behavior, code quality.

By the time I reached polish, most of the heavy lifting was done. The polish pass caught a few remaining details: the footer spacing was too generous on mobile, the `console.error` in the font loader was intentional (not debug logging), and the Prism.js syntax highlighting colors don't adapt to the light theme.

The last one is still on my list. Everything else shipped.

## What I Learned

The biggest takeaway wasn't any specific fix. It was the discipline of the loop. Each command has one job. Init sets context. Shape plans. Craft builds. Audit checks the code. Critique checks the design. Polish catches what's left.

Without that structure, I'd have jumped straight to "make it look better" and ended up tweaking colors randomly. With it, every change had a reason and a priority.

The anti-pattern detection was surprisingly useful. The detector flagged things I wouldn't have noticed: the em-dashes, the hard-coded error color, the layout-property transitions. Small things, but they add up to a site that feels intentional instead of accidental.

## Skills: Beyond the Core Six

The six commands above are the core workflow, but `/impeccable` isn't limited to them. It ships with over 20 sub-commands covering everything from animation to typography to responsive design. You don't need to memorize them all. You just describe what you want, and `/impeccable` figures out which skill to invoke.

Say "the colors feel flat." It routes to `/impeccable colorize`. Say "this error message is confusing." It calls `/impeccable clarify`. Say "make the animations smoother." It invokes `/impeccable animate`. The routing is based on intent, not syntax. You talk about your problem; it picks the right tool.

There's also `/impeccable live`, which opens a browser overlay where you can click on any element, leave a comment, and get three visual variants generated directly into your source code. Accept one, and the rest are removed. It's the fastest way to iterate on a specific element without describing it in words.

The full command list is in the [docs](https://impeccable.style/docs/). But in practice, you'll use maybe 5 or 6 commands regularly. The rest are there when you need them.

Published 01 Jun 2026
