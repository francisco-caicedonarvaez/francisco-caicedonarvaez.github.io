# AGENTS.md

## Project Identity

This repository is a personal engineering website and technical publishing platform built with a modern React/Next.js static-first architecture.

The project is not just a blog template. It functions as:

- a technical knowledge base
- a long-form publishing system
- an MDX-driven content platform
- a statically deployable web application

The architecture prioritizes:

- developer experience
- static generation
- content scalability
- performance
- SEO
- maintainability

---

# Mental Model of the Codebase

The repository is organized around three major concerns:

1. Content ingestion
2. Presentation/layout rendering
3. Static export + deployment

Most of the complexity exists around transforming markdown/MDX content into typed, optimized pages.

The project behaves more like a content application than a traditional marketing site.

---

# Core Architectural Assumptions

## Static-First

Assume all features should work in static export mode.

Avoid:

- runtime-only server dependencies
- dynamic APIs that require Node execution
- request-time rendering assumptions
- session/stateful backend architectures

Prefer:

- compile-time generation
- static assets
- precomputed metadata
- deterministic content builds

---

# Technology Stack

## Frontend

- Next.js App Router
- React
- TypeScript
- Tailwind CSS

## Content System

- MDX
- Contentlayer
- frontmatter-driven metadata

## Tooling

- PostCSS
- ESLint
- Prettier
- unified/remark/rehype ecosystem

---

# Repository Intent

This repository is optimized for publishing technical and engineering-oriented content.

The structure strongly suggests support for:

- software engineering articles
- tutorials
- architecture writeups
- portfolio showcases
- technical documentation
- engineering notes
- code-heavy blog posts

The MDX support exists specifically to allow interactive and component-enhanced technical content.

---

# Key Directories

## `app/`

Contains:

- routes
- layouts
- page composition
- App Router configuration

Guidelines:

- Prefer server components by default
- Only use client components when interactivity is necessary
- Avoid unnecessary hydration

---

## `components/`

Reusable UI building blocks.

Expect:

- typography primitives
- article rendering helpers
- metadata components
- navigation UI
- theme toggles
- MDX helper components

Guidelines:

- Keep components presentation-focused
- Avoid business logic inside UI components
- Prefer composability over inheritance

---

## `data/`

Project-level configuration and structured content metadata.

Likely responsibilities:

- site metadata
- navigation
- author information
- social links
- project cards
- static datasets

Treat this folder as configuration-driven application state.

---

## `data/blog/`

Primary content source.

Content is expected to be:

- MDX-first
- metadata-rich
- statically compiled
- SEO-aware

Guidelines:

- Preserve frontmatter consistency
- Keep slug structures stable
- Avoid breaking existing content URLs

---

## `layouts/`

Controls page composition.

Likely contains:

- article layouts
- list layouts
- tag pages
- simplified variants
- hero/banner variants

Guidelines:

- Keep layouts content-agnostic
- Avoid embedding page-specific assumptions
- Reuse metadata rendering patterns

---

## `public/`

Static assets only.

Expected usage:

- images
- favicons
- OG images
- downloadable resources
- static media

Do not place generated build artifacts here unless intentionally serving them.

---

# Content Pipeline

## Contentlayer

Contentlayer is central to the architecture.

Assume:

- markdown is converted into typed content models
- schema validation exists
- generated content artifacts are consumed by Next.js pages

Implications:

- content shape matters
- metadata consistency matters
- build failures may originate from malformed frontmatter

---

## MDX

MDX is used as an application layer, not merely markdown.

Expect embedded:

- React components
- code demos
- rich media
- mathematical notation
- interactive content

When extending MDX:

- preserve serialization compatibility
- avoid browser-only assumptions in server contexts
- ensure components degrade gracefully in static export

---

# Rendering Philosophy

The repository prioritizes:

- readability
- typography
- fast navigation
- low bundle size
- accessible layouts
- mobile responsiveness

Avoid:

- heavy client-side state
- unnecessary animation libraries
- large UI frameworks
- runtime data fetching for static content

---

# SEO Expectations

SEO appears to be a first-class concern.

Expect support for:

- Open Graph metadata
- Twitter cards
- canonical URLs
- RSS feeds
- sitemap generation
- structured metadata

When modifying routing or metadata:

- preserve canonical stability
- maintain slug consistency
- avoid duplicate route generation

---

# Build & Deployment Assumptions

## Development

Typical workflow:

```bash
yarn dev
```

## Production Build

```bash
yarn build
```

## Static Export

The project is expected to support static export workflows.

Implications:

- features requiring live servers may fail
- API routes may not exist in production
- dynamic rendering should be minimized

---

# Engineering Guidelines

## Prefer

- TypeScript-safe changes
- reusable abstractions
- static rendering
- content-driven design
- server components
- minimal client JavaScript
- Tailwind utility composition

---

## Avoid

- tightly coupled components
- client-side fetching for static data
- unnecessary context providers
- oversized dependencies
- runtime-only assumptions
- mutable content structures

---

# Styling Guidelines

## Tailwind Usage

The project likely relies heavily on utility-first styling.

Guidelines:

- prefer utility composition
- avoid inline styles
- centralize reusable patterns when repeated
- preserve responsive behavior

Avoid introducing:

- CSS-in-JS frameworks
- competing styling paradigms
- large custom CSS files unless necessary

---

# Expected Feature Areas

The repository likely includes or supports:

- article indexing
- tag filtering
- search integration
- syntax highlighting
- dark mode
- analytics
- comment systems
- newsletter integration
- social previews
- project showcases
- author pages

Treat these systems as loosely coupled integrations.

---

# Performance Philosophy

This project appears optimized around:

- static generation
- edge/CDN delivery
- low hydration cost
- optimized fonts/images
- minimal JavaScript payloads

When implementing changes:

- measure bundle impact
- avoid unnecessary client components
- preserve static optimization paths

---

# Contributor Guidance

## Before Adding Dependencies

Evaluate:

- bundle size impact
- SSR compatibility
- static export compatibility
- TypeScript support
- maintenance overhead

Prefer lightweight libraries.

---

# Safe Refactoring Areas

Generally safe:

- UI component extraction
- metadata cleanup
- typography improvements
- Tailwind refactors
- MDX enhancements
- accessibility improvements

Potentially risky:

- routing structure
- contentlayer schemas
- build configuration
- export settings
- metadata generation
- hydration boundaries

---

# High-Level Summary

This repository is a static-first technical publishing platform built with Next.js, MDX, Tailwind CSS, and Contentlayer.

The codebase is centered around transforming structured content into fast, SEO-friendly, maintainable pages.

The architecture favors:

- simplicity
- static generation
- content scalability
- developer ergonomics
- long-term maintainability

Treat the repository primarily as a content platform with application-level rendering capabilities rather than a generic frontend application.
