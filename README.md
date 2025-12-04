## SWFWMD Permitting – MVP Submission

This project is a simple MVP implementation of a permit application system, created as part of a technical exercise. It includes a frontend form, basic backend logic, database integration, and the structure for address validation using USPS Web Tools.

Project Overview

The application provides:

- A clean web interface where users can submit:

  - Name

  - Street address

  - City

  - State

  - ZIP code

  - Permit type

  - County

- Frontend validation for required fields

- A backend API (tRPC) endpoint to receive form data

- Data persistence using Prisma + PostgreSQL

- A database schema following the requirements of the exercise

- Pseudocode and design diagrams describing the flow of the application

## Tech Stack

- Next.js 14 (App Router)

- TypeScript

- tRPC for backend API handling

- Prisma ORM

- PostgreSQL (Dockerized)

- Tailwind CSS for styling
