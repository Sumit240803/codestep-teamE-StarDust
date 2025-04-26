# Contributing Guidelines

Thank you for your interest in contributing to our project! To maintain consistency and quality across the codebase, please follow these guidelines when contributing.

## Folder and File Naming Convention
- **All folders and files** should be named using **Capital Case** (e.g., `Button`, `Accordion`, `ProfilePage`).
  
## Components Structure

### Re-usable Components
For components that are intended to be reused (e.g., `Button`, `Accordion`, `Alert`, etc.), please follow this structure:

- A folder should be created under the `components` directory.
- The folder name should be capitalized (e.g., `components/Button`).
- Inside the folder, create:
  - An `index.tsx` file for the component logic.
  - An `index.css` file for styling, where all Tailwind CSS classes should be applied.

Example:

```
components/
 └── Button/
     ├── index.tsx
     └── index.css
```

#### Tailwind CSS Usage
- **Do not use inline Tailwind CSS classes** within the JSX/TSX files.
- Instead, create a corresponding CSS file (`index.css`) and apply Tailwind classes using `@apply` within CSS rules. 

Example CSS (`index.css`):
```css
.box {
  @apply mx-0 block py-2;
}
```

### Page-Specific Components
- All components related to a particular page should be placed inside the `components/[page_name]` folder.
- Example: Components for the `ProfilePage` should go inside `components/ProfilePage`.

## Pages Structure
- All pages should be created inside the `pages` folder.

Example:

```
pages/
 └── ProfilePage.tsx
```

## Hooks Structure
- All custom hooks should be placed in the `hooks` folder, located in the `src` directory.

Example:

```
src/
 └── hooks/
     └── useFetchData.ts
```

## Utils Structure
- All utility functions should be placed inside the `utils` folder, located in the `src` directory.

Example:

```
src/
 └── utils/
     └── formatDate.ts
```

## General Guidelines
- Make sure your code follows the style and structure guidelines mentioned above.
- Perform a self-review of your code before submitting.
- Add comments where necessary, especially in complex or non-obvious parts of your code.

Thank you for contributing! 
