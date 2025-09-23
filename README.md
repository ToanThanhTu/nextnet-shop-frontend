# Next Net Shop Frontend

The frontend application for Next Net Shop, built with Next.js 15, TypeScript, and modern React patterns.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Material-UI
- **State Management**: Redux Toolkit
- **Package Manager**: Bun
- **UI Components**: Radix UI, Lucide React, Embla Carousel
- **Form Handling**: React Hook Form
- **Build Tool**: Turbopack (development)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (shop)/            # Shop layout group
│   │   ├── (browse)/      # Product browsing pages
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── products/          # Product pages
│   │   │   ├── account/           # User account pages
│   │   │   ├── signin/            # Authentication
│   │   │   └── register/          # User registration
│   │   └── layout.tsx     # Shop layout wrapper
│   ├── fonts.ts           # Font configurations
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── StoreProvider.tsx  # Redux store provider
├── components/            # Reusable UI components
├── lib/                   # Utility functions
└── styles/               # Additional styles
```

## Key Features

- 🎨 Modern, responsive design with Tailwind CSS
- 🛒 Shopping cart functionality with Redux state management
- 👤 User authentication and account management
- 📱 Mobile-first responsive layout
- 🔍 Product search and filtering
- 📦 Product catalog with categories
- 🎪 Interactive carousels and animations
- ♿ Accessible UI components with Radix UI

## Development Commands

```bash
# Install dependencies
bun install

# Start development server with Turbopack
bun dev

# Build for production
bun build

# Start production server
bun start

# Run ESLint
bun lint

# Type checking
npx tsc --noEmit
```

## Environment Configuration

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Route Structure

### Public Routes
- `/` - Home page with featured products
- `/products/[product]` - Individual product pages
- `/all-products` - All products listing
- `/all-deals` - Deals and promotions
- `/signin` - User sign-in
- `/register` - User registration
- `/contact-me` - Contact page
- `/terms-and-conditions` - Terms of service
- `/privacy-policy` - Privacy policy

### Protected Routes (requires authentication)
- `/account` - User account dashboard
- `/account/orders` - Order history
- `/track-my-order` - Order tracking

## Component Guidelines

### Creating New Components
1. Use TypeScript interfaces for all props
2. Follow the compound component pattern where appropriate
3. Implement proper loading and error states
4. Use Tailwind CSS for styling
5. Ensure mobile responsiveness
6. Include accessibility attributes

### Example Component Structure
```typescript
interface ComponentProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Component({ title, children, className }: ComponentProps) {
  return (
    <div className={cn("base-classes", className)}>
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );
}
```

## State Management

The application uses Redux Toolkit for state management:

- **Store Configuration**: Located in `src/app/StoreProvider.tsx`
- **Slices**: Feature-based state slices for cart, user, products
- **API Integration**: RTK Query for backend communication

### Adding New State
1. Create a new slice in the appropriate feature directory
2. Define TypeScript types for the state
3. Add to the root reducer
4. Create selector hooks for components

## Styling Guidelines

### Tailwind CSS
- Use utility classes for most styling
- Create custom components for repeated patterns
- Follow mobile-first responsive design
- Use CSS Grid and Flexbox utilities

### Material-UI Integration
- Use MUI components for complex interactions
- Customize theme colors to match Tailwind
- Maintain consistent design system

## API Integration

The frontend communicates with the .NET backend through:
- RESTful API calls
- JWT authentication headers
- Error handling for network requests
- Loading states for better UX

## Performance Optimizations

- **Next.js Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Bundle Analysis**: Use `npm run analyze` to check bundle size
- **Caching**: Appropriate caching strategies for API calls

## Build and Deployment

### Production Build
```bash
bun build
```

### Docker Build
```bash
docker build -t nextnet-frontend .
docker run -p 3000:3000 nextnet-frontend
```

### Vercel Deployment
The application is configured for deployment to Vercel with:
- Automatic deployments from Git commits
- Environment variable configuration
- Built-in Next.js optimizations and edge functions
- Global CDN distribution

## Troubleshooting

### Common Issues
1. **Hydration Errors**: Check for client/server rendering mismatches
2. **API Connection**: Verify NEXT_PUBLIC_API_URL environment variable
3. **Build Errors**: Clear `.next` directory and reinstall dependencies
4. **Type Errors**: Run `npx tsc --noEmit` for type checking

### Development Tips
- Use React Developer Tools for debugging
- Check Network tab for API calls
- Use Next.js built-in error overlay
- Monitor console for warnings and errors

## Contributing

1. Follow the coding standards in `../CLAUDE.md`
2. Write TypeScript types for all new code
3. Test responsive design on multiple screen sizes
4. Ensure accessibility compliance
5. Run linting before committing changes