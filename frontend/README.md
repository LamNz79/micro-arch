# Frontend - Microservices Architecture

A modern Next.js frontend application built with Mantine UI components, serving as the user interface for the microservices architecture.

## 🎨 Overview

This frontend application provides a clean, responsive interface for interacting with the backend microservices (Orders and Inventory). Built with Next.js 16 App Router and styled with Mantine UI components and TailwindCSS.

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1 with App Router
- **UI Library**: Mantine 8.3.11
- **Styling**: TailwindCSS 4 + PostCSS with Mantine preset
- **Language**: TypeScript 5
- **React**: 19.2.3

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with Mantine provider
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles
│   │   └── pages/              # Application pages
│   │       ├── order/          # Order management page
│   │       └── demo/           # Demo page
│   ├── features/               # Feature-based modules
│   │   └── orders/             # Order feature module
│   ├── providers/              # React context providers
│   │   └── Provider.tsx        # Mantine theme provider
│   └── shared/                 # Shared components and utilities
│       └── components/
│           └── AppShellLayout.tsx  # Main app shell layout
├── public/                     # Static assets
├── package.json
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── postcss.config.mjs          # PostCSS configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# From the project root (recommended - installs all workspace dependencies)
npm install

# Or from the frontend directory
cd frontend
npm install
```

### Development

```bash
# Start development server with Turbopack
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 🎯 Features

### Current Pages

- **Home** (`/`) - Landing page
- **Orders** (`/pages/order`) - Order management interface
- **Demo** (`/pages/demo`) - Demo page with Mantine components

### UI Components

The application uses Mantine UI components for a consistent, accessible interface:

- **AppShellLayout** - Main application shell with navigation
- **TextInput** - Form inputs
- **Title** - Typography components
- And more Mantine components as needed

### Styling

The project uses a hybrid styling approach:

1. **Mantine Components** - Pre-styled, accessible UI components
2. **TailwindCSS** - Utility-first CSS framework
3. **PostCSS** - CSS processing with Mantine preset

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
# API Gateway URL (if using Kong)
NEXT_PUBLIC_API_URL=http://localhost:8000

# Or direct service URLs
NEXT_PUBLIC_ORDERS_API=http://localhost:3001
NEXT_PUBLIC_INVENTORY_API=http://localhost:3002
```

### Theme Customization

The Mantine theme is configured in `src/providers/Provider.tsx`. You can customize:

- Color scheme (light/dark mode)
- Primary colors
- Font family
- Component default props

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack (faster builds)
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🏗️ Architecture Patterns

### App Router

This project uses Next.js 13+ App Router with:

- **Server Components** by default for better performance
- **Client Components** (`'use client'`) for interactive features
- **Layouts** for shared UI across routes

### Feature-Based Organization

Features are organized in the `features/` directory:

```
features/
└── orders/
    ├── components/     # Feature-specific components
    ├── pages/          # Feature page components
    └── hooks/          # Feature-specific hooks
```

### Shared Components

Reusable components live in `shared/components/`:

- **AppShellLayout** - Main application layout with header, navbar, and footer
- Other shared UI components

## 🎨 Styling Guidelines

### Using Mantine Components

```tsx
import { Button, TextInput, Title } from '@mantine/core';

export default function MyComponent() {
  return (
    <>
      <Title order={1}>Welcome</Title>
      <TextInput label="Name" placeholder="Enter your name" />
      <Button>Submit</Button>
    </>
  );
}
```

### Using TailwindCSS

```tsx
export default function MyComponent() {
  return (
    <div className="flex items-center justify-center p-4">
      <h1 className="text-2xl font-bold">Hello World</h1>
    </div>
  );
}
```

## 🔗 API Integration

The frontend communicates with backend services through:

1. **Kong API Gateway** (recommended) - `http://localhost:8000/api/*`
2. **Direct service calls** - For development

Example API call:

```typescript
// Create an order
const response = await fetch('http://localhost:8000/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productId: 'abc-123',
    quantity: 5
  })
});

const result = await response.json();
```

## 🧪 Testing

```bash
# Run tests (when configured)
npm test

# Run tests in watch mode
npm run test:watch
```

## 📦 Dependencies

### Core Dependencies

- `next` - React framework
- `react` & `react-dom` - React library
- `@mantine/core` - UI component library
- `@mantine/hooks` - Useful React hooks

### Dev Dependencies

- `typescript` - Type safety
- `eslint` - Code linting
- `tailwindcss` - Utility CSS framework
- `postcss` - CSS processing

## 🚧 Known Issues

- Demo page is a placeholder for testing Mantine components
- Order page requires the OrderPage component to be fully implemented

## 🔜 Future Enhancements

- Add comprehensive form validation
- Implement state management (Zustand/Redux)
- Add loading states and error handling
- Implement authentication
- Add unit and integration tests
- Improve accessibility (a11y)

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Mantine UI Documentation](https://mantine.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

When adding new features:

1. Create feature modules in `src/features/`
2. Add shared components to `src/shared/components/`
3. Follow the existing code style and patterns
4. Use TypeScript for type safety
5. Ensure responsive design with Mantine's responsive utilities
