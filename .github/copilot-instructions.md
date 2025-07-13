# Copilot Project Rules for Laravel + Inertia + TailwindCSS + React + TypeScript

## ✅ General Coding Standards

### General

-   **Language Preferences**: PHP, TypeScript, JavaScript, Blade, Markdown, JSON
-   **Style Guides**:
    -   PSR-12 for PHP
    -   Airbnb JavaScript/React Guide for React + TypeScript
    -   Tailwind CSS best practices
    -   Laravel conventions with snake_case variables for PHP
-   **Preferred Practices**:
    -   Use strict typing in PHP (`declare(strict_types=1)`)
    -   Use PHP 8.1+ features (readonly, enums, union types, match expressions)
    -   Apply SOLID principles
    -   DRY and KISS principles
    -   Prefer functional programming in React
    -   Type-safe everywhere with TypeScript
    -   Use Indonesian for content
    -   Comment consist write use Indonesian
    -   Always use Laravel command to make a file

## ✅ Laravel Backend Rules

### Architecture

-   Follow strict MVC pattern
-   Use FormRequest for validation
-   Apply Service and Repository pattern
-   Controllers only handle HTTP request/response logic
-   Business logic resides in Services
-   Use Eloquent ORM with proper relationships and scopes
-   Avoid raw SQL unless strictly necessary
-   Dependency Injection for services, repositories, and actions
-   Use Route → Controller → Service → Repository flow

### Code Style

-   Variable names in snake_case
-   Method names in camelCase
-   Class names in PascalCase
-   Use type hinting and return types everywhere
-   Follow PSR-12 coding standards while using snake_case for variables
-   Apply Laravel helper functions when appropriate

### Security

-   Enforce CSRF protection
-   Validate all incoming requests
-   Apply policies, gates, and middleware for authorization
-   Prevent SQL injection with parameter binding

### Performance

-   Use Eager Loading (`with()`) to prevent N+1 issues
-   Use cache for expensive or repetitive queries
-   Offload long tasks to queues

## ✅ Inertia + React + TypeScript Rules

### Framework

-   Inertia.js with React and TypeScript
-   Functional components with hooks
-   Tailwind CSS for styling
-   Strict TypeScript typing

### Code Style

-   Use ESLint (Airbnb + TypeScript) and Prettier
-   Folder structure: atomic or feature-based
-   File naming in kebab-case (e.g., `user-form.tsx`)
-   Apply single-responsibility on components
-   Typescript Type store on types/model.d.ts
-   Use arrow functions for components

### Components

-   Create reusable and composable components
-   Explicit typing for props, state, and API responses
-   Use React Query, SWR, or Axios for fetching data
-   Use parsistens layout app-layout or auth layout
-   Use component/forms for input handling

### Performance

-   Use `React.memo` when necessary
-   Apply dynamic imports for large components (lazy loading)
-   Use Inertia partial reload (`only`, `preserveState`)
-   Debounce expensive UI interactions

## ✅ Tailwind CSS Rules

### Usage

-   Follow utility-first CSS approach
-   Use `@apply` in CSS for common patterns
-   Manage design tokens in `tailwind.config.js`

### Responsive

-   Mobile-first approach
-   Use Tailwind responsive utilities (`sm:`, `md:`, `lg:`)

## ✅ Naming Conventions

### PHP

-   Classes: PascalCase
-   Methods: camelCase
-   Variables: snake_case
-   Constants: UPPER_SNAKE_CASE

### React

-   Components: PascalCase
-   Files: kebab-case

### Folder Structure

📦users
┣ 📂partials
┃ ┣ 📜column.tsx
┃ ┗ 📜form.tsx
┣ 📜create.tsx
┣ 📜edit.tsx
┗ 📜show.tsx
┗ 📜index.tsx

### Inertia

-   Routes: kebab-case

### Database

-   Tables: snake_case_plural
-   Columns: snake_case
-   Migrations: `YYYY_MM_DD_HHmmss_create_table_name_table`

### React Folder Structure

-   feature-based

## ✅ Commit Message Convention

### Rules

-   `feat`: fitur baru
-   `fix`: perbaikan bug
-   `docs`: perubahan dokumentasi
-   `style`: perubahan format, tidak menyentuh logic
-   `refactor`: perombakan kode tanpa perubahan fitur
-   `test`: menambah atau memperbaiki tes
-   `chore`: update tools, dependencies, atau konfigurasi

## ✅ File Extensions

### Extensions

-   PHP: `.php`
-   React: `.tsx`
-   JavaScript: `.ts`, `.js`
-   CSS: `.css`, `.pcss`
-   Inertia: `.tsx`, `.ts`, `.json`
-   Blade: `.blade.php`

## ✅ Prohibited Practices

### Prohibited

-   No inline CSS, always use TailwindCSS
-   No SQL in controllers, use Eloquent or Query Builder
-   No business logic in controllers
-   No usage of `request()->all()` without validation
-   Avoid magic strings, use constants or enums
-   No `dd()`, `dump()` in production
-   Avoid complex component state, split into smaller components
-   Check all components first before creating a new component
