# DriveFleet Client

DriveFleet Client is the Next.js frontend for a premium car rental platform. It provides a polished booking experience where users can browse available cars, filter and sort inventory, book vehicles, manage their bookings, and maintain their own car listings after signing in.

## Features

- Modern landing page with highlighted inventory, testimonials, and action sections.
- Browse featured cars on the home page.
- Explore all cars with search, car type filtering, price sorting, and pagination.
- View detailed car pages with gallery, specs, availability, owner information, and booking actions.
- Email/password authentication for login and registration.
- Google sign-in support.
- Protected routes for authenticated users.
- Create bookings and view personal booking history.
- Add new car listings as an owner.
- View, update, and delete your own listed cars.
- Light and dark theme support.
- Responsive UI with animated sections and toast notifications.

## Main Functionality

### Authentication

- Register with name, email, photo URL, and password.
- Log in with email and password.
- Sign in with Google.
- Session state is reflected in the navbar.
- Logged-in users see their profile avatar and owner actions.

### Car Discovery

- Home page shows a featured set of available cars.
- Explore page supports live search, type filtering, price sorting, and page navigation.
- Car detail pages show full information about each car.

### Booking

- Authenticated users can book a car from the details page.
- Optional driver selection is included.
- Bookings are shown in the "My Bookings" page.

### Owner Actions

- Logged-in users can add a car listing.
- Owners can view their own listed cars in "My Added Cars".
- Owners can update only allowed fields:
  - Price
  - Description
  - Availability
  - Image
  - Type
  - Location
- Owners can delete their own car listings.

## Routes

- `/` - Home page
- `/explore-cars` - Browse and filter inventory
- `/cars/[id]` - Car details page
- `/login` - Login page
- `/register` - Registration page
- `/add-car` - Add car form
- `/my-bookings` - Personal bookings
- `/my-added-cars` - Owner listings
- `/profile` - User profile

## Tech Stack

- Next.js
- React
- Tailwind CSS
- Axios
- Framer Motion
- React Hot Toast
- Better Auth integration

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the client root and add the API URL:

```env
NEXT_PUBLIC_API_URL=https://drivefleet-server-lovat.vercel.app
```

### 3. Run the development server

```bash
npm run dev
```

The app will run at `http://localhost:3000`.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production app
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Notes

- The frontend expects the DriveFleet server API to be running and reachable.
- Google sign-in uses the shared auth flow connected to the backend.
- Theme preference is saved in local storage.
