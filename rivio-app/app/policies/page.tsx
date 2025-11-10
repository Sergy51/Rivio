'use client';

import { useState } from 'react';
import { Shield, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { mockPolicy } from '@/lib/mockData';

export default function PoliciesPage() {
  const [policy, setPolicy] = useState(mockPolicy);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPolicy, setEditedPolicy] = useState(mockPolicy);

  const handleSave = () => {
    setPolicy(editedPolicy);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPolicy(policy);
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Policy Settings</h1>
        <p className="mt-2 text-sm text-gray-600">
          Configure your trade credit insurance policy terms and compliance thresholds
        </p>
      </div>

      {/* Policy Overview Card */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
              <Shield className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {isEditing ? editedPolicy.insurerName : policy.insurerName}
              </h2>
              <p className="text-sm text-gray-500">
                Policy #{isEditing ? editedPolicy.policyNumber : policy.policyNumber}
              </p>
            </div>
          </div>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="btn-primary">
              Edit Policy
            </button>
          ) : (
            <div className="flex space-x-3">
              <button onClick={handleCancel} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary">
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Policy Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Insurer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Insurer Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedPolicy.insurerName}
                onChange={(e) =>
                  setEditedPolicy({ ...editedPolicy, insurerName: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            ) : (
              <p className="text-lg text-gray-900">{policy.insurerName}</p>
            )}
          </div>

          {/* Policy Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Policy Number
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedPolicy.policyNumber}
                onChange={(e) =>
                  setEditedPolicy({ ...editedPolicy, policyNumber: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            ) : (
              <p className="text-lg text-gray-900">{policy.policyNumber}</p>
            )}
          </div>

          {/* Overdue Threshold */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overdue Threshold (Days)
            </label>
            {isEditing ? (
              <input
                type="number"
                value={editedPolicy.overdueThreshold}
                onChange={(e) =>
                  setEditedPolicy({
                    ...editedPolicy,
                    overdueThreshold: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            ) : (
              <p className="text-lg text-gray-900">{policy.overdueThreshold} days</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Alert when invoices exceed this threshold
            </p>
          </div>

          {/* Coverage Percentage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coverage Percentage
            </label>
            {isEditing ? (
              <input
                type="number"
                value={editedPolicy.coveragePercentage}
                onChange={(e) =>
                  setEditedPolicy({
                    ...editedPolicy,
                    coveragePercentage: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            ) : (
              <p className="text-lg text-gray-900">{policy.coveragePercentage}%</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Percentage of invoice covered by insurance
            </p>
          </div>

          {/* Effective Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Effective Date
            </label>
            {isEditing ? (
              <input
                type="date"
                value={editedPolicy.effectiveDate}
                onChange={(e) =>
                  setEditedPolicy({ ...editedPolicy, effectiveDate: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            ) : (
              <p className="text-lg text-gray-900">
                {new Date(policy.effectiveDate).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
            {isEditing ? (
              <input
                type="date"
                value={editedPolicy.expiryDate}
                onChange={(e) =>
                  setEditedPolicy({ ...editedPolicy, expiryDate: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            ) : (
              <p className="text-lg text-gray-900">
                {new Date(policy.expiryDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Compliance Rules */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Rules</h3>
        <div className="space-y-4">
          <div className="flex items-start p-4 bg-blue-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-900">
                Overdue Invoice Reporting
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                All invoices overdue beyond {policy.overdueThreshold} days must be reported to{' '}
                {policy.insurerName} within 5 business days.
              </p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-blue-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-900">Credit Limit Monitoring</h4>
              <p className="text-sm text-blue-700 mt-1">
                Buyers exceeding 90% of their approved credit limit require additional approval
                before extending further credit.
              </p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-blue-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-900">Monthly Reporting</h4>
              <p className="text-sm text-blue-700 mt-1">
                Submit monthly aging reports and sales ledger to {policy.insurerName} by the 5th
                of each month.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Common Insurers Quick Select */}
      {isEditing && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Select Common Insurers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Allianz Trade', 'Coface', 'Atradius'].map((insurer) => (
              <button
                key={insurer}
                onClick={() =>
                  setEditedPolicy({
                    ...editedPolicy,
                    insurerName: insurer,
                    policyNumber: `${insurer.substring(0, 3).toUpperCase()}-2025-${Math.floor(
                      10000 + Math.random() * 90000
                    )}`,
                  })
                }
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors text-left"
              >
                <Shield className="h-6 w-6 text-gray-400 mb-2" />
                <p className="font-medium text-gray-900">{insurer}</p>
                <p className="text-xs text-gray-500 mt-1">Click to select</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
