import React from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Error403({ status = 403, message = 'Anda tidak memiliki akses ke halaman ini.', requiredRoles = [], userRoles = [] }) {
  return (
    <AppLayout title="403 - Unauthorized">
      <Head title="403 - Forbidden" />
      
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-lg">
          <h1 className="text-9xl font-bold text-red-600">403</h1>
          <div className="w-24 h-1 bg-red-600 mx-auto my-6"></div>
          <h2 className="text-3xl font-semibold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            {message}
          </p>
          
          {requiredRoles.length > 0 && (
            <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm font-medium text-gray-700 mb-2">Required Roles:</p>
              <div className="flex flex-wrap gap-2">
                {requiredRoles.map((role, index) => (
                  <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    {role}
                  </span>
                ))}
              </div>
              
              <p className="text-sm font-medium text-gray-700 mt-3 mb-2">Your Roles:</p>
              <div className="flex flex-wrap gap-2">
                {userRoles.length > 0 ? (
                  userRoles.map((role, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {role}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">No roles assigned</span>
                )}
              </div>
            </div>
          )}
          
          <div className="space-x-4">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/kontak"
              className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}