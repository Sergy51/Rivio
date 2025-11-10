'use client';

import { Download, FileText, Calendar } from 'lucide-react';
import { mockInvoices, mockBuyers, mockPolicy, getOverdueInvoices } from '@/lib/mockData';

export default function ReportsPage() {
  const generateCSV = (type: 'overdue' | 'aging' | 'exposure') => {
    let csvContent = '';
    let filename = '';

    if (type === 'overdue') {
      // Generate Overdue Invoices Report
      const overdueInvoices = getOverdueInvoices();
      csvContent =
        'Invoice ID,Buyer Name,Amount,Due Date,Days Overdue,Insurance Status\n' +
        overdueInvoices
          .map(
            (inv) =>
              `${inv.id},${inv.buyerName},${inv.amount},${inv.dueDate},${inv.daysOverdue},${
                inv.isInsured ? 'Insured' : 'Uninsured'
              }`
          )
          .join('\n');
      filename = `overdue-invoices-${new Date().toISOString().split('T')[0]}.csv`;
    } else if (type === 'aging') {
      // Generate Aging Report
      csvContent =
        'Invoice ID,Buyer Name,Amount,Due Date,Status,Days Overdue,Insurance Status\n' +
        mockInvoices
          .map(
            (inv) =>
              `${inv.id},${inv.buyerName},${inv.amount},${inv.dueDate},${inv.status},${inv.daysOverdue},${
                inv.isInsured ? 'Insured' : 'Uninsured'
              }`
          )
          .join('\n');
      filename = `aging-report-${new Date().toISOString().split('T')[0]}.csv`;
    } else if (type === 'exposure') {
      // Generate Credit Exposure Report
      csvContent =
        'Buyer Name,Country,Credit Limit,Current Exposure,Available Credit,Utilization %,Insurance Status,Risk Rating\n' +
        mockBuyers
          .map(
            (buyer) =>
              `${buyer.name},${buyer.country},${buyer.creditLimit},${buyer.currentExposure},${
                buyer.creditLimit - buyer.currentExposure
              },${((buyer.currentExposure / buyer.creditLimit) * 100).toFixed(1)},${
                buyer.isInsured ? 'Insured' : 'Uninsured'
              },${buyer.riskRating}`
          )
          .join('\n');
      filename = `credit-exposure-${new Date().toISOString().split('T')[0]}.csv`;
    }

    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reportTypes = [
    {
      id: 'overdue',
      title: 'Overdue Invoices Report',
      description:
        'Export all invoices that are past their due date for submission to your insurer.',
      insurer: mockPolicy.insurerName,
      count: getOverdueInvoices().length,
      icon: FileText,
      color: 'red',
    },
    {
      id: 'aging',
      title: 'Accounts Receivable Aging',
      description:
        'Complete aging report showing all outstanding invoices with payment status.',
      insurer: 'All Insurers',
      count: mockInvoices.length,
      icon: Calendar,
      color: 'blue',
    },
    {
      id: 'exposure',
      title: 'Credit Exposure Report',
      description:
        'Summary of buyer credit limits, current exposure, and utilization rates.',
      insurer: mockPolicy.insurerName,
      count: mockBuyers.length,
      icon: FileText,
      color: 'purple',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="mt-2 text-sm text-gray-600">
          Generate and export reports for insurer compliance
        </p>
      </div>

      {/* Info Banner */}
      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-900">
              Insurer Reporting Requirements
            </h3>
            <p className="mt-1 text-sm text-blue-700">
              Your policy with {mockPolicy.insurerName} requires monthly submission of aging
              reports and immediate reporting of invoices overdue beyond{' '}
              {mockPolicy.overdueThreshold} days.
            </p>
          </div>
        </div>
      </div>

      {/* Report Cards */}
      <div className="space-y-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex items-start flex-1">
                  <div
                    className={`h-12 w-12 bg-${report.color}-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}
                  >
                    <Icon className={`h-6 w-6 text-${report.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                    <div className="mt-4 flex items-center space-x-6 text-sm">
                      <div>
                        <span className="text-gray-500">For Insurer:</span>
                        <span className="ml-2 font-medium text-gray-900">{report.insurer}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Records:</span>
                        <span className="ml-2 font-medium text-gray-900">{report.count}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Format:</span>
                        <span className="ml-2 font-medium text-gray-900">CSV</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => generateCSV(report.id as 'overdue' | 'aging' | 'exposure')}
                  className="btn-primary ml-6 flex-shrink-0"
                >
                  <Download className="h-4 w-4 mr-2 inline" />
                  Export CSV
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Schedule */}
      <div className="card mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Schedule</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Monthly Aging Report</p>
              <p className="text-sm text-gray-500">Due by the 5th of each month</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              Submitted
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Overdue Invoice Report</p>
              <p className="text-sm text-gray-500">Within 5 days of threshold breach</p>
            </div>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
              Action Required
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Quarterly Credit Review</p>
              <p className="text-sm text-gray-500">Every quarter end</p>
            </div>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
              Upcoming
            </span>
          </div>
        </div>
      </div>

      {/* Export History */}
      <div className="card mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Exports</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Records
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Monthly Aging Report
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2025-11-05
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {mockInvoices.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Submitted
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Credit Exposure Report
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2025-11-01
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {mockBuyers.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Submitted
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Overdue Invoices Report
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2025-10-28
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getOverdueInvoices().length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Submitted
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
