# Module 4 Assignment

📜 Scenario

You have been hired as a web developer to build an online store for a fictional company named RevoShop. Your first task is to develop the product listing page and implement routing for the product detail page. This module will focus on Next.js fundamentals and data fetching.

Audience: The website is intended for customers looking to browse and purchase products online, as well as administrators managing product listings.

Purpose:

- For Customers: Provide a seamless and interactive shopping experience with product browsing, cart management, and checkout functionality.
- For Administrators: Enable efficient management of product listings, including adding, editing, and deleting products through an admin dashboard.

📁 Requirements

You are required to implement:

1. Home Page (Product Listing):

- Fetch products from FakeStoreAPI.
- Use Static Site Generation (SSG) for static page like promotion, FAQ & ETC.
- Display a grid of products with images, names, and prices.
- Clicking a product should navigate to the Product Detail Page.

1. Product Detail Page (SSR & Routing):

- Fetch product data dynamically using Server-Side Rendering (SSR).
- Display detailed product information (name, description, price, image).
- Implement a simple Add to Cart button.

🚀 Deliverables

For this checkpoint, you are required to submit:

1. Deployed Website: A hosted version of your e-commerce store.
2. Source Code Repository: The complete Next.js project on GitHub.
3. Project Documentation (README file) including:

- Overview of the project
- Features implemented
- Technologies used
- Screenshots or demo links

🔍 Grading Component

Your project will be evaluated based on the following criteria:

✅ Next.js Fundamentals

- Uses Next.js file-based routing for navigation.
- Implements pages and components following best practices.
- Uses JS syntax correctly for structuring UI components.
- Passes and handles props effectively in components.
- Manages component state using useState and useEffect.

✅ Routing & Navigation

- Implements dynamic routing with [id].js or similar approach.
- Uses Link from next/link for client-side navigation.
- Correctly handles route parameters in dynamic pages.
- Navigates between pages without unnecessary reloads.

✅ Data Fetching

- Implements SSG for static pages.
- Implements SSR for dynamic pages.
- Uses useEffect() with fetch API for client-side fetching.
- Handles API errors and loading states properly.
