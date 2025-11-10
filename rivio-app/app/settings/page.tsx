'use client';

import { useState } from 'react';
import { CheckCircle, Link2, Settings as SettingsIcon, Bell, User } from 'lucide-react';

export default function SettingsPage() {
  const [connectedAccounting, setConnectedAccounting] = useState<string | null>('QuickBooks');
  const [lastSync, setLastSync] = useState('2025-11-10 09:30 AM');

  const accountingSystems = [
    {
      id: 'quickbooks',
      name: 'QuickBooks Online',
      description: 'Connect to QuickBooks Online to import invoices and customer data',
      logo: '📊',
      isConnected: connectedAccounting === 'QuickBooks',
    },
    {
      id: 'netsuite',
      name: 'NetSuite',
      description: 'Connect to NetSuite ERP for enterprise-grade financial data',
      logo: '💼',
      isConnected: connectedAccounting === 'NetSuite',
    },
    {
      id: 'xero',
      name: 'Xero',
      description: 'Connect to Xero accounting software for real-time sync',
      logo: '📈',
      isConnected: connectedAccounting === 'Xero',
    },
  ];

  const handleConnect = (systemName: string) => {
    // Mock connection - in real app would trigger OAuth flow
    setConnectedAccounting(systemName);
    setLastSync(new Date().toLocaleString());
  };

  const handleDisconnect = () => {
    setConnectedAccounting(null);
    setLastSync('Never');
  };

  const handleSync = () => {
    // Mock sync - would trigger API call in real app
    setLastSync(new Date().toLocaleString());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your integrations and account preferences
        </p>
      </div>

      {/* Accounting Integration Section */}
      <div className="card mb-6">
        <div className="flex items-center mb-6">
          <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
            <Link2 className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Accounting Integration</h2>
            <p className="text-sm text-gray-600">
              Connect your accounting software to import invoices and payments
            </p>
          </div>
        </div>

        {/* Connection Status */}
        {connectedAccounting && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <p className="text-sm font-medium text-green-900">
                    Connected to {connectedAccounting}
                  </p>
                  <p className="text-xs text-green-700 mt-1">Last synced: {lastSync}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button onClick={handleSync} className="btn-secondary text-sm">
                  Sync Now
                </button>
                <button onClick={handleDisconnect} className="btn-secondary text-sm text-red-600">
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Available Integrations */}
        <div className="space-y-4">
          {accountingSystems.map((system) => (
            <div
              key={system.id}
              className={`border rounded-lg p-6 transition-all ${
                system.isConnected
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-4xl mr-4">{system.logo}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{system.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{system.description}</p>
                  </div>
                </div>
                {system.isConnected ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Connected
                  </span>
                ) : (
                  <button
                    onClick={() => handleConnect(system.name)}
                    className="btn-primary"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sync Settings */}
      <div className="card mb-6">
        <div className="flex items-center mb-6">
          <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            <SettingsIcon className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Sync Settings</h2>
            <p className="text-sm text-gray-600">Configure how data syncs from your accounting system</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Automatic Sync</p>
              <p className="text-sm text-gray-500">Sync data automatically every hour</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Import Invoices</p>
              <p className="text-sm text-gray-500">Automatically import new invoices</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Import Payments</p>
              <p className="text-sm text-gray-500">Automatically import payment data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card mb-6">
        <div className="flex items-center mb-6">
          <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
            <Bell className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
            <p className="text-sm text-gray-600">Configure alert preferences</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Overdue Invoice Alerts</p>
              <p className="text-sm text-gray-500">
                Email alerts when invoices exceed threshold
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Credit Limit Warnings</p>
              <p className="text-sm text-gray-500">Alert when buyers exceed 90% utilization</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Monthly Report Reminders</p>
              <p className="text-sm text-gray-500">Remind to submit monthly reports</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="card">
        <div className="flex items-center mb-6">
          <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
            <User className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Account</h2>
            <p className="text-sm text-gray-600">Manage your account settings</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-700">Company Name</p>
            <p className="text-lg text-gray-900 mt-1">Demo Company</p>
          </div>
          <div className="py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-700">Email</p>
            <p className="text-lg text-gray-900 mt-1">admin@democompany.com</p>
          </div>
          <div className="py-3">
            <p className="text-sm font-medium text-gray-700">Plan</p>
            <p className="text-lg text-gray-900 mt-1">Professional</p>
          </div>
        </div>
      </div>
    </div>
  );
}
