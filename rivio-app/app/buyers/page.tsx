'use client';

import { Shield, AlertCircle, TrendingUp } from 'lucide-react';
import { mockBuyers } from '@/lib/mockData';

export default function BuyersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Buyers</h1>
        <p className="mt-2 text-sm text-gray-600">
          Monitor buyer credit limits and exposure levels
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <p className="text-sm font-medium text-gray-600">Total Buyers</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{mockBuyers.length}</p>
          <p className="text-sm text-gray-500 mt-2">
            {mockBuyers.filter((b) => b.isInsured).length} insured
          </p>
        </div>

        <div className="card">
          <p className="text-sm font-medium text-gray-600">Total Credit Available</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ${(mockBuyers.reduce((sum, b) => sum + b.creditLimit, 0) / 1000000).toFixed(1)}M
          </p>
          <p className="text-sm text-gray-500 mt-2">Across all buyers</p>
        </div>

        <div className="card">
          <p className="text-sm font-medium text-gray-600">At Risk Buyers</p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {mockBuyers.filter((b) => b.currentExposure / b.creditLimit > 0.9).length}
          </p>
          <p className="text-sm text-gray-500 mt-2">&gt;90% credit utilized</p>
        </div>
      </div>

      {/* Buyers Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Buyer Directory</h2>
          <button className="btn-primary">Add Buyer</button>
        </div>

        <div className="space-y-4">
          {mockBuyers.map((buyer) => {
            const utilizationPercent = (buyer.currentExposure / buyer.creditLimit) * 100;
            const isHighUtilization = utilizationPercent > 90;
            const isMediumUtilization = utilizationPercent > 70 && utilizationPercent <= 90;

            return (
              <div
                key={buyer.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold text-gray-900">{buyer.name}</h3>
                      {buyer.isInsured ? (
                        <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 mr-1" />
                          Insured
                        </span>
                      ) : (
                        <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Uninsured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{buyer.country}</p>

                    {/* Credit Limit and Exposure */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Credit Limit
                        </p>
                        <p className="text-lg font-semibold text-gray-900 mt-1">
                          ${(buyer.creditLimit / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Current Exposure
                        </p>
                        <p className="text-lg font-semibold text-gray-900 mt-1">
                          ${(buyer.currentExposure / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Available Credit
                        </p>
                        <p className="text-lg font-semibold text-gray-900 mt-1">
                          ${((buyer.creditLimit - buyer.currentExposure) / 1000).toFixed(0)}K
                        </p>
                      </div>
                    </div>

                    {/* Utilization Bar */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Credit Utilization</span>
                        <span
                          className={`text-sm font-semibold ${
                            isHighUtilization
                              ? 'text-red-600'
                              : isMediumUtilization
                              ? 'text-yellow-600'
                              : 'text-green-600'
                          }`}
                        >
                          {utilizationPercent.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all ${
                            isHighUtilization
                              ? 'bg-red-600'
                              : isMediumUtilization
                              ? 'bg-yellow-500'
                              : 'bg-green-600'
                          }`}
                          style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Risk Rating Badge */}
                  <div className="ml-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        buyer.riskRating === 'Low'
                          ? 'bg-green-100 text-green-800'
                          : buyer.riskRating === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {buyer.riskRating} Risk
                    </span>
                  </div>
                </div>

                {/* Alerts */}
                {isHighUtilization && (
                  <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-3 rounded-r">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <p className="ml-2 text-sm text-red-700">
                        Credit limit nearly exhausted. Review exposure immediately.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
