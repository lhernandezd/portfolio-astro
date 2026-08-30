---
description: Run an adversarial multi-perspective review of a change (diff, PR, or specific files) using the frontend-developer, ui-ux-designer, and qa agents — QA actively tries to refute the other two before anything is reported as confirmed.
---

Run a 3-perspective adversarial review of the current diff (or whatever
scope the user specifies — a PR, a branch, specific files).

1. Determine the scope: default to `git diff` against the base branch if
   the user doesn't specify one.
2. Launch the `frontend-developer` and `ui-ux-designer` agents in
   parallel (single message, two Agent tool calls), each given the same
   scope, each reviewing independently through their own lens (see
   `.claude/agents/frontend-developer.md` and
   `.claude/agents/ui-ux-designer.md` for what they check). Ask each for
   a list of concrete findings (file/line or page/viewport, not vague
   impressions).
3. Take the combined list of findings and hand it to the `qa` agent with
   explicit instructions to adversarially verify each one: reproduce it
   directly (via the browser preview tools or by reading the code), and
   report each as either **confirmed** (with its own repro) or **refuted**
   (with the reason) — QA should not simply agree with a finding because
   it sounds plausible.
4. Also ask the `qa` agent to do its own independent bug hunt over the
   same scope (see its "bug hunting" mode) — don't limit it to only
   checking the other two agents' claims.
5. Report back only the findings QA confirmed, plus QA's own independent
   findings. Note what was refuted and why, briefly — don't just drop it
   silently.
