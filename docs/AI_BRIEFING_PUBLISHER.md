# AI Briefing Publisher contract

This document is the hand-off contract for the future **GitHub Actions + model API** publisher. It does not create or schedule that workflow, and no API key is stored in this repository.

## Purpose

On each publishing day, research the preceding 24 hours of material AI developments, write one bilingual canonical briefing, commit it to this repository, and confirm that GitHub Pages has deployed successfully.

## Required order of operations

1. Read [`AI_BRIEFING_EDITORIAL.md`](AI_BRIEFING_EDITORIAL.md) and the current `data/ai-briefings/index.json` before drafting.
2. Define the ISO 8601 coverage window ending at the run's `asOf` time. Do not claim that an item occurred in the window unless its source supports that timing.
3. Check first-party announcements from the designated companies before using secondary reporting. Keep source URLs beside the claims they support.
4. Separate verified fact, context, and editorial analysis in the JSON fields. Do not turn a source's forecast, marketing claim, or opinion into a fact.
5. If there are not enough reliable, material sources for a useful daily briefing, make **no content commit**. Report the no-publish outcome instead.
6. For a publishable issue, create exactly:
   - `data/ai-briefings/YYYY-MM-DD.json`
   - `reports/ai-briefings/YYYY-MM-DD.md`
   - an updated `data/ai-briefings/index.json`
   - an updated `data/ai-briefings/latest.json` date pointer
7. Run `npm run validate`. A failed validation means no commit and no update to `latest.json`.
8. Commit and push only the canonical set of changes. Never rewrite an existing historic issue automatically. The workflow must use an Actions secret (for example `OPENAI_API_KEY`), never a checked-in key or plaintext workflow variable.
9. Check the repository's Pages deployment after the push. Treat the issue as published only when the deployment succeeds; otherwise report the failure clearly.

## Boundaries

- The publisher must not edit investment dashboard market data, portfolio views, or the site's presentation code.
- It must not invent a briefing to satisfy a schedule.
- It must not point `latest.json` at a partial draft.
- One date has one canonical issue. Corrections to a historic issue require an explicit human decision and a documented reason.

## Definition of a successful run

A run is successful only when all of the following are true:

1. The canonical JSON and Markdown are both present and agree.
2. The repository validation passes.
3. The commit is on the default branch.
4. GitHub Pages has deployed that commit successfully.
