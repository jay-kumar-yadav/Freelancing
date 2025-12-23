# Jay Kumar Yadav - Portfolio Website

A modern, Netflix-inspired portfolio website showcasing my work as a Full-Stack Developer and Freelancer.

## 🎨 Features

- **Netflix-Style UI/UX**: Dark theme with cinematic animations and smooth transitions
- **Letter-by-Letter Intro Animation**: Eye-catching landing page with animated name reveal
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile devices
- **Smooth Scrolling**: Seamless navigation between sections
- **Project Showcase**: Netflix-style project cards with hover effects
- **Contact Form**: Clean, minimal contact form with animations
- **SEO Optimized**: Meta tags and semantic HTML for better search engine visibility

## 🚀 Tech Stack

- **React.js** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **React Router** - Client-side routing

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── AboutSection.jsx
│   ├── ExperienceSection.jsx
│   ├── Footer.jsx
│   ├── ProjectCard.jsx
│   ├── ProjectsSection.jsx
│   └── SkillsSection.jsx
├── pages/              # Page components
│   ├── Landing.jsx     # Landing page with intro animation
│   ├── Portfolio.jsx   # Main portfolio page
│   ├── ProjectDetails.jsx  # Individual project details
│   └── Contact.jsx     # Contact page with form
├── App.jsx             # Main app component with routing
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🎯 Pages

1. **Landing Page** (`/`) - Netflix-style intro with animated name reveal
2. **Portfolio** (`/portfolio`) - Main portfolio with sections:
   - About Me
   - Skills
   - Experience
   - Projects
3. **Project Details** (`/project/:id`) - Detailed view of individual projects
4. **Contact** (`/contact`) - Contact form and social links

## 🎨 Customization

### Update Personal Information

Edit the following files to update your information:
- `src/components/AboutSection.jsx` - About section content
- `src/components/SkillsSection.jsx` - Skills and technologies
- `src/components/ExperienceSection.jsx` - Work experience
- `src/components/ProjectsSection.jsx` - Projects list
- `src/pages/Contact.jsx` - Social links and contact information

### Update Project Data

Edit `src/pages/ProjectDetails.jsx` to add or modify project details.

### Colors

Customize colors in `tailwind.config.js`:
- `netflix-red`: Primary accent color
- `netflix-black`: Main background
- `netflix-dark`: Secondary background

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

The site can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Simply run `npm run build` and deploy the `dist` folder.

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ by Jay Kumar Yadav
