import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Users, Mail, Phone, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdminCustomersView = () => {
  const { registeredCustomers } = useStore();

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-black text-white">Registered Customer Profiles</h1>
        <p className="text-xs text-slate-400 mt-1">Verified identities, purchase history, and bcrypt credential health</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 uppercase font-bold text-[10px] text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-4 py-4">Contact Details</th>
                <th className="px-4 py-4">Email Status</th>
                <th className="px-4 py-4">Password Protection</th>
                <th className="px-4 py-4">Total Orders</th>
                <th className="px-6 py-4 text-right">Lifetime Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {registeredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-800/30 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-500 flex items-center justify-center font-bold text-white text-xs">
                        {cust.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white">{cust.name}</p>
                        <p className="text-[10px] text-slate-500">Member since {cust.createdAt}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 space-y-0.5">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Mail className="w-3 h-3 text-slate-500" />
                      <span>{cust.email}</span>
                    </div>
                    {cust.phone && (
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span>+91 {cust.phone}</span>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    {cust.isEmailVerified ? (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full w-fit">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        Pending Token
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-4 font-mono text-[10px] text-indigo-400">
                    <span title={cust.passwordHash}>
                      bcrypt (Salt + Cost 12)
                    </span>
                  </td>

                  <td className="px-4 py-4 font-bold text-white">
                    {cust.ordersCount} orders
                  </td>

                  <td className="px-6 py-4 text-right font-black text-rose-400 text-sm">
                    ₹{cust.totalSpent.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

