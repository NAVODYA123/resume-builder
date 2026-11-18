# Navos Resume Builder

A WordPress plugin that provides a React-powered resume builder, allowing users to create, customize, and organize professional resumes through an interactive interface.

## Features

- **Resume Builder:** Create and edit resumes using an interactive UI.
- **Customizable Sections:** Manage personal information, work experience, education, and custom sections.
- **Drag-and-Drop Ordering:** Reorder resume sections to customize the layout.
- **Multiple Templates:** Display resume content using a structured, two-column layout.
- **Live Preview:** Preview resume changes while editing.
- **PDF Export:** Export resumes as PDF documents.
- **WordPress Integration:** Integrates with WordPress using a custom shortcode.
- **React Architecture:** Built with React and TypeScript, integrated into WordPress through PHP.

## Tech Stack

- WordPress / PHP
- React
- TypeScript
- Vite
- Material UI (MUI)
- React Hook Form
- CSS / SCSS

## Installation

1. Download or clone this repository.
2. Copy the plugin folder into your WordPress installation:

   `wp-content/plugins/`

3. Navigate to **WordPress Admin → Plugins**.
4. Activate **Navos Resume Builder**.

### Development Setup

Navigate to the React application directory and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the production assets:

```bash
npm run build
```

Ensure the generated build assets are available in the plugin's configured build directory.

## Usage

Add the following shortcode to any WordPress page or post:

```text
[resume_builder]
```

The resume builder interface will be rendered at the shortcode location.

## Project Architecture

The plugin separates WordPress functionality from the React application:

- **PHP:** Handles WordPress integration, shortcode registration, asset loading, and backend functionality.
- **React:** Handles the resume builder interface and user interactions.
- **TypeScript:** Provides type safety and maintainable application code.
- **Vite:** Manages the frontend development and production build process.

## Future Improvements

- Add additional resume templates and customization options.
- Support multiple resume profiles per user.
- Improve PDF export formatting and multi-page pagination.
- Add resume import functionality.
- Introduce automated testing and improve test coverage.
- Enhance accessibility and mobile responsiveness.

## Author

Lihini Galagedara
