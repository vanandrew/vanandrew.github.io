# Andrew Van Portfolio

A modern, responsive portfolio website built with Next.js and Tailwind CSS. This template is designed to be easily customizable and deployable to GitHub Pages.

## Features

- 🚀 Built with Next.js 14 and TypeScript
- 🎨 Styled with Tailwind CSS
- 📱 Fully responsive design
- 🌙 Light/dark mode support
- 🧩 Modular component structure
- 📝 Easy to customize
- 🔄 GitHub Actions workflow for automatic deployment

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/your-portfolio.git
   cd your-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

### Personal Information

Edit the content in `src/app/page.tsx` to update your personal information, projects, skills, and contact details.

### Styling

The project uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.js`.

### Components

The project is built with a modular component structure. You can find all components in the `src/components` directory:

- `Button.tsx`: Reusable button component
- `Navbar.tsx`: Navigation bar component
- `Footer.tsx`: Footer component
- `ProjectCard.tsx`: Card component for displaying projects
- `ContactForm.tsx`: Contact form component

## Deployment

This template includes a GitHub Actions workflow that automatically builds and deploys your site to GitHub Pages when you push to the main branch.

To deploy your site:

1. Push your changes to the main branch
2. GitHub Actions will automatically build and deploy your site
3. Your site will be available at `https://yourusername.github.io/your-portfolio`

## License

This project is open source and available under the [MIT License](LICENSE).
