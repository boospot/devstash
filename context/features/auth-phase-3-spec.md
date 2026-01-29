# Auth UI - Custom Pages and User Menu

## Overview
Replace NextAuth default pages with custom UI. Add user menu to top bar.

## Requirements
### Sign In Page (`/sign-in`)
- Email and password input fields
- "Sign in with GitHub" button
- Link to register page
- Form validation and error display

### Register Page (`/register`)  
- Name, email, password, confirm password fields
- Form validation (passwords match, email format)
- Submit to `/api/auth/register`
- Redirect to sign-in on success

### Top Bar User Menu
- Display user avatar (GitHub image or initials fallback)
- Display user name
- Dropdown on avatar click with "Sign out" link

### NextAuth Config
- Set custom pages in auth config:
  - signIn: '/sign-in'

## Notes
### Avatar Logic
- If user has `image` (from GitHub): use that
- Otherwise: generate initials from name (e.g., "Brad Traversy" → "BT")

### Initials Component
Create a reusable avatar component that handles both cases.

## Testing
1. Go to `/sign-in` - verify custom page renders
2. Sign in with GitHub - verify flow works
3. Sign in with email/password - verify flow works
4. Verify avatar shows in top bar (GitHub image or initials)
5. Click avatar - verify dropdown appears
6. Click "Sign out" - verify logout and redirect
7. Go to `/register` - create new account - verify redirect to sign-in