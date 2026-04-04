# FinanceIQ - Personal Finance Dashboard

A modern, interactive finance dashboard built with React.js, Redux Toolkit, and Tailwind CSS.

## 🚀 Live Demo
[Add your Vercel URL here after deployment]

## 📸 Features

- **Dashboard Overview** — Summary cards, income vs expense area chart, spending breakdown pie chart, recent transactions
- **Transactions Page** — Full transaction list with search, filter by type/category, sort by date/amount/name, add/edit/delete
- **Insights Page** — Savings rate, monthly comparison table, spending radar chart, smart observations
- **Role Based UI** — Admin can add/edit/delete transactions, Viewer has read-only access
- **Dark Mode** — Full dark mode support with toggle
- **Animated Background** — Floating financial symbols canvas animation
- **Export** — Download transactions as CSV or JSON
- **Local Storage** — Data and theme persist across page refreshes
- **Responsive Design** — Works on all screen sizes

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | UI components |
| Vite | Build tool and dev server |
| Redux Toolkit | Global state management |
| React Router DOM | Client side routing |
| Tailwind CSS | Utility first styling |
| Recharts | Charts and visualizations |
| Framer Motion | Animations and transitions |

## 📁 Project Structure
```text
src/
├── components/        # Reusable UI components
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── SummaryCard.jsx
│   ├── TransactionModal.jsx
│   └── ParticlesBackground.jsx
├── pages/             # Page components
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   ├── Insights.jsx
│   └── NotFound.jsx
├── store/             # Redux store
│   ├── store.js
│   └── slices/
│       ├── transactionsSlice.js
│       ├── authSlice.js
│       └── themeSlice.js
├── data/              # Mock data
│   └── mockData.js
└── utils/             # Helper functions
    └── helpers.js
```
## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/finance-dashboard.git
```

2. Navigate into the project
```bash
cd finance-dashboard
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser at `http://localhost:5173`

## 👥 Role Based Access

| Feature | Admin | Viewer |
|---|---|---|
| View Dashboard | ✅ | ✅ |
| View Transactions | ✅ | ✅ |
| View Insights | ✅ | ✅ |
| Add Transaction | ✅ | ❌ |
| Edit Transaction | ✅ | ❌ |
| Delete Transaction | ✅ | ❌ |
| Export Data | ✅ | ✅ |

Switch roles using the dropdown in the top navbar.

## 📊 State Management

Redux Toolkit manages three slices of state:

- **transactionsSlice** — stores all transactions, filter state, search query, sort preferences
- **authSlice** — stores the current user role (admin or viewer)
- **themeSlice** — stores dark mode preference

State is persisted to localStorage so data survives page refreshes.

## 🌐 Deployment

Deployed for free on Vercel. Every push to the main branch triggers an automatic redeployment.