## Context

See `proposal.md` for motivation. Currently, search inputs use rigid box constraints (`max-w-xs`, `h-8`) and standard `rounded-lg` styling without inline icon embedding or expandable width layout.

## Goals / Non-Goals

**Goals:**
- Provide a dedicated, highly legible search bar component with smooth rounded visual geometry (`rounded-xl` or pill styling).
- Ensure typed queries and placeholder text have sufficient horizontal spacing (`w-full sm:w-72` or expandable flex).
- Embed search icon prefix and optional clear button suffix cleanly inside the input container.
- Maintain consistent dark theme styling, high contrast text, and subtle focus transitions.

**Non-Goals:**
- Changing backend search indexing or URL search parameter routing (`?q=...`).
- Modifying standard single-line form inputs (e.g., login or settings inputs).

## Decisions

### Decision 1: Create a dedicated `SearchInput` component variant

**Choice:** Build a specialized `SearchInput` component in `src/components/ui/search-input.tsx` (or wrap `Input` in `src/components/blocks/block-filters.tsx`) featuring icon positioning and clear actions.

**Rationale:** Modifying the generic `Input` component globally would impact non-search forms (login, email, password fields). Creating a search-specific component encapsulates search icons, clear handlers, and rounded pill aesthetics cleanly.

**Alternatives Considered:** Modifying the base `Input` directly (rejected to avoid styling regressions on standard text fields).

### Decision 2: Geometry & Visual Tokens for Dark Theme

**Choice:** Apply `rounded-xl` or `rounded-full` border radius, `bg-muted/40` resting background, `px-3 py-1.5` internal padding, and `focus-within:ring-2 focus-within:ring-primary/40` for focus state.

**Rationale:** Solves the user's issue with the "squarish" ("muy cuadrado") presentation, giving the search bar a sleek, modern visual aesthetic that integrates seamlessly with dark UI cards.

## Risks / Trade-offs

- **[Risk]** Responsive overflow on smaller mobile viewports when expanding search bar width.
  - **Mitigation:** Use Tailwind fluid width rules (`w-full sm:w-80`) with `min-w-[200px]` constraints so the input scales smoothly on mobile screens.
