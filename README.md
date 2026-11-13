# karios-app
Karios (karios-dashboard) is a full-stack, modern SaaS dashboard application built with Next.js 14 (app router), React 18, and Tailwind CSS. The description from package.json summarizes it as: "Modern SaaS Dashboard - Karios (Full-stack, no mock data)".
Key Features
Feature	Description
Authentication	Role-based login system. Regular users log in via email/password, while admin@karios.com gains access to the admin panel. Stores user session in localStorage.
Dashboard	Main landing page with statistic cards (Total Revenue, Active Users, Orders, Conversion Rate), recent orders table, and quick actions (New Project, Add Team Member, Export Report, View Analytics).
Admin Panel	Restricted to administrators. Features: user management table, PDF slip generation for registered users, and admin status display.
Projects Page	Project tracking with filtering by status (ACTIVE, REVIEW, COMPLETED), progress percentages, due dates, and owner information.
Team Page	Team member management showing total members, active count, and individual status indicators (ACTIVE/AWAY/OFFLINE) with colored status badges.
Slip Generation	API endpoint (/api/slip/[userId]) generates payment slips as downloadable text files with print/Save-as-PDF functionality.
Technology Stack
- Framework: Next.js 14 with App Router
- Database: Prisma ORM (PostgreSQL)
- Styling: Tailwind CSS with shadcn-ui components
- UI Components: radix-ui primitives, class-variance-authority, clsx, tailwind-merge
- Forms: React Hook Form + Zod validation
- Charts/Graphs: Recharts (imported but seen in dashboard stats)
- Notifications: sonner for toast notifications
- Data Table: Custom DataTable component for admin user listing
Page Structure
- / / dashboard - Main dashboard
- /login - Login page
- /admin - Admin panel (protected)
- /projects - Project management
- /team - Team member overview
- /slip/[userId] - Slip generation API
The application is designed as a complete SaaS platform with real database integration (Prisma), no mock data, and full CRUD operations across users, projects, and order management.
