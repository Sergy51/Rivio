export interface Buyer {
  id: string;
  name: string;
  creditLimit: number;
  currentExposure: number;
  isInsured: boolean;
  riskRating: 'Low' | 'Medium' | 'High';
  country: string;
}

export interface Invoice {
  id: string;
  buyerId: string;
  buyerName: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  daysOverdue: number;
  isInsured: boolean;
}

export interface Policy {
  id: string;
  insurerName: string;
  policyNumber: string;
  overdueThreshold: number; // days
  coveragePercentage: number;
  effectiveDate: string;
  expiryDate: string;
}

// Mock Buyers Data
export const mockBuyers: Buyer[] = [
  {
    id: '1',
    name: 'Acme Manufacturing Corp',
    creditLimit: 500000,
    currentExposure: 425000,
    isInsured: true,
    riskRating: 'Low',
    country: 'USA',
  },
  {
    id: '2',
    name: 'Global Distributors Inc',
    creditLimit: 300000,
    currentExposure: 285000,
    isInsured: true,
    riskRating: 'Medium',
    country: 'Canada',
  },
  {
    id: '3',
    name: 'European Trading Co',
    creditLimit: 250000,
    currentExposure: 180000,
    isInsured: true,
    riskRating: 'Low',
    country: 'Germany',
  },
  {
    id: '4',
    name: 'Pacific Imports LLC',
    creditLimit: 150000,
    currentExposure: 165000,
    isInsured: false,
    riskRating: 'High',
    country: 'USA',
  },
  {
    id: '5',
    name: 'Continental Supplies',
    creditLimit: 400000,
    currentExposure: 320000,
    isInsured: true,
    riskRating: 'Medium',
    country: 'France',
  },
];

// Mock Invoices Data
export const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    buyerId: '1',
    buyerName: 'Acme Manufacturing Corp',
    amount: 85000,
    dueDate: '2025-11-05',
    status: 'overdue',
    daysOverdue: 5,
    isInsured: true,
  },
  {
    id: 'INV-002',
    buyerId: '2',
    buyerName: 'Global Distributors Inc',
    amount: 125000,
    dueDate: '2025-11-15',
    status: 'pending',
    daysOverdue: 0,
    isInsured: true,
  },
  {
    id: 'INV-003',
    buyerId: '4',
    buyerName: 'Pacific Imports LLC',
    amount: 45000,
    dueDate: '2025-10-20',
    status: 'overdue',
    daysOverdue: 21,
    isInsured: false,
  },
  {
    id: 'INV-004',
    buyerId: '1',
    buyerName: 'Acme Manufacturing Corp',
    amount: 95000,
    dueDate: '2025-11-20',
    status: 'pending',
    daysOverdue: 0,
    isInsured: true,
  },
  {
    id: 'INV-005',
    buyerId: '3',
    buyerName: 'European Trading Co',
    amount: 67000,
    dueDate: '2025-10-28',
    status: 'overdue',
    daysOverdue: 13,
    isInsured: true,
  },
  {
    id: 'INV-006',
    buyerId: '5',
    buyerName: 'Continental Supplies',
    amount: 110000,
    dueDate: '2025-11-12',
    status: 'pending',
    daysOverdue: 0,
    isInsured: true,
  },
  {
    id: 'INV-007',
    buyerId: '2',
    buyerName: 'Global Distributors Inc',
    amount: 75000,
    dueDate: '2025-11-18',
    status: 'pending',
    daysOverdue: 0,
    isInsured: true,
  },
  {
    id: 'INV-008',
    buyerId: '4',
    buyerName: 'Pacific Imports LLC',
    amount: 38000,
    dueDate: '2025-11-08',
    status: 'pending',
    daysOverdue: 0,
    isInsured: false,
  },
];

// Mock Policy Data
export const mockPolicy: Policy = {
  id: '1',
  insurerName: 'Allianz Trade',
  policyNumber: 'ALZ-2025-12345',
  overdueThreshold: 90,
  coveragePercentage: 90,
  effectiveDate: '2025-01-01',
  expiryDate: '2025-12-31',
};

// Helper functions
export function getTotalReceivables(): number {
  return mockInvoices.reduce((sum, inv) => sum + inv.amount, 0);
}

export function getOverdueInvoices(): Invoice[] {
  return mockInvoices.filter(inv => inv.status === 'overdue');
}

export function getTotalOverdue(): number {
  return getOverdueInvoices().reduce((sum, inv) => sum + inv.amount, 0);
}

export function getInsuredExposure(): number {
  return mockInvoices.filter(inv => inv.isInsured).reduce((sum, inv) => sum + inv.amount, 0);
}

export function getUninsuredExposure(): number {
  return mockInvoices.filter(inv => !inv.isInsured).reduce((sum, inv) => sum + inv.amount, 0);
}

export function getCriticalAlerts(): number {
  return mockInvoices.filter(inv =>
    inv.status === 'overdue' && inv.daysOverdue > mockPolicy.overdueThreshold
  ).length;
}

export function getWarningAlerts(): number {
  return mockInvoices.filter(inv =>
    inv.status === 'overdue' &&
    inv.daysOverdue <= mockPolicy.overdueThreshold &&
    inv.daysOverdue >= mockPolicy.overdueThreshold * 0.7
  ).length;
}
