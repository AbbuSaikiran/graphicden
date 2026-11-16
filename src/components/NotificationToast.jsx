import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X, MessageSquare } from 'lucide-react';

export const NotificationToast = () => {
  const { notifications, removeNotification } = useStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4">
      {notifications.map((n) => {
        const isWhatsapp = n.extra?.whatsapp;
        let bg = 'bg-white border-slate-200 text-slate-800 shadow-xl';
        let icon = <Info className="w-5 h-5 text-indigo-500 shrink-0" />;

        if (isWhatsapp) {
          bg = 'bg-emerald-950 border-emerald-500/50 text-emerald-100 shadow-2xl';
          icon = <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 animate-bounce" />;
        } else if (n.type === 'success') {
          bg = 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-lg';
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
        } else if (n.type === 'error') {
          bg = 'bg-rose-50 border-rose-300 text-rose-950 shadow-lg';
          icon = <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />;
        } else if (n.type === 'warning') {
          bg = 'bg-amber-50 border-amber-300 text-amber-950 shadow-lg';
          icon = <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
        }

        return (
          <div
            key={n.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${bg}`}
          >
            {icon}
            <div className="flex-1 text-sm">
              <div className="font-semibold flex items-center justify-between">
                <span>{n.title}</span>
                {isWhatsapp && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500 text-emerald-950">
                    Live WhatsApp Alert
                  </span>
                )}
              </div>
              <p className={`mt-0.5 text-xs leading-relaxed ${isWhatsapp ? 'text-emerald-200' : 'text-slate-600'}`}>
                {n.message}
              </p>
            </div>
            <button
              onClick={() => removeNotification(n.id)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

