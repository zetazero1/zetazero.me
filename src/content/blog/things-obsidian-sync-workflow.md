---
title: 'Bridging Things 3 and Obsidian: My Daily Planning Sync Workflow'
pubDatetime: 2026-06-01T00:00:00+08:00
description: Using Claude Code to sync task management and journaling, so plans only need to be written once.
tags:
  - Personal
---

> Using Claude Code to sync task management and journaling, so plans only need to be written once.

## Background

I use two tools to manage my life:

- **Things 3**: Task management. Structured to-dos with project grouping and recurring tasks.
- **Obsidian**: Journaling system. Daily plans, reviews, and habit tracking.

The problem: these two systems are completely independent. Every morning I check Things 3 for what's due, then manually copy it into my Obsidian journal's Plan section. At night, during review, I manually mark completed tasks back in Things.

Repetitive work, and easy to miss things.

## The Goal

**Pull one way, sync completion status both ways.**

    Morning:   Things 3 ──pull──→ Obsidian journal Plan section
                                │
    Daytime:   User reports habits ─────┤
                                │
    Night:     Review checks off items ─┤
                                ▼
                      Things 3 todo marked complete

## Design

### 1. Things 3 → Obsidian (Plan Pull)

When making a daily plan, automatically pull all incomplete to-dos from Things, grouped by project, and write them into the Obsidian journal's `#### Plan` section.

Each task sourced from Things 3 is tagged with an HTML comment containing the date:

    #### Plan
    - [ ] Native Obsidian task (no tag, not synced to Things)

    **Project A**
    - [ ] Task A <!-- 2026-06-01 -->
    - [ ] Task B <!-- 2026-06-01 -->

    **Project B**
    - [ ] Task C <!-- 2026-06-01 -->

Items without a date tag are native Obsidian tasks and won't be pushed to Things.

### 2. Obsidian → Things 3 (Completion Sync)

Two trigger methods:

**Method 1: Batch sync during review**

During nightly review, check all `- [x]` items in the Plan section, extract their titles and dates, find the matching to-do in Things, and mark it complete.

**Method 2: Real-time sync when reporting habits**

When the user says "I went for a run today" or "finished reading the book," simultaneously:

- Update the Obsidian habit field (`[workout:: 1]` / `[reading:: 1]`)
- Find and complete the corresponding to-do in Things 3 (Exercise / Reading)

## Technical Implementation

The entire system is composed of 4 Claude Code Skills:

### Skill 1: daily-plan (Plan Management)

Workflow:

1.  Check or create today's journal entry
2.  Call Things 3 MCP to pull all incomplete to-dos
3.  Group by project, add date tags
4.  Merge with native Obsidian tasks
5.  Show to user for confirmation, then write

### Skill 2: daily-review (Review Management)

Workflow:

1.  Write the user's narrative into the journal's Freewrite section
2.  Check all completed items in the Plan
3.  For items with date tags, sync completion back to Things
4.  Detect habit signal words and auto-check them off

### Skill 3: daily-habits (Habit Tracking)

Workflow:

1.  Update habit fields in the journal
2.  Check if there's a matching Things 3 to-do in the Plan
3.  If not, map directly via keywords (exercise → Exercise, reading → Reading)
4.  Find and complete the corresponding to-do in Things

### Skill 4: daily-dispatch (Smart Routing)

Analyzes the user's message and automatically determines which Skill to call:

<div class="table-scroll" role="region" aria-label="Synchronization components table" tabindex="0">

| User says                                     | Routes to                 |
|-----------------------------------------------|---------------------------|
| "Went for a run today"                        | daily-habits              |
| "Need to study linear algebra tomorrow"       | daily-plan                |
| "Had a fight with a friend today"             | daily-review              |
| "Studied vocabulary, hitting the gym tonight" | daily-habits + daily-plan |

</div>

## Data Format

### Obsidian Journal Plan Section

    #### Plan
    - [ ] English speaking practice

    **English**
    - [ ] 1h vocabulary memorization <!-- 2026-06-01 -->

    **Other**
    - [ ] Daily review <!-- 2026-06-01 -->

### Things To-Do

    Title: 1h vocabulary memorization
    Project: English
    Start Date: 2026-06-01
    Status: incomplete

### Sync Marker

The HTML comment serves as the sync marker:

- Has tag → Sourced from Things. On completion, sync back to Things.
- No tag → Native Obsidian task. No sync.

## Things Daily Recurring Tasks

For habits that happen every day (exercise, reading), set them as daily recurring in Things 3 and link them via a keyword mapping table:

<div class="table-scroll" role="region" aria-label="Daily recurring tasks table" tabindex="0">

| Habit Keywords                          | Things To-Do |
|-----------------------------------------|--------------|
| exercise, gym, run, workout             | Exercise     |
| reading, book, finished reading, Kindle | Reading      |

</div>

This way, even if these tasks aren't in the Obsidian Plan, habit tracking still syncs automatically.

## Before and After

**Before:**

1.  Open Things, check what's due today
2.  Manually copy to Obsidian journal
3.  At night, review and manually check off items
4.  Go back to Things 3 and mark each one complete

**After:**

1.  Say "make a plan," Things 3 to-dos auto-pull into the journal
2.  During the day, say "studied vocabulary," both sides check off automatically
3.  At night, review. Checked items auto-sync back to Things

Plans only need to be written once. Completion only needs to be said once.

## Tech Stack

- **Claude Code**: AI orchestration layer, runs the Skills
- **Things MCP Server**: Operates Things 3 via the MCP protocol
- **Obsidian**: Journal and notes system
- **Markdown**: Journal file format

## Takeaway

The core idea behind this workflow: **use an AI agent as a bridge between two systems.**

No complex API integration needed. No sync scripts to write. Just define the responsibilities and data format for 4 Skills, and let the AI handle sync on every interaction.

Things manages structured tasks. Obsidian manages journals and habits. Claude Code manages sync. Each does its own job.

Published 01 Jun 2026
