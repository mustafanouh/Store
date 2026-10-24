# Product Store

A modern React & TypeScript e-commerce application ported from the original project by Mustafa Nouh.

## Features

- **Product Catalog**: Live integration with FakeStore API (`https://fakestoreapi.com/products`) alongside locally-added custom products.
- **Product Card Actions**:
  - Interactive details modal with full product description, category, and pricing.
  - SweetAlert-powered "Add to Cart" confirmation flow.
  - One-click favorite toggling with dynamic badges and instant localStorage persistence.
- **Product Filtering & Search**:
  - Real-time search query filtering by product title, description, and category.
  - Category filter dropdown for Men's clothing, Women's clothing, Jewelery, and Electronics.
- **Add Product View**:
  - Form with Title, Image URL, Price, Category, and Description.
  - Live image preview and POST dispatch with offline-first localStorage backup.
- **Favorites Management**:
  - Dedicated view displaying favorited items with badges and one-click removal.
  - Empty state with direct return to catalog.
- **Shopping Cart**:
  - Quantity adjustment (+ / -) and item removal.
  - Total calculation and checkout confirmation.
- **Theme & Navigation**:
  - Dark mode toggle with persistent preferences.
  - Responsive header with mobile hamburger drawer.
  - Contact and About Us information modals with quick phone link (`+963985690091`).
  - Account login and sign-up state tracking.

## Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS v4
- **Modals & Alerts**: SweetAlert2
- **Icons**: FontAwesome 6
