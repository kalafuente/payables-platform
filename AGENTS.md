<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Overview

This repository contains a take-home assignment for a Design Engineer role.

The goal is to build a polished Accounts Payable MVP inspired by modern products such as Ramp Bill Pay, focusing on product quality, UX, and clean engineering rather than feature completeness.

## Engineering Principles

- Keep the codebase simple and maintainable.
- Prioritize clarity over clever abstractions.
- Prefer composition over duplication.
- Build reusable components.
- Keep business logic separated from presentation when appropriate.
- Follow TypeScript best practices.

## Design Principles

- Build a lightweight custom design system.
- Build all core UI components within this project.
- Use consistent spacing, typography, colors and interaction patterns.
- Prioritize accessibility and responsive layouts.
- Match the visual quality of a modern enterprise SaaS application.

## Technology Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL (Neon)
- TanStack Table
- Framer Motion (only for subtle interactions)

## Development Workflow

- Implement one feature at a time.
- Reuse existing components whenever possible.
- Avoid introducing unnecessary dependencies.
- Avoid overengineering.
- Keep commits focused and small.
- Prefer incremental improvements over large rewrites.
- Do not perform large refactors unless explicitly requested.
- If a refactor would significantly improve the codebase, propose it first before implementing it.

## Decision Making

When multiple implementation approaches are possible:

- Prefer the simplest solution.
- Optimize for maintainability.
- Explain important trade-offs before making architectural decisions.
- Avoid adding complexity unless it clearly improves the product.

## Components

- Create reusable UI primitives before building pages.
- All application screens should use the design system components.
- If a component does not exist, create it before using it.

## Product

- Optimize for product quality over feature quantity.
- Keep the MVP intentionally focused.
- Avoid implementing features that are outside the defined scope.