import React from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminLogin } from './AdminLogin';
import { ExactAdminDashboard } from './ExactAdminDashboard';

export const AdminPortal = () => {
  const { adminUser } = useStore();

  if (!adminUser) {
    return <AdminLogin />;
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
      <ExactAdminDashboard />
    </div>
  );
};
