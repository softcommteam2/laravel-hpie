# HPIE International Platform

Laravel + Inertia.js application for public learning content and admin content management.

## Documentation

- [Technical Documentation](docs/TECHNICAL_DOCUMENTATION.md)
- [User Manual](docs/USER_MANUAL.md)

## Quick Start

### Prerequisites

- PHP 8.2+
- Composer 2+
- Node.js 20+
- npm 10+
- SQLite (default) or another supported DB

### Install

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan storage:link
npm install
```

### Run (development)

```bash
composer run dev
```

This starts Laravel server, queue listener, and Vite dev server concurrently.

### Default Seed Admin

- Email: `admin@hpie.org`
- Password: `password`

## Common Commands

```bash
php artisan test
npm run lint:check
npm run types:check
npm run build
```

## Core Features

- Public pages (Home, About Certificate)
- Lesson catalog and lesson detail pages
- Lesson completion tracking by email
- Partner listing
- One-on-one contacts and speaker events
- Feedback submission
- Certificate application submission
- Admin CRUD for partners, lessons, contacts, speakers, pages
- Admin submission review workflow
- Authentication, email verification, and optional 2FA
