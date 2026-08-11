## Purpose

Provides a legible, modern, and fluid search bar component that allows users to easily view, enter, and manage search terms with optimal visual clarity in dark and light UI themes.

## ADDED Requirements

### Requirement: Expanded search input dimensions and visibility

The search box component SHALL provide an expanded horizontal width (with flex flexibility or minimum width of 240px) so that placeholder text and user-typed queries remain fully readable without horizontal text truncation.

#### Scenario: Displaying search input with placeholder

- **WHEN** the search input is rendered in the interface
- **THEN** the placeholder text and active search query are fully visible with adequate inline padding.

### Requirement: Modern rounded geometry and high-contrast styling

The search box component SHALL use smooth rounded border radii (`rounded-xl` or `rounded-full`), proportional padding, and accessible high-contrast foreground text and icons designed for dark theme backgrounds.

#### Scenario: Visual styling on dark background

- **WHEN** the search box is rendered in a header or filter bar
- **THEN** it displays rounded corners, high-contrast text, a distinct magnifying glass icon, and subtle border hierarchy instead of a rigid square box.

### Requirement: Interactive focus and clear actions

The search input SHALL highlight upon user focus with a clear focus ring and offer an interactive action to clear active search queries.

#### Scenario: Focusing and clearing search query

- **WHEN** a user focuses the search box or types text
- **THEN** a focus outline is displayed, and an intuitive clear button allows resetting the search state.
