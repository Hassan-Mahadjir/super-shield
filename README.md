# 🛡️ Super Shield - Premium Car Heat Insulator

[![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern **Saudi e-commerce platform** for Super Shield car heat insulation products, built with Next.js and React. Specializing in high-quality thermal insulation rolls designed specifically for Saudi Arabia's extreme heat conditions.

## 🌐 Live Demo

**Visit the website:** [https://super-shield-sa.com](https://super-shield-sa.com)

## 📋 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Internationalization](#-internationalization)
- [Contributing](#-contributing)
- [Authors](#-authors)
- [License](#-license)

## ✨ Features

### 🛒 E-commerce Functionality

- **Product Catalog** with heat insulator products
- **Shopping Cart** with persistent storage
- **Product Customization** with specifications
- **WhatsApp Integration** for customer support
- **Currency Display** with local pricing
- **Order Management** with quantity controls

### 🎨 User Experience

- **Responsive Design** for all device sizes
- **Dark/Light Theme** toggle with system preference
- **RTL Support** for Arabic language
- **Smooth Animations** with Motion library
- **Loading Skeletons** for better UX
- **Image Optimization** with Next.js Image component

### 🌍 Internationalization

- **Multi-language Support** (English & Arabic)
- **RTL Layout** for Arabic content
- **Localized Content** with next-intl
- **SEO Optimization** with dynamic metadata
- **Language Switching** with persistent preference

### 📱 Additional Features

- **Google Analytics** integration
- **SEO Metadata** management
- **Favicon Management** with update scripts
- **Social Media** integration
- **Customer Reviews** display
- **Interactive Map** for locations
- **Return Policy** and warranty information

## 🛠️ Tech Stack

### Core Technologies

- **[Next.js](https://nextjs.org/)** (v15.4.1) - React framework with App Router
- **[React](https://reactjs.org/)** (v19.1.0) - UI library
- **[TypeScript](https://www.typescriptlang.org/)** (v5.0) - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** (v4.0) - Utility-first CSS framework

### State Management & Data Fetching

- **[Zustand](https://zustand-demo.pmnd.rs/)** (v5.0.6) - Lightweight state management
- **[React Hook Form](https://react-hook-form.com/)** (v7.60.0) - Form handling
- **[Zod](https://zod.dev/)** (v4.0.5) - Schema validation

### UI & Styling

- **[Radix UI](https://www.radix-ui.com/)** - Accessible UI primitives
  - Dialog, Dropdown Menu, Label, Select
  - Separator, Slot, Tabs, Tooltip
- **[Lucide React](https://lucide.dev/)** (v0.525.0) - Icon library
- **[React Icons](https://react-icons.github.io/react-icons/)** (v5.5.0) - Icon collection
- **[Motion](https://motion.dev/)** (v12.23.12) - Animation library
- **[Swiper](https://swiperjs.com/)** (v11.2.10) - Touch slider
- **[Magic UI](https://magicui.design/)** - Advanced UI components

### Database & Backend

- **[Supabase](https://supabase.com/)** (v2.52.1) - Backend as a Service
- **[Nodemailer](https://nodemailer.com/)** (v7.0.5) - Email functionality

### Forms & Input

- **[React Hook Form Resolvers](https://github.com/react-hook-form/resolvers)** (v5.1.1) - Form validation
- **[Libphonenumber JS](https://github.com/catamphetamine/libphonenumber-js)** (v1.12.10) - Phone number handling

### Internationalization

- **[Next-intl](https://next-intl-docs.vercel.app/)** (v4.3.4) - Internationalization
- **RTL Support** for Arabic language

### Development Tools

- **[ESLint](https://eslint.org/)** (v9) - Code linting
- **[PostCSS](https://postcss.org/)** (v4) - CSS processing
- **[TypeScript](https://www.typescriptlang.org/)** (v5) - Type checking
- **[Sharp](https://sharp.pixelplumbing.com/)** (v0.34.3) - Image processing

## ⚙️ Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (for version control)

### Development Setup

- **VS Code** (recommended) with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/hassan-mahadjir/super-shield.git
cd super-shield
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up Environment Variables

Create a `.env.local` file in the root directory and add your configuration:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Configuration (for contact forms)
EMAIL_SERVER_HOST=your_smtp_host
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email
EMAIL_SERVER_PASSWORD=your_password

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://super-shield-sa.com
```

## ⚙️ Configuration

### Next.js Configuration

The application uses Next.js with the following key configurations:

- **App Router** for modern routing
- **Internationalization** with next-intl
- **Image optimization** with remote patterns
- **TypeScript** for type safety
- **Turbopack** for faster development builds

### Tailwind CSS Configuration

Custom Tailwind configuration includes:

- **Custom color palette** for brand consistency
- **Custom animations** for enhanced UX
- **Responsive breakpoints** for all devices
- **Dark mode support** with next-themes

### Internationalization Setup

The application supports multiple languages:

- **English** (en) - Default language
- **Arabic** (ar) - RTL support

Translation files are located in the `messages/` directory.

### Metadata and SEO

The project uses a dynamic metadata system that reads from JSON files for internationalization support:

- `messages/en.json` - English metadata
- `messages/ar.json` - Arabic metadata

Each file contains a `metadata` section with:

- `title` - Page title
- `description` - Page description
- `keywords` - SEO keywords
- `author` - Site author
- `ogTitle`, `ogDescription`, `ogImage` - Open Graph tags

## 🏃‍♂️ Running the Application

### Development Mode

```bash
# Start the development server with Turbopack
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build

```bash
# Build the application
npm run build
# or
yarn build

# Start the production server
npm start
# or
yarn start
```

### Linting

```bash
# Run ESLint
npm run lint
# or
yarn lint
```

### Updating the Logo/Favicon

To update the logo that appears in browser tabs and bookmarks:

1. Replace the logo file at `public/super.png`
2. Run the update script:
   ```bash
   npm run update-favicon
   ```

This will automatically update:

- Browser tab favicon
- Social media share images

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # Internationalized routes
│   │   ├── product/       # Product pages
│   │   │   └── [id]/      # Individual product pages
│   │   ├── cart/          # Shopping cart
│   │   ├── page.tsx       # Home page
│   │   └── layout.tsx     # Layout component
│   ├── globals.css        # Global styles
│   ├── icon.tsx           # App icon
│   ├── favicon.png        # Favicon
│   └── sitemap.ts         # Sitemap generation
├── components/            # Reusable components
│   ├── ui/               # Base UI components (Radix UI)
│   ├── cart/             # Cart-related components
│   ├── magicui/          # Magic UI components
│   ├── context/          # React context providers
│   ├── mail/             # Email components
│   ├── Hero.tsx          # Hero section
│   ├── HeatInsulator.tsx # Product showcase
│   ├── Navbar.tsx        # Navigation
│   ├── Footer.tsx        # Footer
│   ├── Map.tsx           # Location map
│   └── ...               # Other components
├── store/                # Zustand state management
│   └── cart/             # Cart state
├── lib/                  # Utility libraries
├── pages/                # API routes (if any)
├── i18n/                 # Internationalization
├── hook/                 # Custom React hooks
└── middleware.ts         # Next.js middleware
```

## 🌍 Internationalization

The application supports multiple languages with RTL support:

### Supported Languages

- **English** (en) - Default language
- **Arabic** (ar) - RTL support

### Translation Files

- `messages/en.json` - English translations
- `messages/ar.json` - Arabic translations

### Usage in Components

```typescript
import { useTranslations } from "next-intl";

const MyComponent = () => {
  const t = useTranslations("Hero");

  return <h1>{t("title")}</h1>;
};
```

### Adding New Languages

1. Create a new translation file in `messages/`
2. Add the language to the Next.js configuration
3. Update the language selector component

## 🔒 Security

### Security Features

- **Input validation and sanitization**
- **HTTPS enforcement**
- **Secure image handling**
- **Environment variable protection**

### Security Best Practices

- All API calls use HTTPS
- Input validation on all forms
- Error handling without exposing sensitive information
- Regular dependency updates for security patches

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Development Setup

1. **Fork the repository**
2. **Create a feature branch**

```bash
git checkout -b feature/amazing-feature
```

3. **Install dependencies**

```bash
npm install
```

4. **Make your changes**
5. **Run linting**

```bash
npm run lint
```

6. **Commit your changes**

```bash
git commit -m 'Add some amazing feature'
```

7. **Push to the branch**

```bash
git push origin feature/amazing-feature
```

8. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation
- Follow the existing code style
- Ensure all linting passes
- Use conventional commit messages

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use functional components with hooks
- Implement proper error handling
- Write meaningful component and function names
- Use Tailwind CSS for styling

## 👨‍💻 Authors

**Super Shield Development Team**

### Team Members

- **Software Engineer Manager** - [@Hassan Mahadjir](https://github.com/hassan-mahadjir)

  - Project Lead & Documentation
  - Full Stack Development
  - UI/UX Design
  - System Architecture

### Contact Information

- **Email**: hm.mahadjir@gmailcom
- **Project Repository**: [Super Shield](https://github.com/hassan-mahadjir/super-shield)
- **Website**: [https://super-shield-sa.com](https://super-shield-sa.com)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing React framework
- **Vercel Team** for the deployment platform
- **Tailwind CSS Team** for the utility-first CSS framework
- **Radix UI Team** for accessible UI primitives
- **Supabase Team** for the excellent backend service
- **Magic UI Team** for beautiful UI components
- **All contributors** and maintainers
- **Saudi Automotive Community** for domain expertise

---

**Made with ❤️ for Saudi Arabia's extreme heat conditions**

_This project was developed to provide high-quality car heat insulation solutions specifically designed for Saudi Arabia's climate, demonstrating modern e-commerce development practices and real-world problem-solving skills._
