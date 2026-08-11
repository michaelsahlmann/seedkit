## Why

The current search box in the application user interface is visually constrained to a small, squarish shape ("muy cuadrado"), which hides search terms as they are typed and reduces usability ("no se ve lo que se busca"). Improving the search bar's layout, width, border radius, and typography ensures search inputs are immediately clear, legible, and aesthetically aligned with modern UI standards.

## What Changes

- Expand the search box container width to provide full visibility of typed queries and placeholder text.
- Update border radius and visual hierarchy from rigid/squarish corners to modern, smooth rounded boundaries (`rounded-xl` / pill aesthetic).
- Add visible icon indicators (search icon, clear button) with proper padding and high contrast for dark mode backgrounds.
- Ensure responsive behavior on standard and compact viewports.

## Capabilities

### New Capabilities

- `search-box-ui`: Defines the visual design, interactive states, and legibility requirements for search input components in the application header and filter bars.

### Modified Capabilities

*(None)*

## Impact

- `src/components/blocks/block-filters.tsx` and shared search input components.
- `src/components/ui/input.tsx` styling and focus states.
- Dark mode theme color contrast and typography readability.
