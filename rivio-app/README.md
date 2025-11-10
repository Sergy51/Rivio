# Rivio - Trade Credit Insurance Dashboard

A modern SaaS web application for mid-sized manufacturers and distributors to manage trade credit insurance compliance. Rivio automates compliance with insurer policy rules and provides clear visibility into credit exposure.

## Features

### Core MVP Features

- **Accounting Integration** - Connect to QuickBooks, NetSuite, or Xero to import invoices and payments
- **Policy Management** - Configure policy terms including overdue thresholds, coverage percentages, and insurer details
- **Dashboard Overview** - Real-time visibility into:
  - Total receivables
  - Overdue invoices
  - Average credit limit utilization
  - Insured vs. uninsured exposure
- **Buyer Management** - Track buyer credit limits, current exposure, and utilization rates
- **Automated Alerts** - Color-coded notifications when invoices exceed policy thresholds
- **Insurer Reports** - One-click CSV export for submission to Allianz, Coface, Atradius, and other insurers

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd rivio-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
rivio-app/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard (home page)
│   ├── buyers/            # Buyer management page
│   ├── policies/          # Policy settings page
│   ├── reports/           # Report generation page
│   ├── settings/          # Account & integration settings
│   ├── layout.tsx         # Root layout with navigation
│   └── globals.css        # Global styles & Tailwind config
├── components/            # Reusable React components
│   └── Navigation.tsx     # Top navigation bar
├── lib/                   # Utilities and data
│   └── mockData.ts        # Mock data for demo purposes
└── public/                # Static assets
```

## Key Pages

### Dashboard (`/`)
- Key metrics cards showing receivables, overdue amounts, credit utilization, and insurance coverage
- Visual charts for exposure breakdown and buyer utilization
- Recent overdue invoices table with alert indicators
- Critical alerts for invoices exceeding policy thresholds

### Buyers (`/buyers`)
- Comprehensive buyer directory with credit limit tracking
- Real-time utilization indicators (color-coded by risk level)
- Insurance status badges
- Risk rating classifications
- Automated alerts for high utilization

### Policies (`/policies`)
- Policy details configuration
- Overdue threshold settings
- Coverage percentage management
- Quick select for common insurers (Allianz, Coface, Atradius)
- Compliance rules overview

### Reports (`/reports`)
- One-click CSV export for:
  - Overdue invoices report
  - Accounts receivable aging
  - Credit exposure summary
- Report scheduling overview
- Export history tracking

### Settings (`/settings`)
- Accounting software integration (QuickBooks, NetSuite, Xero)
- Automatic sync configuration
- Notification preferences
- Account management

## Design System

The application follows a clean B2B SaaS design inspired by modern fintech dashboards (Ramp, Brex):

- **Color Palette**: Blue and gray tones for professionalism and trust
- **Typography**: System font stack for optimal performance
- **Layout**: Card-based design with clear hierarchy
- **Visualizations**: Clean charts with color-coded data
- **Alerts**: Color-coded notifications (red for critical, yellow for warnings, green for success)

## Mock Data

The MVP includes realistic mock data for demonstration purposes:
- 5 sample buyers with varying credit utilization
- 8 sample invoices with different statuses
- Pre-configured policy with Allianz Trade
- Real-time calculations for all metrics

## Future Enhancements

- Live accounting system OAuth integration
- Real-time sync with accounting platforms
- Automated email notifications
- Multi-user access control
- Advanced analytics and forecasting
- Mobile app
- API for third-party integrations

## Support

For issues or questions, please contact support@rivio.com

## License

Proprietary - All rights reserved
