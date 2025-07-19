# VibeFlow - Agentic AI Development Instructions

## Project Overview
VibeFlow is a Next.js-based mentoring platform that connects students with expert mentors. The application uses TypeScript, Prisma for database management, and Tailwind CSS for styling.

## Tech Stack
- **Framework**: Next.js 15.3.5 with App Router
- **Language**: TypeScript
- **Database**: Prisma ORM with SQLite (dev.db)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components built with Radix UI primitives
- **State Management**: React hooks (useState, useEffect)

## Architecture Guidelines

### 1. Route Structure
The application follows Next.js App Router conventions with nested layouts and organized route groups:

```
app/
├── layout.tsx                 # Root layout (fonts, global styles)
├── page.tsx                   # Landing page (SSR)
├── login/
│   └── page.tsx              # Authentication (CSR)
├── student/                  # Student portal routes
│   ├── layout.tsx           # Student-specific navigation
│   ├── registration/
│   │   └── page.tsx         # Student registration (CSR)
│   ├── dashboard/
│   │   └── page.tsx         # Student dashboard (CSR)
│   ├── book-session/
│   │   └── page.tsx         # Browse/book mentors (CSR)
│   └── booked-session/
│       └── [id]/
│           └── page.tsx     # Session details (CSR)
└── mentor/                   # Mentor portal routes
    ├── layout.tsx           # Mentor-specific navigation
    ├── registration/
    │   └── page.tsx         # Mentor registration (CSR)
    └── dashboard/
        └── page.tsx         # Mentor dashboard (CSR)
```

#### Rendering Strategy
- **Landing page (`/`)**: Server-Side Rendering (SSR) for SEO and initial load
- **All other pages**: Client-Side Rendering (CSR) for interactivity

### 2. Component Architecture

#### UI Components (`components/ui/`)
Reusable, unstyled components following Radix UI patterns:

```
components/ui/
├── button.tsx              # Button variants (default, outline, destructive, etc.)
├── card.tsx                # Container components
├── input.tsx               # Form inputs
├── label.tsx               # Form labels
├── textarea.tsx            # Multi-line text inputs
├── form.tsx                # Form wrapper components
└── badge.tsx               # Status indicators
```

**Guidelines for UI Components**:
- Use `class-variance-authority` for variant management
- Follow consistent prop patterns with `React.forwardRef`
- Include TypeScript interfaces for all props
- Use `cn()` utility for className merging

#### Business Components (`components/`)
Application-specific, reusable components:

```
components/
├── navigation/
│   ├── student-nav.tsx     # Student navigation component
│   ├── mentor-nav.tsx      # Mentor navigation component
│   └── main-nav.tsx        # Public site navigation
├── forms/
│   ├── student-registration-form.tsx
│   ├── mentor-registration-form.tsx
│   └── login-form.tsx
├── session/
│   ├── session-card.tsx    # Session display component
│   ├── mentor-card.tsx     # Mentor profile card
│   └── booking-form.tsx    # Session booking form
└── dashboard/
    ├── stats-grid.tsx      # Dashboard statistics
    ├── session-list.tsx    # Session listings
    └── request-card.tsx    # Session request card
```

**Component Creation Guidelines**:
- Extract reusable logic into custom components
- Keep components focused on single responsibility
- Use TypeScript interfaces for props
- Include proper error handling and loading states

### 3. Service Layer Architecture

#### API Integration Strategy
Create a dedicated service layer to handle all external API calls and business logic:

```
lib/
├── services/
│   ├── auth.service.ts     # Authentication operations
│   ├── user.service.ts     # User management
│   ├── mentor.service.ts   # Mentor operations
│   ├── session.service.ts  # Session booking/management
│   └── notification.service.ts # Email/SMS notifications
├── types/
│   ├── user.types.ts       # User-related interfaces
│   ├── session.types.ts    # Session-related interfaces
│   └── api.types.ts        # API response interfaces
├── utils/
│   ├── api.utils.ts        # HTTP client utilities
│   ├── validation.utils.ts # Form validation helpers
│   └── date.utils.ts       # Date formatting utilities
└── hooks/
    ├── useAuth.ts          # Authentication hook
    ├── useSessions.ts      # Session management hook
    └── useNotifications.ts # Notification hook
```

#### Service Layer Example Structure:

```typescript
// lib/services/session.service.ts
export class SessionService {
  static async bookSession(data: BookSessionRequest): Promise<Session> {
    // API call logic
  }
  
  static async getStudentSessions(studentId: string): Promise<Session[]> {
    // API call logic
  }
  
  static async getMentorSessions(mentorId: string): Promise<Session[]> {
    // API call logic
  }
}

// lib/types/session.types.ts
export interface Session {
  id: string;
  studentId: string;
  mentorId: string;
  subject: string;
  date: string;
  duration: number;
  status: SessionStatus;
}
```

### 4. Development Guidelines

#### File Naming Conventions
- **Pages**: `page.tsx` (Next.js App Router requirement)
- **Layouts**: `layout.tsx` (Next.js App Router requirement)
- **Components**: `kebab-case.tsx` (e.g., `session-card.tsx`)
- **Services**: `camelCase.service.ts` (e.g., `auth.service.ts`)
- **Types**: `camelCase.types.ts` (e.g., `user.types.ts`)
- **Utilities**: `camelCase.utils.ts` (e.g., `api.utils.ts`)

#### Code Organization Rules
1. **Client Components**: Add `'use client'` directive at the top
2. **Server Components**: Default behavior, no directive needed
3. **Import Order**: External libraries → Internal utilities → Components → Types
4. **Error Handling**: Always implement proper error boundaries and loading states
5. **TypeScript**: Use strict typing, avoid `any` type

#### Database Schema Guidelines
Current Prisma schema includes:
- Sample model (for testing database connection)
- Follow Prisma naming conventions for new models
- Use proper relationships (1:1, 1:many, many:many)
- Include proper indexes for performance

### 5. Adding New Features

#### When Adding New Routes:
1. Create appropriate directory structure under `app/`
2. Add `page.tsx` with proper rendering strategy
3. Update navigation components if needed
4. Add corresponding service methods
5. Create reusable components in `components/`

#### When Adding API Integration:
1. Create service class in `lib/services/`
2. Define TypeScript interfaces in `lib/types/`
3. Add utility functions in `lib/utils/` if needed
4. Create custom hooks in `lib/hooks/` for React integration
5. Handle error states and loading states properly

#### When Creating Components:
1. Start with `components/ui/` for generic UI components
2. Use `components/` for business-specific components
3. Follow existing patterns for props and styling
4. Add proper TypeScript interfaces
5. Include JSDoc comments for complex components

### 6. Current Mock Data Strategy
The application currently uses mock data for demonstration. When implementing real APIs:

1. Replace mock data in components with service calls
2. Add proper loading and error states
3. Implement proper caching strategies
4. Add optimistic updates where appropriate

### 7. Navigation and Routing
- Use Next.js `<Link>` component for internal navigation
- Implement proper breadcrumbs for nested routes
- Add loading states for route transitions
- Handle 404 and error states appropriately

### 8. Styling Guidelines
- Use Tailwind CSS utility classes
- Follow consistent spacing and color schemes
- Implement responsive design patterns
- Use CSS variables for theme consistency
- Maintain accessibility standards (ARIA labels, keyboard navigation)

### 9. Testing Strategy (When Implementing)
- Unit tests for service layer functions
- Component tests for UI components
- Integration tests for critical user flows
- E2E tests for complete user journeys

### 10. Performance Considerations
- Implement proper code splitting
- Use Next.js Image component for optimized images
- Add proper caching headers for API responses
- Implement virtual scrolling for large lists
- Use React.memo for expensive components

### 11. Security Considerations
- **Environment Variables**: Always use environment variables for sensitive information like API keys, tokens, and credentials
- **Input Validation**: Validate all user inputs both client-side and server-side to prevent injection attacks
- **Authentication**: Implement proper authentication flows with secure token handling
- **Authorization**: Always verify user permissions before allowing access to protected resources
- **HTTPS**: Ensure all API calls use HTTPS
- **XSS Prevention**: Sanitize user-generated content before rendering to prevent cross-site scripting
- **CSRF Protection**: Implement CSRF tokens for form submissions
- **Data Encryption**: Encrypt sensitive data both in transit and at rest
- **API Rate Limiting**: Implement rate limiting to prevent abuse
- **Secure Cookies**: Use secure and HttpOnly flags on cookies containing sensitive information
- **Content Security Policy**: Implement CSP headers to mitigate XSS attacks
- **Dependencies**: Regularly update dependencies to patch security vulnerabilities
- **Error Handling**: Avoid exposing sensitive information in error messages
- **Firebase Security**: When using Firebase, implement proper security rules for Firestore, Storage, and Authentication
- **Principle of Least Privilege**: Services and functions should have the minimum permissions necessary

All code generated for this project should be secure by default, following these principles without explicit instruction. Security should never be sacrificed for convenience or speed of development.

This structure ensures maintainable, scalable, and secure code that follows Next.js and React best practices while providing clear separation of concerns between UI, business logic, and data management.

```
