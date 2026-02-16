# RevoTech

## Overview

RevoTech is a modern e-commerce platform built with the Next.js App Router. It demonstrates key e-commerce
functionalities such as dynamic product listings, server-rendered product detail pages, and a client-side shopping cart.
The user interface is crafted with Tailwind CSS for a clean and responsive design.

## Features

- **Product Discovery:** A comprehensive main page featuring product listings with images, names, and prices.
- **Detailed Product View:** Server-side rendered pages for each product, providing detailed descriptions and
  information.
- **Search and Filtering:** Robust client-side search functionality complemented by sorting and filtering capabilities
  to enhance user experience.
- **Shopping Cart:** A persistent client-side shopping cart that allows users to add, manage, and remove items.
- **User Authentication:** A dedicated login page for user authentication.
- **Responsive Design:** A fully responsive layout that ensures a seamless experience across all devices.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI
- **Icons:** Material Symbols
- **HTTP Client:** Axios
- **Form Management:** React Hook Form
- **Linting:** ESLint
- **Testing:** Vitest

## Deployed Website

[Link](https://milestone3-deni.netlify.app/)

## Folder Structure

```
src
├── app
│   ├── login
│   │   └── page.tsx
│   ├── playground
│   │   └── page.tsx
│   ├── product
│   │   └── [productId]
│   │       └── page.tsx
│   ├── promotions
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── Light.tokens.json
│   ├── not-found.tsx
│   └── page.tsx
├── component
│   ├── Breadcrumbs.tsx
│   ├── Button.tsx
│   ├── Filter.tsx
│   ├── Footer.tsx
│   ├── NavBar.tsx
│   ├── ProductCard.tsx
│   ├── SearchBox.tsx
│   └── SortButton.tsx
├── hooks
│   └── useCart.ts
├── lib
│   ├── products
│   │   ├── getProductById.ts
│   │   ├── getProducts.ts
│   │   ├── sortProducts.test.ts
│   │   └── sortProducts.ts
│   └── transactions
│       └── ShoppingCart.ts
└── Types.ts
```