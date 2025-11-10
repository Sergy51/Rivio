# Rivio - Trade Credit Insurance Dashboard
## Complete Project Documentation

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Architecture](#architecture)
4. [Features & Pages](#features--pages)
5. [Data Models](#data-models)
6. [Components](#components)
7. [Styling System](#styling-system)
8. [Development Guide](#development-guide)
9. [Deployment](#deployment)
10. [API Integration Guide](#api-integration-guide)

---

## Project Overview

### What is Rivio?

Rivio is a modern B2B SaaS web application designed for mid-sized manufacturers and distributors who use trade credit insurance. The platform automates compliance with insurer policy rules and provides clear visibility into credit exposure and risk.

### Key Value Propositions

- **Automated Compliance**: Automatically monitors invoices against policy thresholds
- **Real-time Visibility**: Dashboard showing receivables, overdue amounts, and credit utilization
- **Risk Management**: Color-coded alerts for buyers exceeding credit limits
- **Insurer Integration**: One-click CSV export for major insurers (Allianz, Coface, Atradius)
- **Accounting Integration**: Connect to QuickBooks, NetSuite, or Xero

### Target Users

- Finance managers at manufacturing companies
- Credit controllers at distribution businesses
- Risk management teams
- CFOs needing compliance oversight

---

## Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Version 9 or higher
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

### Installation

```bash
# Navigate to project directory
cd rivio-app

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Project Commands

```bash
npm run dev      # Start development server with hot reload
npm run build    # Create production build
npm start        # Start production server
npm run lint     # Run ESLint for code quality
```

---

## Architecture

### Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Turbopack (Next.js default)

### Project Structure

```
rivio-app/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Dashboard (home page)
│   ├── layout.tsx                # Root layout with navigation
│   ├── globals.css               # Global styles and Tailwind config
│   ├── buyers/
│   │   └── page.tsx              # Buyers management page
│   ├── policies/
│   │   └── page.tsx              # Policy configuration page
│   ├── reports/
│   │   └── page.tsx              # Report generation page
│   └── settings/
│       └── page.tsx              # Settings and integrations page
├── components/
│   └── Navigation.tsx            # Top navigation component
├── lib/
│   └── mockData.ts               # Mock data service and helpers
├── public/                       # Static assets (images, fonts, etc.)
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── next.config.js                # Next.js configuration
└── README.md                     # Project README

```

### Design Patterns

**1. Server Components by Default**
- All pages are React Server Components for optimal performance
- Client components are marked with `'use client'` directive
- Used only when interactivity is required (forms, charts, state)

**2. Co-location**
- Each page route is self-contained in its directory
- Shared components live in `/components`
- Shared utilities live in `/lib`

**3. Type Safety**
- TypeScript interfaces for all data models
- Strict type checking enabled
- No `any` types used

---

## Features & Pages

### 1. Dashboard (`/`)

**Purpose**: Provides an at-a-glance overview of credit insurance compliance status.

**Key Metrics Cards**:
- **Total Receivables**: Sum of all outstanding invoices
- **Overdue Amount**: Total value of overdue invoices
- **Avg Credit Utilization**: Average percentage of credit limits used across all buyers
- **Insured Coverage**: Percentage of receivables covered by insurance

**Visualizations**:
- **Pie Chart**: Insured vs Uninsured Exposure breakdown
- **Bar Chart**: Credit limit utilization by buyer (color-coded by risk)

**Data Table**:
- Recent overdue invoices with:
  - Invoice ID and buyer name
  - Amount and due date
  - Days overdue (color-coded badges)
  - Insurance status

**Alerts**:
- Critical alerts appear when invoices exceed policy thresholds
- Red banner at top of page for urgent attention items

**File Location**: `app/page.tsx`

---

### 2. Buyers Page (`/buyers`)

**Purpose**: Manage buyer relationships and monitor credit exposure.

**Summary Cards**:
- Total number of buyers
- Total credit available across portfolio
- Number of at-risk buyers (>90% utilization)

**Buyer Directory**:
Each buyer card displays:
- **Header**: Company name, insurance status badge
- **Location**: Country
- **Metrics**:
  - Credit Limit
  - Current Exposure
  - Available Credit
- **Utilization Bar**: Visual indicator (green/yellow/red)
- **Risk Rating**: Low/Medium/High badge
- **Alerts**: Warning messages for high utilization

**Color Coding**:
- Green: < 70% utilization (healthy)
- Yellow: 70-90% utilization (caution)
- Red: > 90% utilization (critical)

**File Location**: `app/buyers/page.tsx`

---

### 3. Policies Page (`/policies`)

**Purpose**: Configure trade credit insurance policy terms and thresholds.

**Policy Configuration Form**:
- **Insurer Name**: Select or enter insurer
- **Policy Number**: Policy reference ID
- **Overdue Threshold**: Days before invoice is critical
- **Coverage Percentage**: % of invoice covered by insurance
- **Effective Date**: Policy start date
- **Expiry Date**: Policy end date

**Quick Select**:
- Pre-configured buttons for major insurers:
  - Allianz Trade
  - Coface
  - Atradius

**Compliance Rules**:
- Display of key policy requirements
- Automatic reminders for reporting obligations

**Editing**:
- Click "Edit Policy" to enable editing
- Save/Cancel buttons appear
- Real-time validation

**File Location**: `app/policies/page.tsx`

---

### 4. Reports Page (`/reports`)

**Purpose**: Generate and export reports for insurer submissions.

**Available Reports**:

1. **Overdue Invoices Report**
   - All invoices past due date
   - Required for threshold breach reporting
   - Format: CSV with invoice details and days overdue

2. **Accounts Receivable Aging**
   - Complete aging report of all invoices
   - Shows payment status across portfolio
   - Format: CSV with status and aging buckets

3. **Credit Exposure Report**
   - Summary of buyer credit limits and utilization
   - Shows insured vs uninsured buyers
   - Format: CSV with utilization percentages

**Export Functionality**:
- One-click CSV generation
- Automatic filename with date stamp
- Browser download initiated immediately

**Report Schedule**:
- Visual tracker of upcoming reports
- Status indicators (Submitted/Action Required/Upcoming)
- Due date reminders

**Export History**:
- Table of recently generated reports
- Date, type, record count, and status

**File Location**: `app/reports/page.tsx`

---

### 5. Settings Page (`/settings`)

**Purpose**: Configure integrations and account preferences.

**Accounting Integration**:
- **Supported Systems**:
  - QuickBooks Online
  - NetSuite
  - Xero
- **Connection Status**: Visual indicator when connected
- **Actions**: Connect, Sync Now, Disconnect buttons
- **Last Sync**: Timestamp of most recent data sync

**Sync Settings** (Toggles):
- Automatic Sync (hourly)
- Import Invoices
- Import Payments

**Notification Settings** (Toggles):
- Overdue Invoice Alerts
- Credit Limit Warnings
- Monthly Report Reminders

**Account Information**:
- Company Name
- Email Address
- Current Plan

**File Location**: `app/settings/page.tsx`

---

## Data Models

### Invoice Interface

```typescript
interface Invoice {
  id: string;              // Unique invoice identifier
  buyerId: string;         // Reference to buyer
  buyerName: string;       // Buyer company name
  amount: number;          // Invoice amount in currency
  dueDate: string;         // Due date (ISO 8601 format)
  status: 'paid' | 'pending' | 'overdue';
  daysOverdue: number;     // Days past due date (0 if not overdue)
  isInsured: boolean;      // Whether invoice is covered by insurance
}
```

**Usage Example**:
```typescript
const invoice: Invoice = {
  id: 'INV-001',
  buyerId: '1',
  buyerName: 'Acme Manufacturing Corp',
  amount: 85000,
  dueDate: '2025-11-05',
  status: 'overdue',
  daysOverdue: 5,
  isInsured: true
};
```

---

### Buyer Interface

```typescript
interface Buyer {
  id: string;                          // Unique buyer identifier
  name: string;                        // Company name
  creditLimit: number;                 // Maximum credit allowed
  currentExposure: number;             // Current outstanding amount
  isInsured: boolean;                  // Insurance coverage status
  riskRating: 'Low' | 'Medium' | 'High';  // Risk classification
  country: string;                     // Buyer location
}
```

**Calculated Fields**:
```typescript
// Credit utilization percentage
const utilization = (buyer.currentExposure / buyer.creditLimit) * 100;

// Available credit
const availableCredit = buyer.creditLimit - buyer.currentExposure;
```

---

### Policy Interface

```typescript
interface Policy {
  id: string;              // Unique policy identifier
  insurerName: string;     // Insurance company name
  policyNumber: string;    // Policy reference number
  overdueThreshold: number; // Days before invoice is critical
  coveragePercentage: number; // % of invoice covered
  effectiveDate: string;   // Policy start date (ISO 8601)
  expiryDate: string;      // Policy end date (ISO 8601)
}
```

---

## Components

### Navigation Component

**File**: `components/Navigation.tsx`

**Purpose**: Top-level navigation bar for the application.

**Features**:
- Responsive design (mobile and desktop)
- Active page highlighting
- Icon + text labels
- Company profile indicator

**Props**: None (uses Next.js `usePathname` hook)

**Navigation Items**:
```typescript
const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/buyers', label: 'Buyers', icon: Users },
  { href: '/policies', label: 'Policies', icon: Shield },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/settings', label: 'Settings', icon: Settings },
];
```

**Styling**:
- White background with bottom border
- Blue highlight for active page
- Hover effects for better UX

---

## Styling System

### Tailwind CSS v4 Configuration

**Custom Theme**: Defined in `app/globals.css`

```css
@theme {
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
}
```

### Custom Component Classes

**Card Component**:
```css
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200 p-6;
}
```
Usage: `<div className="card">...</div>`

**Button - Primary**:
```css
.btn-primary {
  @apply bg-primary-600 text-white px-4 py-2 rounded-lg
         hover:bg-primary-700 transition-colors font-medium;
}
```
Usage: `<button className="btn-primary">Click Me</button>`

**Button - Secondary**:
```css
.btn-secondary {
  @apply bg-white text-gray-700 px-4 py-2 rounded-lg
         border border-gray-300 hover:bg-gray-50
         transition-colors font-medium;
}
```

### Color System

**Status Colors**:
- **Success/Green**: `bg-green-100 text-green-800`
- **Warning/Yellow**: `bg-yellow-100 text-yellow-800`
- **Error/Red**: `bg-red-100 text-red-800`
- **Info/Blue**: `bg-blue-100 text-blue-800`

**Gray Scale**:
- Background: `bg-gray-50`
- Borders: `border-gray-200`
- Text Primary: `text-gray-900`
- Text Secondary: `text-gray-600`

---

## Development Guide

### Adding a New Page

1. **Create Page File**:
```typescript
// app/new-page/page.tsx
export default function NewPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">New Page</h1>
    </div>
  );
}
```

2. **Add to Navigation**:
```typescript
// components/Navigation.tsx
const navItems = [
  // ... existing items
  { href: '/new-page', label: 'New Page', icon: IconName },
];
```

---

### Adding New Data

1. **Define Interface**:
```typescript
// lib/mockData.ts
export interface NewDataType {
  id: string;
  name: string;
  // ... other fields
}
```

2. **Create Mock Data**:
```typescript
export const mockNewData: NewDataType[] = [
  { id: '1', name: 'Example' },
  // ... more data
];
```

3. **Add Helper Functions**:
```typescript
export function getNewDataById(id: string): NewDataType | undefined {
  return mockNewData.find(item => item.id === id);
}
```

---

### Creating Reusable Components

**Example: Status Badge Component**

```typescript
// components/StatusBadge.tsx
interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error';
  label: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const colorClasses = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses[status]}`}>
      {label}
    </span>
  );
}
```

**Usage**:
```typescript
import StatusBadge from '@/components/StatusBadge';

<StatusBadge status="success" label="Active" />
```

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import in Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js configuration
   - Click "Deploy"

3. **Environment Variables** (if needed):
   - Add in Vercel dashboard under Settings → Environment Variables

### Deploy to Other Platforms

**Netlify**:
```bash
npm run build
# Deploy the .next folder
```

**AWS Amplify**:
- Connect GitHub repository
- Build settings are auto-detected

**Docker**:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## API Integration Guide

### Replacing Mock Data with Real APIs

**Current Architecture**: The app uses mock data from `lib/mockData.ts`.

**Migration Strategy**:

1. **Create API Service Layer**:
```typescript
// lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function fetchInvoices(): Promise<Invoice[]> {
  const response = await fetch(`${API_BASE}/invoices`);
  if (!response.ok) throw new Error('Failed to fetch invoices');
  return response.json();
}

export async function fetchBuyers(): Promise<Buyer[]> {
  const response = await fetch(`${API_BASE}/buyers`);
  if (!response.ok) throw new Error('Failed to fetch buyers');
  return response.json();
}
```

2. **Update Pages to Use API**:
```typescript
// app/page.tsx
import { fetchInvoices, fetchBuyers } from '@/lib/api';

export default async function Dashboard() {
  const invoices = await fetchInvoices();
  const buyers = await fetchBuyers();

  // ... render with real data
}
```

3. **Add Error Handling**:
```typescript
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardContent />
    </Suspense>
  );
}
```

---

### Accounting Integration APIs

**QuickBooks Online**:
```typescript
// OAuth 2.0 flow
const QUICKBOOKS_CONFIG = {
  authUri: 'https://appcenter.intuit.com/connect/oauth2',
  tokenUri: 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
  clientId: process.env.QUICKBOOKS_CLIENT_ID,
  clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET,
  redirectUri: process.env.QUICKBOOKS_REDIRECT_URI,
};

// Fetch invoices
async function fetchQuickBooksInvoices(accessToken: string) {
  const response = await fetch(
    `https://quickbooks.api.intuit.com/v3/company/${companyId}/query?query=SELECT * FROM Invoice`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    }
  );
  return response.json();
}
```

**NetSuite**:
```typescript
// RESTlet or SuiteTalk integration
const NETSUITE_CONFIG = {
  accountId: process.env.NETSUITE_ACCOUNT_ID,
  consumerKey: process.env.NETSUITE_CONSUMER_KEY,
  consumerSecret: process.env.NETSUITE_CONSUMER_SECRET,
  tokenId: process.env.NETSUITE_TOKEN_ID,
  tokenSecret: process.env.NETSUITE_TOKEN_SECRET,
};
```

---

### Database Schema (Future)

When moving to production with a database:

**Invoices Table**:
```sql
CREATE TABLE invoices (
  id VARCHAR(50) PRIMARY KEY,
  buyer_id VARCHAR(50) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  due_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL,
  is_insured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (buyer_id) REFERENCES buyers(id)
);
```

**Buyers Table**:
```sql
CREATE TABLE buyers (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  credit_limit DECIMAL(15,2) NOT NULL,
  country VARCHAR(100),
  is_insured BOOLEAN DEFAULT false,
  risk_rating VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Policies Table**:
```sql
CREATE TABLE policies (
  id VARCHAR(50) PRIMARY KEY,
  insurer_name VARCHAR(255) NOT NULL,
  policy_number VARCHAR(100) NOT NULL,
  overdue_threshold INTEGER NOT NULL,
  coverage_percentage INTEGER NOT NULL,
  effective_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Performance Optimization

### Current Optimizations

1. **Server Components**: Most pages are server-rendered
2. **Static Generation**: Pages pre-rendered at build time
3. **Automatic Code Splitting**: Next.js splits code by route
4. **Image Optimization**: Next.js Image component (when used)

### Future Improvements

**Caching Strategy**:
```typescript
// app/page.tsx
export const revalidate = 60; // Revalidate every 60 seconds

export default async function Dashboard() {
  const data = await fetchData();
  return <DashboardUI data={data} />;
}
```

**Database Indexes**:
```sql
CREATE INDEX idx_invoices_buyer_id ON invoices(buyer_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);
```

---

## Testing Guide

### Unit Testing (Future Setup)

**Install Testing Libraries**:
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
```

**Example Test**:
```typescript
// __tests__/mockData.test.ts
import { getTotalReceivables, mockInvoices } from '@/lib/mockData';

describe('Data Helper Functions', () => {
  test('getTotalReceivables calculates correct sum', () => {
    const total = getTotalReceivables();
    const expected = mockInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    expect(total).toBe(expected);
  });
});
```

### End-to-End Testing (Future)

**Playwright Setup**:
```typescript
// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test('dashboard loads and shows metrics', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('h1')).toContainText('Dashboard');
  await expect(page.locator('.card')).toHaveCount(4);
});
```

---

## Troubleshooting

### Common Issues

**Issue: Build fails with Tailwind error**
```bash
Error: Cannot apply unknown utility class
```
**Solution**: Ensure `@tailwindcss/postcss` is installed and `@theme` directive is used in globals.css

**Issue: Charts not rendering**
```bash
Error: Hydration failed
```
**Solution**: Ensure Recharts components are wrapped in client components with `'use client'`

**Issue: Import paths not resolving**
```bash
Module not found: Can't resolve '@/...'
```
**Solution**: Check `tsconfig.json` has correct path mapping:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## Environment Variables

**Required for Production**:

```env
# .env.local

# API Configuration
NEXT_PUBLIC_API_URL=https://api.rivio.com

# QuickBooks Integration
QUICKBOOKS_CLIENT_ID=your_client_id
QUICKBOOKS_CLIENT_SECRET=your_client_secret
QUICKBOOKS_REDIRECT_URI=https://yourapp.com/auth/callback

# NetSuite Integration
NETSUITE_ACCOUNT_ID=your_account_id
NETSUITE_CONSUMER_KEY=your_consumer_key
NETSUITE_CONSUMER_SECRET=your_consumer_secret

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Email Service (for notifications)
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASSWORD=your_sendgrid_api_key
```

---

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use environment variables** for all secrets
3. **Validate user input** on both client and server
4. **Implement CSRF protection** for forms
5. **Use HTTPS** in production
6. **Sanitize data** before displaying
7. **Implement rate limiting** on API endpoints
8. **Regular security audits**: `npm audit`

---

## Roadmap & Future Features

### Phase 2 Enhancements

- [ ] Real-time sync with accounting systems
- [ ] Email notifications for overdue invoices
- [ ] Multi-user access with role-based permissions
- [ ] Advanced analytics dashboard
- [ ] Forecasting and trend analysis
- [ ] Mobile application (React Native)
- [ ] API for third-party integrations
- [ ] Automated report scheduling
- [ ] Document management (upload policy docs)
- [ ] Chat support integration

### Phase 3 (Enterprise)

- [ ] Multi-tenant architecture
- [ ] White-label solutions
- [ ] Advanced workflow automation
- [ ] AI-powered risk prediction
- [ ] Integration marketplace
- [ ] Audit trail and compliance logging
- [ ] SSO (Single Sign-On) support
- [ ] Advanced reporting engine

---

## Support & Contributing

### Getting Help

- **Documentation**: This file
- **Issues**: Check GitHub Issues
- **Email**: support@rivio.com
- **Community**: Join our Slack channel

### Contributing Guidelines

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Write/update tests
5. Commit with clear messages
6. Push to your fork
7. Create a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow ESLint rules (run `npm run lint`)
- Use Prettier for formatting
- Write meaningful commit messages
- Add JSDoc comments for complex functions

---

## Glossary

**Trade Credit Insurance**: Insurance that protects businesses against non-payment by customers.

**Overdue Threshold**: Number of days past due date before an invoice requires reporting to the insurer.

**Credit Limit**: Maximum amount of credit extended to a buyer.

**Exposure**: Outstanding receivables owed by a buyer.

**Utilization**: Percentage of credit limit currently in use.

**Insured Exposure**: Receivables covered by insurance policy.

**Aging Report**: Report showing how long invoices have been outstanding.

**Policy Coverage**: Percentage of invoice value covered by insurance.

---

## License

Proprietary - All Rights Reserved

Copyright © 2025 Rivio Inc.

---

## Changelog

### Version 1.0.0 (MVP) - November 2025

**Initial Release**
- Dashboard with key metrics and visualizations
- Buyer management with credit tracking
- Policy configuration interface
- CSV report generation
- Settings page with integration UI
- Mock data for demonstration

---

## Credits

**Built with**:
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Recharts](https://recharts.org/) - Charts
- [Lucide](https://lucide.dev/) - Icons

**Design Inspiration**:
- Ramp
- Brex
- Stripe Dashboard

---

*Last Updated: November 10, 2025*
