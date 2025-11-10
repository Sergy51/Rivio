'use client';

import { AlertCircle, TrendingUp, DollarSign, AlertTriangle, Shield } from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  mockBuyers,
  mockInvoices,
  getTotalReceivables,
  getTotalOverdue,
  getInsuredExposure,
  getUninsuredExposure,
  getOverdueInvoices,
  mockPolicy,
} from '@/lib/mockData';

export default function Dashboard() {
  const totalReceivables = getTotalReceivables();
  const totalOverdue = getTotalOverdue();
  const overdueInvoices = getOverdueInvoices();
  const insuredExposure = getInsuredExposure();
  const uninsuredExposure = getUninsuredExposure();

  // Calculate average credit utilization
  const avgUtilization =
    mockBuyers.reduce((sum, buyer) => sum + (buyer.currentExposure / buyer.creditLimit) * 100, 0) /
    mockBuyers.length;

  // Prepare data for charts
  const exposureData = [
    { name: 'Insured', value: insuredExposure, color: '#2563eb' },
    { name: 'Uninsured', value: uninsuredExposure, color: '#ef4444' },
  ];

  const buyerUtilizationData = mockBuyers.map((buyer) => ({
    name: buyer.name.split(' ')[0],
    utilization: ((buyer.currentExposure / buyer.creditLimit) * 100).toFixed(1),
    isOverLimit: buyer.currentExposure > buyer.creditLimit,
  }));

  const criticalInvoices = overdueInvoices.filter(
    (inv) => inv.daysOverdue > mockPolicy.overdueThreshold
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Overview of your trade credit insurance compliance
        </p>
      </div>

      {/* Alerts */}
      {criticalInvoices.length > 0 && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Critical Overdue Invoices</h3>
              <p className="mt-1 text-sm text-red-700">
                {criticalInvoices.length} invoice(s) exceed the {mockPolicy.overdueThreshold}-day
                policy threshold. Immediate action required.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Receivables */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Receivables</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${(totalReceivables / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-green-600 font-medium">12.5%</span>
            <span className="text-gray-600 ml-2">vs last month</span>
          </div>
        </div>

        {/* Overdue Invoices */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue Amount</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${(totalOverdue / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600">
              {overdueInvoices.length} overdue invoice(s)
            </span>
          </div>
        </div>

        {/* Avg Credit Utilization */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Credit Utilization</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{avgUtilization.toFixed(1)}%</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${Math.min(avgUtilization, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Insurance Coverage */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Insured Coverage</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {((insuredExposure / totalReceivables) * 100).toFixed(0)}%
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            ${(insuredExposure / 1000).toFixed(0)}K of ${(totalReceivables / 1000).toFixed(0)}K
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Insured vs Uninsured Exposure */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Insured vs Uninsured Exposure
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={exposureData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: $${(value / 1000).toFixed(0)}K`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {exposureData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${(value / 1000).toFixed(0)}K`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Credit Limit Utilization by Buyer */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Credit Limit Utilization by Buyer
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={buyerUtilizationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: '% Utilized', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Bar dataKey="utilization" fill="#3b82f6">
                {buyerUtilizationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.isOverLimit ? '#ef4444' : '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Overdue Invoices Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Overdue Invoices</h3>
          <span className="text-sm text-gray-500">{overdueInvoices.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buyer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days Overdue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {overdueInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.buyerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${invoice.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        invoice.daysOverdue > mockPolicy.overdueThreshold
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {invoice.daysOverdue} days
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {invoice.isInsured ? (
                      <span className="inline-flex items-center text-xs text-green-700">
                        <Shield className="h-3 w-3 mr-1" />
                        Insured
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs text-red-700">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Uninsured
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
