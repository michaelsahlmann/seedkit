Group all current changes into meaningful semantic commits and push the current branch.

Optional context for commit messages: {{context}}

Rules:
- First inspect the full repository state and branch context:
  - `git status --short`
  - `git diff --stat`
  - `git diff`
  - `git log --oneline -10`
  - `git branch --show-current`
- Check if you are on a protected branch (e.g., `main`, `master`, `dev`, `develop`). If so, warn the user before committing or pushing.
- If there are already staged files, unstage them using `git reset` to ensure clean semantic grouping from scratch.
- Identify related file groups by intent: feature, fix, refactor, tests, docs, chore, release, or config.
- Create multiple commits when there are independent changes. Do not mix unrelated changes in the same commit.
- If {{context}} is not empty, use it as context to adjust commit messages, but do not force that text if it does not accurately describe the changes.

- COMMIT MESSAGE FORMATTING RULES:
  - Follow the Conventional Commits specification.
  - Each commit message must be structured as follows:
    1. A short **Subject line** (max 72 characters) explaining *what* changed, written in the imperative mood (e.g., `feat(auth): implement token rotation`).
    2. A blank line.
    3. A **Body** (only if the changes are complex, architectural, or non-obvious) explaining *why* the change was made, the reasoning behind the implementation, and any technical decisions or potential side effects. Do not just repeat the code; explain the context so other developers do not get lost.

- Before committing, check for sensitive or suspicious files (`.env`, tokens, credentials, keys, secrets). If any appear, stop and ask.
- Include new, modified, and deleted files that belong to each group.
- Do not revert existing changes.
- Do not use `--no-verify`.
- Do not amend commits.
- Do not force push.
- If any git command (like committing) fails due to pre-commit hooks, linters, or formatting errors, stop and report the exact error to the user.

Flow:
1. Show the proposed commit plan with the files included in each commit.
2. If the grouping is clear, continue. If there is real ambiguity, ask before committing.
3. For each group:
   - Add only the files for that group with `git add <files>`.
   - Create the commit with a semantic message following the formatting rules.
4. Once all commits have been created, push the changes safely:
   - If the branch does not have an upstream set, use `git push -u origin <current_branch>`.
   - Otherwise, run `git push`.
5. When finished, summarize the commits created and the branch that was pushed.