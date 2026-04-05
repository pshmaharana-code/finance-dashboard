# FinDash - Personal Finance Dashboard
🟢 **Live Demo:** https://finance-dashboard-zeta-bay.vercel.app/

A modern, responsive, and interactive frontend finance dashboard built to track financial activity, visualize spending patterns, and provide actionable insights. 

## 🚀 Overview

This project was built to demonstrate modern frontend architecture, state management, and UI/UX design principles. It features a complete Dark Mode "Bento Grid" aesthetic, real-time data visualizations, and simulated Role-Based Access Control (RBAC).

## 🛠️ Tech Stack & Architecture

* **Framework:** Vue 3 (Composition API) + Vite (Chosen for its modularity and high-performance dev server).
* **State Management:** Pinia (Utilized for clean, centralized, and reactive global state).
* **Styling:** Tailwind CSS v4 (Used for rapid, utility-first styling to ensure pixel-perfect responsiveness and a cohesive dark theme).
* **Routing:** Vue Router (For seamless Single Page Application navigation).
* **Visualizations:** Chart.js + vue-chartjs (For lightweight, highly customizable data charts).

## ✨ Key Features

* **Dynamic Dashboard Overview:** Features real-time calculated summary cards (Balance, Income, Expenses).
* **Interactive Data Visualizations:** * Time-based line chart tracking balance trends.
  * Categorical doughnut chart visualizing spending breakdowns.
* **Transactions Management:** Complete CRUD operations for transactions with real-time search and category filtering.
* **Role-Based Access Control (RBAC):** Simulated frontend roles. 
  * *Admin:* Full access to add and delete transactions.
  * *Viewer:* Read-only access (UI automatically hides mutation actions).
* **AI-Driven Insights:** Dynamically calculates savings rates, highest spending categories, and largest single expenses based on current state.
* **Data Persistence:** Integrated `localStorage` syncing so user data survives page refreshes.
* **Premium UI/UX:** Fully responsive layout with a custom dark mode, glassmorphism modals, and smooth state transitions.

## 📦 Setup Instructions

1. **Clone the repository** (or download the source code).
2. **Navigate to the project directory:**
   ```bash
   cd finance-dashboard
3. Install dependencies:
    ```bash
    npm install

4. Run the development server:
    ```bash
    npm run dev

5. Open your browser and navigate to http://localhost:5173